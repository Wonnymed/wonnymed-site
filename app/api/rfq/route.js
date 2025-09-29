import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUIRED_FIELDS = ["nome", "empresa", "email", "telefone", "linha", "especificacoes"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const LINE_SLUGS = new Set(["hemostatic", "suture", "ppu", "dermato"]);
const SPAM_PATTERNS = [
  /https?:\/\//i,
  /<\/?[a-z][^>]*>/i,
  /viagra|casino|porn|sex|loan|bitcoin|crypto|forex|escort/i,
  /\b(?:money\s+back|easy\s+money|investment\s+opportunity)\b/i,
];
const MAX_FIELD_LENGTH = 2000;

function sanitizeText(value = "") {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function normalizePhone(value = "") {
  const raw = value.toString();
  const digits = raw.replace(/[^0-9+]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+")) {
    return `+${digits
      .slice(1)
      .replace(/[^0-9]/g, "")
      .slice(0, 20)}`;
  }
  return digits.replace(/[^0-9]/g, "").slice(0, 20);
}

function deriveLineSlug(label = "", providedSlug = "") {
  const normalizedProvided = providedSlug.toString().toLowerCase();
  if (LINE_SLUGS.has(normalizedProvided)) {
    return normalizedProvided;
  }
  const normalized = label.toString().toLowerCase();
  if (normalized.includes("sutur")) return "suture";
  if (normalized.includes("ppu") || normalized.includes("drill") || normalized.includes("taladro")) return "ppu";
  if (normalized.includes("derm")) return "dermato";
  return "hemostatic";
}

function detectSpam(payload) {
  const haystack = [
    payload.nome,
    payload.empresa,
    payload.email,
    payload.telefone,
    payload.especificacoes,
    payload.regulatorio,
  ]
    .filter(Boolean)
    .join("\n");

  if (SPAM_PATTERNS.some((pattern) => pattern.test(haystack))) {
    return true;
  }

  const urlMatches = haystack.match(/https?:\/\//gi);
  if (urlMatches && urlMatches.length > 0) {
    return true;
  }

  const emailsMentioned = haystack.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g);
  if (emailsMentioned && emailsMentioned.length > 2) {
    return true;
  }

  return false;
}

async function verifyRecaptcha(token, action, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { success: true, score: 1, skipped: true };
  }

  if (!token) {
    return { success: false, score: 0, error: "missing-token" };
  }

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  if (ip) {
    params.append("remoteip", ip);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  if (!data.success) {
    return { success: false, score: data.score ?? 0, error: "verification-failed" };
  }

  if (action && data.action && action !== data.action) {
    return { success: false, score: data.score ?? 0, error: "action-mismatch" };
  }

  if (typeof data.score === "number" && data.score < 0.5) {
    return { success: false, score: data.score, error: "low-score" };
  }

  return { success: true, score: data.score ?? 0.9 };
}

function buildEmailText(payload) {
  const lines = [
    `Idioma: ${payload.lang || ""}`,
    `Linha selecionada: ${payload.linha || ""} (${payload.linhaSlug})`,
    `Nome: ${payload.nome}`,
    `Empresa: ${payload.empresa}`,
    `Tipo de conta: ${payload.tipoConta || ""}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.telefone}`,
    `Quantidade: ${payload.quantidade || ""}`,
    `Frequência: ${payload.frequencia || ""}`,
    `Prazo desejado: ${payload.prazo || ""}`,
    `Local de entrega: ${payload.entrega || ""}`,
    `Requisitos regulatórios: ${payload.regulatorio || ""}`,
    "",
    "Especificações técnicas:",
    payload.especificacoes || "",
  ];

  return lines.join("\n");
}

async function sendEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RFQ_TO_EMAIL || "contato@wonnymed.com";
  const fromEmail = process.env.RFQ_FROM_EMAIL || "rfq@wonnymed.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured. Skipping email dispatch.");
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[RFQ] ${payload.empresa} — ${payload.linhaSlug}`,
      text: buildEmailText(payload),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email dispatch failed: ${errorText}`);
  }

  return response.json();
}

async function persistLead(payload) {
  const webhook = process.env.RFQ_CRM_WEBHOOK;
  if (!webhook) {
    return { skipped: true };
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "rfq-form",
        receivedAt: new Date().toISOString(),
        payload,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to persist lead", error);
    return { success: false };
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const cleaned = {};
  for (const key of Object.keys(body)) {
    const value = body[key];
    cleaned[key] = typeof value === "string" ? sanitizeText(value) : value;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!cleaned[field] || !String(cleaned[field]).trim()) {
      return NextResponse.json({ error: `Campo obrigatório ausente: ${field}` }, { status: 400 });
    }
  }

  const email = sanitizeText(cleaned.email).toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }

  const phoneDigits = cleaned.telefone.replace(/\D/g, "");
  if (phoneDigits.length < 8) {
    return NextResponse.json({ error: "Telefone inválido" }, { status: 400 });
  }

  if (sanitizeText(cleaned.especificacoes).length < 10) {
    return NextResponse.json({ error: "Especificações insuficientes" }, { status: 400 });
  }

  const linhaSlug = deriveLineSlug(cleaned.linha, cleaned.linhaSlug);
  if (!LINE_SLUGS.has(linhaSlug)) {
    return NextResponse.json({ error: "Linha inválida" }, { status: 400 });
  }

  const spam = detectSpam(cleaned);
  if (spam) {
    return NextResponse.json({ error: "Submission rejected" }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const recaptcha = await verifyRecaptcha(cleaned.recaptchaToken, cleaned.recaptchaAction, ip);
  if (!recaptcha.success) {
    return NextResponse.json({ error: "Recaptcha inválido" }, { status: 400 });
  }

  const payload = {
    ...cleaned,
    email,
    linhaSlug,
    telefone: normalizePhone(cleaned.telefone),
  };

  try {
    await sendEmail(payload);
  } catch (error) {
    console.error("RFQ email error", error);
    return NextResponse.json({ error: "Falha ao enviar e-mail" }, { status: 500 });
  }

  await persistLead({
    nome: payload.nome,
    empresa: payload.empresa,
    email: payload.email,
    telefone: payload.telefone,
    linhaSlug: payload.linhaSlug,
    lang: payload.lang,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ message: "RFQ recebido com sucesso." });
}

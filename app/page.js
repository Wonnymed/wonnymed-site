"use client";
import React, { useMemo, useState } from "react";
import "../styles/globals.css";

const LOCALES = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "ko", label: "한국어" },
];

const I18N = {
  pt: { brand:"Wonnymed", nav:{solutions:"Soluções",how:"Como funciona",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
    hero:{ titleA:"Abastecimento clínico com ", titleB:"compliance", titleC:" e velocidade.",
      sub:"Hemostáticos, suturas, drills pay-per-use e dermato profissional. Cotação em 24–48h, documentação ANVISA/UDI verificada e SLA de abastecimento.",
      ctaPrimary:"Solicitar cotação", ctaSecondary:"Ver compliance", note:"Sem catálogo público. Trabalhamos via RFQ e portal privado para aprovadores.",
      badgeTitle:"Selo Verified", badgeList:["Registro ANVISA & UDI","ISO 13485 validada","IFU/MSDS anexos","Rastreamento de lotes"] },
    metrics:[{k:"SLA de cotação",v:"24–48h"},{k:"OTIF",v:">= 95%"},{k:"Rotina",v:"Portal privado"},{k:"Compliance",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"Soluções",
    lines:[
      {title:"Hemostáticos",desc:"Controle de sangramento com documentação completa e classes de risco."},
      {title:"Suturas",desc:"Absorvíveis e não absorvíveis com compatibilidades típicas e IFUs."},
      {title:"Drills PPU",desc:"Pay-per-use com AFE neutra, uptime ≥ 98% e swap em 72h."},
      {title:"Dermato Pro (Beauty)",desc:"Estética clínica profissional (BR/MX/CO; foco GCC) com conformidade local."},
    ],
    askQuote:"Pedir cotação",
    howTitle:"Como funciona",
    howSteps:[
      {t:"Pedido",d:"Envie o RFQ com especificações, quantidades e prazos."},
      {t:"Validação",d:"Checagem de ANVISA/UDI/ISO, compatibilidades e validade."},
      {t:"Entrega",d:"Cotação em 24–48h e OTIF ≥ 95%."},
    ],
    complianceTitle:"Compliance & Documentos",
    complianceDesc:"Transparência regulatória por padrão. Cada proposta inclui dossiê técnico e rastreio.",
    complianceList:["Registro ANVISA e UDI","ISO 13485 do fabricante","IFU/MSDS atualizados","Controle de lote/validade e alertas"],
    requestChecklist:"Solicitar checklist",
    verifiedCriteriaTitle:"Selo Verified — critérios",
    verifiedCriteria:["Validação documental (ANVISA/UDI/ISO)","IFU em português quando requerido","Prazo de validade mínimo","Histórico de OTIF/serviço"],
    rfqTitle:"Solicitar cotação (RFQ)",
    rfqSub:"Sem catálogo público. Envie suas necessidades e retornamos com comparativo técnico, docs verificados e proposta em 24–48h.",
    rfqBullets:[
      "Comparativo técnico (material, classe de risco, compatibilidade, validade)",
      "ANVISA • ISO 13485 • UDI • IFU/MSDS",
      "SLA 24–48h • OTIF ≥ 95% • Recall & rastreio de lote"
    ],
    rfqHint:"Após enviar, você poderá anexar arquivos via link seguro que enviaremos por e-mail.",
    form:{ name:"Nome*", company:"Empresa*", accountType:"Tipo de conta", types:["Hospital privado","Hospital público","Distribuidor"],
      email:"E-mail*", phone:"Telefone", line:"Linha*", lines:["Hemostáticos","Suturas","Drills PPU","Dermato Pro (Beauty)"],
      specs:"Especificações técnicas / marcas equivalentes*", specsPH:"Ex.: classe de risco, calibre/tamanho, absorção, compatibilidade, registro atual, marca de referência...",
      qty:"Quantidade", freq:"Frequência (mensal/trimestral)", deadline:"Prazo desejado", delivery:"Local de entrega",
      reg:"Necessidades regulatórias", regPH:"Ex.: classe II/III, docs obrigatórios, validade mínima...",
      submit:"Enviar RFQ", legal:"Ao enviar, você concorda com nossos Termos e confirma que não está compartilhando PHI.",
      okTitle:"Recebido com sucesso", okMsg:"Retornaremos em 24–48h com comparativo e proposta.", backTop:"Voltar ao topo" },
    casesTitle:"Casos & Resultados",
    cases:[ {t:"Disponibilidade 98% no semestre", d:"Hospital privado (SP) — hemostáticos e suturas com reposição programada."},
            {t:"PPU com uptime 99%", d:"Rede regional — drills pay-per-use, swap até 72h e consumo mínimo."} ],
    sticky:"Cotação em 24–48h com comparativo técnico e documentação ANVISA/UDI.",
    footer:{ blurb:"Supply clínico com compliance e velocidade. Operação internacional via HK.", solutions:"Soluções", institutional:"Institucional", contact:"Contato", rights:(y)=>`© ${y} Wonnymed. Todos os direitos reservados.` }
  },
  en: { brand:"Wonnymed", nav:{solutions:"Solutions",how:"How it works",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
    hero:{ titleA:"Clinical supply with ", titleB:"compliance", titleC:" and speed.",
      sub:"Hemostatics, sutures, pay‑per‑use drills and professional derma. Quotes in 24–48h, ANVISA/UDI docs verified, delivery SLAs.",
      ctaPrimary:"Request a quote", ctaSecondary:"See compliance", note:"No public catalog. RFQ + private portal for approvers.",
      badgeTitle:"Verified Seal", badgeList:["ANVISA & UDI","ISO 13485 validated","IFU/MSDS attached","Lot tracking"] },
    metrics:[{k:"Quote SLA",v:"24–48h"},{k:"OTIF",v:">= 95%"},{k:"Routine",v:"Private portal"},{k:"Compliance",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"Solutions",
    lines:[
      {title:"Hemostatics",desc:"Bleeding control with complete documentation and risk classes."},
      {title:"Sutures",desc:"Absorbable & non‑absorbable with typical compatibilities and IFUs."},
      {title:"Drills PPU",desc:"Pay‑per‑use with neutral AFE, uptime ≥ 98%, 72h swap."},
      {title:"Derma Pro (Beauty)",desc:"Professional aesthetics (BR/MX/CO; GCC focus) with local compliance."},
    ],
    askQuote:"Request quote",
    howTitle:"How it works",
    howSteps:[
      {t:"Request",d:"Send your RFQ with specs, quantities and deadlines."},
      {t:"Validation",d:"We check ANVISA/UDI/ISO, compatibilities and shelf‑life."},
      {t:"Delivery",d:"Quote in 24–48h and supply with OTIF ≥ 95%."},
    ],
    complianceTitle:"Compliance & Documents",
    complianceDesc:"Regulatory transparency by default. Each proposal includes a technical dossier and tracking.",
    complianceList:["ANVISA registration and UDI","Manufacturer ISO 13485","IFU/MSDS updated","Lot/expiry control and recall alerts"],
    requestChecklist:"Request checklist",
    verifiedCriteriaTitle:"Verified Seal — criteria",
    verifiedCriteria:["Document validation (ANVISA/UDI/ISO)","IFU in local language when required","Minimum shelf‑life on inbound","OTIF & service history"],
    rfqTitle:"Request for Quotation (RFQ)",
    rfqSub:"No public catalog. Send your needs and we’ll return a technical comparison, verified docs and a proposal within 24–48h.",
    rfqBullets:["Technical comparison (material, risk class, compatibility, expiry)","Verified: ANVISA, ISO 1345, UDI, IFU/MSDS","SLA 24–48h • OTIF ≥ 95% • Recall & lot tracking"],
    rfqHint:"After submitting, you can send attachments via a secure link we’ll email you.",
    form:{ name:"Name*", company:"Company*", accountType:"Account type", types:["Private hospital","Public hospital","Distributor"], email:"Email*", phone:"Phone",
      line:"Line*", lines:["Hemostatics","Sutures","Drills PPU","Derma Pro (Beauty)"], specs:"Technical specs / equivalent brands*", specsPH:"E.g.: risk class, gauge/size, absorption, compatibility, current registration, reference brand...",
      qty:"Quantity", freq:"Frequency (monthly/quarterly)", deadline:"Desired lead time", delivery:"Delivery location",
      reg:"Regulatory needs", regPH:"E.g.: class II/III, mandatory docs, shelf‑life requirements...", submit:"Submit RFQ", legal:"By submitting you agree to our Terms and confirm you’re not sharing PHI.",
      okTitle:"Received successfully", okMsg:"We’ll reply in 24–48h with the comparison and proposal.", backTop:"Back to top" },
    casesTitle:"Cases & Results",
    cases:[ {t:"98% availability over semester", d:"Private hospital (SP) — hemostatics & sutures with scheduled replenishment."},
            {t:"PPU with 99% uptime", d:"Regional network — drills in pay‑per‑use, 72h swap and minimum consumption."} ],
    sticky:"Quotes in 24–48h with technical comparison and verified ANVISA/UDI docs.",
    footer:{ blurb:"Clinical supply with compliance and speed. International operations via HK.", solutions:"Solutions", institutional:"Company", contact:"Contact", rights:(y)=>`© ${y} Wonnymed. All rights reserved.` }
  },
  es: { brand:"Wonnymed", nav:{solutions:"Soluciones",how:"Cómo funciona",compliance:"Cumplimiento",rfq:"RFQ",portal:"Portal"},
    hero:{ titleA:"Abastecimiento clínico con ", titleB:"cumplimiento", titleC:" y velocidad.",
      sub:"Hemostáticos, suturas, taladros pay‑per‑use y dermato profesional. Cotización en 24–48h, documentos ANVISA/UDI verificados y SLA de entrega.",
      ctaPrimary:"Solicitar cotización", ctaSecondary:"Ver cumplimiento", note:"Sin catálogo público. RFQ y portal privado para aprobadores.",
      badgeTitle:"Sello Verificado", badgeList:["ANVISA & UDI","ISO 13485 validado","IFU/MSDS adjuntos","Trazabilidad de lotes"] },
    metrics:[{k:"SLA de cotización",v:"24–48h"},{k:"OTIF",v:">= 95%"},{k:"Rutina",v:"Portal privado"},{k:"Cumplimiento",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"Soluciones",
    lines:[
      {title:"Hemostáticos",desc:"Control de sangrado con documentación completa y clases de riesgo."},
      {title:"Suturas",desc:"Absorbibles y no absorbibles con compatibilidades típicas e IFUs."},
      {title:"Taladros PPU",desc:"Pay‑per‑use con AFE neutra, uptime ≥ 98%, reemplazo 72h."},
      {title:"Derma Pro (Beauty)",desc:"Estética profesional (BR/MX/CO; foco GCC) con cumplimiento local."},
    ],
    askQuote:"Pedir cotización",
    howTitle:"Cómo funciona",
    howSteps:[
      {t:"Solicitud",d:"Envíe su RFQ con especificaciones, cantidades y plazos."},
      {t:"Validación",d:"Verificamos ANVISA/UDI/ISO, compatibilidades y vida útil."},
      {t:"Entrega",d:"Cotización en 24–48h y suministro con OTIF ≥ 95%."},
    ],
    complianceTitle:"Cumplimiento y Documentos",
    complianceDesc:"Transparencia regulatoria por defecto. Cada propuesta incluye un dossier técnico y trazabilidad.",
    complianceList:["Registro ANVISA y UDI","ISO 13485 del fabricante","IFU/MSDS actualizados","Control de lote/caducidad y alertas"],
    requestChecklist:"Solicitar checklist",
    verifiedCriteriaTitle:"Sello Verificado — criterios",
    verifiedCriteria:["Validación documental (ANVISA/UDI/ISO)","IFU en idioma local cuando se requiera","Vida útil mínima de ingreso","Historial de OTIF/servicio"],
    rfqTitle:"Solicitud de Cotización (RFQ)",
    rfqSub:"Sin catálogo público. Envíe sus necesidades y devolveremos comparación técnica, documentos verificados y propuesta en 24–48h.",
    rfqBullets:["Comparación técnica (material, clase de riesgo, compatibilidad, caducidad)","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥ 95% • Recall y trazabilidad"],
    rfqHint:"Tras enviar, podrá adjuntar archivos mediante enlace seguro por correo.",
    form:{ name:"Nombre*", company:"Empresa*", accountType:"Tipo de cuenta", types:["Hospital privado","Hospital público","Distribuidor"], email:"Email*", phone:"Teléfono",
      line:"Línea*", lines:["Hemostáticos","Suturas","Taladros PPU","Derma Pro (Beauty)"], specs:"Especificaciones técnicas / marcas equivalentes*", specsPH:"Ej.: clase de riesgo, calibre/tamaño, absorción, compatibilidad, registro actual, marca de referencia...",
      qty:"Cantidad", freq:"Frecuencia (mensual/trimestral)", deadline:"Plazo deseado", delivery:"Lugar de entrega",
      reg:"Requisitos regulatorios", regPH:"Ej.: clase II/III, documentos obligatorios, vida útil mínima...", submit:"Enviar RFQ", legal:"Al enviar acepta nuestros Términos y confirma que no comparte PHI.",
      okTitle:"Recibido correctamente", okMsg:"Responderemos en 24–48h con la comparación y la propuesta.", backTop:"Volver arriba" },
    casesTitle:"Casos y Resultados",
    cases:[ {t:"Disponibilidad 98% en el semestre", d:"Hospital privado (SP) — hemostáticos y suturas con reposición programada."},
            {t:"PPU con 99% de uptime", d:"Red regional — taladros pay‑per‑use, reemplazo 72h y consumo mínimo."} ],
    sticky:"Cotizaciones en 24–48h con comparación técnica y documentos verificados.",
    footer:{ blurb:"Suministro clínico con cumplimiento y rapidez. Operación internacional vía HK.", solutions:"Soluciones", institutional:"Compañía", contact:"Contacto", rights:(y)=>`© ${y} Wonnymed. Todos los derechos reservados.` }
  },
  zh: { brand:"Wonnymed", nav:{solutions:"解决方案",how:"流程",compliance:"合规",rfq:"询价",portal:"门户"},
    hero:{ titleA:"合规与", titleB:"速度", titleC:"的临床供应。",
      sub:"止血材料、缝合线、按次付费钻机、专业皮肤科。24–48小时报价，ANVISA/UDI 文件已核验，交付有 SLA。",
      ctaPrimary:"提交询价", ctaSecondary:"查看合规", note:"无公开目录。通过询价与私有门户协作。",
      badgeTitle:"验证标识", badgeList:["ANVISA & UDI","ISO 13485 验证","附 IFU/MSDS","批次追踪"] },
    metrics:[{k:"报价SLA",v:"24–48h"},{k:"准时完整率",v:">= 95%"},{k:"流程",v:"私有门户"},{k:"合规",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"解决方案",
    lines:[
      {title:"止血材料",desc:"完整文件、风险分级与适应证选择。"},
      {title:"缝合线",desc:"可吸收/不可吸收，型号针型与兼容性。"},
      {title:"按次付费钻机",desc:"中性 AFE，最低消耗，正常运行≥98%，72小时更换。"},
      {title:"专业皮肤科（美业）",desc:"面向 BR/MX/CO，重点 GCC；精选与本地合规。"},
    ],
    askQuote:"提交询价",
    howTitle:"流程",
    howSteps:[{t:"询价",d:"提交规格、数量与交期。"}, {t:"核验",d:"核查 ANVISA/UDI/ISO、兼容性与有效期。"}, {t:"交付",d:"24–48小时报价，OTIF ≥ 95%。"}],
    complianceTitle:"合规与文件",
    complianceDesc:"默认透明。每个报价含技术资料与追踪。",
    complianceList:["ANVISA 注册与 UDI","制造商 ISO 13485","最新 IFU/MSDS","批次/效期控制与召回提醒"],
    requestChecklist:"索取清单",
    verifiedCriteriaTitle:"验证标识 — 标准",
    verifiedCriteria:["文件核验（ANVISA/UDI/ISO）","按需提供本地语言 IFU","入库最短效期","OTIF 与服务记录"],
    rfqTitle:"询价 (RFQ)",
    rfqSub:"无公开目录。提交需求，我们将在 24–48 小时内给出技术对比与报价。",
    rfqBullets:["技术对比（材料、风险等级、兼容性、效期）","ANVISA • ISO 13485 • UDI • IFU/MSDS","报价 SLA 24–48h • OTIF ≥ 95% • 召回与批次追踪"],
    rfqHint:"提交后我们会邮件发送安全上传链接。",
    form:{ name:"姓名*", company:"公司*", accountType:"账户类型", types:["民营医院","公立医院","经销商"], email:"邮箱*", phone:"电话",
      line:"产品线*", lines:["止血材料","缝合线","按次付费钻机","专业皮肤科"], specs:"技术规格 / 同类品牌*", specsPH:"如：风险等级、尺寸、吸收性、兼容性、现有注册、参考品牌等",
      qty:"数量", freq:"频率（每月/每季）", deadline:"期望交期", delivery:"交付地点",
      reg:"合规要求", regPH:"如：II/III 类、必备文件、效期要求等", submit:"提交 RFQ", legal:"提交即同意条款并确认不包含患者隐私信息。",
      okTitle:"已收到", okMsg:"我们将在 24–48 小时内回复。", backTop:"返回顶部" },
    casesTitle:"案例与结果",
    cases:[ {t:"学期内供应可用率 98%", d:"私立医院（圣保罗）— 止血与缝合线，计划补货。"},
            {t:"PPU 正常运行 99%", d:"区域网络 — 按次付费钻机，72 小时更换。"} ],
    sticky:"24–48 小时报价，附技术对比与核验文件。",
    footer:{ blurb:"合规高效的临床供应。香港运营。", solutions:"解决方案", institutional:"公司", contact:"联系", rights:(y)=>`© ${y} Wonnymed. 保留所有权利。` }
  },
  ar: { brand:"وونيميد", nav:{solutions:"الحلول",how:"كيف نعمل",compliance:"الامتثال",rfq:"طلب تسعير",portal:"البوابة"},
    hero:{ titleA:"توريد سريري مع ", titleB:"امتثال", titleC:" وسرعة.",
      sub:"مواد إرقاء وخيوط ومثاقب حسب الاستخدام وعلاجات جلدية مهنية. عرض خلال 24–48 ساعة، توثيق ANVISA/UDI متحقق.",
      ctaPrimary:"اطلب عرض سعر", ctaSecondary:"شاهد الامتثال", note:"لا كتالوج عامًا. RFQ وبوابة خاصة للموافقين.",
      badgeTitle:"ختم التحقق", badgeList:["ANVISA و UDI","ISO 13485 موثق","IFU/MSDS مرفق","تتبع الدُفعات"] },
    metrics:[{k:"SLA العرض",v:"24–48h"},{k:"OTIF",v:">= 95%"},{k:"الروتين",v:"بوابة خاصة"},{k:"الامتثال",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"الحلول",
    lines:[
      {title:"مواد إرقاء",desc:"توثيق كامل وفئات خطورة وخيارات حسب الاستطباب."},
      {title:"خيوط جراحية",desc:"قابلة وغير قابلة للامتصاص مع IFU وتوافقات."},
      {title:"مثاقب بالدفع",desc:"AFE محايد، جاهزية ≥98% واستبدال 72 ساعة."},
      {title:"جلدية مهنية (تجميل)",desc:"BR/MX/CO مع تركيز على الخليج وامتثال محلي."},
    ],
    askQuote:"اطلب عرض سعر",
    howTitle:"كيف نعمل",
    howSteps:[{t:"الطلب",d:"أرسل RFQ بالمواصفات والكميات."}, {t:"التحقق",d:"نراجع التوافق والصلاحية والوثائق."}, {t:"التسليم",d:"عرض خلال 24–48 ساعة وتوريد OTIF ≥ 95%."}],
    complianceTitle:"الامتثال والوثائق",
    complianceDesc:"شفافية تنظيمية افتراضية. كل عرض يتضمن ملفًا تقنيًا وتتبّعًا.",
    complianceList:["تسجيل ANVISA و UDI","ISO 13485 للمصنّع","IFU/MSDS محدّث","تنبيهات سحب وإدارة الصلاحية"],
    requestChecklist:"اطلب قائمة التحقق",
    verifiedCriteriaTitle:"ختم التحقق — المعايير",
    verifiedCriteria:["التحقق من الوثائق (ANVISA/UDI/ISO)","IFU باللغة المحلية عند الطلب","حد أدنى للصلاحية","سجل OTIF والخدمة"],
    rfqTitle:"طلب تسعير (RFQ)",
    rfqSub:"لا كتالوج عامًا. أرسل احتياجاتك وسنعود بمقارنة تقنية ووثائق متحققة وعرض خلال 24–48 ساعة.",
    rfqBullets:["مقارنة تقنية (مادة، فئة خطورة، توافق، صلاحية)","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥ 95%"],
    rfqHint:"بعد الإرسال سنوفر رابط تحميل آمن.",
    form:{ name:"الاسم*", company:"الجهة*", accountType:"نوع الحساب", types:["مستشفى خاص","مستشفى حكومي","موزّع"], email:"البريد*", phone:"الهاتف",
      line:"الخط*", lines:["مواد إرقاء","خيوط","مثاقب بالدفع","جلدية مهنية"], specs:"مواصفات تقنية / علامات مكافئة*", specsPH:"مثال: الفئة، المقاس، التوافق...",
      qty:"الكمية", freq:"التكرار", deadline:"المهلة", delivery:"موقع التسليم",
      reg:"متطلبات تنظيمية", regPH:"مثال: II/III، وثائق إلزامية، صلاحية...", submit:"إرسال RFQ", legal:"تؤكد عدم تضمين بيانات مرضى.",
      okTitle:"تم الاستلام", okMsg:"نرد خلال 24–48 ساعة.", backTop:"العودة للأعلى" },
    casesTitle:"حالات ونتائج",
    cases:[ {t:"توفر 98% خلال الفصل", d:"مستشفى خاص — مواد إرقاء وخيوط بإعادة تزويد مجدولة."},
            {t:"جاهزية 99% لـ PPU", d:"شبكة إقليمية — مثاقب بالدفع، استبدال 72 ساعة."} ],
    sticky:"عرض خلال 24–48 ساعة مع مقارنة تقنية ووثائق متحققة.",
    footer:{ blurb:"توريد سريري متوافق وسريع. تشغيل عبر هونغ كونغ.", solutions:"الحلول", institutional:"عن الشركة", contact:"اتصال", rights:(y)=>`© ${y} وونيميد. جميع الحقوق محفوظة.` }
  },
  ko: { brand:"원니메드", nav:{solutions:"솔루션",how:"진행 방식",compliance:"컴플라이언스",rfq:"견적 요청",portal:"포털"},
    hero:{ titleA:"컴플라이언스와 ", titleB:"속도", titleC:"를 갖춘 임상 공급.",
      sub:"지혈재, 봉합사, 사용량 기반 드릴, 프로 더마. 24–48시간 견적, ANVISA/UDI 문서 검증.",
      ctaPrimary:"견적 요청", ctaSecondary:"컴플라이언스 보기", note:"공개 카탈로그 없음. RFQ + 프라이빗 포털.",
      badgeTitle:"Verified 마크", badgeList:["ANVISA & UDI","ISO 13485 검증","IFU/MSDS 첨부","로트 추적"] },
    metrics:[{k:"견적 SLA",v:"24–48h"},{k:"OTIF",v:">= 95%"},{k:"루틴",v:"프라이빗 포털"},{k:"컴플라이언스",v:"ANVISA • UDI • ISO"}],
    solutionsTitle:"솔루션",
    lines:[
      {title:"지혈재",desc:"완전한 문서와 위험 등급."},
      {title:"봉합사",desc:"흡수성/비흡수성 및 호환 정보."},
      {title:"드릴 PPU",desc:"중립 AFE, 가동률 ≥98%, 72시간 스왑."},
      {title:"더마 프로 (뷰티)",desc:"BR/MX/CO 및 GCC 포커스, 현지 규정 준수."},
    ],
    askQuote:"견적 요청",
    howTitle:"진행 방식",
    howSteps:[{t:"요청",d:"사양/수량/기한 포함 RFQ 제출."},{t:"검증",d:"문서/호환/유효기간 확인."},{t:"공급",d:"24–48시간 견적, OTIF ≥95%."}],
    complianceTitle:"컴플라이언스 & 문서",
    complianceDesc:"기본값은 투명성. 모든 제안서에 기술 문서 포함.",
    complianceList:["ANVISA 등록 및 UDI","제조사 ISO 13485","최신 IFU/MSDS","리콜 알림"],
    requestChecklist:"체크리스트 요청",
    verifiedCriteriaTitle:"Verified 마크 — 기준",
    verifiedCriteria:["문서 검증(ANVISA/UDI/ISO)","현지어 IFU","입고 최소 유효기간","OTIF/서비스 이력"],
    rfqTitle:"견적 요청 (RFQ)",
    rfqSub:"공개 카탈로그 없음. 요청을 보내주시면 24–48시간 내 비교와 제안서를 드립니다.",
    rfqBullets:["기술 비교","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥95%"],
    rfqHint:"제출 후 보안 업로드 링크 제공.",
    form:{ name:"이름*", company:"기관명*", accountType:"계정 유형", types:["민영 병원","공공 병원","유통사"], email:"이메일*", phone:"전화",
      line:"라인*", lines:["지혈재","봉합사","드릴 PPU","더마 프로"], specs:"기술 사양 / 동등 브랜드*", specsPH:"예: 위험 등급, 규격, 호환성, 현 등록 ...",
      qty:"수량", freq:"빈도", deadline:"희망 리드타임", delivery:"납품지",
      reg:"규제 요구사항", regPH:"예: II/III, 필수 문서, 유효기간", submit:"RFQ 제출", legal:"환자정보 미포함 확인.",
      okTitle:"접수 완료", okMsg:"24–48시간 내 회신.", backTop:"맨 위로" },
    casesTitle:"사례 & 결과",
    cases:[ {t:"가용성 98%", d:"민영 병원 — 계획 보충."},
            {t:"PPU 가동률 99%", d:"지역 네트워크 — 72시간 스왑."} ],
    sticky:"24–48시간 내 견적 및 검증 문서.",
    footer:{ blurb:"홍콩 운영의 임상 공급.", solutions:"솔루션", institutional:"회사", contact:"연락처", rights:(y)=>`© ${y} 원니메드. 모든 권리 보유.` }
  },
};

function BrandStyles(){
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap');
      :root{
        --wm-primary: #29566f;
        --wm-primary-700: #21495e;
        --wm-primary-800: #1b3d4f;
        --wm-accent-50: #eef7f7;
        --wm-accent-200: #c7e6e6;
        --wm-accent-300: #a0d2d2;
      }
      html, body { font-family: Inter, 'Noto Sans SC','Noto Sans Arabic','Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Arial; }
      [dir='ar'] body, [dir='ar'] { font-family: 'Noto Sans Arabic', Inter, system-ui; }
    `}</style>
  );
}

export default function Page(){
  const [lang, setLang] = useState("pt");
  const t = I18N[lang];
  const dir = useMemo(()=> lang === "ar" ? "rtl" : "ltr", [lang]);

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "", empresa: "", tipoConta: t.form.types?.[0] ?? "", email: "", telefone: "",
    linha: t.form.lines?.[0] ?? "", especificacoes: "", quantidade: "", frequencia: "", prazo: "", entrega: "", regulatorio: "",
  });

  function handleChange(e){ const {name,value}=e.target; setForm(f=>({...f,[name]:value})); }
  function validate(){ const req=["nome","empresa","email","linha","especificacoes"]; return req.every(k=>String(form[k]||"").trim().length>1); }
  function handleSubmit(e){ e.preventDefault(); if(!validate()) { alert("Please fill required fields / Preencha os campos obrigatórios."); return; }
    setLoading(true); setTimeout(()=>{ setLoading(false); setSent(true); }, 800); }

  return (
    <div dir={dir} className="min-h-screen bg-neutral-50 text-neutral-900">
      <BrandStyles/>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/wonnymed-logo.png" alt="Wonnymed" className="h-8 w-auto"/>
            <span className="font-semibold text-[color:var(--wm-primary-800)] tracking-tight">{t.brand}</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[color:var(--wm-accent-50)] text-[color:var(--wm-primary-700)] border border-[color:var(--wm-accent-200)]">HK • Dubai</span>
          </div>
          <div className="flex items-center gap-2">
            <select value={lang} onChange={e=>setLang(e.target.value)} className="px-3 py-2 rounded-xl border border-neutral-300 bg-white text-sm">
              {LOCALES.map(l=> <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <a href="#rfq" className="hidden md:inline-flex px-4 py-2 rounded-xl bg-[color:var(--wm-primary)] text-white text-sm font-semibold hover:bg-[color:var(--wm-primary-700)]">{t.hero.ctaPrimary}</a>
          </div>
        </div>
      </header>

      <section className="pt-14 md:pt-24 pb-12 bg-gradient-to-b from-white to-[color:var(--wm-accent-50)]">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.hero.titleA}<span className="underline decoration-[color:var(--wm-accent-300)]">{t.hero.titleB}</span>{t.hero.titleC}
            </h1>
            <p className="mt-4 text-neutral-700 text-lg">{t.hero.sub}</p>
            <div className="mt-6 flex gap-3">
              <a href="#rfq" className="px-5 py-3 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold hover:bg-[color:var(--wm-primary-700)]">{t.hero.ctaPrimary}</a>
              <a href="#compliance" className="px-5 py-3 rounded-xl border border-neutral-300 font-semibold">{t.hero.ctaSecondary}</a>
            </div>
            <p className="mt-4 text-sm text-neutral-500">{t.hero.note}</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-[color:var(--wm-accent-50)] shadow-inner border border-[color:var(--wm-accent-200)]" />
            <div className="absolute -bottom-6 -right-6 bg-white border border-neutral-200 shadow rounded-2xl p-4 w-64">
              <p className="text-sm font-semibold">{t.hero.badgeTitle}</p>
              <ul className="mt-2 text-xs text-neutral-600 space-y-1">
                {t.hero.badgeList.map(x => <li key={x}>• {x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.metrics.map((m,i)=>(
            <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="mt-1 text-sm text-neutral-600">{m.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="linhas" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.solutionsTitle}</h2>
            <a href="#rfq" className="hidden md:inline-block px-4 py-2 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold">{t.hero.ctaPrimary}</a>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {t.lines.map((it,i)=>(
              <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[color:var(--wm-primary)]" />
                  <h3 className="text-xl font-semibold">{it.title}</h3>
                </div>
                <p className="mt-3 text-neutral-700">{it.desc}</p>
                <a href="#rfq" className="mt-4 inline-block text-sm font-semibold underline">{t.askQuote}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como" className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.howTitle}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {t.howSteps.map((s,i)=>(
              <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-200">
                <div className="text-4xl font-black text-neutral-300">{String(i+1).padStart(2,"0")}</div>
                <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-neutral-700">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.complianceTitle}</h2>
            <p className="mt-3 text-neutral-700">{t.complianceDesc}</p>
            <ul className="mt-6 space-y-3 text-neutral-700">
              {t.complianceList.map(x=> <li key={x}>• {x}</li>)}
            </ul>
            <a href="#rfq" className="mt-6 inline-block px-5 py-3 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold">{t.requestChecklist}</a>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
            <h3 className="text-lg font-semibold">Verified — criteria</h3>
            <ol className="mt-3 list-decimal list-inside space-y-1 text-neutral-700">
              {t.verifiedCriteria.map(x=> <li key={x}>{x}</li>)}
            </ol>
            <p className="mt-4 text-sm text-neutral-600">No PHI (patient data) collected in the portal.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.casesTitle}</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {t.cases.map((c,i)=>(
              <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-200">
                <h3 className="text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-neutral-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rfq" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.rfqTitle}</h2>
            <p className="mt-3 text-neutral-600">{t.rfqSub}</p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              {t.rfqBullets.map(x=> <li key={x}>• {x}</li>)}
            </ul>
            <div className="mt-8 p-4 rounded-2xl bg-neutral-100 border border-neutral-200">
              <p className="text-sm text-neutral-700">{t.rfqHint}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-2xl">✅</div>
                <h3 className="mt-2 text-xl font-semibold">{t.form.okTitle}</h3>
                <p className="mt-2 text-neutral-600">{t.form.okMsg}</p>
                <a href="#top" className="inline-block mt-6 px-5 py-3 rounded-xl bg-[color:var(--wm-primary)] text-white font-medium">{t.form.backTop}</a>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t.form.name} name="nome" value={form.nome} onChange={handleChange} />
                  <Field label={t.form.company} name="empresa" value={form.empresa} onChange={handleChange} />
                  <Select label={t.form.accountType} name="tipoConta" value={form.tipoConta} onChange={handleChange} opts={t.form.types} />
                  <Field label={t.form.email} name="email" type="email" value={form.email} onChange={handleChange} />
                  <Field label={t.form.phone} name="telefone" value={form.telefone} onChange={handleChange} />
                  <Select label={t.form.line} name="linha" value={form.linha} onChange={handleChange} opts={t.form.lines} />
                </div>
                <Area label={t.form.specs} name="especificacoes" value={form.especificacoes} onChange={handleChange} placeholder={t.form.specsPH} />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t.form.qty} name="quantidade" value={form.quantidade} onChange={handleChange} />
                  <Field label={t.form.freq} name="frequencia" value={form.frequencia} onChange={handleChange} />
                  <Field label={t.form.deadline} name="prazo" value={form.prazo} onChange={handleChange} />
                  <Field label={t.form.delivery} name="entrega" value={form.entrega} onChange={handleChange} />
                </div>
                <Area label={t.form.reg} name="regulatorio" value={form.regulatorio} onChange={handleChange} placeholder={t.form.regPH} />
                <button disabled={loading} type="submit" className="mt-4 w-full px-5 py-3 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold hover:bg-[color:var(--wm-primary-700)]">
                  {loading ? "..." : t.form.submit}
                </button>
                <p className="mt-3 text-xs text-neutral-500">{t.form.legal}</p>
              </>
            )}
          </form>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-30">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center justify-between gap-3 rounded-2xl shadow-lg border border-[color:var(--wm-accent-200)] bg-white px-4 py-3">
            <p className="text-sm text-neutral-700 hidden md:block">{t.sticky}</p>
            <a href="#rfq" className="px-5 py-2 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold hover:bg-[color:var(--wm-primary-700)]">{t.hero.ctaPrimary}</a>
          </div>
        </div>
      </div>

      <footer className="pt-16 pb-24 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <img src="/assets/wonnymed-logo.png" alt="Wonnymed" className="h-8 w-auto"/>
              <span className="font-semibold text-[color:var(--wm-primary-800)]">{t.brand}</span>
            </div>
            <p className="mt-3 text-neutral-600">{t.footer.blurb}</p>
          </div>
          <div>
            <h4 className="font-semibold">{t.footer.solutions}</h4>
            <ul className="mt-3 space-y-2 text-neutral-600">
              {t.lines.map((it,i)=> <li key={i}><a href="#linhas" className="hover:text-neutral-900">{it.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">{t.footer.institutional || "Company"}</h4>
            <ul className="mt-3 space-y-2 text-neutral-600">
              <li><a href="#compliance" className="hover:text-neutral-900">{t.nav.compliance}</a></li>
              <li><a href="#como" className="hover:text-neutral-900">{t.nav.how}</a></li>
              <li><a href="#rfq" className="hover:text-neutral-900">{t.nav.rfq}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">{t.footer.contact}</h4>
            <ul className="mt-3 space-y-2 text-neutral-600">
              <li>contato@wonnymed.com</li>
              <li>+852 • +55</li>
              <li><a href="#portal" className="underline">{t.nav.portal}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-neutral-500">{t.footer.rights(new Date().getFullYear())}</div>
      </footer>
    </div>
  );
}

function Field({label, name, type="text", value, onChange, placeholder}){
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <input className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-200"
        name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    </label>
  );
}
function Select({label, name, value, onChange, opts=[]}){
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <select className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-200"
        name={name} value={value} onChange={onChange}>
        {opts.map(op=> <option key={op} value={op}>{op}</option>)}
      </select>
    </label>
  );
}
function Area({label, name, value, onChange, placeholder}){
  return (
    <label className="block mt-4">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <textarea className="mt-1 min-h-[110px] w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-200"
        name={name} value={value} onChange={onChange} placeholder={placeholder}/>
    </label>
  );
}

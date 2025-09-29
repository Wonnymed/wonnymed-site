"use client";

import { useCallback, useMemo } from "react";

import { DEFAULT_LOCALE } from "../lib/metadata";
import { LOCALE_COOKIE, LOCALE_QUERY_PARAM } from "../lib/locale";
import { useLocaleSync } from "../lib/useLocaleSync";

export const LOCALES = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "ko", label: "한국어" },
];

const COPY = {
  pt: {
    heroEyebrow: "Compliance",
    heroTitle: "Processo de due diligence regulatória",
    heroDescription:
      "Nossa equipe conecta centros cirúrgicos e dermatológicos a fabricantes auditados na Ásia com transparência regulatória. Cada cotação inclui dossiê técnico com ANVISA, UDI, ISO 13485, IFU/MSDS e rastreabilidade de lote para acelerar a aprovação clínica.",
    dueTitle: "Due diligence em quatro etapas",
    dueDescription:
      "Todas as linhas — hemostáticos, suturas, drills pay-per-use e dermato profissional — passam pelo mesmo fluxo de compliance antes de serem ofertadas.",
    dueSteps: [
      {
        icon: "🗂️",
        title: "Mapeamento do dossiê",
        description:
          "Coletamos certificados e laudos diretamente do fabricante auditado, com validação cruzada pelos hubs em Hong Kong, Brasil e Golfo.",
      },
      {
        icon: "🛡️",
        title: "Checagem ANVISA & UDI",
        description:
          "Confirmamos registro ANVISA ativo, correspondência UDI/GTIN e classe de risco antes de liberar a análise técnica.",
      },
      {
        icon: "📜",
        title: "ISO 13485 atualizada",
        description:
          "Validamos a certificação ISO 13485 do fabricante, conferindo vigência e escopo para cada linha de produto cotada.",
      },
      {
        icon: "📄",
        title: "IFU & MSDS",
        description:
          "Anexamos IFU em português (quando requerido) e fichas MSDS ou laudos de esterilidade para acelerar a aprovação clínica.",
      },
    ],
    verifiedTag: "Selo Verified — critérios",
    verifiedTitle: "Transparência documentada por padrão",
    verifiedDescription:
      "O selo Verified resume os requisitos mínimos para liberar cada lote no portal Wonnymed. Ele é exibido junto ao RFQ, com anexos e alertas de validade compartilhados entre engenharia clínica, suprimentos e finanças.",
    verifiedBadge: "Verified",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "Validação documental",
        description: "Registro ANVISA, UDI e ISO 13485 revisados antes de cada proposta.",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "IFU em português",
        description: "Traduções oficiais ou IFU bilíngues quando exigido pelo hospital.",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "Prazo de validade",
        description: "Monitoramos shelf life mínimo acordado e alertas proativos no portal.",
      },
      {
        icon: "📊",
        number: "4",
        title: "Histórico de OTIF",
        description: "Acompanhamos performance ≥95% e rastreabilidade de lote/recall.",
      },
    ],
    docsTitle: "Documentos entregues com cada RFQ",
    docsList: [
      "Comparativo técnico: material, classe de risco, compatibilidades e validade mínima para cada referência solicitada.",
      "Certificados e laudos: ANVISA, UDI, ISO 13485 e relatórios de inspeção, com monitoramento contínuo de expiração.",
      "IFU/MSDS anexos: instruções de uso, fichas de segurança, laudos de esterilidade e traduções oficiais quando requeridas.",
      "Rastreabilidade de lote: tracking proativo de OTIF ≥95%, recall e histórico de entregas no portal colaborativo.",
    ],
    governanceTitle: "SLA e governança",
    governanceDescription:
      "Cotação em 24–48h, com equipes locais acompanhando inspeção, consolidação e entrega. Mantemos OTIF ≥95% e alertas preventivos para compliance contínuo.",
    nextStepsTitle: "Próximos passos",
    nextStepsDescription:
      "Envie seu RFQ pelo formulário principal para receber o comparativo técnico completo e acesso ao portal de aprovadores.",
    backCta: "Voltar ao formulário",
  },
  en: {
    heroEyebrow: "Compliance",
    heroTitle: "Regulatory due diligence workflow",
    heroDescription:
      "Our team connects surgical and dermatology centers to audited manufacturers across Asia with regulatory transparency. Every quote ships with a technical dossier covering ANVISA, UDI, ISO 13485, IFU/MSDS and lot traceability so approvals move faster.",
    dueTitle: "Due diligence in four steps",
    dueDescription:
      "Every line — hemostatics, sutures, pay-per-use drills and professional dermato — follows the same compliance flow before it is offered.",
    dueSteps: [
      {
        icon: "🗂️",
        title: "Dossier mapping",
        description:
          "We gather certificates and reports directly from the audited manufacturer and cross-check them through our hubs in Hong Kong, Brazil and the Gulf.",
      },
      {
        icon: "🛡️",
        title: "ANVISA & UDI check",
        description:
          "We confirm active ANVISA registration, UDI/GTIN match and risk class before the technical review is released.",
      },
      {
        icon: "📜",
        title: "Updated ISO 13485",
        description:
          "We validate the manufacturer's ISO 13485 certificate, checking scope and validity for each quoted product line.",
      },
      {
        icon: "📄",
        title: "IFU & MSDS",
        description:
          "We attach Portuguese IFU (when required) plus MSDS or sterility reports to accelerate clinical approval.",
      },
    ],
    verifiedTag: "Verified seal — criteria",
    verifiedTitle: "Documented transparency by default",
    verifiedDescription:
      "The Verified seal summarizes the minimum requirements to release each lot in the Wonnymed portal. It appears next to the RFQ with attachments and expiry alerts shared across clinical engineering, procurement and finance.",
    verifiedBadge: "Verified",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "Document validation",
        description: "ANVISA registration, UDI and ISO 13485 reviewed before every proposal.",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "IFU in Portuguese",
        description: "Official translations or bilingual IFU when the hospital requires it.",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "Shelf-life control",
        description: "We monitor the agreed minimum shelf life and surface proactive alerts in the portal.",
      },
      {
        icon: "📊",
        number: "4",
        title: "OTIF track record",
        description: "We track ≥95% OTIF performance with lot and recall traceability.",
      },
    ],
    docsTitle: "Documents delivered with every RFQ",
    docsList: [
      "Technical comparison: material, risk class, compatibilities and minimum shelf life for each requested reference.",
      "Certificates and reports: ANVISA, UDI, ISO 13485 and inspection reports with continuous expiry monitoring.",
      "IFU/MSDS attachments: instructions for use, safety data sheets, sterility reports and official translations when required.",
      "Lot traceability: proactive tracking of ≥95% OTIF, recalls and delivery history inside the collaborative portal.",
    ],
    governanceTitle: "SLA and governance",
    governanceDescription:
      "Quoting in 24–48h with local teams following inspection, consolidation and delivery. We sustain ≥95% OTIF with preventive alerts for continuous compliance.",
    nextStepsTitle: "Next steps",
    nextStepsDescription:
      "Send your RFQ through the main form to receive the full technical comparison and approver portal access.",
    backCta: "Back to form",
  },
  es: {
    heroEyebrow: "Cumplimiento",
    heroTitle: "Flujo de due diligence regulatoria",
    heroDescription:
      "Nuestro equipo conecta centros quirúrgicos y dermatológicos con fabricantes auditados en Asia con total transparencia regulatoria. Cada cotización incluye un dossier técnico con ANVISA, UDI, ISO 13485, IFU/MSDS y trazabilidad de lotes para acelerar la aprobación clínica.",
    dueTitle: "Due diligence en cuatro pasos",
    dueDescription:
      "Todas las líneas — hemostáticos, suturas, drills pay-per-use y dermato profesional — siguen el mismo flujo de cumplimiento antes de ofrecerse.",
    dueSteps: [
      {
        icon: "🗂️",
        title: "Mapeo del dossier",
        description:
          "Reunimos certificados e informes directamente del fabricante auditado y los validamos de forma cruzada desde nuestros hubs en Hong Kong, Brasil y el Golfo.",
      },
      {
        icon: "🛡️",
        title: "Verificación ANVISA & UDI",
        description:
          "Confirmamos registro ANVISA activo, correspondencia UDI/GTIN y clase de riesgo antes de liberar la revisión técnica.",
      },
      {
        icon: "📜",
        title: "ISO 13485 vigente",
        description:
          "Validamos el certificado ISO 13485 del fabricante, revisando vigencia y alcance para cada línea de producto cotizada.",
      },
      {
        icon: "📄",
        title: "IFU & MSDS",
        description:
          "Adjuntamos IFU en portugués (cuando se requiere) y hojas MSDS o reportes de esterilidad para agilizar la aprobación clínica.",
      },
    ],
    verifiedTag: "Sello Verified — criterios",
    verifiedTitle: "Transparencia documentada por defecto",
    verifiedDescription:
      "El sello Verified resume los requisitos mínimos para liberar cada lote en el portal Wonnymed. Se muestra junto al RFQ con anexos y alertas de vigencia compartidas entre ingeniería clínica, abastecimiento y finanzas.",
    verifiedBadge: "Verified",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "Validación documental",
        description: "Registro ANVISA, UDI e ISO 13485 revisados antes de cada propuesta.",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "IFU en portugués",
        description: "Traducciones oficiales o IFU bilingües cuando el hospital lo exige.",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "Control de vigencia",
        description: "Monitoreamos la vida útil mínima acordada y activamos alertas proactivas en el portal.",
      },
      {
        icon: "📊",
        number: "4",
        title: "Historial OTIF",
        description: "Seguimos un desempeño ≥95% con trazabilidad de lote y recall.",
      },
    ],
    docsTitle: "Documentos entregados con cada RFQ",
    docsList: [
      "Comparativo técnico: material, clase de riesgo, compatibilidades y vida útil mínima por referencia solicitada.",
      "Certificados e informes: ANVISA, UDI, ISO 13485 y reportes de inspección con monitoreo continuo de vencimiento.",
      "Adjuntos IFU/MSDS: instrucciones de uso, hojas de seguridad, reportes de esterilidad y traducciones oficiales cuando se requieren.",
      "Trazabilidad de lotes: seguimiento proactivo de OTIF ≥95%, recalls e historial de entregas en el portal colaborativo.",
    ],
    governanceTitle: "SLA y gobernanza",
    governanceDescription:
      "Cotización en 24–48h con equipos locales que acompañan inspección, consolidación y entrega. Mantenemos OTIF ≥95% con alertas preventivas para cumplimiento continuo.",
    nextStepsTitle: "Próximos pasos",
    nextStepsDescription:
      "Envíe su RFQ mediante el formulario principal para recibir el comparativo técnico completo y acceso al portal de aprobadores.",
    backCta: "Volver al formulario",
  },
  zh: {
    heroEyebrow: "合规",
    heroTitle: "监管尽职调查流程",
    heroDescription:
      "我们的团队将外科和皮肤科中心与经过审核的亚洲制造商连接起来，确保法规透明。每份报价都附有包含 ANVISA、UDI、ISO 13485、IFU/MSDS 以及批次追踪的技术档案，加速临床审批。",
    dueTitle: "四个步骤完成尽职调查",
    dueDescription:
      "所有产品线——止血材料、缝合线、按次付费钻机以及专业皮肤科产品——在上线前都会经过相同的合规流程。",
    dueSteps: [
      {
        icon: "🗂️",
        title: "档案梳理",
        description:
          "我们直接向通过审核的制造商收集证书和报告，并由香港、巴西和海湾地区的枢纽交叉验证。",
      },
      {
        icon: "🛡️",
        title: "ANVISA 与 UDI 核验",
        description:
          "在启动技术评估前，我们确认 ANVISA 注册有效、UDI/GTIN 匹配以及风险等级。",
      },
      {
        icon: "📜",
        title: "更新的 ISO 13485",
        description:
          "我们验证制造商的 ISO 13485 证书，逐一核对每条产品线的适用范围与有效期。",
      },
      {
        icon: "📄",
        title: "IFU 与 MSDS",
        description:
          "按需附上葡萄牙语 IFU，以及 MSDS 或灭菌报告，帮助更快完成临床审批。",
      },
    ],
    verifiedTag: "Verified 认证 — 评估标准",
    verifiedTitle: "默认即提供的透明度",
    verifiedDescription:
      "Verified 认证总结了在 Wonnymed 门户开放每个批次所需的最低要求。它与 RFQ 一同展示，工程、采购与财务团队共享附件与效期提醒。",
    verifiedBadge: "已验证",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "文件核验",
        description: "在每次提案前复核 ANVISA 注册、UDI 以及 ISO 13485。",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "葡萄牙语 IFU",
        description: "医院要求时，提供官方翻译或双语 IFU。",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "效期管理",
        description: "监测约定的最低效期，并在门户中触发主动提醒。",
      },
      {
        icon: "📊",
        number: "4",
        title: "OTIF 记录",
        description: "追踪 ≥95% 的 OTIF 表现以及批次/召回可追溯性。",
      },
    ],
    docsTitle: "每份 RFQ 附带的文件",
    docsList: [
      "技术对比：材料、风险等级、兼容性及每个需求物料的最低效期。",
      "证书与报告：ANVISA、UDI、ISO 13485 以及检验报告，并持续监控到期时间。",
      "IFU/MSDS 附件：使用说明、安全数据表、灭菌报告以及所需的官方翻译。",
      "批次追踪：在协同门户中主动监控 ≥95% OTIF、召回信息与交付历史。",
    ],
    governanceTitle: "SLA 与治理",
    governanceDescription:
      "24–48 小时内完成报价，本地团队全程跟进检验、集货与交付。我们保持 ≥95% 的 OTIF，并提供预警确保持续合规。",
    nextStepsTitle: "下一步",
    nextStepsDescription:
      "通过主表单提交 RFQ，可获得完整的技术对比以及审批门户的访问权限。",
    backCta: "返回表单",
  },
  ar: {
    heroEyebrow: "الامتثال",
    heroTitle: "مسار العناية الواجبة التنظيمية",
    heroDescription:
      "يصل فريقنا بين مراكز الجراحة والجلدية والمصنعين الخاضعين للتدقيق في آسيا مع شفافية تنظيمية كاملة. كل عرض سعر يتضمن ملفًا تقنيًا يشمل ANVISA وUDI وISO 13485 وIFU/MSDS وتتبع الدُفعات لتسريع الموافقات السريرية.",
    dueTitle: "العناية الواجبة في أربع خطوات",
    dueDescription:
      "جميع الخطوط — مواد إيقاف النزيف، الخيوط الجراحية، المثاقب حسب الاستخدام وخط الجلدية المحترف — تمر بنفس مسار الامتثال قبل طرحها.",
    dueSteps: [
      {
        icon: "🗂️",
        title: "إعداد الملف",
        description:
          "نجمع الشهادات والتقارير مباشرة من المصنع الخاضع للتدقيق مع تحقق متقاطع من مراكزنا في هونغ كونغ والبرازيل والخليج.",
      },
      {
        icon: "🛡️",
        title: "فحص ANVISA وUDI",
        description:
          "نؤكد على صلاحية تسجيل ANVISA وتطابق UDI/GTIN وفئة المخاطر قبل بدء المراجعة الفنية.",
      },
      {
        icon: "📜",
        title: "ISO 13485 محدث",
        description:
          "نراجع شهادة ISO 13485 الخاصة بالمصنع للتحقق من النطاق والصلاحية لكل خط منتج معروض.",
      },
      {
        icon: "📄",
        title: "IFU وMSDS",
        description:
          "نرفق تعليمات الاستخدام باللغة البرتغالية (عند الحاجة) بالإضافة إلى نشرات MSDS أو تقارير التعقيم لتسريع الاعتماد السريري.",
      },
    ],
    verifiedTag: "شارة Verified — المعايير",
    verifiedTitle: "الشفافية الموثقة كمعيار أساسي",
    verifiedDescription:
      "تلخص شارة Verified الحد الأدنى من المتطلبات لإطلاق كل دفعة داخل بوابة Wonnymed. تظهر بجوار طلب التسعير مع المرفقات وتنبيهات انتهاء الصلاحية المشتركة بين الهندسة السريرية والمشتريات والمالية.",
    verifiedBadge: "موثّق",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "تحقق من المستندات",
        description: "مراجعة تسجيل ANVISA وUDI وISO 13485 قبل كل عرض سعر.",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "IFU بالبرتغالية",
        description: "ترجمات رسمية أو IFU ثنائية اللغة عند طلب المستشفى.",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "التحكم في مدة الصلاحية",
        description: "نراقب الحد الأدنى للعمر التخزيني المتفق عليه مع تنبيهات استباقية في البوابة.",
      },
      {
        icon: "📊",
        number: "4",
        title: "سجل OTIF",
        description: "نتابع أداء OTIF ‎≥95%‎ مع إمكانية تتبع الدُفعات والاستدعاءات.",
      },
    ],
    docsTitle: "الوثائق المرفقة مع كل طلب تسعير",
    docsList: [
      "مقارنة تقنية: المادة، فئة المخاطر، التوافقات والحد الأدنى للصلاحية لكل مرجع مطلوب.",
      "شهادات وتقارير: ANVISA وUDI وISO 13485 وتقارير التفتيش مع مراقبة مستمرة لمواعيد الانتهاء.",
      "مرفقات IFU/MSDS: تعليمات الاستخدام، نشرات بيانات السلامة، تقارير التعقيم والترجمات الرسمية عند الحاجة.",
      "تتبع الدُفعات: متابعة استباقية لأداء OTIF ‎≥95%‎، وحالات الاستدعاء، وسجل التسليم في البوابة التعاونية.",
    ],
    governanceTitle: "اتفاقيات الخدمة والحوكمة",
    governanceDescription:
      "إصدار عروض الأسعار خلال 24–48 ساعة مع فرق محلية تتابع الفحص والتجميع والتسليم. نحافظ على أداء OTIF ‎≥95%‎ مع تنبيهات وقائية لضمان الامتثال المستمر.",
    nextStepsTitle: "الخطوات التالية",
    nextStepsDescription:
      "أرسل طلب التسعير عبر النموذج الرئيسي للحصول على المقارنة التقنية الكاملة والوصول إلى بوابة الموافقين.",
    backCta: "العودة إلى النموذج",
  },
  ko: {
    heroEyebrow: "컴플라이언스",
    heroTitle: "규제 듀 딜리전스 프로세스",
    heroDescription:
      "당사는 아시아 전역의 감사 완료 제조사와 외과·피부과 센터를 연결하며 규제 투명성을 보장합니다. 모든 견적에는 ANVISA, UDI, ISO 13485, IFU/MSDS 및 로트 추적을 담은 기술 자료가 포함되어 승인 속도를 높입니다.",
    dueTitle: "4단계 듀 딜리전스",
    dueDescription:
      "지혈제, 봉합사, PPU 드릴, 프로 더마토 라인까지 모든 제품군은 제안 전 동일한 컴플라이언스 흐름을 거칩니다.",
    dueSteps: [
      {
        icon: "🗂️",
        title: "자료 매핑",
        description:
          "감사를 통과한 제조사로부터 직접 인증서와 보고서를 수집하고 홍콩, 브라질, 걸프 허브에서 교차 검증합니다.",
      },
      {
        icon: "🛡️",
        title: "ANVISA & UDI 점검",
        description:
          "기술 검토 전에 ANVISA 등록 유효성, UDI/GTIN 일치 여부, 위험 등급을 확인합니다.",
      },
      {
        icon: "📜",
        title: "최신 ISO 13485",
        description:
          "제조사의 ISO 13485 인증서를 검증하여 각 제품 라인의 적용 범위와 유효기간을 확인합니다.",
      },
      {
        icon: "📄",
        title: "IFU & MSDS",
        description:
          "필요 시 포르투갈어 IFU와 함께 MSDS 또는 멸균 보고서를 첨부해 임상 승인을 가속화합니다.",
      },
    ],
    verifiedTag: "Verified 인증 — 기준",
    verifiedTitle: "기본이 되는 문서화된 투명성",
    verifiedDescription:
      "Verified 인증은 Wonnymed 포털에서 각 로트를 승인하기 위한 최소 요건을 요약합니다. RFQ와 함께 표시되며, 임상공학·구매·재무 팀이 첨부 자료와 유효기간 알림을 공유합니다.",
    verifiedBadge: "검증 완료",
    verifiedItems: [
      {
        icon: "✅",
        number: "1",
        title: "문서 검증",
        description: "모든 제안 전에 ANVISA 등록, UDI, ISO 13485를 확인합니다.",
      },
      {
        icon: "🗣️",
        number: "2",
        title: "포르투갈어 IFU",
        description: "병원 요청 시 공식 번역 또는 이중 언어 IFU를 제공합니다.",
      },
      {
        icon: "⏱️",
        number: "3",
        title: "유효기간 관리",
        description: "합의된 최소 유효기간을 모니터링하고 포털에서 사전 알림을 제공합니다.",
      },
      {
        icon: "📊",
        number: "4",
        title: "OTIF 이력",
        description: "OTIF ≥95% 성과와 로트/리콜 추적을 관리합니다.",
      },
    ],
    docsTitle: "각 RFQ에 포함되는 문서",
    docsList: [
      "기술 비교표: 자재, 위험 등급, 호환성, 요청된 각 품목의 최소 유효기간.",
      "인증 및 보고서: ANVISA, UDI, ISO 13485, 검사 보고서와 함께 만료 모니터링.",
      "IFU/MSDS 첨부: 사용 설명서, 안전 데이터 시트, 멸균 보고서 및 필요한 공식 번역.",
      "로트 추적성: 협업 포털에서 OTIF ≥95%, 리콜 및 납품 이력을 선제적으로 추적.",
    ],
    governanceTitle: "SLA 및 거버넌스",
    governanceDescription:
      "현지 팀이 검사·통합·배송을 지원하며 24–48시간 내 견적을 제공합니다. 지속적 준수를 위해 OTIF ≥95%와 예방 알림을 유지합니다.",
    nextStepsTitle: "다음 단계",
    nextStepsDescription:
      "메인 양식을 통해 RFQ를 제출하면 전체 기술 비교와 승인 포털 접근 권한을 받게 됩니다.",
    backCta: "양식으로 돌아가기",
  },
};

const FALLBACK_LANG = "en";

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function ComplianceContent({ initialLang }) {
  const { locale: lang, selectLocale } = useLocaleSync({
    supportedLocales: LOCALES.map((locale) => locale.code),
    defaultLocale: DEFAULT_LOCALE,
    cookieName: LOCALE_COOKIE,
    initialLocale: initialLang,
    queryParam: LOCALE_QUERY_PARAM,
  });

  const handleLocaleChange = useCallback(
    (code) => {
      if (code === lang) {
        return;
      }

      selectLocale(code);

      if (typeof window !== "undefined") {
        try {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
          window.scrollTo(0, 0);
        }
      }
    },
    [lang, selectLocale]
  );

  const t = useMemo(() => COPY[lang] || COPY[FALLBACK_LANG], [lang]);
  const isRTL = lang === "ar";
  const homeHref = useMemo(() => {
    const params = new URLSearchParams({ [LOCALE_QUERY_PARAM]: lang });
    return `/?${params.toString()}`;
  }, [lang]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={lang} className="bg-white text-neutral-900">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-white/70 to-neutral-50 py-16">
        <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-[color:var(--wm-accent-100)] blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-[color:var(--wm-primary-100)] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-4">
          <div className={classNames(
            "flex flex-wrap items-center justify-between gap-4",
            isRTL ? "md:flex-row-reverse" : ""
          )}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wm-accent-200)] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--wm-primary-700)] shadow-sm">
              {t.heroEyebrow}
            </div>
            <div className="flex flex-wrap gap-2">
              {LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  type="button"
                  onClick={() => handleLocaleChange(locale.code)}
                  className={classNames(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                    lang === locale.code
                      ? "border-[color:var(--wm-primary-700)] bg-[color:var(--wm-primary-50)] text-[color:var(--wm-primary-800)]"
                      : "border-[color:var(--wm-accent-200)] bg-white/70 text-neutral-600 hover:border-[color:var(--wm-primary-300)] hover:text-[color:var(--wm-primary-700)]"
                  )}
                >
                  {locale.label}
                </button>
              ))}
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">{t.heroDescription}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-[color:var(--wm-primary-800)]">{t.dueTitle}</h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-600">{t.dueDescription}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.dueSteps.map((step) => (
            <div
              key={step.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--wm-accent-100)] text-2xl">
                {step.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-neutral-200 bg-[color:var(--wm-accent-50)] py-16">
        <div className="absolute inset-x-0 -top-24 mx-auto h-48 max-w-4xl rounded-full bg-white/60 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-[color:var(--wm-accent-200)] bg-white/90 p-8 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wm-primary-200)] bg-[color:var(--wm-primary-50)] px-4 py-1 text-sm font-semibold text-[color:var(--wm-primary-800)]">
                  {t.verifiedTag}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-neutral-900">{t.verifiedTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">{t.verifiedDescription}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[color:var(--wm-primary-200)] bg-white px-4 py-3 text-lg font-semibold text-[color:var(--wm-primary-700)] shadow-sm">
                <span role="img" aria-label={t.verifiedBadge}>
                  🔒
                </span>
                {t.verifiedBadge}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {t.verifiedItems.map((item) => (
                <div
                  key={item.number}
                  className="flex items-start gap-4 rounded-2xl border border-[color:var(--wm-accent-200)] bg-white/80 p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[color:var(--wm-primary-50)] text-xl font-bold text-[color:var(--wm-primary-800)]">
                    <span className="text-2xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-xs text-neutral-500">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">{t.docsTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
              {t.docsList.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-[color:var(--wm-accent-200)] bg-white/90 p-8 text-sm leading-relaxed text-neutral-600 shadow-sm backdrop-blur">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{t.governanceTitle}</h3>
              <p className="mt-2">{t.governanceDescription}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{t.nextStepsTitle}</h3>
              <p className="mt-2">{t.nextStepsDescription}</p>
              <a
                href={homeHref}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--wm-primary)] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[color:var(--wm-primary-700)] hover:shadow-lg"
              >
                {t.backCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

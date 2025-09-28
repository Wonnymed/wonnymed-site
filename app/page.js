diff --git a/app/page.js b/app/page.js
index a2128cba701d21ddc91ce7ae925923af2299742b..ccf04b4a169d8f60ba8ccd360f6c1dbb369d3105 100644
--- a/app/page.js
+++ b/app/page.js
@@ -1,351 +1,579 @@
 // === app/page.js (com WhatsApp flutuante) ===
 "use client";
-import React, { useMemo, useState } from "react";
+import React, { useEffect, useMemo, useState } from "react";
 
 const LOCALES = [
   { code: "pt", label: "Português" },
   { code: "en", label: "English" },
   { code: "es", label: "Español" },
   { code: "zh", label: "中文" },
   { code: "ar", label: "العربية" },
   { code: "ko", label: "한국어" },
 ];
 
 const I18N = {
   pt: {
     brand:"Wonnymed",
-    nav:{solutions:"Soluções",how:"Como funciona",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
+    nav:{solutions:"Soluções",about:"Quem somos",how:"Como funciona",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
     hero:{
       titleA:"Abastecimento clínico com ",
       titleB:"compliance",
       titleC:" e velocidade.",
       sub:"Hemostáticos, suturas, drills pay-per-use e dermato profissional. Materiais cirúrgicos de parceiros auditados na 🇨🇳 China e linha Beauty de fabricantes líderes na 🇰🇷 Coreia. Cotação em 24–48h, documentação ANVISA/UDI verificada e SLA de abastecimento.",
       ctaPrimary:"Solicitar cotação", ctaSecondary:"Ver compliance",
       note:"Sem catálogo público. Trabalhamos via RFQ e portal privado para aprovadores.",
       badgeTitle:"Selo Verified",
       badgeList:["Registro ANVISA & UDI","ISO 13485 validada","IFU/MSDS anexos","Rastreamento de lotes"]
     },
     metrics:[
       {k:"SLA de cotação",v:"24–48h"},
       {k:"OTIF",v:">= 95%"},
       {k:"Rotina",v:"Portal privado"},
       {k:"Compliance",v:"ANVISA • UDI • ISO"},
       {k:"Rede de parceiros",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"Soluções",
     lines:[
-      {title:"Hemostáticos",desc:"Controle de sangramento com documentação completa. Fornecedores auditados na 🇨🇳 China."},
-      {title:"Suturas",desc:"Absorvíveis e não absorvíveis com compatibilidades e IFUs. Parceiros auditados na 🇨🇳 China."},
-      {title:"Drills PPU",desc:"Pay-per-use com AFE neutra, uptime ≥ 98% e swap em 72h."},
-      {title:"Dermato Pro (Beauty)",desc:"Linha premium para clínicas e hospitais — foco de entrega 🇧🇷 Brazil, 🇦🇪 Emirados Árabes Unidos, 🇸🇦 KSA e 🇰🇼 Kuwait. Fabricantes líderes da 🇰🇷 Coreia."}
+      {
+        title:"Hemostáticos",
+        desc:"Controle de sangramento com documentação completa. Fornecedores auditados na 🇨🇳 China.",
+        icon:"🩺",
+      },
+      {
+        title:"Suturas",
+        desc:"Absorvíveis e não absorvíveis com compatibilidades e IFUs. Parceiros auditados na 🇨🇳 China.",
+        icon:"🧵",
+      },
+      {
+        title:"Drills PPU",
+        desc:"Pay-per-use com AFE neutra, uptime ≥ 98% e swap em 72h.",
+        icon:"🛠️",
+      },
+      {
+        title:"Dermato Pro (Beauty)",
+        desc:"Linha premium para clínicas e hospitais — foco de entrega 🇧🇷 Brazil, 🇦🇪 Emirados Árabes Unidos, 🇸🇦 KSA e 🇰🇼 Kuwait. Fabricantes líderes da 🇰🇷 Coreia.",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"Institucional",
+      title:"Healthtech de supply clínico com governança global.",
+      subtitle:"Conectamos centros cirúrgicos e dermatológicos a fabricantes auditados na Ásia, entregando previsibilidade logística, compliance ANVISA/UDI e experiência de compra enterprise.",
+      missionTitle:"Objetivo",
+      mission:"Garantir abastecimento crítico com compliance integral, transparência documental e SLA monitorado para engenharia clínica e suprimentos.",
+      valuesTitle:"Nossos diferenciais",
+      values:[
+        {title:"Compliance sem fricção",desc:"Due diligence de ANVISA, UDI, ISO 13485 e IFU/MSDS antes da cotação, com alertas de validade contínuos."},
+        {title:"Rede auditada",desc:"Hubs em Hong Kong e operações no Brasil e Golfo coordenam inspeção, consolidação e entrega final."},
+        {title:"Portal colaborativo",desc:"Workflow para times clínicos, compras e finanças aprovarem cada lote com rastreabilidade completa."}
+      ],
+      statsTitle:"Governança & capilaridade",
+      stats:[
+        {value:"6+",label:"fábricas auditadas em 2023/24"},
+        {value:"24–48h",label:"SLA para comparativo técnico"},
+        {value:"≥95%",label:"Meta OTIF com monitoramento proativo"}
+      ],
+      quote:'"Nosso compromisso é previsibilidade clínica com rastreabilidade ponta a ponta."',
+      quoteBy:"Leadership Wonnymed"
+    },
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
+    verifiedNote:"Nenhum dado sensível de paciente é coletado no portal.",
     rfqTitle:"Solicitar cotação (RFQ)",
     rfqSub:"Sem catálogo público. Envie suas necessidades e retornamos com comparativo técnico, docs verificados e proposta em 24–48h.",
     rfqBullets:[
       "Comparativo técnico (material, classe de risco, compatibilidade, validade)",
       "ANVISA • ISO 1345 • UDI • IFU/MSDS",
       "SLA 24–48h • OTIF ≥ 95% • Recall & rastreio de lote"
     ],
     rfqHint:"Após enviar, você poderá anexar arquivos via link seguro que enviaremos por e-mail.",
     form:{
       name:"Nome*", company:"Empresa*", accountType:"Tipo de conta", types:["Hospital privado","Hospital público","Distribuidor"],
       email:"E-mail*", phone:"Telefone", line:"Linha*", lines:["Hemostáticos","Suturas","Drills PPU","Dermato Pro (Beauty)"],
       specs:"Especificações técnicas / marcas equivalentes*", specsPH:"Ex.: classe de risco, calibre/tamanho, absorção, compatibilidade, registro atual, marca de referência...",
       qty:"Quantidade", freq:"Frequência (mensal/trimestral)", deadline:"Prazo desejado", delivery:"Local de entrega",
       reg:"Necessidades regulatórias", regPH:"Ex.: classe II/III, docs obrigatórios, validade mínima...",
       submit:"Enviar RFQ", legal:"Ao enviar, você concorda com nossos Termos e confirma que não está compartilhando PHI.",
       okTitle:"Recebido com sucesso", okMsg:"Retornaremos em 24–48h com comparativo e proposta.", backTop:"Voltar ao topo"
     },
     casesTitle:"Casos & Resultados",
     cases:[
       {t:"Disponibilidade 98% no semestre", d:"Hospital privado (SP) — hemostáticos e suturas com reposição programada."},
       {t:"PPU com uptime 99%", d:"Rede regional — drills pay-per-use, swap até 72h e consumo mínimo."}
     ],
     sticky:"Cotação em 24–48h com comparativo técnico e documentação ANVISA/UDI.",
     footer:{ blurb:"Supply clínico com compliance e velocidade. HQ 🇭🇰 Hong Kong.", solutions:"Soluções", institutional:"Institucional", contact:"Contato", rights:(y)=>`© ${y} Wonnymed. Todos os direitos reservados.` }
   },
 
   en: {
     brand:"Wonnymed",
-    nav:{solutions:"Solutions",how:"How it works",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
+    nav:{solutions:"Solutions",about:"About",how:"How it works",compliance:"Compliance",rfq:"RFQ",portal:"Portal"},
     hero:{
       titleA:"Clinical supply with ", titleB:"compliance", titleC:" and speed.",
       sub:"Hemostatics, sutures, pay-per-use drills and professional derma. Surgical materials from audited partners in 🇨🇳 China, and the Beauty line from leading 🇰🇷 Korea manufacturers. Quotes in 24–48h, ANVISA/UDI docs verified and delivery SLAs.",
       ctaPrimary:"Request a quote", ctaSecondary:"See compliance",
       note:"No public catalog. RFQ + private portal for approvers.",
       badgeTitle:"Verified Seal", badgeList:["ANVISA & UDI","ISO 1345 validated","IFU/MSDS attached","Lot tracking"]
     },
     metrics:[
       {k:"Quote SLA",v:"24–48h"},
       {k:"OTIF",v:">= 95%"},
       {k:"Routine",v:"Private portal"},
       {k:"Compliance",v:"ANVISA • UDI • ISO"},
       {k:"Partner network",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"Solutions",
     lines:[
-      {title:"Hemostatics",desc:"Bleeding control with complete documentation. Audited partners in 🇨🇳 China."},
-      {title:"Sutures",desc:"Absorbable & non-absorbable with typical compatibilities and IFUs. Audited partners in 🇨🇳 China."},
-      {title:"Drills PPU",desc:"Pay-per-use with neutral AFE, uptime ≥ 98%, 72h swap."},
-      {title:"Derma Pro (Beauty)",desc:"Premium clinical aesthetics — delivery focus 🇧🇷 Brazil, 🇦🇪 UAE, 🇸🇦 KSA and 🇰🇼 Kuwait. Leading manufacturers in 🇰🇷 Korea."}
+      {
+        title:"Hemostatics",
+        desc:"Bleeding control with complete documentation. Audited partners in 🇨🇳 China.",
+        icon:"🩺",
+      },
+      {
+        title:"Sutures",
+        desc:"Absorbable & non-absorbable with typical compatibilities and IFUs. Audited partners in 🇨🇳 China.",
+        icon:"🧵",
+      },
+      {
+        title:"Drills PPU",
+        desc:"Pay-per-use with neutral AFE, uptime ≥ 98%, 72h swap.",
+        icon:"🛠️",
+      },
+      {
+        title:"Derma Pro (Beauty)",
+        desc:"Premium clinical aesthetics — delivery focus 🇧🇷 Brazil, 🇦🇪 UAE, 🇸🇦 KSA and 🇰🇼 Kuwait. Leading manufacturers in 🇰🇷 Korea.",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"Company",
+      title:"Clinical supply healthtech with global governance.",
+      subtitle:"We connect surgical and dermatology teams to audited manufacturers across Asia, providing logistics predictability, ANVISA/UDI compliance and an enterprise buying experience.",
+      missionTitle:"Objective",
+      mission:"Ensure critical supply with full compliance, transparent documentation and monitored SLAs for clinical engineering and procurement.",
+      valuesTitle:"Our differentiators",
+      values:[
+        {title:"Frictionless compliance",desc:"Document due diligence (ANVISA, UDI, ISO 13485, IFU/MSDS) before quoting plus ongoing shelf-life alerts."},
+        {title:"Audited network",desc:"Hong Kong hub with on-the-ground squads in Brazil and the Gulf to coordinate inspection, consolidation and final delivery."},
+        {title:"Collaborative portal",desc:"Workflow for clinical, sourcing and finance teams to approve each lot with full traceability."}
+      ],
+      statsTitle:"Governance & reach",
+      stats:[
+        {value:"6+",label:"factory audits completed in 2023/24"},
+        {value:"24–48h",label:"standard SLA for technical benchmarking"},
+        {value:"≥95%",label:"OTIF goal with proactive monitoring"}
+      ],
+      quote:'"We exist to give clinical teams predictability with end-to-end traceability."',
+      quoteBy:"Wonnymed Leadership"
+    },
     askQuote:"Request quote",
     howTitle:"How it works",
     howSteps:[
       {t:"Request",d:"Send your RFQ with specs, quantities and deadlines."},
       {t:"Validation",d:"We check ANVISA/UDI/ISO, compatibilities and shelf-life."},
       {t:"Delivery",d:"Quote in 24–48h and supply with OTIF ≥ 95%."},
     ],
     complianceTitle:"Compliance & Documents",
     complianceDesc:"Regulatory transparency by default. Each proposal includes a technical dossier and tracking.",
     complianceList:["ANVISA registration and UDI","Manufacturer ISO 13485","Updated IFU/MSDS","Lot/expiry control and recall alerts"],
     requestChecklist:"Request checklist",
     verifiedCriteriaTitle:"Verified Seal — criteria",
     verifiedCriteria:["Document validation (ANVISA/UDI/ISO)","IFU in local language when required","Minimum shelf-life on inbound","OTIF & service history"],
+    verifiedNote:"No PHI (patient data) is collected inside the portal.",
     rfqTitle:"Request for Quotation (RFQ)",
     rfqSub:"No public catalog. Send your needs and we’ll return a technical comparison, verified docs and a proposal within 24–48h.",
     rfqBullets:["Technical comparison (material, risk class, compatibility, expiry)","Verified: ANVISA, ISO 1345, UDI, IFU/MSDS","SLA 24–48h • OTIF ≥ 95% • Recall & lot tracking"],
     rfqHint:"After submitting, you can send attachments via a secure link we’ll email you.",
     form:{ name:"Name*", company:"Company*", accountType:"Account type", types:["Private hospital","Public hospital","Distributor"], email:"Email*", phone:"Phone",
       line:"Line*", lines:["Hemostatics","Sutures","Drills PPU","Derma Pro (Beauty)"], specs:"Technical specs / equivalent brands*", specsPH:"E.g.: risk class, gauge/size, absorption, compatibility, current registration, reference brand...",
       qty:"Quantity", freq:"Frequency (monthly/quarterly)", deadline:"Desired lead time", delivery:"Delivery location",
       reg:"Regulatory needs", regPH:"E.g.: class II/III, mandatory docs, shelf-life requirements...", submit:"Submit RFQ", legal:"By submitting you agree to our Terms and confirm you’re not sharing PHI.",
       okTitle:"Received successfully", okMsg:"We’ll reply in 24–48h with the comparison and proposal.", backTop:"Back to top" },
     casesTitle:"Cases & Results",
     cases:[
       {t:"98% availability over semester", d:"Private hospital (SP) — hemostatics & sutures with scheduled replenishment."},
       {t:"PPU with 99% uptime", d:"Regional network — drills in pay-per-use, 72h swap and minimum consumption."}
     ],
     sticky:"Quotes in 24–48h with technical comparison and verified ANVISA/UDI docs.",
     footer:{ blurb:"Clinical supply with compliance and speed. HQ 🇭🇰 Hong Kong.", solutions:"Solutions", institutional:"Company", contact:"Contact", rights:(y)=>`© ${y} Wonnymed. All rights reserved.` }
   },
 
   es: {
     brand:"Wonnymed",
-    nav:{solutions:"Soluciones",how:"Cómo funciona",compliance:"Cumplimiento",rfq:"RFQ",portal:"Portal"},
+    nav:{solutions:"Soluciones",about:"Quiénes somos",how:"Cómo funciona",compliance:"Cumplimiento",rfq:"RFQ",portal:"Portal"},
     hero:{
       titleA:"Abastecimiento clínico con ", titleB:"cumplimiento", titleC:" y velocidad.",
       sub:"Hemostáticos, suturas, taladros pay-per-use y dermato profesional. Material quirúrgico de socios auditados en 🇨🇳 China y línea Beauty de fabricantes líderes en 🇰🇷 Corea. Cotización en 24–48h, documentos ANVISA/UDI verificados y SLA de entrega.",
       ctaPrimary:"Solicitar cotización", ctaSecondary:"Ver cumplimiento",
       note:"Sin catálogo público. RFQ y portal privado para aprobadores.",
       badgeTitle:"Sello Verificado", badgeList:["ANVISA & UDI","ISO 13485 validado","IFU/MSDS adjuntos","Trazabilidad de lotes"]
     },
     metrics:[
       {k:"SLA de cotización",v:"24–48h"},
       {k:"OTIF",v:">= 95%"},
       {k:"Rutina",v:"Portal privado"},
       {k:"Cumplimiento",v:"ANVISA • UDI • ISO"},
       {k:"Red de socios",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"Soluciones",
     lines:[
-      {title:"Hemostáticos",desc:"Control de sangrado con documentación completa. Socios auditados en 🇨🇳 China."},
-      {title:"Suturas",desc:"Absorbibles y no absorbibles con compatibilidades e IFUs. Socios auditados en 🇨🇳 China."},
-      {title:"Taladros PPU",desc:"Pay-per-use con AFE neutra, uptime ≥ 98%, reemplazo 72h."},
-      {title:"Derma Pro (Beauty)",desc:"Estética clínica premium — foco de entrega 🇧🇷 Brasil, 🇦🇪 EAU, 🇸🇦 KSA y 🇰🇼 Kuwait. Fabricantes líderes en 🇰🇷 Corea."}
+      {
+        title:"Hemostáticos",
+        desc:"Control de sangrado con documentación completa. Socios auditados en 🇨🇳 China.",
+        icon:"🩺",
+      },
+      {
+        title:"Suturas",
+        desc:"Absorbibles y no absorbibles con compatibilidades e IFUs. Socios auditados en 🇨🇳 China.",
+        icon:"🧵",
+      },
+      {
+        title:"Taladros PPU",
+        desc:"Pay-per-use con AFE neutra, uptime ≥ 98%, reemplazo 72h.",
+        icon:"🛠️",
+      },
+      {
+        title:"Derma Pro (Beauty)",
+        desc:"Estética clínica premium — foco de entrega 🇧🇷 Brasil, 🇦🇪 EAU, 🇸🇦 KSA y 🇰🇼 Kuwait. Fabricantes líderes en 🇰🇷 Corea.",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"Institucional",
+      title:"Healthtech de abastecimiento clínico con gobernanza global.",
+      subtitle:"Conectamos quirófanos y dermatología profesional con fabricantes auditados en Asia, entregando predictibilidad logística, cumplimiento ANVISA/UDI y una experiencia de compras enterprise.",
+      missionTitle:"Objetivo",
+      mission:"Asegurar suministro crítico con cumplimiento integral, documentación transparente y SLA monitoreado para ingeniería clínica y abastecimiento.",
+      valuesTitle:"Nuestros diferenciales",
+      values:[
+        {title:"Cumplimiento sin fricción",desc:"Due diligence de ANVISA, UDI, ISO 13485 e IFU/MSDS antes de cotizar, con alertas de vigencia continuas."},
+        {title:"Red auditada",desc:"Hub en Hong Kong y equipos en Brasil y Golfo coordinan inspección, consolidación y entrega final."},
+        {title:"Portal colaborativo",desc:"Workflow para clínicas, compras y finanzas aprobando cada lote con trazabilidad completa."}
+      ],
+      statsTitle:"Gobernanza & alcance",
+      stats:[
+        {value:"6+",label:"fábricas auditadas en 2023/24"},
+        {value:"24–48h",label:"SLA estándar para comparativo técnico"},
+        {value:"≥95%",label:"Meta OTIF con monitoreo proactivo"}
+      ],
+      quote:'"Entregamos previsibilidad clínica con trazabilidad de punta a punta."',
+      quoteBy:"Leadership Wonnymed"
+    },
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
+    verifiedNote:"No se recopila información sensible de pacientes en el portal.",
     rfqTitle:"Solicitud de Cotización (RFQ)",
     rfqSub:"Sin catálogo público. Envíe sus necesidades y devolveremos comparación técnica, documentos verificados y propuesta en 24–48h.",
     rfqBullets:["Comparación técnica (material, clase de riesgo, compatibilidad, caducidad)","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥ 95% • Recall y trazabilidad"],
     rfqHint:"Tras enviar, podrá adjuntar archivos mediante enlace seguro por correo.",
     form:{ name:"Nombre*", company:"Empresa*", accountType:"Tipo de cuenta", types:["Hospital privado","Hospital público","Distribuidor"], email:"Email*", phone:"Teléfono",
       line:"Línea*", lines:["Hemostáticos","Suturas","Taladros PPU","Derma Pro (Beauty)"], specs:"Especificaciones técnicas / marcas equivalentes*", specsPH:"Ej.: clase de riesgo, calibre/tamaño, absorción, compatibilidad, registro actual, marca de referencia...",
       qty:"Cantidad", freq:"Frecuencia (mensual/trimestral)", deadline:"Plazo deseado", delivery:"Lugar de entrega",
       reg:"Requisitos regulatorios", regPH:"Ej.: II/III, documentos obligatorios, vida útil mínima...", submit:"Enviar RFQ", legal:"Al enviar acepta nuestros Términos y confirma que no comparte PHI.",
       okTitle:"Recibido correctamente", okMsg:"Responderemos en 24–48h con la comparación y la propuesta.", backTop:"Volver arriba" },
     casesTitle:"Casos y Resultados",
     cases:[
       {t:"Disponibilidad 98% en el semestre", d:"Hospital privado (SP) — hemostáticos y suturas con reposición programada."},
       {t:"PPU con 99% de uptime", d:"Red regional — taladros pay-per-use, reemplazo 72h y consumo mínimo."}
     ],
     sticky:"Cotizaciones en 24–48h con comparación técnica y documentos verificados.",
     footer:{ blurb:"Suministro clínico con cumplimiento y rapidez. HQ 🇭🇰 Hong Kong.", solutions:"Soluciones", institutional:"Compañía", contact:"Contacto", rights:(y)=>`© ${y} Wonnymed. Todos los derechos reservados.` }
   },
 
   zh: {
     brand:"Wonnymed",
-    nav:{solutions:"解决方案",how:"流程",compliance:"合规",rfq:"询价",portal:"门户"},
+    nav:{solutions:"解决方案",about:"关于我们",how:"流程",compliance:"合规",rfq:"询价",portal:"门户"},
     hero:{
       titleA:"合规与", titleB:"速度", titleC:"的临床供应。",
       sub:"止血材料、缝合线、按次付费钻机与专业皮肤科。外科类来自经审核的 🇨🇳 中国合作伙伴，美业线来自 🇰🇷 韩国领先制造商。24–48 小时报价，ANVISA/UDI 文件核验，交付有 SLA。",
       ctaPrimary:"提交询价", ctaSecondary:"查看合规",
       note:"无公开目录。通过询价与私有门户协作。",
       badgeTitle:"验证标识", badgeList:["ANVISA & UDI","ISO 13485 验证","附 IFU/MSDS","批次追踪"]
     },
     metrics:[
       {k:"报价SLA",v:"24–48h"},
       {k:"准时完整率",v:">= 95%"},
       {k:"流程",v:"私有门户"},
       {k:"合规",v:"ANVISA • UDI • ISO"},
       {k:"合作伙伴网络",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"解决方案",
     lines:[
-      {title:"止血材料",desc:"完整文件与风险分级。经审核的 🇨🇳 中国合作伙伴。"},
-      {title:"缝合线",desc:"可吸收/不可吸收与兼容信息。经审核的 🇨🇳 中国合作伙伴。"},
-      {title:"按次付费钻机",desc:"中性 AFE，正常运行 ≥98%，72 小时更换。"},
-      {title:"专业皮肤科（美业）",desc:"高端医美供给 — 重点交付 🇧🇷 巴西、🇦🇪 阿联酋、🇸🇦 沙特、🇰🇼 科威特。来自 🇰🇷 韩国领先制造商。"}
+      {
+        title:"止血材料",
+        desc:"完整文件与风险分级。经审核的 🇨🇳 中国合作伙伴。",
+        icon:"🩺",
+      },
+      {
+        title:"缝合线",
+        desc:"可吸收/不可吸收与兼容信息。经审核的 🇨🇳 中国合作伙伴。",
+        icon:"🧵",
+      },
+      {
+        title:"按次付费钻机",
+        desc:"中性 AFE，正常运行 ≥98%，72 小时更换。",
+        icon:"🛠️",
+      },
+      {
+        title:"专业皮肤科（美业）",
+        desc:"高端医美供给 — 重点交付 🇧🇷 巴西、🇦🇪 阿联酋、🇸🇦 沙特、🇰🇼 科威特。来自 🇰🇷 韩国领先制造商。",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"公司",
+      title:"具备全球治理的临床供应健康科技公司。",
+      subtitle:"我们连接手术与皮肤科团队与经审核的亚洲制造商，提供物流可预测性、ANVISA/UDI 合规以及企业级采购体验。",
+      missionTitle:"目标",
+      mission:"为临床工程与采购团队提供关键物资，确保全程合规、透明文件与受监控的 SLA。",
+      valuesTitle:"我们的优势",
+      values:[
+        {title:"无摩擦合规",desc:"报价前完成 ANVISA、UDI、ISO 13485、IFU/MSDS 审核，并持续监测有效期。"},
+        {title:"审核网络",desc:"香港枢纽以及在巴西与海湾地区的团队协同验厂、集运与末端交付。"},
+        {title:"协同门户",desc:"让临床、采购、财务团队共同审批每个批次，实现全程追踪。"}
+      ],
+      statsTitle:"治理与覆盖",
+      stats:[
+        {value:"6+",label:"2023/24 年完成的工厂审核"},
+        {value:"24–48h",label:"技术对比标准 SLA"},
+        {value:"≥95%",label:"OTIF 目标与主动监控"}
+      ],
+      quote:'"我们的使命是以端到端追踪为临床团队带来可预期的供应。"',
+      quoteBy:"Wonnymed 团队"
+    },
     askQuote:"提交询价",
     howTitle:"流程",
     howSteps:[
       {t:"询价",d:"提交规格、数量与交期。"},
       {t:"核验",d:"核查 ANVISA/UDI/ISO、兼容性与有效期。"},
       {t:"交付",d:"24–48 小时报价，OTIF ≥ 95%。"}
     ],
     complianceTitle:"合规与文件",
     complianceDesc:"默认透明。每个报价含技术资料与追踪。",
     complianceList:["ANVISA 注册与 UDI","制造商 ISO 13485","最新 IFU/MSDS","批次/效期控制与召回提醒"],
     requestChecklist:"索取清单",
     verifiedCriteriaTitle:"验证标识 — 标准",
     verifiedCriteria:["文件核验（ANVISA/UDI/ISO）","按需提供本地语言 IFU","入库最短效期","OTIF 与服务记录"],
+    verifiedNote:"门户不会收集任何患者隐私数据。",
     rfqTitle:"询价 (RFQ)",
     rfqSub:"无公开目录。提交需求，我们将在 24–48 小时内给出技术对比与报价。",
     rfqBullets:["技术对比（材料、风险等级、兼容性、效期）","ANVISA • ISO 13485 • UDI • IFU/MSDS","报价 SLA 24–48h • OTIF ≥ 95% • 召回与批次追踪"],
     rfqHint:"提交后我们会邮件发送安全上传链接。",
     form:{ name:"姓名*", company:"公司*", accountType:"账户类型", types:["民营医院","公立医院","经销商"], email:"邮箱*", phone:"电话",
       line:"产品线*", lines:["止血材料","缝合线","按次付费钻机","专业皮肤科"], specs:"技术规格 / 同类品牌*", specsPH:"如：风险等级、尺寸、吸收性、兼容性、现有注册、参考品牌等",
       qty:"数量", freq:"频率（每月/每季）", deadline:"期望交期", delivery:"交付地点",
       reg:"合规要求", regPH:"如：II/III 类、必备文件、效期要求等", submit:"提交 RFQ", legal:"提交即同意条款并确认不包含患者隐私信息。", okTitle:"已收到", okMsg:"我们将在 24–48 小时内回复。", backTop:"返回顶部" },
     casesTitle:"案例与结果",
     cases:[
       {t:"学期内供应可用率 98%", d:"私立医院（圣保罗）— 止血与缝合线，计划补货。"},
       {t:"PPU 正常运行 99%", d:"区域网络 — 按次付费钻机，72 小时更换。"}
     ],
     sticky:"24–48 小时报价，附技术对比与核验文件。",
     footer:{ blurb:"合规高效的临床供应。总部 🇭🇰 香港。", solutions:"解决方案", institutional:"公司", contact:"联系", rights:(y)=>`© ${y} Wonnymed. 保留所有权利。` }
   },
 
   ar: {
     brand:"وونيميد",
-    nav:{solutions:"الحلول",how:"كيف نعمل",compliance:"الامتثال",rfq:"طلب تسعير",portal:"البوابة"},
+    nav:{solutions:"الحلول",about:"من نحن",how:"كيف نعمل",compliance:"الامتثال",rfq:"طلب تسعير",portal:"البوابة"},
     hero:{
       titleA:"توريد سريري مع ", titleB:"امتثال", titleC:" وسرعة.",
       sub:"مواد إرقاء وخيوط ومثاقب بالدفع وعلاجات جلدية مهنية. المواد الجراحية من شركاء مُدققين في 🇨🇳 الصين وخط التجميل من مُصنّعين رائدين في 🇰🇷 كوريا. عرض خلال 24–48 ساعة ووثائق ANVISA/UDI متحققة وSLA للتسليم.",
       ctaPrimary:"اطلب عرض سعر", ctaSecondary:"شاهد الامتثال",
       note:"لا كتالوج عامًا. RFQ وبوابة خاصة للموافقين.",
       badgeTitle:"ختم التحقق", badgeList:["ANVISA و UDI","ISO 13485 موثق","IFU/MSDS مرفق","تتبع الدُفعات"]
     },
     metrics:[
       {k:"SLA العرض",v:"24–48h"},
       {k:"OTIF",v:">= 95%"},
       {k:"الروتين",v:"بوابة خاصة"},
       {k:"الامتثال",v:"ANVISA • UDI • ISO"},
       {k:"شبكة الشركاء",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"الحلول",
     lines:[
-      {title:"مواد إرقاء",desc:"توثيق كامل وفئات خطورة. شركاء مُدققون في 🇨🇳 الصين."},
-      {title:"خيوط جراحية",desc:"قابلة وغير قابلة للامتصاص مع IFU وتوافقات. شركاء مُدققون في 🇨🇳 الصين."},
-      {title:"مثاقب بالدفع",desc:"AFE محايد، جاهزية ≥98% واستبدال 72 ساعة."},
-      {title:"جلدية مهنية (تجميل)",desc:"خط علاجات مميز — تركيز التسليم 🇧🇷 البرازيل و🇦🇪 الإمارات و🇸🇦 السعودية و🇰🇼 الكويت. مُصنّعون رائدون في 🇰🇷 كوريا."}
+      {
+        title:"مواد إرقاء",
+        desc:"توثيق كامل وفئات خطورة. شركاء مُدققون في 🇨🇳 الصين.",
+        icon:"🩺",
+      },
+      {
+        title:"خيوط جراحية",
+        desc:"قابلة وغير قابلة للامتصاص مع IFU وتوافقات. شركاء مُدققون في 🇨🇳 الصين.",
+        icon:"🧵",
+      },
+      {
+        title:"مثاقب بالدفع",
+        desc:"AFE محايد، جاهزية ≥98% واستبدال 72 ساعة.",
+        icon:"🛠️",
+      },
+      {
+        title:"جلدية مهنية (تجميل)",
+        desc:"خط علاجات مميز — تركيز التسليم 🇧🇷 البرازيل و🇦🇪 الإمارات و🇸🇦 السعودية و🇰🇼 الكويت. مُصنّعون رائدون في 🇰🇷 كوريا.",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"المؤسسة",
+      title:"شركة تكنولوجيا صحية لتوريد المواد السريرية بحوكمة عالمية.",
+      subtitle:"نربط غرف العمليات وفرق الجلدية المهنية بمصنّعين مدققين في آسيا مع توفير توقع لوجستي وامتثال ANVISA/UDI وتجربة شراء مؤسسية.",
+      missionTitle:"الهدف",
+      mission:"ضمان توريد حرج مع امتثال كامل وشفافية وثائقية وSLA مراقب لفرق الهندسة السريرية والمشتريات.",
+      valuesTitle:"ما يميزنا",
+      values:[
+        {title:"امتثال بلا احتكاك",desc:"تدقيق وثائقي (ANVISA، UDI، ISO 13485، IFU/MSDS) قبل التسعير مع تنبيهات صلاحية مستمرة."},
+        {title:"شبكة مدققة",desc:"مركز هونغ كونغ وفرق ميدانية في البرازيل والخليج لتنسيق التفتيش والتجميع والتسليم النهائي."},
+        {title:"بوابة تعاونية",desc:"سير عمل يسمح للعيادات والمشتريات والمالية باعتماد كل دفعة مع تتبع كامل."}
+      ],
+      statsTitle:"الحوكمة والانتشار",
+      stats:[
+        {value:"6+",label:"تدقيق مصانع منجز في 2023/24"},
+        {value:"24–48h",label:"SLA قياسي للمقارنة التقنية"},
+        {value:"≥95%",label:"هدف OTIF مع مراقبة استباقية"}
+      ],
+      quote:'"مهمتنا توفير يقين تشغيلي مع تتبع من طرف لطرف."',
+      quoteBy:"فريق وونيميد"
+    },
     askQuote:"اطلب عرض سعر",
     howTitle:"كيف نعمل",
     howSteps:[{t:"الطلب",d:"أرسل RFQ بالمواصفات والكميات."},{t:"التحقق",d:"نراجع التوافق والوثائق والصلاحية."},{t:"التسليم",d:"عرض خلال 24–48 ساعة وتوريد OTIF ≥ 95%."}],
     complianceTitle:"الامتثال والوثائق",
     complianceDesc:"شفافية تنظيمية افتراضية. كل عرض يتضمن ملفًا تقنيًا وتتبّعًا.",
     complianceList:["تسجيل ANVISA و UDI","ISO 13485 للمصنّع","IFU/MSDS محدّث","تنبيهات سحب وإدارة الصلاحية"],
     requestChecklist:"اطلب قائمة التحقق",
     verifiedCriteriaTitle:"ختم التحقق — المعايير",
     verifiedCriteria:["التحقق من الوثائق (ANVISA/UDI/ISO)","IFU باللغة المحلية عند الطلب","حد أدنى للصلاحية","سجل OTIF والخدمة"],
+    verifiedNote:"لا يتم جمع أي بيانات مرضى في البوابة.",
     rfqTitle:"طلب تسعير (RFQ)",
     rfqSub:"لا كتالوج عامًا. أرسل احتياجاتك وسنعود بمقارنة تقنية ووثائق متحققة وعرض خلال 24–48 ساعة.",
     rfqBullets:["مقارنة تقنية (مادة، فئة خطورة، توافق، صلاحية)","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥ 95%"],
     rfqHint:"بعد الإرسال سنوفر رابط تحميل آمن.",
     form:{ name:"الاسم*", company:"الجهة*", accountType:"نوع الحساب", types:["مستشفى خاص","مستشفى حكومي","موزّع"], email:"البريد*", phone:"الهاتف",
       line:"الخط*", lines:["مواد إرقاء","خيوط","مثاقب بالدفع","جلدية مهنية"], specs:"مواصفات تقنية / علامات مكافئة*", specsPH:"مثال: الفئة، المقاس، التوافق، السجل الحالي…",
       qty:"الكمية", freq:"التكرار", deadline:"المهلة", delivery:"موقع التسليم",
       reg:"متطلبات تنظيمية", regPH:"مثال: II/III، وثائق إلزامية، صلاحية…", submit:"إرسال RFQ", legal:"تؤكد عدم تضمين بيانات مرضى.",
       okTitle:"تم الاستلام", okMsg:"نرد خلال 24–48 ساعة.", backTop:"العودة للأعلى" },
     casesTitle:"حالات ونتائج",
     cases:[{t:"توفر 98% خلال الفصل", d:"مستشفى خاص — مواد إرقاء وخيوط بإعادة تزويد مجدولة."},{t:"جاهزية 99% لـ PPU", d:"شبكة إقليمية — مثاقب بالدفع، استبدال 72 ساعة."}],
     sticky:"عرض خلال 24–48 ساعة مع مقارنة تقنية ووثائق متحققة.",
     footer:{ blurb:"توريد سريري متوافق وسريع. المقر 🇭🇰 هونغ كونغ.", solutions:"الحلول", institutional:"عن الشركة", contact:"اتصال", rights:(y)=>`© ${y} وونيميد. جميع الحقوق محفوظة.` }
   },
 
   ko: {
     brand:"원니메드",
-    nav:{solutions:"솔루션",how:"진행 방식",compliance:"컴플라이언스",rfq:"견적 요청",portal:"포털"},
+    nav:{solutions:"솔루션",about:"회사 소개",how:"진행 방식",compliance:"컴플라이언스",rfq:"견적 요청",portal:"포털"},
     hero:{
       titleA:"컴플라이언스와 ", titleB:"속도", titleC:"를 갖춘 임상 공급.",
       sub:"지혈재, 봉합사, 사용량 기반 드릴, 프로 더마. 외과 재료는 🇨🇳 중국의 감사 완료 파트너에서, 뷰티 라인은 🇰🇷 한국의 선도 제조사에서 소싱합니다. 24–48시간 견적, ANVISA/UDI 문서 검증, 납품 SLA.",
       ctaPrimary:"견적 요청", ctaSecondary:"컴플라이언스 보기",
       note:"공개 카탈로그 없음. RFQ + 프라이빗 포털.",
       badgeTitle:"Verified 마크", badgeList:["ANVISA & UDI","ISO 13485 검증","IFU/MSDS 첨부","로트 추적"]
     },
     metrics:[
       {k:"견적 SLA",v:"24–48h"},
       {k:"OTIF",v:">= 95%"},
       {k:"루틴",v:"프라이빗 포털"},
       {k:"컴플라이언스",v:"ANVISA • UDI • ISO"},
       {k:"파트너 네트워크",v:"🇨🇳 • 🇰🇷"}
     ],
     solutionsTitle:"솔루션",
     lines:[
-      {title:"지혈재",desc:"완전한 문서와 위험 등급. 🇨🇳 중국 감사 완료 파트너."},
-      {title:"봉합사",desc:"흡수성/비흡수성 및 호환 정보. 🇨🇳 중국 감사 완료 파트너."},
-      {title:"드릴 PPU",desc:"중립 AFE, 가동률 ≥98%, 72시간 스왑."},
-      {title:"더마 프로 (뷰티)",desc:"프리미엄 임상 미용 — 배송 포커스 🇧🇷 브라질, 🇦🇪 UAE, 🇸🇦 KSA, 🇰🇼 쿠웨이트. 🇰🇷 한국 선도 제조사."}
+      {
+        title:"지혈재",
+        desc:"완전한 문서와 위험 등급. 🇨🇳 중국 감사 완료 파트너.",
+        icon:"🩺",
+      },
+      {
+        title:"봉합사",
+        desc:"흡수성/비흡수성 및 호환 정보. 🇨🇳 중국 감사 완료 파트너.",
+        icon:"🧵",
+      },
+      {
+        title:"드릴 PPU",
+        desc:"중립 AFE, 가동률 ≥98%, 72시간 스왑.",
+        icon:"🛠️",
+      },
+      {
+        title:"더마 프로 (뷰티)",
+        desc:"프리미엄 임상 미용 — 배송 포커스 🇧🇷 브라질, 🇦🇪 UAE, 🇸🇦 KSA, 🇰🇼 쿠웨이트. 🇰🇷 한국 선도 제조사.",
+        icon:"💠",
+      },
     ],
+    about:{
+      eyebrow:"회사",
+      title:"글로벌 거버넌스를 갖춘 임상 공급 헬스테크.",
+      subtitle:"아시아의 감사 완료 제조사와 수술·피부과 팀을 연결해 물류 예측 가능성, ANVISA/UDI 컴플라이언스, 엔터프라이즈급 구매 경험을 제공합니다.",
+      missionTitle:"목표",
+      mission:"임상공학과 조달팀을 위해 전 과정 컴플라이언스와 투명한 문서, 모니터링되는 SLA로 필수 자재를 보장합니다.",
+      valuesTitle:"차별화 요소",
+      values:[
+        {title:"마찰 없는 컴플라이언스",desc:"견적 전 ANVISA, UDI, ISO 13485, IFU/MSDS 사전 검토와 유효기간 모니터링."},
+        {title:"감사된 네트워크",desc:"홍콩 허브와 브라질·걸프 지역 현지 팀이 검사, 집하, 라스트마일을 조율."},
+        {title:"협업 포털",desc:"임상, 구매, 재무팀이 각 로트를 승인하며 전 과정 추적."}
+      ],
+      statsTitle:"거버넌스 & 커버리지",
+      stats:[
+        {value:"6+",label:"2023/24년에 완료한 공장 감사"},
+        {value:"24–48h",label:"기술 비교 표준 SLA"},
+        {value:"≥95%",label:"능동 모니터링이 포함된 OTIF 목표"}
+      ],
+      quote:'"엔드투엔드 추적으로 임상 팀의 예측 가능성을 높이는 것이 우리의 사명입니다."',
+      quoteBy:"Wonnymed 리더십"
+    },
     askQuote:"견적 요청",
     howTitle:"진행 방식",
     howSteps:[{t:"요청",d:"사양/수량/기한 포함 RFQ 제출."},{t:"검증",d:"문서/호환/유효기간 확인."},{t:"공급",d:"24–48시간 견적, OTIF ≥95%."}],
     complianceTitle:"컴플라이언스 & 문서",
     complianceDesc:"기본값은 투명성. 모든 제안서에 기술 문서 포함.",
     complianceList:["ANVISA 등록 및 UDI","제조사 ISO 13485","최신 IFU/MSDS","리콜 알림"],
     requestChecklist:"체크리스트 요청",
     verifiedCriteriaTitle:"Verified 마크 — 기준",
     verifiedCriteria:["문서 검증(ANVISA/UDI/ISO)","현지어 IFU","입고 최소 유효기간","OTIF/서비스 이력"],
+    verifiedNote:"포털에서는 어떠한 환자 데이터도 수집하지 않습니다.",
     rfqTitle:"견적 요청 (RFQ)",
     rfqSub:"공개 카탈로그 없음. 요청을 보내주시면 24–48시간 내 비교와 제안서를 드립니다.",
     rfqBullets:["기술 비교","ANVISA • ISO 13485 • UDI • IFU/MSDS","SLA 24–48h • OTIF ≥95%"],
     rfqHint:"제출 후 보안 업로드 링크 제공.",
     form:{ name:"이름*", company:"기관명*", accountType:"계정 유형", types:["민영 병원","공공 병원","유통사"], email:"이메일*", phone:"전화",
       line:"라인*", lines:["지혈재","봉합사","드릴 PPU","더마 프로"], specs:"기술 사양 / 동등 브랜드*", specsPH:"예: 위험 등급, 규격, 호환성, 현 등록 ...",
       qty:"수량", freq:"빈도", deadline:"희망 리드타임", delivery:"납품지",
       reg:"규제 요구사항", regPH:"예: II/III, 필수 문서, 유효기간", submit:"RFQ 제출", legal:"환자정보 미포함 확인.", okTitle:"접수 완료", okMsg:"24–48시간 내 회신.", backTop:"맨 위로" },
     casesTitle:"사례 & 결과",
     cases:[{t:"가용성 98%", d:"민영 병원 — 계획 보충."},{t:"PPU 가동률 99%", d:"지역 네트워크 — 72시간 스왑."}],
     sticky:"24–48시간 내 견적 및 검증 문서.",
     footer:{ blurb:"홍콩 본사 🇭🇰에서 운영하는 임상 공급.", solutions:"솔루션", institutional:"회사", contact:"연락처", rights:(y)=>`© ${y} 원니메드. 모든 권리 보유.` }
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
diff --git a/app/page.js b/app/page.js
index a2128cba701d21ddc91ce7ae925923af2299742b..ccf04b4a169d8f60ba8ccd360f6c1dbb369d3105 100644
--- a/app/page.js
+++ b/app/page.js
@@ -363,162 +591,229 @@ function WhatsAppButton() {
     <a
       href="https://wa.me/15615966097"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Falar no WhatsApp"
       className="fixed right-4 bottom-20 z-40 inline-flex items-center justify-center rounded-full w-14 h-14 shadow-lg
                  bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200"
     >
       <span className="text-2xl">💬</span>
     </a>
   );
 }
 
 export default function Page(){
   const [lang, setLang] = useState("pt");
   const t = I18N[lang];
   const dir = useMemo(()=> lang === "ar" ? "rtl" : "ltr", [lang]);
 
   const [sent, setSent] = useState(false);
   const [loading, setLoading] = useState(false);
   const [form, setForm] = useState({
     nome: "", empresa: "", tipoConta: t.form?.types?.[0] ?? "", email: "", telefone: "",
     linha: t.form?.lines?.[0] ?? "", especificacoes: "", quantidade: "", frequencia: "", prazo: "", entrega: "", regulatorio: "",
   });
 
+  useEffect(()=>{
+    setLoading(false);
+    setSent(false);
+    setForm(prev=>({
+      ...prev,
+      tipoConta: t.form?.types?.[0] ?? "",
+      linha: t.form?.lines?.[0] ?? "",
+    }));
+  },[lang]);
+
+  const fallback = I18N.en;
+  const nav = { ...fallback.nav, ...t.nav };
+  const about = { ...fallback.about, ...(t.about ?? {}) };
+  const complianceNote = t.verifiedNote ?? fallback.verifiedNote;
+  const navLinks = [
+    { href: "#about", label: nav.about },
+    { href: "#linhas", label: nav.solutions },
+    { href: "#como", label: nav.how },
+    { href: "#compliance", label: nav.compliance },
+  ];
+  const portalHref = "mailto:contato@wonnymed.com?subject=Portal%20Wonnymed";
+
   function handleChange(e){ const {name,value}=e.target; setForm(f=>({...f,[name]:value})); }
   function validate(){ const req=["nome","empresa","email","linha","especificacoes"]; return req.every(k=>String(form[k]||"").trim().length>1); }
   function handleSubmit(e){ e.preventDefault(); if(!validate()) { alert("Please fill required fields / Preencha os campos obrigatórios."); return; }
     setLoading(true); setTimeout(()=>{ setLoading(false); setSent(true); }, 800); }
 
   return (
     <div dir={dir} className="min-h-screen bg-neutral-50 text-neutral-900">
       <BrandStyles/>
       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
-        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
+        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
           <div className="flex items-center gap-3">
-            <img src="/assets/wonnymed-logo.png" alt="Wonnymed" className="h-8 w-auto"/>
-            <span className="font-semibold text-[color:var(--wm-primary-800)] tracking-tight">{t.brand}</span>
+            <BrandWordmark label={t.brand} />
             <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[color:var(--wm-accent-50)] text-[color:var(--wm-primary-700)] border border-[color:var(--wm-accent-200)]">HQ 🇭🇰 Hong Kong</span>
           </div>
-          <div className="flex items-center gap-2">
+          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-medium text-neutral-600">
+            {navLinks.map(link => (
+              <a key={link.href} href={link.href} className="transition-colors hover:text-neutral-900">
+                {link.label}
+              </a>
+            ))}
+          </nav>
+          <div className="flex items-center gap-2 ml-auto">
+            <a href={portalHref} className="hidden md:inline-flex px-3 py-2 rounded-xl border border-neutral-300 text-sm font-medium hover:border-[color:var(--wm-primary)] hover:text-[color:var(--wm-primary-700)]">
+              {nav.portal}
+            </a>
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
         <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-5 gap-4">
           {t.metrics.map((m,i)=>(
             <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 text-center">
               <div className="text-2xl font-bold">{m.v}</div>
               <div className="mt-1 text-sm text-neutral-600">{m.k}</div>
             </div>
           ))}
         </div>
       </section>
 
+      <section id="about" className="py-16 md:py-24 bg-white">
+        <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-start">
+          <div>
+            <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
+            <div className="mt-8 rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-[color:var(--wm-accent-50)] p-8 shadow-sm">
+              <h3 className="text-lg font-semibold text-[color:var(--wm-primary-800)]">{about.missionTitle}</h3>
+              <p className="mt-3 text-neutral-700 leading-relaxed">{about.mission}</p>
+            </div>
+            <div className="mt-8">
+              <h3 className="text-lg font-semibold">{about.valuesTitle}</h3>
+              <div className="mt-4 grid gap-4 md:grid-cols-2">
+                {(about.values ?? []).map(value => (
+                  <ValueCard key={value.title} title={value.title} description={value.desc} />
+                ))}
+              </div>
+            </div>
+          </div>
+          <div className="space-y-6">
+            <div className="grid sm:grid-cols-2 gap-4">
+              {(about.stats ?? []).map(stat => (
+                <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
+                  <div className="text-3xl font-bold text-[color:var(--wm-primary-800)]">{stat.value}</div>
+                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{stat.label}</p>
+                </div>
+              ))}
+            </div>
+            <figure className="rounded-3xl border border-neutral-900/10 bg-neutral-900 p-6 text-white shadow-lg">
+              <blockquote className="text-lg leading-relaxed">{about.quote}</blockquote>
+              <figcaption className="mt-4 text-sm uppercase tracking-wide text-neutral-400">{about.quoteBy}</figcaption>
+            </figure>
+          </div>
+        </div>
+      </section>
+
       <section id="linhas" className="py-16 md:py-24 bg-white">
         <div className="mx-auto max-w-6xl px-4">
           <div className="flex items-end justify-between">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.solutionsTitle}</h2>
             <a href="#rfq" className="hidden md:inline-block px-4 py-2 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold">{t.hero.ctaPrimary}</a>
           </div>
           <div className="mt-8 grid md:grid-cols-2 gap-6">
             {t.lines.map((it,i)=>(
-              <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
+              <div key={i} className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
                 <div className="flex items-center gap-3">
-                  <div className="h-10 w-10 rounded-xl bg-[color:var(--wm-primary)]" />
+                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--wm-primary)] text-xl text-white">
+                    <span>{it.icon ?? "•"}</span>
+                  </div>
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
-            <h3 className="text-lg font-semibold">Verified — criteria</h3>
+            <h3 className="text-lg font-semibold">{t.verifiedCriteriaTitle}</h3>
             <ol className="mt-3 list-decimal list-inside space-y-1 text-neutral-700">
               {t.verifiedCriteria.map(x=> <li key={x}>{x}</li>)}
             </ol>
-            <p className="mt-4 text-sm text-neutral-600">No PHI (patient data) collected in the portal.</p>
+            <p className="mt-4 text-sm text-neutral-600">{complianceNote}</p>
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
diff --git a/app/page.js b/app/page.js
index a2128cba701d21ddc91ce7ae925923af2299742b..ccf04b4a169d8f60ba8ccd360f6c1dbb369d3105 100644
--- a/app/page.js
+++ b/app/page.js
@@ -556,90 +851,125 @@ export default function Page(){
                 <button disabled={loading} type="submit" className="mt-4 w-full px-5 py-3 rounded-xl bg-[color:var(--wm-primary)] text-white font-semibold hover:bg-[color:var(--wm-primary-700)]">
                   {loading ? "..." : t.form.submit}
                 </button>
                 <p className="mt-3 text-xs text-neutral-500">{t.form.legal}</p>
               </>
             )}
           </form>
         </div>
       </section>
 
       {/* Botão flutuante do WhatsApp */}
       <WhatsAppButton />
 
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
-            <div className="flex items-center gap-2">
-              <img src="/assets/wonnymed-logo.png" alt="Wonnymed" className="h-8 w-auto"/>
-              <span className="font-semibold text-[color:var(--wm-primary-800)]">{t.brand}</span>
-            </div>
+            <BrandWordmark label={t.brand} />
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
+              <li><a href="#about" className="hover:text-neutral-900">{nav.about}</a></li>
               <li><a href="#compliance" className="hover:text-neutral-900">{t.nav.compliance}</a></li>
               <li><a href="#como" className="hover:text-neutral-900">{t.nav.how}</a></li>
               <li><a href="#rfq" className="hover:text-neutral-900">{t.nav.rfq}</a></li>
             </ul>
           </div>
           <div>
             <h4 className="font-semibold">{t.footer.contact}</h4>
             <ul className="mt-3 space-y-2 text-neutral-600">
               <li><a href="https://wa.me/15615966097" target="_blank" className="underline">WhatsApp: +1 561 596 6097</a></li>
               <li>contato@wonnymed.com</li>
               <li>🇭🇰 Hong Kong • 🇧🇷 Brazil</li>
               <li><a href="#portal" className="underline">{t.nav.portal}</a></li>
             </ul>
           </div>
         </div>
         <div className="mt-10 text-center text-xs text-neutral-500">{t.footer.rights(new Date().getFullYear())}</div>
       </footer>
     </div>
   );
 }
 
+function BrandWordmark({ label, className = "", emblemClassName = "h-9 w-9 text-sm" }){
+  return (
+    <div className={`flex items-center gap-2 ${className}`}>
+      <span className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--wm-primary)] to-[color:var(--wm-primary-700)] text-white font-semibold shadow-sm ${emblemClassName}`}>
+        WM
+      </span>
+      <span className="font-semibold text-[color:var(--wm-primary-800)] tracking-tight">{label}</span>
+    </div>
+  );
+}
+
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
+
+function SectionHeading({eyebrow, title, subtitle}){
+  return (
+    <div>
+      {eyebrow ? (
+        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--wm-primary-700)]">{eyebrow}</span>
+      ) : null}
+      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">{title}</h2>
+      {subtitle ? (
+        <p className="mt-4 text-lg leading-relaxed text-neutral-600">{subtitle}</p>
+      ) : null}
+    </div>
+  );
+}
+
+function ValueCard({title, description}){
+  if(!title && !description){
+    return null;
+  }
+  return (
+    <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm">
+      {title ? <h4 className="text-base font-semibold text-neutral-900">{title}</h4> : null}
+      {description ? <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p> : null}
+    </div>
+  );
+}

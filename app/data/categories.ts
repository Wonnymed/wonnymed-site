export type Category = {
  slug: string;
  name: Record<string, string>;
  icon: string;
  count: number;
};

export const categories: Category[] = [
  {
    slug: "medical-devices",
    name: {
      en: "Medical Devices",
      pt: "Dispositivos Médicos",
      es: "Dispositivos Médicos",
    },
    icon: "🩺",
    count: 11,
  },
  {
    slug: "consumables",
    name: {
      en: "Consumables",
      pt: "Consumíveis",
      es: "Consumibles",
    },
    icon: "🧤",
    count: 8,
  },
  {
    slug: "aesthetic-equipment",
    name: {
      en: "Aesthetic Equipment",
      pt: "Equipamentos Estéticos",
      es: "Equipos Estéticos",
    },
    icon: "✨",
    count: 8,
  },
  {
    slug: "dental",
    name: {
      en: "Dental",
      pt: "Odontológico",
      es: "Dental",
    },
    icon: "🦷",
    count: 7,
  },
  {
    slug: "electronics",
    name: {
      en: "Electronics",
      pt: "Eletrônicos",
      es: "Electrónicos",
    },
    icon: "⚡",
    count: 6,
  },
  {
    slug: "beauty",
    name: {
      en: "Beauty",
      pt: "Beleza",
      es: "Belleza",
    },
    icon: "💆",
    count: 7,
  },
  {
    slug: "industrial",
    name: {
      en: "Industrial",
      pt: "Industrial",
      es: "Industrial",
    },
    icon: "🏭",
    count: 5,
  },
  {
    slug: "rehabilitation",
    name: {
      en: "Rehabilitation",
      pt: "Reabilitação",
      es: "Rehabilitación",
    },
    icon: "♿",
    count: 6,
  },
];

export const BUSINESS = {
  name: "The Wow Factor Unisex Salon",
  tagline: "Where Beauty Meets Confidence",
  phone: "+91 79052 93466",
  phoneRaw: "+917905293466",
  whatsappRaw: "917905293466",
  rating: "4.9",
  reviews: "1.4K+",
  address: {
    line1: "12, Near Apollo DB City, Samar Park Colony",
    line2: "Nipania, Indore, Madhya Pradesh 452010",
  },
  hours: "Mon – Sun • 10:00 AM – 9:00 PM",
  mapEmbed:
    "https://www.google.com/maps?q=Apollo+DB+City+Nipania+Indore&output=embed",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsappRaw}?text=${encodeURIComponent(
  "Hi! I'd like to book an appointment at The Wow Factor Salon.",
)}`;

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  items: { name: string; desc: string }[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "hair",
    title: "Hair Services",
    description:
      "From precision cuts to luxurious balayage, our stylists craft hair that turns heads.",
    items: [
      { name: "Haircut", desc: "Tailored cuts for your face shape and lifestyle." },
      { name: "Hairstyling", desc: "Blowouts, curls and updos for every occasion." },
      { name: "Balayage", desc: "Hand-painted dimensional color with a soft, natural finish." },
      { name: "Hair Extensions", desc: "Premium quality extensions for length & volume." },
    ],
  },
  {
    slug: "makeup",
    title: "Makeup Services",
    description:
      "Flawless, photogenic makeup for the most important moments of your life.",
    items: [
      { name: "Bridal Makeup", desc: "Signature bridal looks designed to last all day." },
      { name: "Engagement Makeup", desc: "Romantic, radiant looks for your big yes." },
      { name: "Party Makeup", desc: "Glamorous looks for celebrations and events." },
      { name: "Airbrush Makeup", desc: "Lightweight HD finish — flawless on camera." },
    ],
  },
  {
    slug: "skin",
    title: "Skin Care",
    description:
      "Result-driven facials and skin therapy using premium professional products.",
    items: [
      { name: "Facials", desc: "Hydrating, brightening and anti-aging facials." },
      { name: "Acne Treatments", desc: "Targeted clinical treatments for clearer skin." },
      { name: "Skin Care", desc: "Custom regimens to restore your skin's glow." },
    ],
  },
  {
    slug: "nails",
    title: "Nail Services",
    description: "Pamper your hands and feet with our luxurious nail treatments.",
    items: [
      { name: "Acrylic Nails", desc: "Beautifully sculpted nails in any length & shape." },
      { name: "Manicure", desc: "Classic & spa manicures for healthy nails." },
      { name: "Pedicure", desc: "Detoxifying spa pedicures with relaxing massage." },
    ],
  },
  {
    slug: "spa",
    title: "Spa & Wellness",
    description: "Unwind and recharge with our signature spa rituals.",
    items: [
      { name: "Spa", desc: "Holistic spa rituals for deep relaxation." },
      { name: "Massage", desc: "Therapeutic massage to release tension." },
    ],
  },
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) =>
  c.items.map((i) => i.name),
);

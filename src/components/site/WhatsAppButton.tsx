import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/salon";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] transition-transform hover:scale-110 animate-float"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

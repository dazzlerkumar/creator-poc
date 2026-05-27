import Image from "next/image";
import { Loader2 } from "lucide-react";
import { OverlayCardWrapper } from "./overlay-card-wrapper";

export function ProcessingState() {
  return (
    <OverlayCardWrapper className="bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] border-secondary p-3 px-5 justify-center items-center">
      <div className="relative w-12 aspect-[221/61]">
        <Image
          src="/logo-full.png"
          alt="Habuild"
          fill
          className="object-contain"
        />
      </div>
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-transparent">
        <Loader2 size={28} className="text-primary animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-bold text-sm text-foreground">Processing Payment</p>
        <p className="text-xs text-muted-foreground">
          Complete the payment in the Razorpay window
        </p>
      </div>
    </OverlayCardWrapper>
  );
}

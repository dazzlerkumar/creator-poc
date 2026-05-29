import { CheckCircle2, X } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { OverlayCardWrapper } from "./overlay-card-wrapper";
import { useState, useEffect } from "react";

export const PaymentSuccessCard = () => {
  const { setShowPayment } = useUIStore();
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClose(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <OverlayCardWrapper className="bg-accent-foreground border-accent p-5 py-6 justify-between">
      {showClose && (
        <button
          onClick={() => setShowPayment(false)}
          className="absolute top-4 right-5 transition-opacity"
        >
          <X className="w-6 h-6 text-red-400" />
        </button>
      )}
      <div className="mb-6 mt-2">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-7 h-7 text-accent-foreground fill-accent" />
          <h3 className="text-foreground text-base font-bold leading-tight">
            Subscription Active
          </h3>
        </div>
        <p className="text-grey-2 text-sm font-medium leading-[1.5]">
          Welcome to the community! Your daily wellness journey begins now.
        </p>
      </div>
    </OverlayCardWrapper>
  );
};

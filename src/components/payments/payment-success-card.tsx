import { CheckCircle2 } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { OverlayCardWrapper } from "./overlay-card-wrapper";
import { Button } from "../ui/button";

export const PaymentSuccessCard = () => {
  const { setShowPayment } = useUIStore();
  return (
    <OverlayCardWrapper className="bg-accent-foreground border-accent p-5 py-6 justify-between">
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
      <div className="flex flex-col gap-2">

        <Button
          onClick={() => setShowPayment(false)}
          variant="default"
          className="h-12 bg-accent text-white rounded-4xl"
        >
          Hide
        </Button>
      </div>
    </OverlayCardWrapper>
  );
};

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OverlayCardWrapper } from "./overlay-card-wrapper";

export const PaymentFailCard = ({ ctaFunction }: { ctaFunction: () => void }) => {
  return (
    <OverlayCardWrapper className="bg-destructive-foreground/40 border-destructive p-5 py-6 justify-between">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-7 h-7 text-destructive-foreground fill-destructive" />
          <h3 className="text-foreground text-base font-bold leading-tight">
            Payment Failed
          </h3>
        </div>
        <p className="text-grey-2 text-sm font-medium leading-[1.5]">
          Something went wrong with your transaction. Please check your payment details and try again.
        </p>
      </div>
      <Button
        onClick={ctaFunction}
        variant={"default"}
        className="h-12 bg-destructive text-white rounded-4xl"
      >
        Retry Payment
      </Button>
    </OverlayCardWrapper>
  );
};

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";
import { OverlayCardWrapper } from "./overlay-card-wrapper";
import { HABUILD_WEBSITE_URL } from "@/lib/constants";

export const PaymentSuccessCard = () => {
  const { setShowPayment } = useUIStore();
  const handleViewBenefits = () => {
    window.open(HABUILD_WEBSITE_URL, "_blank", "noopener noreferrer");
  };

  return (
    <OverlayCardWrapper className="bg-accent-foreground border-accent p-5 py-6 justify-between">
      <div className="mb-6">
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
          onClick={handleViewBenefits}
          variant={"default"}
          className="h-12 bg-accent text-white rounded-4xl"
        >
          View Benefits
        </Button>
        <Button
          onClick={() => setShowPayment(false)}
          variant={"outline"}
          className="h-12 bg-transparent border border-accent/20 text-accent hover:bg-accent/10 rounded-4xl"
        >
          Hide
        </Button>
      </div>
    </OverlayCardWrapper>
  );
};

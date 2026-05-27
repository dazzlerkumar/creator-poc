import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/constants";
import { OverlayCardWrapper } from "./overlay-card-wrapper";
import { PlanRowCard } from "./plan-row-card";

export const PaymentIdleCard = ({
  handlePay,
}: {
  handlePay: (amount: number, currency: string) => void;
}) => {
  const [selectedId, setSelectedId] = useState(PLANS[0]?.id);
  const [expanded, setExpanded] = useState(false);

  const selectedPlan = PLANS.find((p) => p.id === selectedId) || PLANS[0];
  const otherPlans = PLANS.filter((p) => p.id !== selectedId);

  return (
    <OverlayCardWrapper className="bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] border-secondary p-3 px-5 justify-between">
      <div className="flex justify-between items-start flex-1 gap-2 relative z-10">
        <div className="flex flex-col">
          <div className="relative w-14 aspect-[221/61] mb-6">
            <Image
              src="/logo-full.png"
              alt="Habuild"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-foreground text-sm md:text-base font-bold leading-tight mb-4">
            Habuild Yoga Subscription
          </h3>
          <p className="text-muted-foreground text-xs leading-[1.5]">
            Join our global community and transform your life with daily yoga
            sessions.
          </p>
        </div>
        <div className="w-28 md:w-30 shrink-0 flex flex-col items-center">
          <Image
            src="/saurabh-payment.png"
            alt="Saurabh Bothra"
            className="w-full object-contain mb-2"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Selected plan row */}
      <PlanRowCard plan={selectedPlan} />

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-primary w-full py-1"
      >
        {expanded ? (
          <>Hide other plans <ChevronUp size={14} /></>
        ) : (
          <>View other plans <ChevronDown size={14} /></>
        )}
      </button>

      {/* Other plans */}
      {expanded && (
        <div className="flex flex-col">
          {otherPlans.map((plan) => (
            <PlanRowCard
              key={plan.id}
              plan={plan}
              onClick={() => {
                setSelectedId(plan.id);
                setExpanded(false);
              }}
            />
          ))}
        </div>
      )}

      <Button
        onClick={() => handlePay(selectedPlan?.amount || 0, selectedPlan?.currency || "INR")}
        variant={"brand"}
        className="mt-4 h-12"
      >
        Pay Now
      </Button>
    </OverlayCardWrapper>
  );
};

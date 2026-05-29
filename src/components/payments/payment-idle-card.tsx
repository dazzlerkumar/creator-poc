"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OverlayCardWrapper } from "./overlay-card-wrapper";
import { PlanRowCard } from "./plan-row-card";
import HabuildLogo from "../ui/habuild-logo";
import type { ApiPlan } from "@/types/payment";
import { DEFAULT_REGION_CODE } from "@/lib/constants";

interface PaymentIdleCardProps {
  plans: ApiPlan[];
  isLoading: boolean;
  regionCode?: string;
  handlePay: (planId: number, amount: number, currency: string) => void;
}

function PlanSkeleton(): React.ReactElement {
  return (
    <div className="mt-4 rounded-lg p-px animate-pulse" style={{ background: "linear-gradient(90.33deg, var(--secondary) 0.29%, var(--primary) 99.89%)" }}>
      <div className="rounded-[8px] bg-white/80 px-4 py-3 flex items-center justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function PaymentIdleCard({
  plans,
  isLoading,
  regionCode = DEFAULT_REGION_CODE,
  handlePay,
}: PaymentIdleCardProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const defaultPlan = plans.find((p) => p.rank === 1) ?? plans[0];
  const effectiveSelectedId = selectedId ?? defaultPlan?.id ?? null;

  const selectedPlan = plans.find((p) => p.id === effectiveSelectedId);
  const otherPlans = plans.filter((p) => p.id !== effectiveSelectedId);

  const handlePayClick = (): void => {
    if (!selectedPlan) return;
    const region = selectedPlan.regions[regionCode] ?? Object.values(selectedPlan.regions)[0];
    if (!region) return;
    handlePay(selectedPlan.id, region.amount, region.currency);
  };
  return (
    <OverlayCardWrapper className="bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] border-secondary p-3 px-5 justify-between">
      <div className="flex justify-between items-start flex-1 gap-2 relative z-10">
        <div className="flex flex-col">
          <HabuildLogo />
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

      {isLoading ? (
        <>
          <PlanSkeleton />
          <PlanSkeleton />
        </>
      ) : (
        <>
          {selectedPlan && (
            <PlanRowCard plan={selectedPlan} regionCode={regionCode} />
          )}

          {otherPlans.length > 0 && (
            <>
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

              {expanded && (
                <div className="flex flex-col">
                  {otherPlans.map((plan) => (
                    <PlanRowCard
                      key={plan.id}
                      plan={plan}
                      regionCode={regionCode}
                      onClick={() => {
                        setSelectedId(plan.id);
                        setExpanded(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <Button
            onClick={handlePayClick}
            variant={"brand"}
            className="mt-4 h-12"
            disabled={!selectedPlan}
          >
            Pay Now
          </Button>
        </>
      )}
    </OverlayCardWrapper>
  );
}

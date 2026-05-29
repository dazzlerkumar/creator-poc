"use client";

import type { ApiPlan } from "@/types/payment";
import { DEFAULT_REGION_CODE } from "@/lib/constants";
import { formatAmount, calculateDiscountPercentage } from "@/utils/payment-utils";


export function PlanRowCard({
  plan,
  regionCode = DEFAULT_REGION_CODE,
  onClick,
}: {
  plan: ApiPlan;
  regionCode?: string;
  onClick?: () => void;
}): React.ReactElement {
  const region = plan.regions[regionCode] ?? Object.values(plan.regions)[0];
  if (!region) return <></>;

  const hasDiscount = region.discounted_amount !== null && region.discounted_amount < region.amount;
  const displayAmount = region.amount / 100

  const inner = (
    <div className="rounded-[8px] bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] px-4 py-2 flex items-center justify-between">
      <span className="text-sm font-semibold text-foreground">{plan.name}</span>
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <span className="text-xs text-muted-foreground line-through">
            {formatAmount(region.discounted_amount!, region.currency)}
          </span>
        )}
        <span className="text-sm font-bold text-foreground">
          {formatAmount(region.amount, region.currency, true)}
        </span>
        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          -{calculateDiscountPercentage(region.discounted_amount, displayAmount)}%
        </span>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-1 rounded-lg p-px w-full text-left hover:opacity-80 transition-opacity"
        style={{ background: "linear-gradient(90.33deg, var(--secondary) 0.29%, var(--primary) 99.89%)" }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      className="mt-4 rounded-lg p-px"
      style={{ background: "linear-gradient(90.33deg, var(--secondary) 0.29%, var(--primary) 99.89%)" }}
    >
      {inner}
    </div>
  );
}

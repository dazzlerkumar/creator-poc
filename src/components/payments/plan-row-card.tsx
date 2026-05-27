import { Plan } from "@/types/payment";

export const PlanRowCard = ({
  plan,
  onClick,
}: {
  plan: Plan | undefined;
  onClick?: () => void;
}) => {
  const inner = (
    <div className="rounded-[8px] bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] px-4 py-2 flex items-center justify-between">
      <span className="text-sm font-semibold text-foreground">{plan?.label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-foreground">{plan?.display}</span>
        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {plan?.badge}
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
};

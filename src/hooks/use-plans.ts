"use client";

import { useQuery } from "@tanstack/react-query";
import { listPlans } from "@/api/payments";
import type { ApiPlan, ParsedPlansResponse } from "@/types/payment";

const PLANS_QUERY_KEY = "plans";
const PLANS_STALE_TIME_MS = 5 * 60 * 1000;

interface UsePlansOptions {
  phoneNumber?: string;
  enabled?: boolean;
}

interface UsePlansReturn {
  plans: ApiPlan[];
  country: string;
  isInternational: boolean;
  isLoading: boolean;
  error: Error | null;
}

export function usePlans(options: UsePlansOptions = {}): UsePlansReturn {
  const { phoneNumber, enabled = true } = options;

  const { data, isLoading, error } = useQuery<ParsedPlansResponse, Error>({
    queryKey: [PLANS_QUERY_KEY, phoneNumber],
    queryFn: () => listPlans(phoneNumber),
    staleTime: PLANS_STALE_TIME_MS,
    enabled,
  });
  return {
    plans: data?.plans ?? [],
    country: data?.country ?? "IND",
    isInternational: data?.isInternational ?? false,
    isLoading,
    error: error ?? null,
  };
}

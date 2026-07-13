import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Plan = Database["public"]["Tables"]["plans"]["Row"];

export function usePlans(opts: { includeInactive?: boolean } = {}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("plans").select("*").order("sort_order", { ascending: true });
    if (!opts.includeInactive) query = query.eq("active", true);
    const { data, error } = await query;
    if (error) setError(error.message);
    setPlans(data ?? []);
    setLoading(false);
  }, [opts.includeInactive]);

  useEffect(() => {
    load();
  }, [load]);

  return { plans, loading, error, refetch: load };
}

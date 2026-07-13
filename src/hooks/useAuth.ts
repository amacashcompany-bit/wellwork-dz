import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AppRole = "super_admin" | "hr_admin" | "manager" | "employee";

export interface MySpaceInfo {
  spaceId: string | null;
  spaceName: string | null;
  spaceSlug: string | null;
  roles: AppRole[];
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.assign("/");
  }, []);

  return { user, loading, signOut };
}

export function useMySpace(): { info: MySpaceInfo | null; loading: boolean; refetch: () => void } {
  const [info, setInfo] = useState<MySpaceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes.user?.id;
      if (!uid) { if (mounted) { setInfo(null); setLoading(false); } return; }

      const { data: profile } = await supabase.from("profiles").select("current_space_id").eq("id", uid).maybeSingle();
      let spaceId = profile?.current_space_id ?? null;

      // If no current space, pick first membership
      if (!spaceId) {
        const { data: mem } = await supabase.from("space_members").select("space_id").eq("user_id", uid).limit(1);
        spaceId = mem?.[0]?.space_id ?? null;
        if (spaceId) await supabase.from("profiles").upsert({ id: uid, current_space_id: spaceId });
      }

      if (!spaceId) { if (mounted) { setInfo({ spaceId: null, spaceName: null, spaceSlug: null, roles: [] }); setLoading(false); } return; }

      const [{ data: space }, { data: roleRows }] = await Promise.all([
        supabase.from("spaces").select("id, name, slug").eq("id", spaceId).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", uid).eq("space_id", spaceId),
      ]);

      if (!mounted) return;
      setInfo({
        spaceId: space?.id ?? null,
        spaceName: space?.name ?? null,
        spaceSlug: space?.slug ?? null,
        roles: (roleRows ?? []).map((r) => r.role as AppRole),
      });
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [tick]);

  return { info, loading, refetch: () => setTick((t) => t + 1) };
}

export function hasRole(roles: AppRole[], want: AppRole | AppRole[]): boolean {
  const arr = Array.isArray(want) ? want : [want];
  return roles.some((r) => arr.includes(r));
}

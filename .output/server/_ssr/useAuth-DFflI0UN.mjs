import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-bssJDK4U.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-DFflI0UN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function isAppRole(role) {
	return typeof role === "string" && [
		"super_admin",
		"hr_admin",
		"manager",
		"employee"
	].includes(role);
}
function parseMySpace(data) {
	if (!data || typeof data !== "object" || Array.isArray(data)) return null;
	const value = data;
	return {
		spaceId: typeof value.spaceId === "string" ? value.spaceId : null,
		spaceName: typeof value.spaceName === "string" ? value.spaceName : null,
		spaceSlug: typeof value.spaceSlug === "string" ? value.spaceSlug : null,
		roles: Array.isArray(value.roles) ? value.roles.filter(isAppRole) : []
	};
}
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getUser().then(({ data }) => {
			if (!mounted) return;
			setUser(data.user);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
			setUser(session?.user ?? null);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		user,
		loading,
		signOut: (0, import_react.useCallback)(async () => {
			await supabase.auth.signOut();
			window.location.assign("/auth");
		}, [])
	};
}
function useMySpace() {
	const [info, setInfo] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			const { data: userRes } = await supabase.auth.getUser();
			const uid = userRes.user?.id;
			if (!uid) {
				if (mounted) {
					setInfo(null);
					setLoading(false);
				}
				return;
			}
			const { data: context, error: contextError } = await supabase.rpc.bind(supabase)("get_my_space");
			const parsedContext = parseMySpace(context);
			if (!contextError && parsedContext) {
				if (mounted) {
					setInfo(parsedContext);
					setLoading(false);
				}
				return;
			}
			const { data: profile } = await supabase.from("profiles").select("current_space_id").eq("id", uid).maybeSingle();
			let spaceId = profile?.current_space_id ?? null;
			if (!spaceId) {
				const { data: mem } = await supabase.from("space_members").select("space_id").eq("user_id", uid).limit(1);
				spaceId = mem?.[0]?.space_id ?? null;
				if (spaceId) await supabase.from("profiles").upsert({
					id: uid,
					current_space_id: spaceId
				});
			}
			if (!spaceId) {
				const { data: owned } = await supabase.from("spaces").select("id").eq("owner_id", uid).limit(1);
				spaceId = owned?.[0]?.id ?? null;
				if (spaceId) await Promise.all([supabase.from("space_members").upsert({
					space_id: spaceId,
					user_id: uid
				}), supabase.from("profiles").upsert({
					id: uid,
					current_space_id: spaceId
				})]);
			}
			if (!spaceId) {
				const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", uid).is("space_id", null);
				if (!mounted) return;
				setInfo({
					spaceId: null,
					spaceName: null,
					spaceSlug: null,
					roles: (roleRows ?? []).map((r) => r.role)
				});
				setLoading(false);
				return;
			}
			const [{ data: space }, { data: roleRows }] = await Promise.all([supabase.from("spaces").select("id, name, slug").eq("id", spaceId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", uid).or(`space_id.eq.${spaceId},space_id.is.null`)]);
			if (!mounted) return;
			setInfo({
				spaceId: space?.id ?? null,
				spaceName: space?.name ?? null,
				spaceSlug: space?.slug ?? null,
				roles: (roleRows ?? []).map((r) => r.role)
			});
			setLoading(false);
		})();
		return () => {
			mounted = false;
		};
	}, [tick]);
	return {
		info,
		loading,
		refetch: () => setTick((t) => t + 1)
	};
}
function hasRole(roles, want) {
	const arr = Array.isArray(want) ? want : [want];
	return roles.some((r) => arr.includes(r));
}
function useManagerPermissions(spaceId, enabled) {
	const [permissions, setPermissions] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(enabled);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		if (!enabled || !spaceId) {
			setPermissions(/* @__PURE__ */ new Set());
			setLoading(false);
			return () => {
				mounted = false;
			};
		}
		setLoading(true);
		(async () => {
			try {
				const { data } = await supabase.from("manager_permissions").select("module").eq("space_id", spaceId);
				if (!mounted) return;
				setPermissions(new Set((data ?? []).map((permission) => permission.module)));
				setLoading(false);
			} catch {
				if (!mounted) return;
				setPermissions(/* @__PURE__ */ new Set());
				setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [enabled, spaceId]);
	return {
		permissions,
		loading
	};
}
//#endregion
export { useMySpace as i, useAuth as n, useManagerPermissions as r, hasRole as t };

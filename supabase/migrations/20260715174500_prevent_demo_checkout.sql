-- Free demos remain gated by the existing superadmin approval workflow.
CREATE OR REPLACE FUNCTION public.prevent_demo_payment_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.plans WHERE id = NEW.plan_id AND is_demo = true) THEN
    RAISE EXCEPTION 'La démo gratuite utilise le processus de demande et approbation.';
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_prevent_demo_payment_order ON public.payment_orders;
CREATE TRIGGER trg_prevent_demo_payment_order
BEFORE INSERT ON public.payment_orders
FOR EACH ROW EXECUTE FUNCTION public.prevent_demo_payment_order();

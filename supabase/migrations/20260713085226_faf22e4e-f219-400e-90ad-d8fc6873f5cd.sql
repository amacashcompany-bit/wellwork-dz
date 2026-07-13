
-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enums
CREATE TYPE public.app_role AS ENUM ('super_admin', 'hr_admin', 'manager', 'employee');
CREATE TYPE public.survey_methodology AS ENUM ('karasek', 'copsoq', 'custom');
CREATE TYPE public.survey_status AS ENUM ('draft', 'open', 'closed');
CREATE TYPE public.question_type AS ENUM ('likert5', 'mcq', 'text');
CREATE TYPE public.ticket_status AS ENUM ('open', 'under_review', 'resolved', 'closed');
CREATE TYPE public.ticket_category AS ENUM ('harassment', 'workload', 'management', 'safety', 'suggestion', 'other');
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.alert_status AS ENUM ('open', 'acknowledged', 'resolved');
CREATE TYPE public.action_status AS ENUM ('todo', 'in_progress', 'done', 'blocked');
CREATE TYPE public.employee_status AS ENUM ('active', 'on_leave', 'inactive');

-- =========================================
-- SPACES (tenants)
-- =========================================
CREATE TABLE public.spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  space_key uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  email_domain text,
  subscription_status text NOT NULL DEFAULT 'active',
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spaces TO authenticated;
GRANT ALL ON public.spaces TO service_role;

CREATE TABLE public.space_members (
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (space_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.space_members TO authenticated;
GRANT ALL ON public.space_members TO service_role;

-- =========================================
-- PROFILES
-- =========================================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  locale text NOT NULL DEFAULT 'fr',
  current_space_id uuid REFERENCES public.spaces(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- =========================================
-- USER ROLES (per-space)
-- =========================================
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  space_id uuid REFERENCES public.spaces(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, space_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- =========================================
-- SECURITY DEFINER helpers
-- =========================================
CREATE OR REPLACE FUNCTION public.is_space_member(_user_id uuid, _space_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.space_members WHERE user_id = _user_id AND space_id = _space_id);
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _space_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
      AND (space_id = _space_id OR (_role = 'super_admin' AND space_id IS NULL))
  );
$$;

CREATE OR REPLACE FUNCTION public.current_space_id()
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT current_space_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;

-- =========================================
-- RLS: spaces + members + profiles + roles
-- =========================================
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members can view their spaces" ON public.spaces FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), id) OR owner_id = auth.uid());
CREATE POLICY "authenticated can create spaces" ON public.spaces FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());
CREATE POLICY "hr_admin can update their space" ON public.spaces FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), id, 'hr_admin') OR owner_id = auth.uid());

ALTER TABLE public.space_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user sees own membership rows" ON public.space_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "user can join a space (self)" ON public.space_members FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "hr_admin manages members" ON public.space_members FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'));

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own profile" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid());
CREATE POLICY "user upserts own profile" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());
CREATE POLICY "user updates own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user sees own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), space_id, 'hr_admin'));

-- Profile auto-create on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
          NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_spaces_updated BEFORE UPDATE ON public.spaces FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================
-- DEPARTMENTS + EMPLOYEES
-- =========================================
CREATE TABLE public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_ar text,
  manager_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  headcount int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.departments TO authenticated;
GRANT ALL ON public.departments TO service_role;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space members read departments" ON public.departments FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes departments" ON public.departments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE TRIGGER trg_dep_updated BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  position text,
  hire_date date,
  status public.employee_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (space_id, email)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.employees TO authenticated;
GRANT ALL ON public.employees TO service_role;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space members read employees" ON public.employees FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes employees" ON public.employees FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE TRIGGER trg_emp_updated BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================
-- SURVEYS
-- =========================================
CREATE TABLE public.surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  title_ar text,
  description text,
  methodology public.survey_methodology NOT NULL DEFAULT 'karasek',
  status public.survey_status NOT NULL DEFAULT 'draft',
  opens_at timestamptz,
  closes_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.surveys TO authenticated;
GRANT ALL ON public.surveys TO service_role;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space members read surveys" ON public.surveys FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes surveys" ON public.surveys FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE TRIGGER trg_surv_updated BEFORE UPDATE ON public.surveys FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.survey_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  ord int NOT NULL DEFAULT 0,
  qtype public.question_type NOT NULL DEFAULT 'likert5',
  prompt text NOT NULL,
  prompt_ar text,
  factor text,
  options jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.survey_questions TO authenticated;
GRANT ALL ON public.survey_questions TO service_role;
ALTER TABLE public.survey_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads questions" ON public.survey_questions FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes questions" ON public.survey_questions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

-- Participation: user↔survey flag ONLY. No response payload here.
CREATE TABLE public.survey_participation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (survey_id, user_id)
);
GRANT SELECT, INSERT ON public.survey_participation TO authenticated;
GRANT ALL ON public.survey_participation TO service_role;
ALTER TABLE public.survey_participation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own participation" ON public.survey_participation FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "user inserts own participation" ON public.survey_participation FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Responses: NO user_id. Day bucket only.
CREATE TABLE public.survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  question_id uuid NOT NULL REFERENCES public.survey_questions(id) ON DELETE CASCADE,
  submission_batch uuid NOT NULL,
  factor text,
  value_num numeric,
  value_text text,
  submitted_at_bucket date NOT NULL DEFAULT current_date
);
GRANT SELECT, INSERT ON public.survey_responses TO authenticated;
GRANT ALL ON public.survey_responses TO service_role;
CREATE INDEX idx_responses_space_survey ON public.survey_responses(space_id, survey_id);
CREATE INDEX idx_responses_dept ON public.survey_responses(department_id);
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
-- Only HR admin can read aggregate rows directly; anonymity aggregation via server fns
CREATE POLICY "hr_admin reads responses" ON public.survey_responses FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "space members insert responses" ON public.survey_responses FOR INSERT TO authenticated
  WITH CHECK (public.is_space_member(auth.uid(), space_id));

-- =========================================
-- FEEDBACK TICKETS (anonymous whistleblowing)
-- =========================================
CREATE TABLE public.feedback_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  category public.ticket_category NOT NULL DEFAULT 'other',
  department_hint text,
  encrypted_subject text NOT NULL,
  encrypted_content text NOT NULL,
  ticket_key_hash text NOT NULL UNIQUE,
  status public.ticket_status NOT NULL DEFAULT 'open',
  created_at_bucket date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.feedback_tickets TO authenticated;
GRANT ALL ON public.feedback_tickets TO service_role;
ALTER TABLE public.feedback_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hr_admin reads tickets" ON public.feedback_tickets FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "hr_admin updates tickets" ON public.feedback_tickets FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "space members insert tickets" ON public.feedback_tickets FOR INSERT TO authenticated
  WITH CHECK (public.is_space_member(auth.uid(), space_id));
CREATE TRIGGER trg_ticket_updated BEFORE UPDATE ON public.feedback_tickets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.feedback_tickets(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  author_role text NOT NULL CHECK (author_role IN ('reporter','hr')),
  encrypted_content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hr_admin reads messages" ON public.ticket_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "hr_admin inserts hr messages" ON public.ticket_messages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin') AND author_role = 'hr');

-- =========================================
-- ALERTS + ACTION PLANS
-- =========================================
CREATE TABLE public.alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  severity public.alert_severity NOT NULL DEFAULT 'medium',
  status public.alert_status NOT NULL DEFAULT 'open',
  metric text,
  threshold numeric,
  observed numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.alerts TO authenticated;
GRANT ALL ON public.alerts TO service_role;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads alerts" ON public.alerts FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes alerts" ON public.alerts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE TRIGGER trg_alerts_upd BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.action_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  linked_alert_id uuid REFERENCES public.alerts(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  priority text NOT NULL DEFAULT 'medium',
  status public.action_status NOT NULL DEFAULT 'todo',
  owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  deadline date,
  progress int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.action_plans TO authenticated;
GRANT ALL ON public.action_plans TO service_role;
ALTER TABLE public.action_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads plans" ON public.action_plans FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes plans" ON public.action_plans FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE TRIGGER trg_plans_upd BEFORE UPDATE ON public.action_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.action_plan_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES public.action_plans(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  assignee_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  done boolean NOT NULL DEFAULT false,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.action_plan_tasks TO authenticated;
GRANT ALL ON public.action_plan_tasks TO service_role;
ALTER TABLE public.action_plan_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads tasks" ON public.action_plan_tasks FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes tasks" ON public.action_plan_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

-- =========================================
-- LIBRARY + EVENTS + MESSAGES + ERP
-- =========================================
CREATE TABLE public.library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  content_md text,
  video_url text,
  cover_url text,
  duration_minutes int,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.library_items TO authenticated;
GRANT ALL ON public.library_items TO service_role;
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads library" ON public.library_items FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes library" ON public.library_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  location text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  capacity int NOT NULL DEFAULT 30,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads events" ON public.events FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes events" ON public.events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

CREATE TABLE public.event_registrations (
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  registered_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user sees own regs" ON public.event_registrations FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), space_id, 'hr_admin'));
CREATE POLICY "user registers self" ON public.event_registrations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_space_member(auth.uid(), space_id));
CREATE POLICY "user cancels own reg" ON public.event_registrations FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  sender_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  audience text NOT NULL DEFAULT 'all',
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads messages" ON public.messages FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin sends messages" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin') AND sender_user_id = auth.uid());

CREATE TABLE public.message_reads (
  message_id uuid NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);
GRANT SELECT, INSERT ON public.message_reads TO authenticated;
GRANT ALL ON public.message_reads TO service_role;
ALTER TABLE public.message_reads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own read state" ON public.message_reads FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "user marks own read" ON public.message_reads FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE TABLE public.erp_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  month date NOT NULL,
  absenteeism_rate numeric,
  turnover_rate numeric,
  avg_tenure_months numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (space_id, department_id, month)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.erp_metrics TO authenticated;
GRANT ALL ON public.erp_metrics TO service_role;
ALTER TABLE public.erp_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads erp" ON public.erp_metrics FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes erp" ON public.erp_metrics FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

-- KPI snapshots (aggregated per space/department/month)
CREATE TABLE public.space_kpi_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  department_id uuid REFERENCES public.departments(id) ON DELETE SET NULL,
  month date NOT NULL,
  satisfaction numeric,
  stress numeric,
  participation numeric,
  burnout_risk numeric,
  response_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (space_id, department_id, month)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.space_kpi_snapshots TO authenticated;
GRANT ALL ON public.space_kpi_snapshots TO service_role;
ALTER TABLE public.space_kpi_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "space reads kpi" ON public.space_kpi_snapshots FOR SELECT TO authenticated
  USING (public.is_space_member(auth.uid(), space_id));
CREATE POLICY "hr_admin writes kpi" ON public.space_kpi_snapshots FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), space_id, 'hr_admin'))
  WITH CHECK (public.has_role(auth.uid(), space_id, 'hr_admin'));

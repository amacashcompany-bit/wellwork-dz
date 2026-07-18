-- The blind vault stores survey participation under a cryptographic pseudonym,
-- not auth.users.id. Keep duplicate prevention private and compatible with the
-- current survey_participation schema.

CREATE OR REPLACE FUNCTION public.submit_weekly_wellbeing_pulse(
  _space_id uuid,
  _answers jsonb
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _pseudonym_id text;
  _week_start date := date_trunc('week', current_date)::date;
  _survey_id uuid;
  _department_id uuid;
  _batch uuid := gen_random_uuid();
  _question record;
  _value_text text;
  _value_num numeric;
  _reference text := 'PULSE-' || upper(substr(replace(_batch::text, '-', ''), 1, 8));
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT public.is_space_member(_user_id, _space_id) THEN
    RAISE EXCEPTION 'You are not a member of this company space';
  END IF;

  IF jsonb_typeof(_answers) <> 'object' THEN
    RAISE EXCEPTION 'Invalid answers';
  END IF;

  _pseudonym_id := public.get_or_create_pseudonym(_user_id, _space_id);

  PERFORM pg_advisory_xact_lock(hashtextextended(_space_id::text || _week_start::text, 0));

  SELECT id
  INTO _survey_id
  FROM public.surveys
  WHERE space_id = _space_id
    AND title = 'WellWork Weekly Pulse ' || _week_start::text
  LIMIT 1;

  IF _survey_id IS NULL THEN
    INSERT INTO public.surveys (
      space_id,
      title,
      title_ar,
      description,
      methodology,
      status,
      opens_at,
      closes_at
    )
    VALUES (
      _space_id,
      'WellWork Weekly Pulse ' || _week_start::text,
      'WellWork Weekly Pulse ' || _week_start::text,
      'Anonymous weekly team wellbeing pulse used for preventive aggregate analysis.',
      'custom',
      'open',
      _week_start::timestamptz,
      (_week_start + 7)::timestamptz
    )
    RETURNING id INTO _survey_id;

    INSERT INTO public.survey_questions (
      survey_id, space_id, ord, qtype, prompt, prompt_ar, factor
    )
    VALUES
      (_survey_id, _space_id, 1, 'likert5', 'How do you feel today?', 'How do you feel today?', 'mood'),
      (_survey_id, _space_id, 2, 'likert5', 'Your energy this week', 'Your energy this week', 'energy'),
      (_survey_id, _space_id, 3, 'likert5', 'My workload is reasonable', 'My workload is reasonable', 'manageable_workload'),
      (_survey_id, _space_id, 4, 'likert5', 'I can organize my work', 'I can organize my work', 'autonomy'),
      (_survey_id, _space_id, 5, 'likert5', 'I complete tasks on time', 'I complete tasks on time', 'manageable_workload'),
      (_survey_id, _space_id, 6, 'likert5', 'My manager supports me', 'My manager supports me', 'support'),
      (_survey_id, _space_id, 7, 'likert5', 'My work is recognized', 'My work is recognized', 'recognition'),
      (_survey_id, _space_id, 8, 'likert5', 'Internal communication is clear', 'Internal communication is clear', 'communication'),
      (_survey_id, _space_id, 9, 'likert5', 'My workstation is comfortable', 'My workstation is comfortable', 'environment'),
      (_survey_id, _space_id, 10, 'likert5', 'I can disconnect outside work', 'I can disconnect outside work', 'balance'),
      (_survey_id, _space_id, 11, 'text', 'Optional comment', 'Optional comment', 'comment');
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.survey_participation
    WHERE survey_id = _survey_id
      AND pseudonym_id = _pseudonym_id
  ) THEN
    RAISE EXCEPTION 'You have already completed this weekly pulse';
  END IF;

  SELECT department_id
  INTO _department_id
  FROM public.employees
  WHERE space_id = _space_id
    AND user_id = _user_id
    AND status = 'active'
  LIMIT 1;

  FOR _question IN
    SELECT id, ord, qtype, factor
    FROM public.survey_questions
    WHERE survey_id = _survey_id
    ORDER BY ord
  LOOP
    _value_text := _answers ->> ('q' || _question.ord::text);
    IF _value_text IS NULL OR btrim(_value_text) = '' THEN
      CONTINUE;
    END IF;

    IF _question.qtype = 'text' THEN
      INSERT INTO public.survey_responses (
        survey_id, space_id, department_id, question_id, submission_batch,
        factor, value_text, submitted_at_bucket
      )
      VALUES (
        _survey_id, _space_id, _department_id, _question.id, _batch,
        _question.factor, left(_value_text, 500), current_date
      );
    ELSE
      BEGIN
        _value_num := _value_text::numeric;
      EXCEPTION WHEN invalid_text_representation THEN
        RAISE EXCEPTION 'Invalid numeric answer';
      END;

      IF _value_num < 1 OR _value_num > 5 THEN
        RAISE EXCEPTION 'Answers must be between 1 and 5';
      END IF;

      INSERT INTO public.survey_responses (
        survey_id, space_id, department_id, question_id, submission_batch,
        factor, value_num, submitted_at_bucket
      )
      VALUES (
        _survey_id, _space_id, _department_id, _question.id, _batch,
        _question.factor, _value_num, current_date
      );
    END IF;
  END LOOP;

  INSERT INTO public.survey_participation (survey_id, pseudonym_id)
  VALUES (_survey_id, _pseudonym_id);

  RETURN _reference;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_weekly_wellbeing_pulse(uuid, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_weekly_wellbeing_pulse(uuid, jsonb) TO authenticated;

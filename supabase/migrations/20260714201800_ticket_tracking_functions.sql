-- Get ticket details securely using its key hash, enforcing space membership
CREATE OR REPLACE FUNCTION public.get_ticket_by_hash(p_hash text)
RETURNS SETOF public.feedback_tickets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_space_id uuid;
BEGIN
  -- Get the space_id of the ticket
  SELECT space_id INTO v_space_id 
  FROM public.feedback_tickets 
  WHERE ticket_key_hash = p_hash;

  IF v_space_id IS NULL THEN
    RETURN;
  END IF;

  -- Ensure the calling user belongs to this space
  IF NOT public.is_space_member(auth.uid(), v_space_id) THEN
    RAISE EXCEPTION 'Access Denied: You do not belong to this space.';
  END IF;

  RETURN QUERY
  SELECT * FROM public.feedback_tickets WHERE ticket_key_hash = p_hash;
END;
$$;

-- Get ticket messages thread securely using the key hash, enforcing space membership
CREATE OR REPLACE FUNCTION public.get_ticket_messages(p_ticket_id uuid, p_hash text)
RETURNS SETOF public.ticket_messages
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_space_id uuid;
BEGIN
  -- Verify ticket exists and matches the hash
  SELECT space_id INTO v_space_id 
  FROM public.feedback_tickets 
  WHERE id = p_ticket_id AND ticket_key_hash = p_hash;

  IF v_space_id IS NULL THEN
    RETURN;
  END IF;

  -- Ensure the calling user belongs to this space
  IF NOT public.is_space_member(auth.uid(), v_space_id) THEN
    RAISE EXCEPTION 'Access Denied: You do not belong to this space.';
  END IF;

  RETURN QUERY
  SELECT * FROM public.ticket_messages 
  WHERE ticket_id = p_ticket_id 
  ORDER BY created_at ASC;
END;
$$;

-- Reply to a ticket anonymously from the employee side, verifying the tracking key hash
CREATE OR REPLACE FUNCTION public.reply_to_ticket_anonymously(
  p_ticket_id uuid,
  p_hash text,
  p_encrypted_content text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_space_id uuid;
BEGIN
  -- Verify ticket exists and matches the hash
  SELECT space_id INTO v_space_id 
  FROM public.feedback_tickets 
  WHERE id = p_ticket_id AND ticket_key_hash = p_hash;

  IF v_space_id IS NULL THEN
    RAISE EXCEPTION 'Ticket not found or invalid key hash.';
  END IF;

  -- Ensure the calling user belongs to this space
  IF NOT public.is_space_member(auth.uid(), v_space_id) THEN
    RAISE EXCEPTION 'Access Denied: You do not belong to this space.';
  END IF;

  -- Insert the message thread response from employee/reporter
  INSERT INTO public.ticket_messages (
    ticket_id,
    space_id,
    author_role,
    encrypted_content
  ) VALUES (
    p_ticket_id,
    v_space_id,
    'reporter',
    p_encrypted_content
  );
END;
$$;

-- Ensure authenticated users have execute rights on these functions
GRANT EXECUTE ON FUNCTION public.get_ticket_by_hash(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_ticket_messages(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reply_to_ticket_anonymously(uuid, text, text) TO authenticated;

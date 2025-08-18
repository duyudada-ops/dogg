-- 1) Idempotency store for Stripe webhooks
create table if not exists public.stripe_events_processed (
  id text primary key,
  processed_at timestamptz not null default now()
);

-- 3) Updated_at trigger (idempotent)
create or replace function public.update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'trg_subscribers_updated_at'
  ) then
    create trigger trg_subscribers_updated_at
    before update on public.subscribers
    for each row execute procedure public.update_updated_at_column();
  end if;
end $$;

-- 4) Tighten RLS: users can READ only their row; writes limited to service_role
alter table public.subscribers enable row level security;

-- Drop old too-open policies if they exist
do $$ begin
  if exists (select 1 from pg_policies where polname = 'update_own_subscription' and polrelid = 'public.subscribers'::regclass) then
    drop policy "update_own_subscription" on public.subscribers;
  end if;
  if exists (select 1 from pg_policies where polname = 'insert_subscription' and polrelid = 'public.subscribers'::regclass) then
    drop policy "insert_subscription" on public.subscribers;
  end if;
end $$;

-- Read-own policy
do $$ begin
  if not exists (select 1 from pg_policies where polname = 'select_own_subscription' and polrelid = 'public.subscribers'::regclass) then
    create policy "select_own_subscription" on public.subscribers
      for select using (auth.uid() = user_id);
  end if;
end $$;

-- Service role management policy
do $$ begin
  if not exists (select 1 from pg_policies where polname = 'manage_subscribers_service' and polrelid = 'public.subscribers'::regclass) then
    create policy "manage_subscribers_service" on public.subscribers
      for all using (auth.role() = 'service_role');
  end if;
end $$;

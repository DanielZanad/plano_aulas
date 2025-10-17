alter table profiles enable row level security;
create policy "Users can view their own profile" on profiles for
select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for
update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users can insert their own profile" on profiles for
insert with check (auth.uid() = id);
alter table lesson_plans enable row level security;
create policy "Users can manage their own lesson plans" on lesson_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- trigger to keep updated_at
create or replace function trigger_set_timestamp() returns trigger language plpgsql as $$ begin new.updated_at = now();
return new;
end;
$$;
create trigger trg_customers_updated_at before
update on profiles for each row execute function trigger_set_timestamp();
create trigger trg_products_updated_at before
update on lesson_plans for each row execute function trigger_set_timestamp();
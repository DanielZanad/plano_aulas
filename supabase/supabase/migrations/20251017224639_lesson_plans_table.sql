create table lesson_plans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users (id) on delete cascade,
    -- Dados fornecidos pelo usuário
    theme text not null,
    subject text not null,
    grade text,
    duration text,
    -- Dados gerados pela IA
    introduction text,
    bncc_objective text,
    activity_steps text,
    evaluation_rubric jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
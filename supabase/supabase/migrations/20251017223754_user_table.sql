create table profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text not null,
    email text unique not null,
    role text default 'teacher',
    school_name text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
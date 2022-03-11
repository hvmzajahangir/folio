-- Create a table for profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

 -- Create a table for watchlist
create table watchlist (
  id serial primary key,
  user_id uuid references auth.users not null,
  token_id text not null,
  created_at timestamp with time zone default current_timestamp,
  unique(user_id, token_id)
);

-- Create a table for portfolio trades
create table portfolio_trades (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  token_id text not null,
  execution_quantity numeric not null,
  execution_price numeric not null,
  execution_total numeric not null,
  trade_type varchar not null,
  created_at timestamp with time zone default current_timestamp
);
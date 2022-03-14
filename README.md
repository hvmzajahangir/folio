# Folio

<em>Note: this app is in active developement. If you notice any bug, issue or areas of improvement then feel free to open an issue.</em>

A web app to create and track your crypto asset portfolio. Built using Next.js with Tailwind, Redux Toolkit, Supabase (Authentication + PostgreSQL), CoinGecko API.

# Demo

The current version of the web app is deployed to Vercel. Try it yourself [here](https://folio-kappa.vercel.app).

# Instructions

You can run the app either in a dev environment using `npm run dev` or using the provided `Docker` image. Here are the steps you need to follow:

## Create the database on Supabase

Sign up to [Supabase](https://supabase.com/) and create a free database. Next, take the `supabase.sql` script under `/scripts`, paste it into the Supabase query editor and click on `Run`

## Configuration

Under settings on Supabase, note down your `Supabase Anon Key` and `Supabase API URL`. Then create a `.env.local` at the root of the `client` directory with the same environment variables as in the `.env.example` file.

```console
NEXT_PUBLIC_SUPABASE_API_ANON_KEY=REPLACE_WITH_YOUR_KEY
NEXT_PUBLIC_SUPABASE_API_URL=REPLACE_WITH_YOUR_URL
NEXT_PUBLIC_COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_FOLIO_API_BASE_URL=http://localhost:3000/api
```

## Run the Next.js app

To run the app in development mode, run `npm run dev` after installing all the node modules in `client`.

To run with Docker, make sure you have first installed Docker and have the Docker daemon running. Next, build and run the container:

```console
docker build -t nextjs-docker .
```

```console
docker run -p 3000:3000 nextjs-docker
```

Wohoo! You're done 🎉

Visit http://localhost:3000 to start playing with the app.

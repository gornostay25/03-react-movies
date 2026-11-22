# 03-react-movies

Movie search app (GoIT Homework №2) using React, TypeScript, Vite, and the [TMDB API](https://developer.themoviedb.org/).

## Setup

1. Clone the repository and install dependencies:

   ```bash
   bun install
   ```

2. Create a TMDB API key (Bearer token) and add it to `.env` in the project root:

   ```env
   VITE_TMDB_TOKEN=your_bearer_token_here
   ```

   Do not commit `.env`.

3. Start the dev server:

   ```bash
   bun run dev
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Development server |
| `bun run lint` | ESLint |
| `bun run build` | Production build |
| `bun run format` | Prettier on `src/` |
| `bun run preview` | Preview production build |

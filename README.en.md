# lilac-lab

[中文](README.md)

A dark sci-fi dashboard-style personal homepage with a cyberpunk terminal aesthetic. Displays profile, projects, blog posts, and a Galgame library.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Testing:** Vitest + Testing Library

## Pages

| Route | Description |
| --- | --- |
| `/` | Dashboard: profile console, signal metrics, activity feed, library snapshot |
| `/projects` | Project portfolio |
| `/blog` | Blog listing |
| `/library` | Galgame library with filters |
| `/library/[slug]` | Individual Galgame detail |
| `/about` | About |
| `/admin` | Content admin panel |

## Getting Started

```bash
npm install     # Install dependencies
npm run dev     # Start dev server at http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

## Content Management

Content is stored as static JSON in `content/`. Edit directly or use the admin panel at `/admin`. See [docs/content-guide.md](docs/content-guide.md).

## Project Structure

```
src/
  app/          # App Router pages & API routes
  components/   # React components (home, library, site, admin)
  data/         # JSON data access layer
  lib/          # Business logic, types, API clients
content/        # Static JSON files
docs/           # Design specs & plans
```

## Deployment

Deployed on Vercel at [lilac-lab.vercel.app](https://lilac-lab.vercel.app).

```bash
npx vercel --prod
```

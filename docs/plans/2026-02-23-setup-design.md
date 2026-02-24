# RunTrack — Design du Setup Initial

**Date :** 2026-02-23
**Statut :** Validé

---

## Contexte

Mise en place d'un monorepo fullstack pour l'application RunTrack (suivi de courses à pied). Objectif pédagogique : couvrir un maximum de concepts React/TypeScript modernes.

---

## Décisions techniques

| Décision | Choix | Raison |
|----------|-------|--------|
| Package manager | pnpm workspaces | Déduplication, performances, workspaces natifs |
| PostgreSQL local | Docker Compose | Reproductible, isolé, pas d'installation native |
| Linting/formatage | ESLint + Prettier | Standard bien documenté, config partagée |
| Types partagés | `packages/shared` (@runtrack/shared) | Source de vérité unique, zéro duplication |

---

## Structure du monorepo

```
running-app/
├── packages/
│   └── shared/                    # @runtrack/shared — types TS partagés
│       ├── src/
│       │   ├── types/
│       │   │   ├── auth.ts        # LoginDto, RegisterDto, AuthPayload
│       │   │   ├── run.ts         # RunDto, CreateRunDto, UpdateRunDto
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── frontend/                      # React 18 + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/              # fonctions fetch vers l'API
│   │   ├── types/                 # types front-only (form states, ui state)
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                       # Express + Node.js
│   ├── src/
│   │   ├── config/                # env validation (zod)
│   │   ├── middlewares/
│   │   ├── models/                # Sequelize models
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── app.ts
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── pnpm-workspace.yaml
├── package.json                   # root — scripts globaux
└── README.md
```

---

## Config TypeScript

- **`tsconfig.base.json` (racine)** : `strict: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`
- **`frontend/tsconfig.json`** : extend base + `jsx: react-jsx`, targets ESNext
- **`backend/tsconfig.json`** : extend base + `module: NodeNext`, `moduleResolution: NodeNext`
- **`packages/shared/tsconfig.json`** : extend base + `declaration: true`, `declarationMap: true`

---

## Scripts racine

```json
{
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "db:up": "docker compose up -d",
    "db:down": "docker compose down"
  }
}
```

---

## Variables d'environnement (backend)

Validation au démarrage via Zod — crash immédiat si une variable manque :

```typescript
// backend/src/config/env.ts
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
})
export const env = envSchema.parse(process.env)
```

---

## Docker Compose

- **postgres:16-alpine** sur le port 5432
- **pgadmin4** sur le port 5050 (UI d'administration)
- Volume persistant `postgres_data`

---

## Dépendances par workspace

| Workspace | Dépendances principales |
|-----------|------------------------|
| `frontend` | react 18, react-dom, react-router-dom v6, @tanstack/react-query v5, react-hook-form, recharts, zod |
| `backend` | express, sequelize, pg, argon2, jsonwebtoken, cookie-parser, cors, zod |
| `shared` | typescript uniquement (package types-only, sans runtime) |
| Dev root | typescript, eslint, prettier, vitest, @types/* |

---

## Concepts TypeScript/React couverts par ce setup

1. **Monorepo pnpm workspaces** — gestion de dépendances inter-packages
2. **Package types-only** — `packages/shared` sans dépendance runtime (pattern `@types/*`)
3. **tsconfig extends** — héritage de configuration TypeScript
4. **`z.coerce` + `z.infer`** — coercition et inférence de type depuis un schéma Zod
5. **`moduleResolution: NodeNext`** — résolution ESM moderne pour Node.js
6. **`noUncheckedIndexedAccess`** — accès aux index de tableaux avec vérification null

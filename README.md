# RunTrack

Application fullstack de suivi de courses à pied.

## Stack

- **Frontend** : React 18, TypeScript, Vite, React Router v6, TanStack Query v5, React Hook Form, Recharts
- **Backend** : Node.js, Express 4, TypeScript
- **BDD** : PostgreSQL 16 + Sequelize 6
- **Auth** : JWT (httpOnly cookie) + Argon2id
- **Tests** : Vitest + React Testing Library

## Prérequis

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose

## Démarrage

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example backend/.env
# Éditer backend/.env si nécessaire
```

### 3. Démarrer la base de données

```bash
pnpm db:up
```

### 4. Lancer le projet

```bash
pnpm dev
```

- Frontend : http://localhost:5173
- Backend API : http://localhost:3001
- pgAdmin : http://localhost:5050 (admin@runtrack.local / admin)

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance frontend + backend en parallèle |
| `pnpm build` | Build tous les workspaces |
| `pnpm lint` | Lint tous les workspaces |
| `pnpm test` | Tests tous les workspaces |
| `pnpm db:up` | Démarre PostgreSQL + pgAdmin |
| `pnpm db:down` | Arrête les containers |

## Structure

```
running-app/
├── packages/shared/    # Types TypeScript partagés (@runtrack/shared)
├── frontend/           # React 18 + Vite
├── backend/            # Express + Node.js
└── docker-compose.yml
```

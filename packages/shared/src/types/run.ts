// Types liés aux courses — partagés frontend/backend
export type RunStatus = 'completed' | 'draft'

export interface RunDto {
  id: number
  userId: number
  title: string
  date: string           // ISO 8601 string (YYYY-MM-DD)
  distanceKm: number
  durationSeconds: number
  status: RunStatus
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateRunDto {
  title: string
  date: string
  distanceKm: number
  durationSeconds: number
  status?: RunStatus
  notes?: string
}

export interface UpdateRunDto {
  title?: string
  date?: string
  distanceKm?: number
  durationSeconds?: number
  status?: RunStatus
  notes?: string | null
}

// Réponse API paginée pour la liste des courses
export interface RunsListResponse {
  data: RunDto[]
  total: number
  page: number
  pageSize: number
}

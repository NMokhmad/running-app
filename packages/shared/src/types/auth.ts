// Types liés à l'authentification — partagés frontend/backend
export interface RegisterDto {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginDto {
  email: string
  password: string
}

// Payload encodé dans le JWT
export interface JwtPayload {
  userId: number
  email: string
}

// Réponse API après auth réussie (pas le token, il est en cookie httpOnly)
export interface AuthResponse {
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
}

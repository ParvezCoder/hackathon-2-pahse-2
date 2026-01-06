/**
 * Authentication type definitions matching backend schemas.
 */

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRead {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserRead;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Array<{ field: string; message: string }>;
}

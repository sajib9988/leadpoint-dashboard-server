// auth.interface.ts

export interface IJwtPayload {
  userId?: string;
  email: string;
  name: string | null
  password?: string;
  iat?: number;
  exp?: number;
}

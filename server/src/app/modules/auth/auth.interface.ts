// auth.interface.ts

export interface IJwtPayload {
  userId?: string;
  email: string;
  name: string | null;
  password?: string;
  role?: string; // Add role to IJwtPayload for RBAC
  iat?: number;
  exp?: number;
}

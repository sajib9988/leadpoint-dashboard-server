// auth.interface.ts

export interface IJwtPayload {
  id: string; // Renamed from userId and made mandatory
  email: string;
  name: string; // No longer allows null
  role?: string;
  createdAt: string; // Added
  updatedAt: string; // Added
  iat?: number;
  exp?: number;
}

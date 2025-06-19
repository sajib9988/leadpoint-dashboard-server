export interface IJwtPayload {
  id: string;
  email: string;
  name: string | null; // ✅ সঠিক টাইপ
  role?: string;
  createdAt: string;
  updatedAt: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  user: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
  };
  tokenAcceso: string;
  tokenRefresco: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  tipo: 'access' | 'refresh';
  nombre: string;
  apellido: string;
}
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';

export type Rol = 'ADMIN' | 'CONSULTA';

export type AuthPayload = {
  id: number;
  username: string;
  rol: Rol;
};

export function createToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = auth.slice('Bearer '.length).trim();
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as Request & { user?: AuthPayload }).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido' });
  }
}

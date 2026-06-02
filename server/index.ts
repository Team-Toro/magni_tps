import express from 'express';
import cors from 'cors';
import db from './database';
import type { Request, Response } from 'express';
import { authMiddleware, createToken, type AuthPayload } from './auth';
import checkoutRoutes from './routes/checkoutRoutes';
import mercadopagoRoutes from './routes/mercadopagoRoutes';
import courseRoutes from './routes/courseRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(checkoutRoutes);
app.use(mercadopagoRoutes);
app.use(courseRoutes);

interface UsuarioRow {
  id: number;
  username: string;
  password: string;
  rol: 'ADMIN' | 'CONSULTA';
}

interface ParticipanteRow {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string;
  nivel: string;
  aceptaTerminos: number;
}

function rowToParticipante(row: ParticipanteRow) {
  return {
    id: row.id,
    nombre: row.nombre,
    email: row.email,
    edad: row.edad,
    pais: row.pais,
    modalidad: row.modalidad as 'Presencial' | 'Virtual' | 'Híbrido',
    tecnologias: JSON.parse(row.tecnologias),
    nivel: row.nivel as 'Principiante' | 'Intermedio' | 'Avanzado',
    aceptaTerminos: Boolean(row.aceptaTerminos),
  };
}

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Credenciales requeridas' });
  }

  const row = db
    .prepare('SELECT id, username, password, rol FROM usuarios_db WHERE username = ?')
    .get(username) as UsuarioRow | undefined;

  if (!row || row.password !== password) {
    return res.status(401).json({ message: 'Usuario o password incorrecto' });
  }

  const payload: AuthPayload = { id: row.id, username: row.username, rol: row.rol };
  const token = createToken(payload);
  return res.json({ token, user: payload });
});

app.get('/participantes', authMiddleware, (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM participantes').all() as ParticipanteRow[];
  const participantes = rows.map(rowToParticipante);
  res.json(participantes);
});

app.post('/participantes', authMiddleware, (req: Request, res: Response) => {
  const p = req.body;
  const stmt = db.prepare(`
    INSERT INTO participantes (nombre, email, edad, pais, modalidad, tecnologias, nivel, aceptaTerminos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    p.nombre,
    p.email,
    p.edad,
    p.pais,
    p.modalidad,
    JSON.stringify(p.tecnologias),
    p.nivel,
    p.aceptaTerminos ? 1 : 0
  );
  res.json({ id: result.lastInsertRowid, ...p });
});

app.delete('/participantes/:id', authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM participantes WHERE id = ?').run(id);
  res.json({ success: true });
});

app.put('/participantes/:id', authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const p = req.body;
  db.prepare(`
    UPDATE participantes 
    SET nombre = ?, email = ?, edad = ?, pais = ?, modalidad = ?, tecnologias = ?, nivel = ?, aceptaTerminos = ?
    WHERE id = ?
  `).run(
    p.nombre,
    p.email,
    p.edad,
    p.pais,
    p.modalidad,
    JSON.stringify(p.tecnologias),
    p.nivel,
    p.aceptaTerminos ? 1 : 0,
    id
  );
  res.json({ id: Number(id), ...p });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

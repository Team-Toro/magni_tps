import express from 'express';
import cors from 'cors';
import db from './database';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

app.get('/participantes', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM participantes').all() as ParticipanteRow[];
  const participantes = rows.map(rowToParticipante);
  res.json(participantes);
});

app.post('/participantes', (req: Request, res: Response) => {
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

app.delete('/participantes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM participantes WHERE id = ?').run(id);
  res.json({ success: true });
});

app.put('/participantes/:id', (req: Request, res: Response) => {
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
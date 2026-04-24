import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'participantes.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS participantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    edad INTEGER NOT NULL,
    pais TEXT NOT NULL,
    modalidad TEXT NOT NULL,
    tecnologias TEXT NOT NULL,
    nivel TEXT NOT NULL,
    aceptaTerminos INTEGER NOT NULL
  )
`);

export default db;
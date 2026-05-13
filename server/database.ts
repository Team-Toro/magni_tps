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

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios_db (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    rol TEXT NOT NULL
  )
`);

const count = db.prepare('SELECT COUNT(*) as total FROM usuarios_db').get() as { total: number };
if (count.total === 0) {
  const seed = db.prepare('INSERT INTO usuarios_db (username, password, rol) VALUES (?, ?, ?)');
  seed.run('admin', 'Admin1234!', 'ADMIN');
  seed.run('juan', 'Juan1234!', 'CONSULTA');
}

export default db;

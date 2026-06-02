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

db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price_ars INTEGER NOT NULL,
    is_active INTEGER NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id TEXT NOT NULL,
    status TEXT NOT NULL,
    preference_id TEXT,
    payment_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

const count = db.prepare('SELECT COUNT(*) as total FROM usuarios_db').get() as { total: number };
if (count.total === 0) {
  const seed = db.prepare('INSERT INTO usuarios_db (username, password, rol) VALUES (?, ?, ?)');
  seed.run('admin', 'Admin1234!', 'ADMIN');
  seed.run('juan', 'Juan1234!', 'CONSULTA');
}

const coursesCount = db.prepare('SELECT COUNT(*) as total FROM courses').get() as { total: number };
if (coursesCount.total === 0) {
  const seed = db.prepare(
    'INSERT INTO courses (id, title, description, price_ars, is_active) VALUES (?, ?, ?, ?, ?)',
  );
  seed.run(
    'frontend-fundamentals',
    'Frontend Fundamentals con HTML, CSS y JS',
    'Domina bases solidas y buenas practicas para construir interfaces modernas.',
    34900,
    1,
  );
  seed.run(
    'react-desde-cero',
    'React desde cero con TypeScript',
    'Componentes, estado, hooks y tipado fuerte para apps escalables.',
    52900,
    1,
  );
  seed.run(
    'node-api-rest',
    'Node.js y APIs REST profesionales',
    'Crea APIs robustas con autenticacion, validaciones y testing.',
    49900,
    1,
  );
  seed.run(
    'backend-typescript',
    'Backend con TypeScript y Express',
    'Arquitectura limpia, capas y buenas practicas en servicios backend.',
    45900,
    1,
  );
  seed.run(
    'bases-datos-sql',
    'Bases de datos SQL para desarrolladores',
    'Modelado, consultas complejas, indices y performance en SQL.',
    38900,
    1,
  );
  seed.run(
    'python-automation',
    'Python para automatizacion y scripts',
    'Automatiza tareas reales con archivos, APIs y procesos.',
    32900,
    1,
  );
  seed.run(
    'devops-basico',
    'DevOps basico con Docker y CI',
    'Contenedores, pipelines y despliegues simples y confiables.',
    55900,
    1,
  );
  seed.run(
    'testing-js',
    'Testing en JavaScript con Vitest',
    'Pruebas unitarias y de integracion para frontends modernos.',
    29900,
    1,
  );
}

export default db;

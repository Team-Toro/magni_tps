const cursos = [
  {
    id: 'frontend-fundamentals',
    titulo: 'Frontend Fundamentals con HTML, CSS y JS',
    descripcion: 'Domina bases solidas y buenas practicas para construir interfaces modernas.',
    precio: 34900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=frontend-fundamentals',
  },
  {
    id: 'react-desde-cero',
    titulo: 'React desde cero con TypeScript',
    descripcion: 'Componentes, estado, hooks y tipado fuerte para apps escalables.',
    precio: 52900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=react-desde-cero',
  },
  {
    id: 'node-api-rest',
    titulo: 'Node.js y APIs REST profesionales',
    descripcion: 'Crea APIs robustas con autenticacion, validaciones y testing.',
    precio: 49900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=node-api-rest',
  },
  {
    id: 'backend-typescript',
    titulo: 'Backend con TypeScript y Express',
    descripcion: 'Arquitectura limpia, capas y buenas practicas en servicios backend.',
    precio: 45900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=backend-typescript',
  },
  {
    id: 'bases-datos-sql',
    titulo: 'Bases de datos SQL para desarrolladores',
    descripcion: 'Modelado, consultas complejas, indices y performance en SQL.',
    precio: 38900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=bases-datos-sql',
  },
  {
    id: 'python-automation',
    titulo: 'Python para automatizacion y scripts',
    descripcion: 'Automatiza tareas reales con archivos, APIs y procesos.',
    precio: 32900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=python-automation',
  },
  {
    id: 'devops-basico',
    titulo: 'DevOps basico con Docker y CI',
    descripcion: 'Contenedores, pipelines y despliegues simples y confiables.',
    precio: 55900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=devops-basico',
  },
  {
    id: 'testing-js',
    titulo: 'Testing en JavaScript con Vitest',
    descripcion: 'Pruebas unitarias y de integracion para frontends modernos.',
    precio: 29900,
    checkoutUrl: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=testing-js',
  },
];

const formatArs = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            Cursos de programacion
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Elegi tu proximo curso y empeza hoy
          </h1>
          <p className="max-w-2xl text-sm text-gray-600 dark:text-slate-300 sm:text-base">
            Ocho rutas de aprendizaje enfocadas en desarrollo moderno. Todos los cursos son
            online y con foco practico.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cursos.map((curso) => (
            <article
              key={curso.id}
              className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-1 flex-col gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {curso.titulo}
                </h2>
                <p className="text-sm text-gray-600 dark:text-slate-300">{curso.descripcion}</p>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatArs(curso.precio)}
                </div>
                <a
                  href={curso.checkoutUrl}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Quiero este curso
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

type Course = {
  id: string;
  title: string;
  description: string;
  price_ars: number;
};

const formatArs = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);

export default function CursosPage() {
  const [cursos, setCursos] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los cursos');
        }
        const data = (await response.json()) as Course[];
        if (isMounted) {
          setCursos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('No se pudieron cargar los cursos');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCheckout = async (courseId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error('No se pudo iniciar el checkout');
      }

      const data = (await response.json()) as { init_point?: string };
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      setError('No se pudo iniciar el checkout');
    }
  };

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

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-6 text-center text-sm text-gray-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Cargando cursos...
          </div>
        ) : null}

        {!isLoading ? (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cursos.map((curso) => (
              <article
                key={curso.id}
                className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-1 flex-col gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {curso.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-slate-300">
                    {curso.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatArs(curso.price_ars)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCheckout(curso.id)}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Quiero este curso
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
}

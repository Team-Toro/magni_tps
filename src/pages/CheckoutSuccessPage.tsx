import { Link, useSearchParams } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const paymentId = params.get('payment_id');
  const externalRef = params.get('external_reference');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            Pago aprobado
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ¡Tu compra fue exitosa!
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            El pago fue procesado correctamente. Ya podés acceder a tu curso.
          </p>
        </header>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <dl className="flex flex-col gap-3 text-sm">
            {paymentId ? (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600 dark:text-slate-300">ID de pago</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{paymentId}</dd>
              </div>
            ) : null}
            {externalRef ? (
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600 dark:text-slate-300">Orden</dt>
                <dd className="font-medium text-gray-900 dark:text-white">#{externalRef}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <Link
          to="/cursos"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Ver más cursos
        </Link>
      </div>
    </div>
  );
}

import { Link, useSearchParams } from 'react-router-dom';

export default function CheckoutFailurePage() {
  const [params] = useSearchParams();
  const paymentId = params.get('payment_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            Pago no procesado
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            No se pudo completar el pago
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Hubo un problema al procesar tu pago. Podés intentarlo nuevamente.
          </p>
        </header>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {paymentId
            ? `El pago ${paymentId} fue rechazado o cancelado.`
            : 'El pago fue rechazado o cancelado.'}
        </div>

        <Link
          to="/cursos"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Intentar nuevamente
        </Link>
      </div>
    </div>
  );
}

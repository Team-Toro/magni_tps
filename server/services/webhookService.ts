import { Payment } from 'mercadopago';
import { mpClient } from '../integrations/mercadopago/client';
import { findOrderById, updateOrderStatus } from '../repositories/ordersRepository';

type PaymentStatus = 'approved' | 'rejected';

const payment = new Payment(mpClient);

export async function handlePaymentWebhook(paymentId: string, orderId: number) {
  const existingOrder = findOrderById(orderId);
  if (!existingOrder) {
    console.log('[mp-webhook] order not found', { orderId, paymentId });
    return { status: 'ignored' as const };
  }

  if (existingOrder.payment_id === paymentId) {
    console.log('[mp-webhook] duplicate payment', { orderId, paymentId });
    return { status: 'duplicate' as const };
  }

  const response = await payment.get({ id: paymentId });
  const paymentStatus = response.status as PaymentStatus | undefined;
  console.log('[mp-webhook] payment fetched', {
    orderId,
    paymentId,
    status: response.status,
    statusDetail: (response as { status_detail?: string }).status_detail,
  });
  if (!paymentStatus || (paymentStatus !== 'approved' && paymentStatus !== 'rejected')) {
    console.log('[mp-webhook] ignored status', { orderId, paymentId, paymentStatus });
    return { status: 'ignored' as const };
  }

  const updatedAt = new Date().toISOString();
  updateOrderStatus({
    orderId,
    paymentId,
    status: paymentStatus,
    updatedAt,
  });
  console.log('[mp-webhook] order updated', { orderId, paymentId, status: paymentStatus });

  return { status: 'updated' as const };
}

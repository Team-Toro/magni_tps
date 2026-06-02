import { Router } from 'express';
import type { Request, Response } from 'express';
import { verifyWebhookSignature } from '../integrations/mercadopago/webhooks';
import { handlePaymentWebhook } from '../services/webhookService';

type WebhookData = {
  data?: {
    id?: string | number;
  };
};

const router = Router();

router.post('/webhooks/mercadopago', async (req: Request, res: Response) => {
  const signature = req.headers['x-signature'] as string | undefined;
  const requestId = req.headers['x-request-id'] as string | undefined;
  const dataId = req.query['data.id'] as string | undefined;
  const notificationType = req.query['type'] as string | undefined;
  const secret = process.env.MP_WEBHOOK_SECRET;

  console.log('[mp-webhook] incoming', {
    type: notificationType,
    dataId,
    requestId,
    signature: signature ? `${signature.slice(0, 12)}...` : undefined,
    query: req.query,
    body: req.body,
  });

  const isValid = verifyWebhookSignature({
    signature,
    requestId,
    dataId,
    secret,
  });

  console.log('[mp-webhook] signature', { isValid });

  if (!isValid) {
    return res.status(401).json({ message: 'Firma invalida' });
  }

  const body = req.body as WebhookData | undefined;
  const paymentId = body?.data?.id ?? dataId;
  const orderIdRaw = req.query['external_reference'] as string | undefined;
  const orderId = orderIdRaw ? Number(orderIdRaw) : Number.NaN;

  if (!paymentId || !Number.isFinite(orderId)) {
    console.log('[mp-webhook] invalid payload', { paymentId, orderIdRaw, orderId });
    return res.status(200).json({ message: 'Notificacion incompleta' });
  }

  try {
    if (notificationType === 'payment') {
      const result = await handlePaymentWebhook(String(paymentId), orderId);
      console.log('[mp-webhook] handled payment', { result, paymentId, orderId });
    } else {
      console.log('[mp-webhook] ignored notification type', { notificationType });
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('[mp-webhook] error', error);
    return res.status(500).json({ message: 'Error al procesar webhook' });
  }
});

export default router;

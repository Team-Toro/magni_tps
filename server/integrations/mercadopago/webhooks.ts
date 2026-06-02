import crypto from 'crypto';

// Docs: https://www.mercadopago.com.ar/developers/en/docs/your-integrations/notifications/webhooks

type SignaturePayload = {
  signature: string | undefined;
  requestId: string | undefined;
  dataId: string | undefined;
  secret: string | undefined;
};

type ParsedSignature = {
  ts: string;
  hash: string;
};

function parseSignature(signature: string): ParsedSignature | null {
  const parts = signature.split(',');
  let ts = '';
  let hash = '';

  for (const part of parts) {
    const [key, value] = part.split('=', 2).map((item) => item.trim());
    if (key === 'ts' && value) {
      ts = value;
    }
    if (key === 'v1' && value) {
      hash = value;
    }
  }

  if (!ts || !hash) {
    return null;
  }

  return { ts, hash };
}

export function verifyWebhookSignature({ signature, requestId, dataId, secret }: SignaturePayload) {
  if (!signature || !requestId || !dataId || !secret) {
    return false;
  }

  const parsed = parseSignature(signature);
  if (!parsed) {
    return false;
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${parsed.ts};`;
  const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  return hmac === parsed.hash;
}

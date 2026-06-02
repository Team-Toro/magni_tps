import { MercadoPagoConfig } from 'mercadopago';

// Docs: https://www.mercadopago.com.ar/developers/en/docs/sdks-library/landing

const accessToken = process.env.MP_ACCESS_TOKEN ?? '';

export const mpClient = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 },
});

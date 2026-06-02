import { Preference } from 'mercadopago';

// Docs: https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/overview
import { mpClient } from './client';

type PreferenceInput = {
  title: string;
  description: string;
  price: number;
  courseId: string;
  orderId: number;
};

const preference = new Preference(mpClient);
const publicBaseUrl = (process.env.MP_PUBLIC_BASE_URL || 'http://localhost:5173').replace(/\/+$/, '');

export async function createCheckoutPreference({
  title,
  description,
  price,
  courseId,
  orderId,
}: PreferenceInput) {
  const response = await preference.create({
    body: {
      items: [
        {
          id: courseId,
          title,
          description,
          quantity: 1,
          unit_price: price,
          currency_id: 'ARS',
        },
      ],
      external_reference: String(orderId),
      notification_url: process.env.MP_WEBHOOK_URL,
      back_urls: {
        success: `${publicBaseUrl}/checkout/success`,
        failure: `${publicBaseUrl}/checkout/failure`,
        pending: `${publicBaseUrl}/checkout/pending`,
      },
      auto_return: 'approved',
    },
  });

  return {
    preferenceId: response.id as string,
    initPoint: response.init_point as string,
  };
}

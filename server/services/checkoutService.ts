import { getCourseById } from '../repositories/coursesRepository';
import { createOrder, updateOrderPreference } from '../repositories/ordersRepository';
import { createCheckoutPreference } from '../integrations/mercadopago/preferences';

export async function createCheckout(courseId: string) {
  const course = getCourseById(courseId);
  if (!course || course.is_active !== 1) {
    return null;
  }

  const now = new Date().toISOString();
  const orderId = createOrder({ courseId: course.id, createdAt: now });
  const preference = await createCheckoutPreference({
    title: course.title,
    description: course.description,
    price: course.price_ars,
    courseId: course.id,
    orderId,
  });
  updateOrderPreference(orderId, preference.preferenceId, now);

  return preference;
}

import { Router } from 'express';
import type { Request, Response } from 'express';
import { createCheckout } from '../services/checkoutService';

const router = Router();

router.post('/checkout', async (req: Request, res: Response) => {
  const { courseId } = req.body ?? {};
  if (!courseId || typeof courseId !== 'string') {
    console.log('[checkout] invalid payload', { body: req.body });
    return res.status(400).json({ message: 'courseId requerido' });
  }

  try {
    const preference = await createCheckout(courseId);
    if (!preference) {
      console.log('[checkout] course not available', { courseId });
      return res.status(404).json({ message: 'Curso no disponible' });
    }
    console.log('[checkout] preference created', {
      courseId,
      preferenceId: preference.preferenceId,
    });
    return res.json({ init_point: preference.initPoint, preference_id: preference.preferenceId });
  } catch (error) {
    console.error('[checkout] error creating checkout', error);
    return res.status(500).json({ message: 'No se pudo crear el checkout' });
  }
});

export default router;

import { Router } from 'express';
import type { Request, Response } from 'express';
import { listCourses } from '../services/coursesService';

const router = Router();

router.get('/courses', (_req: Request, res: Response) => {
  const courses = listCourses();
  return res.json(courses);
});

export default router;

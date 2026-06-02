import db from '../database';
import type { CourseRow } from '../types';

export function getCourseById(courseId: string) {
  return db
    .prepare('SELECT id, title, description, price_ars, is_active FROM courses WHERE id = ?')
    .get(courseId) as CourseRow | undefined;
}

export function listActiveCourses() {
  return db
    .prepare('SELECT id, title, description, price_ars FROM courses WHERE is_active = 1')
    .all() as Array<Pick<CourseRow, 'id' | 'title' | 'description' | 'price_ars'>>;
}

import { listActiveCourses } from '../repositories/coursesRepository';

export function listCourses() {
  return listActiveCourses();
}

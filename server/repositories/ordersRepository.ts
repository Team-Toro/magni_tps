import db from '../database';
import type { OrderRow } from '../types';

type CreateOrderInput = {
  courseId: string;
  createdAt: string;
};

type UpdateOrderInput = {
  paymentId: string;
  status: OrderRow['status'];
  updatedAt: string;
  orderId: number;
};

export function createOrder({ courseId, createdAt }: CreateOrderInput) {
  const stmt = db.prepare(
    `
    INSERT INTO orders (course_id, status, preference_id, payment_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  );
  const result = stmt.run(courseId, 'created', null, null, createdAt, createdAt);
  return result.lastInsertRowid as number;
}

export function updateOrderStatus({ orderId, paymentId, status, updatedAt }: UpdateOrderInput) {
  const stmt = db.prepare(
    `
    UPDATE orders
    SET status = ?, payment_id = ?, updated_at = ?
    WHERE id = ?
  `,
  );
  return stmt.run(status, paymentId, updatedAt, orderId).changes;
}

export function updateOrderPreference(orderId: number, preferenceId: string, updatedAt: string) {
  const stmt = db.prepare(
    `
    UPDATE orders
    SET preference_id = ?, updated_at = ?
    WHERE id = ?
  `,
  );
  return stmt.run(preferenceId, updatedAt, orderId).changes;
}

export function findOrderById(orderId: number) {
  return db
    .prepare(
      `
      SELECT id, course_id, status, preference_id, payment_id, created_at, updated_at
      FROM orders
      WHERE id = ?
    `,
    )
    .get(orderId) as OrderRow | undefined;
}

// routes/studentRoutes.ts
import express from 'express';
import { loginStudent, getTasks, updateTaskStatus } from '../controllers/studentController';

const router = express.Router();

/**
 * @swagger
 * /student/login:
 *   post:
 *     summary: Student login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the student.
 *               password:
 *                 type: string
 *                 description: The password of the student.
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginStudent);

/**
 * @swagger
 * /student/{studentId}/tasks:
 *   get:
 *     summary: Get tasks assigned to a student.
 *     parameters:
 *       - name: studentId
 *         in: path
 *         description: The ID of the student.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully.
 *       404:
 *         description: Student not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:studentId/tasks', getTasks);

/**
 * @swagger
 * /student/{studentId}/tasks/{taskId}:
 *   put:
 *     summary: Update task status for a student.
 *     parameters:
 *       - name: studentId
 *         in: path
 *         description: The ID of the student.
 *         required: true
 *         schema:
 *           type: string
 *       - name: taskId
 *         in: path
 *         description: The ID of the task.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status to be updated (e.g., 'completed').
 *     responses:
 *       200:
 *         description: Task status updated successfully.
 *       404:
 *         description: Student or task not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:studentId/tasks/:taskId', updateTaskStatus);

export default router;

// routes/adminRoutes.ts
import express from 'express';
import { loginAdmin, addStudent, assignTask } from '../controllers/adminController';

const router = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login.
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
 *                 description: The email of the admin.
 *               password:
 *                 type: string
 *                 description: The password of the admin.
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /admin/addStudent:
 *   post:
 *     summary: Add a student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student.
 *               email:
 *                 type: string
 *                 description: The email of the student.
 *               password:
 *                 type: string
 *                 description: The password of the student.
 *               department:
 *                 type: string
 *                 description: The Department of the student
 *     responses:
 *       201:
 *         description: Student added successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post('/addStudent', addStudent);

/**
 * @swagger
 * /admin/assignTask:
 *   post:
 *     summary: Assign a task to a student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - taskName
 *               - dueTime
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The ID of the student.
 *               taskName:
 *                 type: string
 *                 description: The task to be assigned.
 *               dueTime:
 *                 type: string
 *                 description: The due date of the task
 *     responses:
 *       200:
 *         description: Task assigned successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post('/assignTask', assignTask);

export default router;

// controllers/adminController.ts
import { Request, Response } from 'express';
import Student from '../models/studentModel';
import Admin from '../models/adminModel';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = password === admin.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addStudent = async (req: Request, res: Response) => {
  const { name, email, department, password } = req.body;

  try {
    // Check if the email is already used
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new student without hashing the password
    const newStudent = new Student({
      name,
      email,
      department,
      password, // Store the password in plain text
    });

    await newStudent.save();

    return res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const assignTask = async (req: Request, res: Response) => {
  const { studentId, taskName, dueTime } = req.body;
  console.log(studentId, taskName, dueTime)
  try {
    const student = await Student.findById(studentId);
    console.log(student)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Add a new task to the student
    student.tasks.push({
      taskName,
      dueTime: new Date(dueTime),
      status: 'pending',
    });

    await student.save();

    return res.status(200).json({ message: 'Task assigned successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

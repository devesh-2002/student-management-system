import { Request, Response } from 'express';
import Student from '../models/studentModel';

export const loginStudent = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = password === student.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful',tasks: student.tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const tasks = student.tasks;
    return res.status(200).json({ tasks: tasks }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  const taskId = req.params.taskId;
  const { status } = req.body;

  try {
    const student = await Student.findById(studentId);
    console.log(student)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const taskIndex = student.tasks.findIndex((task) => task?._id?.toString() === taskId.toString());

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    student.tasks[taskIndex].status = status;
    await student.save();

    return res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

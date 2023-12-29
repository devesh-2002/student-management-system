// models/studentModel.ts
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [
    {
      taskName: { type: String, required: true },
      dueTime: { type: Date, required: true },
      status: { type: String, enum: ['pending', 'completed', 'overdue'], default: 'pending' },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

export default Student;

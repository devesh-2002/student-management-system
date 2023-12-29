// app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import adminRoutes from './routes/adminRoutes';
import studentRoutes from './routes/studentRoutes';
import setupSwaggerDocs from './swagger'; // Update with the correct file path

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// MongoDB Connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Setup Swagger Docs
    setupSwaggerDocs(app);
    // Server Start
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

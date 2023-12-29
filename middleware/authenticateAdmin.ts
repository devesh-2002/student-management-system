import { Request, Response, NextFunction } from 'express';

const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  
  // Replace this with your actual admin credentials check
  if (email === 'admin@admin.com' && password === 'admin') {
    req.body.admin = { email, role: 'admin' };
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateAdmin;

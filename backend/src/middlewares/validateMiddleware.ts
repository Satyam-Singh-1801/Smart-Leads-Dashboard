import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const zodErr = error as any;
        const issues = zodErr.errors || zodErr.issues || [];
        res.status(400).json({
          message: 'Validation failed',
          errors: issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(400).json({ message: 'Invalid data' });
      }
    }
  };
};

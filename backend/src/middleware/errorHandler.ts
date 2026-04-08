import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || "INTERNAL_ERROR";

  console.error(`[${new Date().toISOString()}] ${err.stack}`);

  res.status(statusCode).json({
    error: {
      message,
      code,
      field: err.field,
    },
  });
};

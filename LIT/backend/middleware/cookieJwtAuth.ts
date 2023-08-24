import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const cookieJwtAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token: string | undefined = req.cookies.token;

  try {
    const user: any = jwt.verify(token ?? "", process.env.MY_SECRET || "");
    req.body.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

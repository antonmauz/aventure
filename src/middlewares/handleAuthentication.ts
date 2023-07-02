import { NextFunction, Request, Response } from "express";

import { Session } from "express-session";
import { authConfig } from "@config";
import { verify } from "jsonwebtoken";

export interface AuthenticatedSession extends Session {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  session: AuthenticatedSession;
}

const isAuthenticated = (request: Request): request is AuthenticatedRequest =>
  typeof request.session.userId === "string";

const tryToAuthenticate = (req: Request): void => {
  if (req.headers.authorization?.startsWith("Bearer ") === true) {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (token === undefined) {
      throw Error("401");
    }

    verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw Error("401");
      }

      if (decoded !== undefined && typeof decoded !== "string" && "id" in decoded) {
        req.session.userId = decoded.id;
      } else {
        throw Error("401");
      }
    });

    return;
  }

  throw Error("401");
};

export const authenticatedSessionParser = (req: Request): AuthenticatedSession => {
  if (isAuthenticated(req)) {
    return req.session;
  }

  throw Error("401");
};

export const handleAuthentication = (req: Request, _: Response, next: NextFunction): void => {
  if (isAuthenticated(req)) {
    next();
    return;
  }

  tryToAuthenticate(req);

  next();
};

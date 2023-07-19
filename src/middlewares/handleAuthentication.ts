import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { authConfig } from "@config";
import { verify } from "jsonwebtoken";

// Define the shape of an authenticated session
export interface AuthenticatedSession extends Session {
  userId: string;
}

// Define the shape of an authenticated request
interface AuthenticatedRequest extends Request {
  session: AuthenticatedSession;
}

// Check if a request is authenticated by inspecting the session object
const isAuthenticated = (request: Request): request is AuthenticatedRequest =>
  typeof request.session.userId === "string";

// Try to authenticate a request by verifying the JWT token
const tryToAuthenticate = (req: Request): void => {
  // Check if the authorization header starts with "Bearer"
  if (req.headers.authorization?.startsWith("Bearer ") === true) {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (token === undefined) {
      throw Error("401");
    }

    // Verify the token using the provided secret
    verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw Error("401");
      }

      // If the token is valid and contains a user ID, set it in the session
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

// Extract the authenticated session from a request
export const authenticatedSessionParser = (req: Request): AuthenticatedSession => {
  if (isAuthenticated(req)) {
    return req.session;
  }

  throw Error("401");
};

// Middleware to handle authentication
export const handleAuthentication = (req: Request, _: Response, next: NextFunction): void => {
  // If the request is already authenticated, pass it to the next middleware
  if (isAuthenticated(req)) {
    next();
    return;
  }

  // Try to authenticate the request
  tryToAuthenticate(req);

  // Pass the request to the next middleware
  next();
};

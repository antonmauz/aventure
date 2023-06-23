import express from "express";
import { authConfig } from "@config";
import { verify } from "jsonwebtoken";

interface CustomRequest extends express.Request {
  userId?: string;
}

const verifyToken = (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.headers["x-access-token"];

  if (!token || typeof token !== "string") {
    return res.status(403).send({ message: "No token provided!" });
  }

  verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    if (decoded !== undefined && typeof decoded !== "string" && "id" in decoded) {
      req.userId = decoded.id;
    } else {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    next();
  });
};

export const authJwt = {
  verifyToken,
};

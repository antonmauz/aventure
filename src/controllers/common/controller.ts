import { z, ZodTypeDef } from "zod";

import express from "express";

type Handler<Session, Body, Params, Response> = ({
  session,
  body,
  params,
  res,
}: {
  session: Session;
  body: Body;
  params: Params;
  res: express.Response<Response>;
  req: express.Request;
}) => Promise<void>;

interface Schemas<Session, Body, Params> {
  session?: (req: express.Request) => Session;
  bodySchema?: z.ZodType<Body, ZodTypeDef, unknown>;
  paramsSchema?: z.ZodType<Params, ZodTypeDef, unknown>;
}

export const controller =
  <Session = undefined, Body = undefined, Params = undefined, Response = undefined>(
    handler: Handler<Session, Body, Params, Response>,
    { session: sessionValidator, bodySchema, paramsSchema }: Schemas<Session, Body, Params> = {}
  ) =>
  (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.log("sessionValidator", sessionValidator);
    try {
      const session = sessionValidator ? sessionValidator(req) : (undefined as Session);
      const body = bodySchema ? bodySchema.parse(req.body) : (undefined as Body);
      const params = paramsSchema ? paramsSchema.parse(req.params) : (undefined as Params);

      console.log("session", session);

      handler({ session, body, params, res, req }).catch(next);
    } catch (err) {
      next(err);
    }
  };

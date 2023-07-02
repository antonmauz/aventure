import { z, ZodTypeDef } from "zod";

import express from "express";

type Handler<Session, Body, Params, Response, Query> = ({
  session,
  body,
  params,
  res,
}: {
  session: Session;
  body: Body;
  params: Params;
  query: Query;
  res: express.Response<Response>;
  req: express.Request;
  next: express.NextFunction;
}) => Promise<void>;

interface Schemas<Session, Body, Params, Query> {
  session?: (req: express.Request) => Session;
  bodySchema?: z.ZodType<Body, ZodTypeDef, unknown>;
  paramsSchema?: z.ZodType<Params, ZodTypeDef, unknown>;
  querySchema?: z.ZodType<Query, ZodTypeDef, unknown>;
}

export const controller =
  <Session = undefined, Body = undefined, Params = undefined, Response = undefined, Query = undefined>(
    handler: Handler<Session, Body, Params, Response, Query>,
    {
      session: sessionValidator,
      bodySchema,
      paramsSchema,
      querySchema,
    }: Schemas<Session, Body, Params, Query> = {}
  ) =>
  (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    try {
      const session = sessionValidator ? sessionValidator(req) : (undefined as Session);
      const body = bodySchema ? bodySchema.parse(req.body) : (undefined as Body);
      const params = paramsSchema ? paramsSchema.parse(req.params) : (undefined as Params);
      const query = querySchema ? querySchema.parse(req.query) : (undefined as Query);

      handler({ session, body, params, query, res, req, next }).catch(next);
    } catch (err) {
      next(err);
    }
  };

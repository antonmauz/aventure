/**
 * Express Controller Middleware
 *
 * This code provides a middleware function for handling requests in Express.
 * The `controller` function allows for easy validation and extraction of session, request body,
 * URL params, and query parameters based on provided schemas.
 * It wraps the provided request handler function and performs schema validation
 * before calling the handler with the extracted parameters.
 * If any validation errors occur, it passes the error to the error handling middleware.
 *
 */

import { z, ZodTypeDef } from "zod";
import express from "express";

// Define the type for the request handler
type Handler<Session, Body, Params, Response, Query> = ({
  session,
  body,
  params,
  query,
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

// Define the schemas for session, request body, URL params, and query parameters
interface Schemas<Session, Body, Params, Query> {
  session?: (req: express.Request) => Session;
  bodySchema?: z.ZodType<Body, ZodTypeDef, unknown>;
  paramsSchema?: z.ZodType<Params, ZodTypeDef, unknown>;
  querySchema?: z.ZodType<Query, ZodTypeDef, unknown>;
}

// Create a controller function that wraps the request handler with schema validation
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
      // Validate and extract the session, body, params, and query parameters
      const session = sessionValidator ? sessionValidator(req) : (undefined as Session);
      const body = bodySchema ? bodySchema.parse(req.body) : (undefined as Body);
      const params = paramsSchema ? paramsSchema.parse(req.params) : (undefined as Params);
      const query = querySchema ? querySchema.parse(req.query) : (undefined as Query);

      // Call the request handler with the extracted parameters
      handler({ session, body, params, query, res, req, next }).catch(next);
    } catch (err) {
      // If any validation errors occur, pass the error to the error handler middleware
      next(err);
    }
  };

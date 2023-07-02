import { databaseService } from "@services";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { controller } from "../common/controller";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { z } from "zod";

type Params = {
  id: string;
};

type Response = DTOBlogPost;

export const getBlogPost = controller<undefined, undefined, Params, Response>(
  async ({ params: { id }, res }) => {
    const blogPost = await databaseService.findBlogPostById(id);

    // handle not found in DB
    // res.status(400).send(error);

    res.status(200).json(await toDTOBlogPost(blogPost));
  },
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);

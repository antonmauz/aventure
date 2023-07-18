import { databaseService } from "@services";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { controller } from "../common/controller";
import { z } from "zod";
import { DESTINATIONS, TOPICS } from "@constants";

const SORT = ["title", "createdAt", "author"] as const;

const PAGE_SIZE = 20;

type Filters = {
  topics?: DTOBlogPost["topics"];
  destinations?: DTOBlogPost["destinations"];
};

type Query = {
  page: number;
  searchTerm?: string;
  sort: (typeof SORT)[number];
  filters?: Filters;
};

type Response = {
  resultsCount: number;
  pageSize: number;
  data: DTOBlogPost[];
};

export const getBlogPosts = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { searchTerm, page, sort, filters }, res }) => {
    const blogPosts = await databaseService.findBlogPosts(searchTerm ?? "");

    let mappedBlogPosts = await Promise.all(blogPosts.map(toDTOBlogPost));

    if (sort === "title") {
      mappedBlogPosts?.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "createdAt") {
      mappedBlogPosts?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sort === "author") {
      mappedBlogPosts?.sort((a, b) => a.author.name.localeCompare(b.author.name));
    }

    const { topics, destinations } = filters ?? {};

    if (topics) {
      mappedBlogPosts = mappedBlogPosts.filter((blogPost) =>
        topics.every((topic) => blogPost.topics.includes(topic))
      );
    }

    if (destinations) {
      mappedBlogPosts = mappedBlogPosts.filter((blogPost) =>
        destinations.every((destination) => blogPost.destinations.includes(destination))
      );
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;

    const paginatedBlogPosts = mappedBlogPosts.slice(startIndex, endIndex);

    res
      .status(200)
      .json({ resultsCount: mappedBlogPosts.length, pageSize: PAGE_SIZE, data: paginatedBlogPosts });
  },
  {
    querySchema: z.object({
      searchTerm: z.string().optional(),
      page: z.string().transform((string) => parseInt(string)),
      sort: z.enum(SORT),
      filters: z
        .object({
          topics: z.array(z.enum(TOPICS)).optional(),
          destinations: z.array(z.enum(DESTINATIONS)).optional(),
        })

        .optional(),
    }),
  }
);

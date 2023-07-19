import { databaseService } from "@services";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { controller } from "../common/controller";
import { z } from "zod";
import { DESTINATIONS, TOPICS } from "@constants";

const SORT = ["title", "createdAt"] as const;

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

    let filteredBlogPosts = blogPosts;

    if (sort === "title") {
      filteredBlogPosts?.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "createdAt") {
      filteredBlogPosts?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    const { topics, destinations } = filters ?? {};

    if (topics) {
      filteredBlogPosts = filteredBlogPosts.filter((blogPost) =>
        topics.every((topic) => blogPost.topics.includes(topic))
      );
    }

    if (destinations) {
      filteredBlogPosts = filteredBlogPosts.filter((blogPost) =>
        destinations.every((destination) => blogPost.destinations.includes(destination))
      );
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;

    const paginatedBlogPosts = filteredBlogPosts.slice(startIndex, endIndex);

    res.status(200).json({
      resultsCount: filteredBlogPosts.length,
      pageSize: PAGE_SIZE,
      data: await Promise.all(paginatedBlogPosts.map(toDTOBlogPost)),
    });
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

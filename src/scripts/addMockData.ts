import { databaseService } from "@services";
import { BLOG_POSTS_MOCK_DATA } from "./BLOG_POSTS_MOCK_DATA";
import { MongooseBlogPost } from "../services/database/model/MongooseBlogPost";

databaseService.connectDB();

const addBlogMockData = async () => {
  console.log("Adding blog posts to db");

  await Promise.all(
    BLOG_POSTS_MOCK_DATA.map(async (blog) => {
      console.log(`Adding ${blog.title} to db`);
      await MongooseBlogPost.create(blog);
      console.log(`Added ${blog.title} to db`);
    })
  );
};

const addMockData = async () => {
  console.log("Adding mock data to db");

  // await addBlogMockData();
  console.log("Added mock data to db");
};

addMockData();

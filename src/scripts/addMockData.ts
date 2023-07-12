import { databaseService } from "@services";
import { MongooseHotel } from "../services/database/model/MongooseHotel";
import { HOTEL_MOCK_DATA } from "./HOTEL_MOCK_DATA";
import { RESTAURANT_MOCK_DATA } from "./RESTAURANT_MOCK_DATA";
import { MongooseRestaurant } from "../services/database/model/MongooseRestaurant";
import { BLOG_POSTS_MOCK_DATA } from "./BLOG_POSTS_MOCK_DATA";
import { MongooseBlogPost } from "../services/database/model/MongooseBlogPost";

databaseService.connectDB();

const addHotelMockData = async () => {
  console.log("Adding hotels to db");

  await Promise.all(
    HOTEL_MOCK_DATA.map(async (hotel) => {
      console.log(`Adding ${hotel.name} to db`);
      await MongooseHotel.create(hotel);
      console.log(`Added ${hotel.name} to db`);
    })
  );
};

const addRestaurantMockData = async () => {
  console.log("Adding restaurants to db");

  await Promise.all(
    RESTAURANT_MOCK_DATA.map(async (restaurant) => {
      console.log(`Adding ${restaurant.name} to db`);
      await MongooseRestaurant.create(restaurant);
      console.log(`Added ${restaurant.name} to db`);
    })
  );
};

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

  // await addHotelMockData();

  // await addRestaurantMockData();

  // await addBlogMockData();
  console.log("Added mock data to db");
};

addMockData();

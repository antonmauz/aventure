import { FAKE_DATABASE_IMAGE } from "./FAKE_DATABASE_IMAGE";
import { FAKE_ID } from "./FAKE_ID";

export const BLOG_POSTS_MOCK_DATA = [
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["munich"],
    topics: ["hotel", "restaurant"],
    title: "Exploring the Vibrant Culture of Munich",
    text: "Munich, the capital of Bavaria, offers a delightful blend of rich history, stunning architecture, and a vibrant cultural scene. In this blog post, I will take you on a journey through the city's iconic landmarks, mouth-watering cuisine, and cozy hotels. Get ready to immerse yourself in the unique charm of Munich!",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I've always wanted to visit Munich, and your blog post has further fueled my excitement! Can't wait to experience the city's cultural wonders.",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your detailed descriptions and beautiful photos make me feel like I'm already in Munich. Thanks for the amazing virtual tour!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["hamburg"],
    topics: ["city", "adventure"],
    title: "Discovering the Hidden Gems of Hamburg",
    text: "Hamburg, the gateway to the world, is a city full of surprises and hidden gems. From its bustling port to its picturesque canals and vibrant nightlife, Hamburg has something for everyone. Join me as I unveil the city's best-kept secrets and share my personal adventures along the way!",
    comments: [
      {
        authorId: FAKE_ID,
        text: "Your blog post has inspired me to plan a trip to Hamburg. I can't wait to explore the city's unique attractions and soak up its lively atmosphere.",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Hamburg has always intrigued me, and your vivid descriptions have made me even more eager to visit. Thanks for sharing your experiences!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["frankfurt"],
    topics: ["city", "trainTravel"],
    title: "A Day Trip to Frankfurt: Exploring the Financial Capital",
    text: "Frankfurt, the financial capital of Germany, is often overlooked as a tourist destination. However, the city has much to offer in terms of stunning skyscrapers, historic landmarks, and a vibrant cultural scene. Join me as I embark on a day trip to Frankfurt and discover the hidden treasures of this dynamic city.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I've always associated Frankfurt with finance, but your blog post has shown me a different side of the city. I'm intrigued to explore it now!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Frankfurt seems like a fascinating city to visit. Your descriptions and photos have captured its essence beautifully. Can't wait to experience it firsthand!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["stuttgart"],
    topics: ["city", "adventure"],
    title: "Stuttgart: Where Innovation Meets Nature",
    text: "Stuttgart, the capital of Baden-Württemberg, is a city known for its automotive industry, lush parks, and cultural heritage. In this blog post, I will take you on an exciting journey through Stuttgart's iconic landmarks, stunning natural landscapes, and vibrant arts scene. Get ready to be inspired by this city's unique blend of innovation and natural beauty.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I've heard so much about Stuttgart's automotive heritage, but your blog post has shown me that the city has much more to offer. Can't wait to visit!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Stuttgart looks like a dream destination for nature lovers and adventure seekers. Your post has definitely sparked my wanderlust!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["berlin"],
    topics: ["city", "hotel"],
    title: "Berlin: A Melting Pot of History and Culture",
    text: "Berlin, the capital of Germany, is a city that effortlessly combines a rich history with a vibrant modern culture. From the iconic Brandenburg Gate to the vibrant street art scene, Berlin offers a myriad of experiences for every traveler. Join me as I delve into the heart of Berlin and discover its fascinating stories and hidden gems.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "Berlin has been on my bucket list for so long, and your blog post has made me even more excited to visit. Can't wait to explore the city's history and culture!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your post has captured the essence of Berlin perfectly. I'm fascinated by the city's blend of history and modernity. Thanks for the insightful guide!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["frankfurt"],
    topics: ["hotel", "adventure"],
    title: "Frankfurt: Exploring the Urban Oasis",
    text: "Frankfurt is not only a financial hub but also a city of remarkable architecture and picturesque green spaces. Join me on a journey through the streets of Frankfurt as I explore its urban oasis. From the modern skyscrapers of the financial district to the tranquil parks along the Main River, Frankfurt offers a unique blend of bustling city life and natural beauty.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I had no idea Frankfurt had such beautiful green spaces. Your blog post has opened my eyes to a different side of the city!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your descriptions of Frankfurt's architecture and natural surroundings are captivating. I can't wait to visit and experience it myself!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["munich"],
    topics: ["restaurant", "city"],
    title: "Munich: A Gastronomic Journey",
    text: "Munich, the capital of Bavaria, is renowned for its rich culinary heritage and vibrant food scene. In this blog post, I will take you on a gastronomic journey through Munich's traditional beer gardens, cozy Bavarian taverns, and innovative restaurants. Prepare your taste buds for a delightful adventure in this culinary haven.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I'm a food lover, and your post about Munich's gastronomic delights has made me hungry! Can't wait to try the local delicacies.",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your descriptions of Munich's food scene have me salivating. I'll definitely be exploring these culinary gems on my next visit!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["hamburg"],
    topics: ["city", "adventure"],
    title: "Hamburg: Exploring the Port City",
    text: "Hamburg, the gateway to the world, is a vibrant city with a rich maritime history. Join me as I delve into the charm of Hamburg's harbor, stroll along the picturesque canals, and immerse myself in the city's cultural attractions. From stunning architecture to lively nightlife, Hamburg has something for everyone.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "I've always been fascinated by port cities, and your blog post about Hamburg has piqued my interest even more. Can't wait to visit!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your post has painted a vivid picture of Hamburg. I can almost feel the vibrant atmosphere of the city through your words!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["stuttgart"],
    topics: ["hotel", "countrySide"],
    title: "Stuttgart: Where Nature Meets Modernity",
    text: "Stuttgart, nestled in the heart of Baden-Württemberg, offers a unique blend of modernity and natural beauty. In this blog post, I will guide you through the city's contemporary architecture, lush parks, and charming countryside. Whether you're seeking cultural experiences or outdoor adventures, Stuttgart has it all.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "Stuttgart seems like a hidden gem with its combination of modernity and natural surroundings. Your post has convinced me to add it to my travel bucket list!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Your descriptions of Stuttgart's countryside have me yearning for a peaceful retreat. I can't wait to escape the bustling city life and immerse myself in nature!",
        createdAt: new Date(),
      },
    ],
  },
  {
    authorId: FAKE_ID,
    createdAt: new Date(),
    bannerImage: FAKE_DATABASE_IMAGE,
    destinations: ["berlin"],
    topics: ["restaurant", "city"],
    title: "Berlin: A Culinary Adventure",
    text: "Berlin, the capital of Germany, is not only a vibrant cultural hub but also a culinary paradise. Join me as I explore Berlin's diverse food scene, from trendy street food markets to Michelin-starred restaurants. Prepare to tantalize your taste buds with the flavors of Berlin in this gastronomic adventure.",
    comments: [
      {
        authorId: FAKE_ID,
        text: "Your post has given me a newfound appreciation for Berlin's culinary offerings. I can't wait to embark on my own foodie journey in the city!",
        createdAt: new Date(),
      },
      {
        authorId: FAKE_ID,
        text: "Berlin's food scene sounds absolutely incredible. Your detailed descriptions have left me craving for a taste of Berlin's culinary delights!",
        createdAt: new Date(),
      },
    ],
  },
];

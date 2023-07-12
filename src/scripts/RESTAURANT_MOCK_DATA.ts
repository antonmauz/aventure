import { FAKE_DATABASE_IMAGE } from "./FAKE_DATABASE_IMAGE";
import { FAKE_ID } from "./FAKE_ID";

export const RESTAURANT_MOCK_DATA = [
  // Munich
  {
    name: "Bavarian Bliss",
    address: {
      country: "DE",
      street: "Marienplatz",
      houseNumber: "10",
      city: "Munich",
      zipCode: "12345",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Great food and atmosphere!",
        rating: 8.5,
      },
      // ... (more reviews)
    ],
    rating: 8.5,
    cuisines: ["bavarian"],
    highlights:
      "Experience traditional Bavarian charm and excellent service at Bavarian Bliss. Indulge in great food and soak up the delightful atmosphere.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "loweredSink", "emergencyCord"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Munich)

  // Hamburg
  {
    name: "Harbor View Restaurant",
    address: {
      country: "DE",
      street: "Hafenstraße",
      houseNumber: "15",
      city: "Hamburg",
      zipCode: "54321",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Delicious food with a stunning view!",
        rating: 8.5,
      },
      // ... (more reviews)
    ],
    rating: 9.3,
    cuisines: ["italian"],
    highlights:
      "Immerse yourself in a dining experience like no other at Harbor View Restaurant. Enjoy exquisite Italian cuisine while overlooking the stunning harbor.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "elevatedWc", "loweredSink"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Hamburg)

  // Berlin
  {
    name: "City Center Bistro",
    address: {
      country: "DE",
      street: "Alexanderplatz",
      houseNumber: "20",
      city: "Berlin",
      zipCode: "67890",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Great place to grab a quick bite!",
        rating: 8.5,
      },
      // ... (more reviews)
    ],
    rating: 7.8,
    cuisines: ["japanese"],
    highlights:
      "Discover a gem in the heart of Berlin at City Center Bistro. With its central location and diverse menu options, it's the perfect place to grab a quick bite.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink", "emergencyCord"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Berlin)

  // Frankfurt
  {
    name: "Skyline Restaurant",
    address: {
      country: "DE",
      street: "Taunusstraße",
      houseNumber: "35",
      city: "Frankfurt",
      zipCode: "45678",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Amazing views and delicious food!",
        rating: 9.5,
      },
      // ... (more reviews)
    ],
    rating: 9.5,
    cuisines: ["french"],
    highlights:
      "Treat yourself to panoramic views of the city and gourmet dishes at Skyline Restaurant. Indulge in culinary delights while marveling at the breathtaking Frankfurt skyline.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["elevatedWc", "loweredSink"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Frankfurt)

  // Cologne
  {
    name: "Cathedral Cafe",
    address: {
      country: "DE",
      street: "Domplatz",
      houseNumber: "25",
      city: "Cologne",
      zipCode: "23456",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Cozy atmosphere and great coffee!",
        rating: 8.2,
      },
      // ... (more reviews)
    ],
    rating: 8.2,
    cuisines: ["italian"],
    highlights:
      " Situated near the famous Cologne Cathedral, Cathedral Cafe offers a cozy atmosphere and great coffee. Experience specialty coffees in a charming setting.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Cologne)
  // Berlin
  {
    name: "Currywurst Corner",
    address: {
      country: "DE",
      street: "Friedrichstraße",
      houseNumber: "15",
      city: "Berlin",
      zipCode: "10117",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "The best currywurst in town! Highly recommended.",
        rating: 8.5,
      },
      // ... (more reviews)
    ],
    rating: 8.5,
    cuisines: ["german"],
    highlights:
      "Savor the authentic taste of Germany at Currywurst Corner. Enjoy the best currywurst in town with fast and friendly service.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink"],
    affiliateLink: "https://www.example.com",
  },

  // Hamburg
  {
    name: "Fisherman's Catch",
    address: {
      country: "DE",
      street: "Reeperbahn",
      houseNumber: "30",
      city: "Hamburg",
      zipCode: "20359",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Amazing seafood and cozy atmosphere. Loved it!",
        rating: 9.2,
      },
      // ... (more reviews)
    ],
    rating: 9.2,
    cuisines: ["italian"],
    highlights:
      "Embark on a seafood culinary journey at Fisherman's Catch. Delight in fresh seafood while enjoying a waterfront view.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink"],
    affiliateLink: "https://www.example.com",
  },

  // Munich
  {
    name: "Café Mozart",
    address: {
      country: "DE",
      street: "Residenzstraße",
      houseNumber: "8",
      city: "Munich",
      zipCode: "80333",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "Delicious pastries and great coffee. A must-visit!",
        rating: 9.8,
      },
      // ... (more reviews)
    ],
    rating: 9.8,
    cuisines: ["french"],
    highlights:
      "Indulge in delicious pastries and great coffee at Café Mozart. Experience the delightful flavors and cozy ambiance of this charming cafe.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink"],
    affiliateLink: "https://www.example.com",
  },

  // Frankfurt
  {
    name: "Schnitzel House",
    address: {
      country: "DE",
      street: "Kaiserstraße",
      houseNumber: "12",
      city: "Frankfurt",
      zipCode: "60311",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        createdAt: new Date(),
        text: "The schnitzels here are out of this world! Simply delicious.",
        rating: 9.5,
      },
    ],
    rating: 9.8,
    cuisines: ["french"],
    highlights:
      "Get ready to be amazed by the schnitzels at Schnitzel House. Delight in mouthwatering flavors and experience the true essence of this classic dish.",
    isVerified: true,
    images: [FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE, FAKE_DATABASE_IMAGE],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink"],
    affiliateLink: "https://www.example.com",
  },
];

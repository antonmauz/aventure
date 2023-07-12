import { FAKE_DATABASE_IMAGE } from "./FAKE_DATABASE_IMAGE";
import { FAKE_ID } from "./FAKE_ID";

export const HOTEL_MOCK_DATA = [
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
        rating: 8.7,

        text: "Great location, comfortable rooms!",
      },
      // ... (more reviews)
    ],
    stars: 4,
    rating: 8.5,
    highlights:
      "Step into traditional Bavarian charm and experience excellent service at Bavarian Bliss. A perfect blend of comfort, style, and authentic hospitality awaits you.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "loweredSink", "emergencyCord"],
    amenities: ["swimmingPool", "bar", "parkingLots"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Munich)

  // Hamburg
  {
    name: "Harbor View Hotel",
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
        rating: 9.5,

        text: "Stunning views, top-notch service!",
      },
      // ... (more reviews)
    ],
    stars: 4,
    rating: 9.3,
    highlights:
      "Indulge in luxurious accommodations at Harbor View Hotel, where stunning views of the harbor and impeccable service create an unforgettable experience of elegance and relaxation.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "elevatedWc", "loweredSink"],
    amenities: ["swimmingPool", "bar", "fitnessCenter"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Hamburg)

  // Berlin
  {
    name: "City Center Suites",
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
        rating: 7.9,

        text: "Convenient location, friendly staff",
      },
      // ... (more reviews)
    ],
    stars: 3,
    rating: 7.8,
    highlights:
      "Discover the allure of Berlin at City Center Suites, centrally located with modern rooms designed for your comfort. Immerse yourself in the vibrant atmosphere of the city.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["loweredSink", "emergencyCord"],
    amenities: ["wifi", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Berlin)

  // Frankfurt
  {
    name: "Skyline Hotel",
    address: {
      country: "DE",
      street: "Taunusstraße",
      houseNumber: "5",
      city: "Frankfurt",
      zipCode: "87654",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 8.4,

        text: "Great views of the skyline!",
      },
      {
        authorId: FAKE_ID,
        rating: 9.0,

        text: "Excellent service, comfortable rooms.",
      },
      {
        authorId: FAKE_ID,
        rating: 7.8,

        text: "Convenient location, friendly staff.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.5,

        text: "Modern and stylish hotel.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.2,

        text: "Impressive skyline views from the rooms.",
      },
    ],
    stars: 4.0,
    rating: 8.6,
    highlights:
      "Get captivated by panoramic skyline views and enjoy comfortable rooms at Skyline Hotel. Experience the perfect blend of modernity and breathtaking vistas in the heart of Frankfurt.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "loweredSink"],
    amenities: ["parkingLots", "wifi", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  {
    name: "Riverfront Suites",
    address: {
      country: "DE",
      street: "Mainstraße",
      houseNumber: "45",
      city: "Frankfurt",
      zipCode: "87654",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 9.2,

        text: "Fantastic location near the river!",
      },
      {
        authorId: FAKE_ID,
        rating: 8.7,

        text: "Spacious rooms with great river views.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.5,

        text: "Friendly staff and excellent service.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.9,

        text: "Beautifully decorated rooms.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.1,

        text: "Relaxing atmosphere and great amenities.",
      },
    ],
    stars: 4,
    rating: 8.9,
    highlights:
      "Escape to the scenic riverfront location of Riverfront Suites, where spacious rooms offer great river views. Embrace tranquility and indulge in the ultimate retreat by the water.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "elevatedWc"],
    amenities: ["bar", "parkingLots", "fitnessCenter"],
    affiliateLink: "https://www.example.com",
  },
  {
    name: "Central Plaza Hotel",
    address: {
      country: "DE",
      street: "Hauptstraße",
      houseNumber: "60",
      city: "Frankfurt",
      zipCode: "87654",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 8.8,

        text: "Convenient location, comfortable rooms.",
      },
      {
        authorId: FAKE_ID,
        rating: 7.5,

        text: "Average hotel, but good value for money.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.0,

        text: "Friendly staff and clean rooms.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.6,

        text: "Nice amenities and helpful front desk.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.2,

        text: "Decent hotel with a good breakfast buffet.",
      },
    ],
    stars: 3,
    rating: 8.2,
    highlights:
      "Unwind at Central Plaza Hotel, ideally situated in the heart of Frankfurt. Enjoy a central location, friendly staff, and a comfortable stay that feels like home.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "loweredSink", "emergencyCord"],
    amenities: ["parkingLots", "wifi", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  {
    name: "Luxury Manor",
    address: {
      country: "DE",
      street: "Lindenstraße",
      houseNumber: "75",
      city: "Frankfurt",
      zipCode: "87654",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 9.5,

        text: "Absolutely stunning and luxurious!",
      },
      {
        authorId: FAKE_ID,
        rating: 9.4,

        text: "An unforgettable experience.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.2,

        text: "Exquisite interiors and top-notch service.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.7,

        text: "Indulge in luxury at its finest.",
      },
      {
        authorId: FAKE_ID,
        rating: 9.3,

        text: "A dreamlike stay in a magnificent setting.",
      },
    ],
    stars: 4,
    rating: 9.4,
    highlights:
      "Experience opulent luxury and exquisite interiors at Luxury Manor. Immerse yourself in a world of elegance, where every detail is designed to create an unforgettable stay.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "loweredSink"],
    amenities: ["bar", "parkingLots", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  {
    name: "Urban Retreat",
    address: {
      country: "DE",
      street: "Friedrich-Ebert-Anlage",
      houseNumber: "90",
      city: "Frankfurt",
      zipCode: "87654",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 8.9,

        text: "Modern and stylish hotel with great amenities.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.7,

        text: "Comfortable rooms and friendly staff.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.6,

        text: "Convenient location for exploring the city.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.8,

        text: "Enjoyed the rooftop bar with city views.",
      },
      {
        authorId: FAKE_ID,
        rating: 8.5,

        text: "Great value for money and attentive staff.",
      },
    ],
    stars: 4,
    rating: 8.7,
    highlights:
      "Discover modern design and breathtaking city views at Urban Retreat. With a rooftop bar and stylish amenities, this hotel offers a perfect blend of comfort and sophistication.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "elevatedWc", "loweredSink"],
    amenities: ["bar", "parkingLots", "fitnessCenter"],
    affiliateLink: "https://www.example.com",
  },

  // ... (more entries for Frankfurt)

  // Stuttgart
  {
    name: "Black Forest Retreat",
    address: {
      country: "DE",
      street: "Schwarzwaldstraße",
      houseNumber: "30",
      city: "Stuttgart",
      zipCode: "24680",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 9.1,

        text: "Peaceful and relaxing getaway!",
      },
      // ... (more reviews)
    ],
    stars: 4,
    rating: 9.2,
    highlights:
      "Escape to Black Forest Retreat, surrounded by lush greenery and offering spa facilities for a peaceful and relaxing getaway. Experience tranquility in the heart of Stuttgart's beauty.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "elevatedWc", "loweredSink"],
    amenities: ["swimmingPool", "bar", "wifi", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Stuttgart)

  // Other
  {
    name: "Seaside Resort",
    address: {
      country: "DE",
      street: "Beach Road",
      houseNumber: "40",
      city: "Other",
      zipCode: "98765",
    },
    reviews: [
      {
        authorId: FAKE_ID,
        rating: 8.3,

        text: "Perfect beachfront location!",
      },
      // ... (more reviews)
    ],
    stars: 4,
    rating: 8.7,
    highlights:
      "Experience a tropical paradise with stunning beachfront views. Enjoy direct beach access, exhilarating water sports, and a range of amenities including pool, bar, parking, and restaurant.",
    isVerified: true,
    images: [
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
      FAKE_DATABASE_IMAGE,
    ],
    phoneNumber: "+49123456789",
    accessibilityAmenities: ["wcWithHandles", "groundLevelShower", "emergencyCord"],
    amenities: ["swimmingPool", "bar", "parkingLots", "wifi", "restaurant"],
    affiliateLink: "https://www.example.com",
  },
  // ... (more entries for Other)
];

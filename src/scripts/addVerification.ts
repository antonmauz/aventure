import { databaseService } from "@services";
import { MongooseHotelAccessibilityVerification } from "../services/database/model/MongooseHotelAccessibilityVerification";

databaseService.connectDB();

const add = () => {
  MongooseHotelAccessibilityVerification.create({
    authorId: "64994d303096a3a2e38a1dec",
    hospitalityType: "restaurant",
    hotelId: "6499a8a8004a59ebd2d04451",
    accessibilityAmenity: "elevatedWc",
    proofImage: "TEST",
  });
};

add();

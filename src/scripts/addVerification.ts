import { databaseService } from "@services";
import { DatabaseHotelAccessibilityVerification } from "../services/database/model/DatabaseHotelAccessibilityVerification";

databaseService.connectDB();

const add = () => {
  DatabaseHotelAccessibilityVerification.create({
    authorId: "64994d303096a3a2e38a1dec",
    hospitalityType: "restaurant",
    hotelId: "6499a8a8004a59ebd2d04451",
    accessibilityAmenity: "elevatedWc",
    proofImage: "TEST",
  });
};

add();

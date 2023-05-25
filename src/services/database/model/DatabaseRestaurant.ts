import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        tripadvisorId: {type: String, required: true, unique: true},
    },
    {timestamps: true}
);

export const DatabaseRestaurant = mongoose.model("restaurant", restaurantSchema);

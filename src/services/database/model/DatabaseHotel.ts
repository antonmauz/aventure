import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {timestamps: true}
);

export const DatabaseHotel = mongoose.model("hotel", hotelSchema);

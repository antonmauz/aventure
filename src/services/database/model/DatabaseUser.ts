import {model, Schema} from "mongoose";

const verificationStates = ["new", "accepted", "declined"]

const disabilityVerificationSchema = new Schema({
    idImage: {type: String, required: true},
    userImage: {type: String, required: true},
    status: {type: String, enum: verificationStates, required: true}
})

const userSchema = new Schema(
    {
        firstName: {type: String, required: true},
        surname: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        birthday: {type: Date, required: false},
        disabilityVerification: {type: disabilityVerificationSchema, required: false}
    },
    {timestamps: true}
);

export const DatabaseUser = model("user", userSchema);

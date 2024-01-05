import { Schema } from "mongoose";
export const workSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

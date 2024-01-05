import { Schema } from "mongoose";

export interface IWork {
  name: string;
  image: string;
  price: number;
}

export const workSchema = new Schema<IWork>({
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

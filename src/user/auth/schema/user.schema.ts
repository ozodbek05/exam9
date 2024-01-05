import { Schema } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  cauntry: string;
  education: string;
  certificates: string
}

export const userSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^([A-Za-z]|[A-Za-z]\d+)+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid fullname!`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cauntry: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  certificates:{
    type: String,
    required: true
  },
});

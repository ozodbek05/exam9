import { Schema } from "mongoose";
export const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
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
    certificates: {
        type: String,
        required: true
    },
});

import mongoose from "mongoose";
import { Schema } from "mongoose";

const gallerySchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required :true,
    },
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["tech","cultural","sports","workshop","general"],
        default: "general",
    }
},{timestamps: true})

export const Gallery = mongoose.model("Gallery", gallerySchema)

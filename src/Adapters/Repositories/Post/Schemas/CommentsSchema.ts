import { IComment } from "@/ApplicationServices/interfaces/Post/comment.interface";
import mongoose from "@utils/db";


const CommentSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        unique: false,
    },

    user: {
        type: Number,
        required: true,
        unique: false,
    },

    tags: [{
        type: String,
        required: false
    }]

});

export default mongoose.model<IComment>('Comments', CommentSchema);

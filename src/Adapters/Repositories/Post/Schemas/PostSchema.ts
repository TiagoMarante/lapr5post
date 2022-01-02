import { IPosts } from "@/ApplicationServices/interfaces/Post/post.interface";
import mongoose from "@utils/db";


const PostSchema = new mongoose.Schema({

    user: {
        type: Number,
        required: true,
        unique: false,
    },

    comments: [{
        type: mongoose
            .Schema.Types.ObjectId,
        ref: 'Comments'
    }],


    likes: [{
        type: mongoose
            .Schema.Types.ObjectId,
        ref: 'Likes'
    }],

    dislikes: [{
        type: mongoose
            .Schema.Types.ObjectId,
        ref: 'Dislikes'
    }],

    text: {
        type: String,
        required: true,
        unique: false
    },

    tags: [{
        type: String,
        required: false
    }],

    createdAt:{
        type: Date, 
        default: Date.now
    }

});


export default mongoose.model<IPosts>('Posts', PostSchema);
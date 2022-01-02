import IDislike from '@/ApplicationServices/interfaces/Post/dislike.interface';
import mongoose from "@utils/db";

const DislikeSchema = new mongoose.Schema({

    userId: {
        type: Number,
        required: true,
        unique: false,
    }

});

export default mongoose.model<IDislike>('Dislikes', DislikeSchema);
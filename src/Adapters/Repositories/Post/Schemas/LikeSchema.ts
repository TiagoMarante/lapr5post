import ILike from '@/ApplicationServices/interfaces/Post/like.interface';
import mongoose from "@utils/db";

const LikeSchema = new mongoose.Schema({

    userId: {
        type: Number,
        required: true,
        unique: false,
    }

});

export default mongoose.model<ILike>('Likes', LikeSchema);
import { IsNumber, IsString } from "class-validator";

export default class AddLikeDto {
    @IsString()
    public postId: string;

    @IsNumber()
    public userId: number;

    constructor(postId: string, userId: number) {
        this.postId = postId;
        this.userId = userId;
    }
}
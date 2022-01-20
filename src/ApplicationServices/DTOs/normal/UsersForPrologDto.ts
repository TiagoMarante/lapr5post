export default class UserForPrologDto {
    public userId: number;
    public likes: number;
    public dislikes: number;


    public constructor(userId: number, likes: number,dislikes: number, ) {
        this.userId = userId;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
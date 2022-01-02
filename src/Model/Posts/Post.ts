import Comment from './Comment';
import Like from './Like';
import Dislike from './Dislike';
import Tag from '../Shared/Tag';
import AggregateRoot from '../Shared/AggregateRoot';
import Text from './Text';
import { IPosts } from '@/ApplicationServices/interfaces/Post/post.interface';
import { IComment } from '@/ApplicationServices/interfaces/Post/comment.interface';

// export default class Post implements AggregateRoot, Entity {
export default class Posts implements AggregateRoot {
    _id: string;
    user: number;
    comments: Comment[];
    likes: Like[];
    dislikes: Dislike[];
    tags: Tag[];
    text: Text;


    public constructor(user: number, tags: Tag[], text: Text) {
        this.user = user;
        this.tags = tags;
        this.text = text;
        this.comments = [];
        this.likes = [];
        this.dislikes = [];
    }
}
import Entity from '../Shared/Entity';
import Tag from '../Shared/Tag';
export default class Comment implements Entity {
    public readonly id: string;
    private text: string;
    private user: number;
    private tags: Tag[];

    public constructor(text: string, user: number, tags?: Tag[]) {
        this.user = user;
        this.text = text;
        this.tags = tags;
    }

    public getUser(): number {
        return this.user;
    }
    public getText(): string {
        return this.text;
    }
    public setText(text: string) {
        this.text = text;
    }
    public getTags(): Tag[] {
        return this.tags;
    }
}
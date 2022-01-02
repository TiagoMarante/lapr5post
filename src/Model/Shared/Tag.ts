export default class Tag {
    private tag: string;

    public constructor(tag: string) {
        this.tag = tag;
    }

    public get value(): string {
        return this.tag;
    }
}
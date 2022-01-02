export default class Text {
    private text: string;

    public constructor(text: string) {
        this.text = text;
    }

    public get value(): string {
        return this.text;
    }


}
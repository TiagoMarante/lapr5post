import User from "../User/User";
import Entity from '../Shared/Entity';

export default class Like implements Entity {
    public readonly id: string;
    protected userId: number;

    public constructor(user: number) {
        this.userId = user;
    }

    public get User(): number {
        return this.userId;
    }
}
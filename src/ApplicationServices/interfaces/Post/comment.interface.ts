import Text from "@/Model/Posts/Text";
import Tag from "@/Model/Shared/Tag";

export interface IComment {
    text: string;
    user: number;
    tags: string[];
}
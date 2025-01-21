import UserModel from "./UserModel";
import ReplieModel from "./ReplieModel";

export default interface CommentModel {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: UserModel;
    replies: ReplieModel[];
}
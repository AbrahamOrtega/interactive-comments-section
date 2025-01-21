import UserModel from './UserModel';

export default interface RepliesModel {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: UserModel;
    replies?: RepliesModel[];
}
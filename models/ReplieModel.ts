import UserModel from './UserModel';

export default interface ReplieModel {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string
    user: UserModel;
}


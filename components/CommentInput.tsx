import UserModel from "@/models/UserModel";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentModel from "@/models/CommentModel";
import { randomId } from "@/helpers/helpers";
import ReplieModel from "@/models/ReplieModel";

interface CommentInputProps {
  currentUser: UserModel;
  type: "comment" | "reply";
  replyTo?: string;
  commentsList: CommentModel[];
  setCommentsList: (comments: CommentModel[]) => void;
  setReply?: (reply: boolean) => void;
  replyToId?: number;
}

export default function CommentInput({
  currentUser,
  type,
  replyTo,
  commentsList,
  setCommentsList,
  setReply,
  replyToId,
}: CommentInputProps) {
  const [comment, setComment] = useState<string>("");
  const [commentValue, setCommentValue] = useState<string>("");

  useEffect(() => {
    if (replyTo) {
      setCommentValue(`@${replyTo} ` + comment.slice(replyTo.length + 2));
    } else {
      setCommentValue(comment);
    }
  }, [replyTo, comment]);

  const handleSubmit = () => {
    const newCommentData = newComment(type);
    if (newCommentData.content === "") return;
    if (type === "comment") {
      addComment(newCommentData as CommentModel);
    } else {
      addReply(newCommentData as ReplieModel);
    }
    setComment("");
    setCommentValue("");
  };

  const newComment = (type: string) => {
    if (type === "comment") {
      return {
        id: randomId(),
        user: currentUser,
        content: comment,
        createdAt: "Just now",
        score: 0,
        replies: [],
      };
    } else {
      return {
        id: randomId(),
        user: currentUser,
        content: replyTo ? comment.slice(replyTo.length + 2) : comment,
        createdAt: "Just now",
        score: 0,
        replyingTo: replyTo,
      };
    }
  };

  const addComment = (newCommentData: CommentModel) => {
    setCommentsList([...commentsList, newCommentData]);
  };

  const addReply = (newCommentData: ReplieModel) => {
    const newCommentsList = commentsList.map((comment) => {
      if (comment.id === replyToId) {
        return {
          ...comment,
          replies: [...comment.replies, newCommentData],
        };
      }
      return comment;
    });
    setCommentsList(newCommentsList);
    if (setReply) {
      setReply(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full px-5 py-6 bg-white rounded-lg gap-x-4">
      <div className="flex w-full gap-x-4">
        <Image
          src={currentUser.image.png}
          alt="user"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <textarea
          className="w-full h-24 p-2 rounded border border-lightGray outline-moderateBlue"
          value={commentValue}
          onChange={(e) => setComment(e.target.value)}
          placeholder={"Add a comment..."}
          style={{ resize: "none" }}
        />
      </div>

      <button
        className="flex w-fit h-fit px-4 py-2 self-end mt-4 md:mt-0 text-white bg-moderateBlue rounded hover:bg-lightGrayishBlue"
        onClick={handleSubmit}
      >
        {type === "comment" ? "SEND" : "REPLY"}
      </button>
    </div>
  );
}

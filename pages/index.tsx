import CommentCard from "../components/CommentCard";
import { useState, useEffect } from "react";
import CommentModel from "@/models/CommentModel";
import { getComments, getCurrentUser } from "@/services/getData";
import UserModel from "@/models/UserModel";
import CommentInput from "@/components/CommentInput";

export default function Home() {
  const [commentsList, setCommentsList] = useState<CommentModel[]>([]);
  const [user, setUser] = useState<UserModel>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });

  useEffect(() => {
    setUser(getCurrentUser());
    setCommentsList(getComments());
  }, []);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col w-full max-w-[740px] gap-y-4">
        {/* Comments */}
        <div className="flex flex-col w-full gap-y-4">
          {commentsList.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUser={user}
              commentsList={commentsList}
              setCommentsList={setCommentsList}
            />
          ))}
        </div>

        {/* Comment input */}
        <CommentInput
          currentUser={user}
          type="comment"
          commentsList={commentsList}
          setCommentsList={setCommentsList}
        />
      </div>
    </div>
  );
}

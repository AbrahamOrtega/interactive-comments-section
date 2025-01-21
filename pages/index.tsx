import CommentCard from "../components/CommentCard";
import { useState, useEffect } from "react";
import CommentModel from "@/models/CommentModel";
import { getComments, getCurrentUser } from "@/services/getData";
import UserModel from "@/models/UserModel";

export default function Home() {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [user, setUser] = useState<UserModel>({
    image: {
      png: "",
      webp: "",
    },
    username: "",
  });

  useEffect(() => {
    setUser(getCurrentUser());
    setComments(getComments());
  }, []);

  return (
    <div className="flex items-center justify-center py-16">
      {/* Comments */}
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} currentUser={user} />
        ))}
      </div>
    </div>
  );
}

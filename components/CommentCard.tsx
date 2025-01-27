import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import Image from "next/image";
import CommentModel from "@/models/CommentModel";
import ReplieModel from "@/models/ReplieModel";
import UserModel from "@/models/UserModel";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import CommentInput from "./CommentInput";
import DeleteModal from "./DeleteModal";

interface CommentCardProps {
  comment: ReplieModel | CommentModel;
  currentUser: UserModel;
  key: number;
  commentsList: CommentModel[];
  setCommentsList: (comments: CommentModel[]) => void;
  replyToId?: number;
}

export default function CommentCard({
  comment,
  currentUser,
  key,
  commentsList,
  setCommentsList,
  replyToId,
}: CommentCardProps) {
  const [rate, setRate] = useState<number>(comment.score);
  const [plus, setPlus] = useState<boolean>(false);
  const [minus, setMinus] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string | null>(
    "replyingTo" in comment ? comment.replyingTo : null
  );
  const [commentEdit, setCommentEdit] = useState<string>(comment.content);
  const [commentValue, setCommentValue] = useState<string>(
    replyTo
      ? `@${replyTo} ` + commentEdit.slice(replyTo.length + 2)
      : commentEdit
  );

  useEffect(() => {
    if (replyTo) {
      setCommentValue(`@${replyTo} ` + commentEdit.slice(replyTo.length + 2));
    } else {
      setCommentValue(commentEdit);
    }
  }, [replyTo, commentEdit]);

  const handleRatePlus = () => {
    if (currentUser.username === comment.user.username) return;
    if (plus) {
      setRate(rate - 1);
      setPlus(false);
    } else if (minus) {
      setRate(rate + 2);
      setMinus(false);
      setPlus(true);
    } else {
      setRate(rate + 1);
      setPlus(true);
    }
  };

  const handleRateMinus = () => {
    if (currentUser.username === comment.user.username) return;
    if (minus) {
      setRate(rate + 1);
      setMinus(false);
    } else if (plus) {
      setRate(rate - 2);
      setPlus(false);
      setMinus(true);
    } else {
      setRate(rate - 1);
      setMinus(true);
    }
  };

  const updateComment = () => {
    if (currentUser.username !== comment.user.username) return;

    if ("replies" in comment) {
      const newCommentsList = commentsList.map((comm) => {
        if (comm.id === comment.id) {
          return {
            ...comm,
            content: commentEdit,
          };
        }
        return comm;
      });
      setCommentsList(newCommentsList);
    } else {
      const newCommentsList = commentsList.map((commentMap) => {
        if (commentMap.id === replyToId) {
          return {
            ...commentMap,
            replies: commentMap.replies.map((reply) => {
              if (reply.id === comment.id) {
                return {
                  ...reply,
                  content: replyTo
                    ? commentEdit.slice(replyTo.length + 2)
                    : commentEdit,
                };
              }
              return reply;
            }),
          };
        }
        return commentMap;
      });
      setCommentsList(newCommentsList);
    }
    setEdit(!edit);
  };

  const deleteComment = () => {
    if (currentUser.username !== comment.user.username) return;
    console.log("replies" in comment);
    if ("replies" in comment) {
      setCommentsList(commentsList.filter((comm) => comm.id !== comment.id));
    } else {
      const newCommentsList = commentsList.map((commentMap) => {
        if (commentMap.id === replyToId) {
          return {
            ...commentMap,
            replies: commentMap.replies.filter(
              (reply) => reply.id !== comment.id
            ),
          };
        }
        return commentMap;
      });
      console.log({ newCommentsList, comment, replyToId });
      setCommentsList(newCommentsList);
    }
    setDeleteModal(false);
  };

  return (
    <div key={key} className="flex flex-col w-full">
      {/* Comment card */}
      <div className="flex w-full p-6 bg-white rounded-lg gap-x-6">
        {/* Rate comment*/}
        <div className="flex flex-col h-fit py-2 px-3 bg-lightGray rounded-lg gap-y-3">
          <button
            className={`flex w-full justify-center ${
              currentUser.username === comment.user.username
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={handleRatePlus}
          >
            <FaPlus
              className={` hover:text-moderateBlue ${
                plus ? "text-moderateBlue" : "text-lightGrayishBlue"
              }`}
            />
          </button>
          <p className="text-moderateBlue font-[700] text-center">{rate}</p>
          <button
            className={`flex w-full justify-center ${
              currentUser.username === comment.user.username
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={handleRateMinus}
          >
            <FaMinus
              className={` hover:text-moderateBlue ${
                minus ? "text-moderateBlue" : "text-lightGrayishBlue"
              }`}
            />
          </button>
        </div>

        {/* Comment */}
        <div className="flex w-full flex-col gap-y-4">
          {/* Comment header */}
          <div className="flex w-full justify-between">
            {/* User */}
            <div className="flex items-center gap-x-4">
              <Image
                src={comment.user.image.png}
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
              <p className="text-darkBlue font-[700]">
                {comment.user.username}
              </p>
              {/* You */}
              {currentUser.username === comment.user.username && (
                <p className="text-white bg-moderateBlue -ml-2 px-1 rounded font-[500]">
                  you
                </p>
              )}
              <p className="text-grayishBlue font-[400]">{comment.createdAt}</p>
            </div>
            {/* Reply and edit */}
            {currentUser.username === comment.user.username ? (
              <div className="flex gap-x-4">
                <button
                  className="flex gap-x-1 items-center text-softRed hover:text-paleRed"
                  onClick={() => setDeleteModal(true)}
                >
                  <MdDelete />
                  <p className="font-[700]">Delete</p>
                </button>
                <DeleteModal
                  open={deleteModal}
                  setOpen={setDeleteModal}
                  deleteComment={deleteComment}
                />
                <button
                  className="flex gap-x-1 items-center text-moderateBlue hover:text-lightGrayishBlue"
                  onClick={() => setEdit(!edit)}
                >
                  <MdEdit />
                  <p className="font-[700]">Edit</p>
                </button>
              </div>
            ) : (
              <button
                className={`flex items-center hover:text-lightGrayishBlue font-[700] ${
                  reply ? "text-lightGrayishBlue" : "text-moderateBlue"
                }`}
                onClick={() => setReply(!reply)}
              >
                <FaReply className="mr-2" />
                Reply
              </button>
            )}
          </div>

          {/* Comment body */}
          {edit ? (
            <div className="flex flex-col items-end gap-y-4">
              <textarea
                className="w-full h-24 p-2 rounded border border-lightGray outline-moderateBlue"
                value={commentValue}
                onChange={(e) => setCommentEdit(e.target.value)}
                style={{ resize: "none" }}
              />
              <button
                className="flex w-fit h-fit px-4 py-2 text-white bg-moderateBlue rounded hover:bg-lightGrayishBlue"
                onClick={updateComment}
              >
                UPDATE
              </button>
            </div>
          ) : (
            <p className="text-grayishBlue font-medium">
              {replyTo && (
                <span className="text-moderateBlue">@{replyTo} </span>
              )}
              <span>{comment.content}</span>
            </p>
          )}
        </div>
      </div>

      {/* Reply input */}
      {reply && (
        <div className="flex w-full mt-4">
          <CommentInput
            currentUser={currentUser}
            type="reply"
            replyTo={comment.user.username}
            commentsList={commentsList}
            setCommentsList={setCommentsList}
            setReply={setReply}
            replyToId={replyToId ? replyToId : comment.id}
          />
        </div>
      )}

      {/* Replies Section*/}
      {"replies" in comment && comment.replies.length > 0 && (
        <div className="flex w-full h-fit mt-4">
          <div className="flex flex-grow w-[2px] mx-10 h-auto bg-grayishBlue opacity-15" />
          {/* Replies */}
          <div className="flex w-full flex-col gap-y-4">
            {comment.replies &&
              comment.replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  commentsList={commentsList}
                  setCommentsList={setCommentsList}
                  replyToId={comment.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

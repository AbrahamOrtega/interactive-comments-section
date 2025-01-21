import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import Image from "next/image";
import CommentModel from "@/models/CommentModel";
import ReplieModel from "@/models/ReplieModel";
import UserModel from "@/models/UserModel";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface CommentCardProps {
  comment: CommentModel | ReplieModel;
  currentUser: UserModel;
  key: number;
}

export default function CommentCard({
  comment,
  currentUser,
  key,
}: CommentCardProps) {
  const [rate, setRate] = useState<number>(comment.score);
  const [plus, setPlus] = useState<boolean>(false);
  const [minus, setMinus] = useState<boolean>(false);

  const handleRatePlus = () => {
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

  return (
    <div key={key} className="flex flex-col w-full max-w-[740px]">
      {/* Comment card */}
      <div className="flex w-full p-6 bg-white rounded-lg gap-x-6">
        {/* Rate comment*/}
        <div className="flex flex-col h-fit p-2 bg-lightGray rounded gap-y-3">
          <button
            className="flex w-full justify-center"
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
            className="flex w-full justify-center"
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
                <button className="flex gap-x-1 items-center text-softRed hover:text-paleRed">
                  <MdDelete />
                  <p className="font-[700]">Delete</p>
                </button>
                <button className="flex gap-x-1 items-center text-moderateBlue hover:text-lightGrayishBlue">
                  <MdEdit />
                  <p className="font-[700]">Edit</p>
                </button>
              </div>
            ) : (
              <button className="flex items-center text-moderateBlue hover:text-lightGrayishBlue font-[700]">
                <FaReply className="mr-2" />
                Reply
              </button>
            )}
          </div>

          {/* Comment body */}
          <p className="text-grayishBlue font-medium">{comment.content}</p>
        </div>
      </div>

      {/* Replies Section*/}
      {comment.replies && (
        <div className="flex w-full h-fit mt-6">
          <div className="flex flex-grow w-[2px] mx-9 h-auto bg-grayishBlue opacity-15" />
          {/* Replies */}
          <div className="flex flex-col gap-y-6">
            {comment.replies &&
              comment.replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

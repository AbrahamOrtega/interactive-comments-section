interface DeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteComment: () => void;
}

export default function DeleteModal({
  open,
  setOpen,
  deleteComment,
}: DeleteModalProps) {
  return (
    <div
      className={`fixed inset-0 ${
        open ? "flex" : "hidden"
      } items-center justify-center z-20`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white p-8 w-80 rounded-lg">
          <h2 className="text-2xl font-bold text-darkBlue">Delete Comment</h2>
          <p className="text-grayishBlue mt-4">
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </p>
          <div className="flex justify-between mt-8 gap-x-4 text-[16px]">
            <button
              className="text-white bg-grayishBlue hover:bg-lightGray rounded-lg py-2 w-full"
              onClick={() => setOpen(false)}
            >
              NO, CANCEL
            </button>
            <button
              className="text-white bg-softRed hover:bg-paleRed rounded-lg py-2 w-full"
              onClick={deleteComment}
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

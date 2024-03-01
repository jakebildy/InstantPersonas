import { useEffect, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import { useNotification } from "../../contexts/NotificationContext";

// InputField props.
interface Props {
  label: string;
  placeholder: string;
  comment: string;
  setComment: (comment: string) => void;
  onSubmit?: (comment: string) => void;
}

const CommentBox = ({
  placeholder = "Press Generate Comment to generate comment text...",
  comment,
  setComment,
  onSubmit,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    setCopied(false)
  }, [comment])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(comment);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(comment);
    setCopied(true);
    showNotification("Copied to clipboard!", "success", 2000);
  };

  const onCommentChange = (e: any) => {
    setComment(e.target.value);
    setCopied(false);
  };

  return (
    <div className="min-w-0 flex-1">
      <form action="#" className="relative" onSubmit={handleSubmit}>
        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 rounded-b-none">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={15}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            value={comment}
            onChange={onCommentChange}
          />
        </div>

        <div className="mt-[-1px] flex justify-end py-2 pl-3 pr-2 bg-white rounded-b-lg shadow-sm ring-1 ring-inset ring-gray-300">
          {/* Copy to clipboard function. */}
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              onClick={handleCopyToClipboard}
            >
              {
                // If copied, show checkmark icon.
                copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                ) : (
                  <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                )
              }
              <span className="sr-only">Copy comment to clipboard</span>
            </button>
          </div>

          {/* Word and character count */}
          <div className="flex flex-row items-center h-10">
            <p className="pl-2 text-sm font-medium text-gray-500">
              {comment.length} characters
            </p>

            <p className="pl-2 text-sm font-medium text-gray-500">
              {comment.split(" ").length} words
            </p>
          </div>

          <div className="flex-grow"></div>

          {/* 
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Changes
            </button>
          </div> 
          */}
        </div>
      </form>
    </div>
  );
};

export default CommentBox;

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export function UploadImage({
  currentImageUrl,
  onUpload,
}: {
  currentImageUrl: string;
  onUpload: (url: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newURL = URL.createObjectURL(file);
      onUpload(newURL);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const inputDisplayText = isDragActive
    ? ">.< Drop the file here..."
    : "Drag or click to upload image";

  return (
    <div>
      <div
        {...getRootProps()}
        className=" group cursor-pointer border-dashed border h-[200px] grid place-items-center text-xs border-blue-500/50 rounded-md bg-transparent px-3 py-2 hover:border-blue-500 hover:shadow-lg shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center gap-4 group-hover:scale-110 transition-all duration-200 ease-out">
          <div className="relative w-full h-full aspect-[400/209] max-w-[400px] ">
            {currentImageUrl ? (
              <Image src={currentImageUrl} alt="OG Image Preview" fill={true} />
            ) : null}
          </div>
          <p className={"text-foreground"}>{inputDisplayText}</p>
        </div>
      </div>
    </div>
  );
}

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
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const inputDisplayText = isDragActive
    ? ">.< Drop the file here..."
    : "Drag or click to upload image";

  return (
    <div>
      <div
        {...getRootProps()}
        className="group grid h-[200px] cursor-pointer place-items-center rounded-md border border-dashed border-blue-500/50 bg-transparent px-3 py-2 text-xs shadow-md transition-all duration-200 hover:border-blue-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 transition-all duration-200 ease-out group-hover:scale-110">
          <div className="relative aspect-[400/209] h-full w-full max-w-[400px]">
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

import React from "react";

type Props = {
  videos: string[];
};

export function VideoContentList({ videos }: Props) {
  return (
    <div className="flex flex-row flex-wrap">
      {videos.map((url: string) => {
        return (
          <div key={url} className="border rounded-sm overflow-hidden">
            <iframe
              width="200"
              height="344"
              className="p-2"
              src={url}
              allow="accelerometer; autoplay: false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      })}
    </div>
  );
}

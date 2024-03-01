import { useState } from "react";

export function TemplateChip({
  name,
  url,
  templatesToGenerate,
  setTemplatesToGenerate,
}: {
  name: string;
  url: string;
  templatesToGenerate: string[];
  setTemplatesToGenerate: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selected, setSelected] = useState(true);

  return (
    <div
      className={
        "cursor-pointer flex flex-row select-none" +
        (selected
          ? "flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-green-700 bg-green-100 border border-green-300 "
          : "flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-400 bg-gray-100 border border-gray-200 ")
      }
      onClick={() => {
        setSelected(!selected);
        if (selected) {
          const newTemplates = templatesToGenerate.filter(
            (template) => template !== name
          );
          setTemplatesToGenerate(newTemplates);
        } else {
          setTemplatesToGenerate([...templatesToGenerate, name]);
        }
      }}
    >
      <img
        className="w-4 h-4 bg-white m-1 mr-2 ml-0 my-0 text-xs rounded-full select-none"
        alt={name}
        src={url}
      />
      <div className="text-xs font-normal leading-none select-none">{name}</div>
    </div>
  );
}

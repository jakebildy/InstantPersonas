import {
  ColorVariant,
  textColorVariants,
  TextArea600,
} from "@/components/variants";
import { useState, useEffect } from "react";

export function EditorTextField({
  label,
  value,
  onChange,
  id,
  initialValue,
  variant,
}: {
  variant: ColorVariant;
  value: string;
  onChange: (e: string) => void;
  label: string;
  id: string;
  initialValue: string;
}) {
  const [isEdited, setIsEdited] = useState(value !== initialValue);

  useEffect(() => {
    setIsEdited(value !== initialValue);
  }, [value, initialValue]);

  return (
    <li className="mb-4 flex flex-col gap-1">
      <span
        className={textColorVariants({
          variant,
          className: "inline-flex gap-2 text-sm font-semibold",
        })}
      >
        {label}{" "}
        {isEdited ? (
          <span className="rounded-lg border border-pastel-red bg-pastel-red/25 px-2 text-[9px] uppercase text-red-500">
            unsaved changes
          </span>
        ) : null}
      </span>
      <textarea
        className={TextArea600({
          variant,
        })}
        placeholder={initialValue}
        value={value}
        name={id}
        id={id}
        onChange={(e) => onChange(e.target.value)}
      />
    </li>
  );
}

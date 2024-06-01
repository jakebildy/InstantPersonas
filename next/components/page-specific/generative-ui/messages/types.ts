import { HTMLAttributes } from "react";

export interface MessageComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
}

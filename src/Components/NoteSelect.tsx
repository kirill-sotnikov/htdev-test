import { ComponentPropsWithoutRef, CSSProperties, memo } from "react";
import { NoteTextAreaTitle } from "./NoteTextArea";

interface NoteSelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "width" | "title"> {
  options: string[];
  width?: CSSProperties["width"];
  title?: string;
}

const NoteSelect = memo(
  ({ width, options, title, ...props }: NoteSelectProps) => {
    return (
      <div style={{ width: width ? width : "100%", minWidth: "150px" }}>
        <NoteTextAreaTitle>{title}</NoteTextAreaTitle>
        <select style={{ padding: 3, width: "100%" }} {...props}>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default NoteSelect;

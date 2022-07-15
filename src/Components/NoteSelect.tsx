import { ComponentPropsWithRef, CSSProperties, forwardRef } from "react";
import { NoteTextAreaTitle } from "./NoteTextArea";

interface NoteSelectProps
  extends Omit<ComponentPropsWithRef<"select">, "width" | "title"> {
  options: string[];
  width?: CSSProperties["width"];
  title?: string;
}

const NoteSelect = forwardRef<HTMLSelectElement, NoteSelectProps>(
  ({ width, options, title, ...props }, ref) => {
    return (
      <div style={{ width: width ? width : "100%", minWidth: "150px" }}>
        <NoteTextAreaTitle>{title}</NoteTextAreaTitle>
        <select
          style={{ padding: 3, width: "100%" }}
          {...props}
          defaultValue={options[0]}
          ref={ref}
        >
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

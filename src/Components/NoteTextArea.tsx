import {
  ComponentPropsWithoutRef,
  CSSProperties,
  memo,
  ReactNode,
} from "react";
import styled from "styled-components";

interface NoteTextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  noteTitle?: ReactNode;
  textAreaSize?: CSSProperties["width"];
}

const NoteTextArea = memo(
  ({ textAreaSize, noteTitle, ...props }: NoteTextAreaProps) => (
    <div style={{ width: textAreaSize ? textAreaSize : "100%", minWidth: 230 }}>
      <NoteTextAreaTitle>{noteTitle}</NoteTextAreaTitle>
      <TextArea {...props} style={props.style}></TextArea>
    </div>
  )
);

export default NoteTextArea;

const TextArea = styled.textarea`
  width: 100%;
  min-width: 230px;
  resize: none;
  height: 250px;
  padding: 5px;
  box-sizing: border-box;
`;

export const NoteTextAreaTitle = styled.p`
  align-self: flex-start;
  font-family: sans-serif;
  margin: 16px 0px 5px 10px;
  color: #363535;
`;

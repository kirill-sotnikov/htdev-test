import { useEffect, useState } from "react";
import styled from "styled-components";

interface NoteProps {
  number: number;
  time: string;
  sign: string;
  children: string;
}

const NoteBlock = ({ number, time, sign, children }: NoteProps) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      window.location.assign(`/note/${number}`);
    }
  }, [isClicked]);

  return (
    <NoteBlockWrapper onClick={() => setIsClicked(true)}>
      <SmallText>{sign}</SmallText>
      <p>Запись №{number}</p>
      <SmallText>{time}</SmallText>
      <Text>{children}</Text>
    </NoteBlockWrapper>
  );
};

export default NoteBlock;

const NoteBlockWrapper = styled.div`
  word-wrap: break-word;
  font-family: sans-serif;
  border: 1px solid #c5bcbc;
  filter: drop-shadow(0px 1px 4px #ececec);
  border-radius: 5px;
  padding: 7px;
  max-width: 175px;
  min-width: 100px;
  margin: 10px 5px 0 5px;
  cursor: pointer;
`;

export const SmallText = styled.p`
  font-size: 14px;
  color: #736868;
`;

const Text = styled.p`
  word-wrap: break-word;
  max-height: 96px;
  overflow: auto;
`;

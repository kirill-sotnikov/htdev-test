import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { MainInnerDiv, MainOuterDiv, Note } from ".";
import Header from "../src/Components/Header";
import NoteBlock from "../src/Components/NoteBlock";
const Notes = memo(() => {
  const [listOfNote, setListOfNote] = useState<Note[]>();

  useEffect(() => {
    getAllNote();
  }, []);

  async function getAllNote() {
    const allKeys = Object.keys(window.localStorage).filter((item) =>
      item.includes("htdevNote")
    );

    const res: Note[] = allKeys.map((item) =>
      JSON.parse(window.localStorage.getItem(item))
    );

    console.log(res);

    setListOfNote(res);
  }

  return (
    <MainOuterDiv>
      <MainInnerDiv>
        <Header page={2} />
        <List>
          {listOfNote
            ? listOfNote.map((item, index) => (
                <NoteBlock
                  key={index}
                  sign={item.sign}
                  time={item.date}
                  number={index}
                >
                  {item.text}
                </NoteBlock>
              ))
            : "Здесь пока что ничего нет"}
        </List>
      </MainInnerDiv>
    </MainOuterDiv>
  );
});

export default Notes;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  justify-content: center;
  width: fit-content;

  @media screen and (min-width: 734px) {
    & {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media screen and (min-width: 992px) {
    & {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;

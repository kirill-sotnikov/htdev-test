import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../src/Components/Button";
import Header from "../src/Components/Header";
import NoteSelect from "../src/Components/NoteSelect";
import NoteTextArea from "../src/Components/NoteTextArea";
import { setSign, setText, setTz } from "../store/createNotePageReducer";
import { useAppSelector } from "../store/hooks";

const App = memo(() => {
  const [timezone, setTimezone] = useState<string[]>();
  const dispatch = useDispatch();

  // Test
  const infoText = useAppSelector((state) => state.createNotePage.text);
  const infoSign = useAppSelector((state) => state.createNotePage.sign);
  const infoDate = useAppSelector((state) => state.createNotePage.date);
  const infoTz = useAppSelector((state) => state.createNotePage.tz);

  // End test

  async function getTimezone() {
    return await axios
      .get("https://worldtimeapi.org/api/timezone")
      .then((res) => setTimezone(res.data));
  }

  useEffect(() => {
    getTimezone();
  }, []);

  // Test
  useEffect(() => {
    console.log("infotext: ", infoText);
    console.log("infoSign: ", infoSign);
    console.log("infoDate: ", infoDate);
    console.log("infoTz: ", infoTz);
  });
  // End test

  return (
    <MainOuterDiv>
      <MainInnerDiv>
        <Header page={1} />
        <NoteTextArea
          noteTitle="Запись"
          onChange={(event) => dispatch(setText(event.target.value))}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <NoteTextArea
            noteTitle="Подпись"
            textAreaSize="54%"
            maxLength={100}
            onChange={(event) => dispatch(setSign(event.target.value))}
            style={{
              height: "90px",
              width: "40%",
              alignSelf: "flex-start",
            }}
          />
          <NoteSelect
            title="Точное время по"
            width="40%"
            options={timezone ? timezone : ["Загрузка..."]}
            onChange={(event) => dispatch(setTz(event.target.value))}
          />
        </div>
        <Button
          onClick={() => console.log("hello")}
          style={{ alignSelf: "flex-end", marginTop: "30px" }}
        >
          Отправить
        </Button>
      </MainInnerDiv>
    </MainOuterDiv>
  );
});
export default App;

export const MainOuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainInnerDiv = styled.div`
  width: 44%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 300px;
  max-width: 500px;
`;

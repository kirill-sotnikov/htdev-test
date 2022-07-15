import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../src/Components/Button";
import Header from "../src/Components/Header";
import NoteSelect from "../src/Components/NoteSelect";
import NoteTextArea from "../src/Components/NoteTextArea";
import Notification from "../src/Components/Notification";
import {
  setDate,
  setSign,
  setText,
  setTz,
} from "../store/createNotePageReducer";
import { useAppSelector } from "../store/hooks";

export interface Note {
  text: string;
  sign: string;
  date: string | undefined;
  tz: string;
}

const App = memo(() => {
  const [timezone, setTimezone] = useState<string[]>();
  const dispatch = useDispatch();
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);
  const [noteTextValue, setNoteTextValue] = useState<string>("");
  const [noteSignValue, setNoteSignValue] = useState<string>("");
  const noteSelectrRef = useRef(null);
  const [notificationSuccesShow, setNotificationSuccesShow] =
    useState<boolean>(false);
  const [notificationErrorShow, setNotificationErrorShow] =
    useState<boolean>(false);
  const [lastParams, setLastParams] = useState<Note>();

  const infoText = useAppSelector((state) => state.createNotePage.text);
  const infoSign = useAppSelector((state) => state.createNotePage.sign);
  const infoDate = useAppSelector((state) => state.createNotePage.date);
  const infoTz = useAppSelector((state) => state.createNotePage.tz);

  async function getTimezone() {
    return await axios
      .get("https://worldtimeapi.org/api/timezone")
      .then((res) => setTimezone(res.data));
  }

  async function getTimeOfTimezone() {
    if (infoText && infoSign && infoTz) {
      setButtonIsLoading(true);
      axios
        .get(`https://worldtimeapi.org/api/timezone/${infoTz}`)
        .then((data) => {
          dispatch(setDate(data.data.datetime));
          setButtonIsLoading(false);
          console.log("CurNOTE ", infoDate);
          const currentNote: Note = {
            text: infoText,
            sign: infoSign,
            date: data.data.datetime,
            tz: infoTz,
          };
          window.localStorage.setItem(
            `htdevNote${data.data.datetime}`,
            JSON.stringify(currentNote)
          );
          window.localStorage.setItem(
            `htdevLastParams`,
            JSON.stringify(currentNote)
          );
          setNoteTextValue("");
          dispatch(setText(""));
          handleClickShowNotification(setNotificationSuccesShow);
        })
        .catch(() => {
          setButtonIsLoading(false);
          alert("Пожалуйста, перезагрузите страницу и попробуйте еще раз");
        });
    } else {
      handleClickShowNotification(setNotificationErrorShow);
    }
  }

  useEffect(() => {
    getTimezone().then(() => {
      setTimeout(() => {
        if (noteSelectrRef) {
          dispatch(setTz(noteSelectrRef.current?.value));
        }
      }, 1000);
    });
    const lastParamsLastCreatedNote = JSON.parse(
      window.localStorage.getItem("htdevLastParams")
    );
    setLastParams(lastParamsLastCreatedNote);
    setNoteSignValue(lastParamsLastCreatedNote?.sign);
    dispatch(setSign(lastParamsLastCreatedNote?.sign));
  }, []);

  const handleClickShowNotification = (
    action: typeof setNotificationSuccesShow
  ) => {
    action(true);
    setTimeout(() => {
      action(false);
    }, 3000);
  };

  return (
    <MainOuterDiv>
      <MainInnerDiv>
        <Notification isOpen={notificationSuccesShow}>
          Запись создана
        </Notification>
        <Notification error isOpen={notificationErrorShow}>
          Заполните все поля
        </Notification>
        <Header page={1} />
        <NoteTextArea
          noteTitle="Запись"
          value={noteTextValue}
          onChange={(event) => {
            setNoteTextValue(event.target.value);
            dispatch(setText(noteTextValue));
          }}
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
            onChange={(event) => {
              setNoteSignValue(event.target.value);
              dispatch(setSign(event.target.value));
            }}
            style={{
              height: "90px",
              width: "40%",
              alignSelf: "flex-start",
            }}
            value={noteSignValue}
          />
          <NoteSelect
            title="Точное время по"
            width="40%"
            options={
              timezone
                ? lastParams
                  ? [lastParams.tz, ...timezone]
                  : timezone
                : ["Загрузка..."]
            }
            onChange={(event) => dispatch(setTz(event.target.value))}
            ref={noteSelectrRef}
          />
        </div>
        <Button
          isLoading={!timezone || buttonIsLoading}
          onClick={getTimeOfTimezone}
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
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainInnerDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 300px;
  max-width: 900px;
`;

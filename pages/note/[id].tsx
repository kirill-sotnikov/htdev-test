import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { MainOuterDiv } from "..";
import { SmallText } from "../../src/Components/NoteBlock";

const NoteId = memo(() => {
  const [localSt, setLocalSt] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const NumberId = Number(id);

  useEffect(() => {
    const keys = Object.keys(window.localStorage).filter((item) =>
      item.includes("htdevNote")
    );

    const values = keys.map((key) =>
      JSON.parse(window.localStorage.getItem(key))
    );

    setLocalSt(values);
    console.log(values);
  }, []);

  if (Number(id) > localSt.length - 1) {
    return <div>Page not found</div>;
  }

  return (
    <MainOuterDiv>
      <NoteWrapper>
        <SmallText>
          {localSt[NumberId] ? localSt[NumberId]["sign"] : "Sign"}
        </SmallText>
        <p style={{}}>
          {localSt[NumberId] ? localSt[NumberId]["text"] : "Text"}{" "}
        </p>
        <SmallText style={{ marginBottom: 5 }}>
          {localSt[NumberId] ? localSt[NumberId]["date"] : "Date"}
        </SmallText>
        <SmallText style={{ marginTop: 5 }}>
          {localSt[NumberId] ? localSt[NumberId]["tz"] : "Tz"}
        </SmallText>
      </NoteWrapper>
    </MainOuterDiv>
  );
});

export default NoteId;

const NoteWrapper = styled.div`
  width: 70%;
  word-break: break-word;
`;

import { memo } from "react";
import { MainInnerDiv, MainOuterDiv } from ".";
import Header from "../src/Components/Header";

const Contacts = memo(() => (
  <MainOuterDiv>
    <MainInnerDiv>
      <Header page={2} />
    </MainInnerDiv>
  </MainOuterDiv>
));
export default Contacts;

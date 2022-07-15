import Link from "next/link";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";

interface HeaderProps {
  page: 1 | 2;
}

const Header = ({ page }: HeaderProps) => (
  <HeaderBlock>
    <Link href="/">
      <HeaderButton activited={page === 1}>Создать запись</HeaderButton>
    </Link>
    <Link href="notes">
      <HeaderButton activited={page === 2}>Записи</HeaderButton>
    </Link>
  </HeaderBlock>
);

export default Header;

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
`;

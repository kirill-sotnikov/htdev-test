import { ComponentPropsWithRef, forwardRef } from "react";
import styled from "styled-components";

interface HeaderButton extends ComponentPropsWithRef<"button"> {
  activited?: boolean;
}

const HeaderButton = forwardRef<HTMLButtonElement, HeaderButton>(
  ({ activited, children, ...props }, ref) => (
    <Button
      style={activited ? { borderBottom: "2px solid blue" } : {}}
      {...props}
    >
      {children}
    </Button>
  )
);

export default HeaderButton;

const Button = styled.button`
  flex-shrink: 0;
  text-decoration: none;
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-bottom: 2px solid white;

  &:hover {
    background-color: #fafafa;
  }
`;

import Image from "next/image";
import { ComponentPropsWithRef } from "react";
import styled, { keyframes } from "styled-components";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  isLoading?: boolean;
}

const Button = ({ isLoading, children, ...props }: ButtonProps) => (
  <ButtonInside {...props} onClick={isLoading ? () => {} : props.onClick}>
    <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
      {children}
    </span>
    {isLoading && (
      <ImageWrapper>
        <Image
          src="/img/download.svg"
          alt="Picture of the author"
          width={20}
          height={20}
        />
      </ImageWrapper>
    )}
  </ButtonInside>
);

export default Button;

const ButtonInside = styled.button`
  text-decoration: none;
  border: none;
  background-color: #71aaff;
  font-family: sans-serif;
  font-size: 600;
  cursor: pointer;
  padding: 9px 12px;
  border-radius: 4px;
  color: white;
  position: relative;

  &:hover {
    background-color: #5f9fff;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg) ;
  }
  to {
    transform: rotate(360deg);
  }
`;

const ImageWrapper = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: ${rotate} 2s linear infinite;
`;

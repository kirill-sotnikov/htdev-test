import Image from "next/image";
import styled from "styled-components";

interface NotificationProps {
  children: string;
  isOpen?: boolean;
  error?: boolean;
}

const Notification = ({ children, isOpen, error }: NotificationProps) => (
  <NotificationWrapper style={{ display: isOpen ? "flex" : "none" }}>
    {error ? (
      <Image
        src="/img/notificationError.svg"
        alt="Picture of the author"
        width={24}
        height={24}
      />
    ) : (
      <Image
        src="/img/notificationSucces.svg"
        alt="Picture of the author"
        width={24}
        height={24}
      />
    )}
    <span style={{ marginLeft: 20, marginRight: 15 }}>{children}</span>
  </NotificationWrapper>
);

export default Notification;

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #71aaff;
  border-radius: 5px;
  padding: 9px 12px;
  font-family: sans-serif;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
`;

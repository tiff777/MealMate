import React from "react";
import NormalButton from "./NormalButton";
import JoinButton from "./JoinButton";
import SubmitButton from "./SubmitButton";
import LeaveButton from "./LeaveButton";

type ButtonType =
  | "view"
  | "join"
  | "leave"
  | "edit"
  | "delete"
  | "cancel"
  | "submit";

interface ButtonFactoryProps {
  type: ButtonType;
  message: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function ButtonFactory({
  type,
  message,
  onClick,
  disabled = false,
}: ButtonFactoryProps) {
  switch (type) {
    case "view":
      return (
        <NormalButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "join":
      return <JoinButton message={message} onClick={onClick} />;

    case "leave":
      return <LeaveButton message={message} onClick={onClick} />;

    // case "edit":
    //   return <EditButton onClick={onClick} disabled={disabled} />;

    case "delete":
      return (
        <NormalButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "cancel":
      return (
        <NormalButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "submit":
      return <SubmitButton message={message} />;

    default:
      return null;
  }
}

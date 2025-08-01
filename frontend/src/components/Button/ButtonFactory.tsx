import NormalButton from "./NormalButton";
import JoinButton from "./JoinButton";
import SubmitButton from "./SubmitButton";
import LeaveButton from "./LeaveButton";
import DeleteButton from "./DeleteButton";
import MessageButton from "./MessageButton";

type ButtonType =
  | "view"
  | "join"
  | "leave"
  | "edit"
  | "delete"
  | "cancel"
  | "submit"
  | "message";

interface ButtonFactoryProps {
  type: ButtonType;
  message: string;
  onClick?: () => void;
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
      return (
        <JoinButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "leave":
      return <LeaveButton message={message} onClick={onClick} />;

    case "edit":
      return (
        <NormalButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "delete":
      return <DeleteButton message={message} onClick={onClick} />;

    case "cancel":
      return (
        <NormalButton message={message} onClick={onClick} disabled={disabled} />
      );

    case "message":
      return (
        <MessageButton
          message={message}
          onClick={onClick}
          disabled={disabled}
        />
      );

    case "submit":
      return <SubmitButton message={message} disabled={disabled} />;

    default:
      return null;
  }
}

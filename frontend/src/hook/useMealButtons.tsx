import { useCallback } from "react";
import ButtonFactory from "../components/Button/ButtonFactory";

export function useMealButtons({
  onDelete,
  onLeave,
  onJoin,
  onMessage,
}: {
  onDelete: (mid: number) => void;
  onLeave: (mid: number) => void;
  onJoin: (mid: number) => void;
  onMessage: (chatRoomId: number) => void;
}) {
  return useCallback(
    (meal: any) => {
      if (meal.isHost) {
        return [
          <ButtonFactory
            key="delete"
            type="delete"
            message="Delete"
            onClick={() => onDelete(meal.mid)}
            disabled={false}
          />,
        ];
      }

      if (meal.isJoined) {
        return [
          <ButtonFactory
            key="leave"
            type="leave"
            message="Leave"
            onClick={() => onLeave(meal.mid)}
          />,
          <ButtonFactory
            key="message"
            type="message"
            message="Message"
            onClick={() => onMessage(meal.chartRoomId)}
          />,
        ];
      }

      return [
        <ButtonFactory
          key="join"
          type="join"
          message="Join"
          onClick={() => onJoin(meal.mid)}
        />,
      ];
    },
    [onDelete, onLeave, onJoin, onMessage]
  );
}

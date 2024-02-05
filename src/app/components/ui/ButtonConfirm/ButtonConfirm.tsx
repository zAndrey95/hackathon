import { useGame } from "../../provider/GameContext/GameContext";
import { EGameStage, ERole } from "../../shared/types";
import { Button } from "../Button/Button";

export const ButtonConfirm = ({
  handleConfirm,
  isLoading,
}: {
  handleConfirm: () => void;
  isLoading?: boolean;
}) => {
  const { role, stage } = useGame();
  const isDealer = role === ERole.DEALER;
  const isPlayer = role === ERole.PLAYER;

  if (
    (isDealer && stage === EGameStage.FINISHED) ||
    (isPlayer && stage === EGameStage.STARTED)
  )
    return (
      <Button
        isLoading={isLoading}
        title="Confirm"
        handleClick={handleConfirm}
      />
    );

  return null;
};

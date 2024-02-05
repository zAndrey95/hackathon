// Loader.tsx
import React from "react";
import { useGame } from "../../provider/GameContext/GameContext";
import { EGameStage, ERole } from "../../shared/types";

interface IInfoMessage {
  [key: string]: {
    [key: string]: string;
  };
}

const infoMessage: IInfoMessage = {
  [ERole.DEALER]: {
    [EGameStage.STARTED]: "You are the Host! Waiting for players to choose their answers:",
    [EGameStage.FINISHED]: "Choose the best answer:",
  },
  [ERole.PLAYER]: {
    [EGameStage.STARTED]: "Choose your answer:",
    [EGameStage.FINISHED]: "Wait for other players:",
  },
};

export const InfoMessage: React.FC = () => {
  const { stage, role } = useGame();
  const isDealer = role === ERole.DEALER;
  const isPlayer = role === ERole.PLAYER;

  console.log("stage", stage, role);
  return (
    (isDealer || isPlayer) && (
      <div className="text-3xl font-bold my-10">{infoMessage[role][stage]}</div>
    )
  );
};

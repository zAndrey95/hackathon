"use client";
import React, { use, useEffect, useState } from "react";
import { UserList } from "../../ui/UserList/UserList";
import { GameContent } from "../../ui/GameContent/GameContent";
import { Rules } from "../../game/Rules/Rules";
import { WaitingRoom } from "../../game/WaitingRoom/WaitingRoom";
import { ChooseCard } from "../../game/ChooseCard/ChooseCard";
import { EGameStage, ERole } from "../../shared/types";
import { Loader } from "../../ui/Loader/Loader";
import { useGame } from "../../provider/GameContext/GameContext";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const getGameContent = (stage: EGameStage, role: ERole, room: string) => {
  switch (stage) {
    case EGameStage.RULES:
      return <Rules room={room} />;
    case EGameStage.WAITING:
      return <WaitingRoom />;
    case EGameStage.STARTED:
      return <ChooseCard room={room} />;
    case EGameStage.FINISHED:
      return <ChooseCard room={room} />;
    case EGameStage.ENDED:
      return <ChooseCard room={room} />;

    default:
      return <Loader message="" />;
  }
};

export const Game = ({ room }: { room: number }) => {
  const { stage, role, contract, getPlayerRole, getGameStatus } = useGame();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    console.log("room", room);
    if (contract) {
      contract.getGamePlayers(room.toString()).then(setPlayers);

      const checkGameStatusInterval = setInterval(() => {
        contract.getGamePlayers(room.toString()).then(setPlayers);

        if (players.length === 4) {
          clearInterval(checkGameStatusInterval);
        }
      }, 5000);

      return () => clearInterval(checkGameStatusInterval);
    }
  }, [contract]);

  useEffect(() => {
    console.log("room12112", room, stage);
    if (
      contract &&
      stage !== EGameStage.NOT_STARTED &&
      stage !== EGameStage.RULES &&
      stage !== EGameStage.WAITING
    ) {
      getPlayerRole(room.toString());
    }
  }, [contract, stage, address]);

  useEffect(() => {
    if (contract) {
      getGameStatus(room.toString());
      const checkGameStatusInterval = setInterval(() => {
        getGameStatus(room.toString());
        console.log("stage", stage, role);
      }, 5000);

      return () => clearInterval(checkGameStatusInterval);
    }
  }, [contract, address]);

  return (
    <div className="grid grid-cols-12 m-8 grid-rows-1 gap-4 min-h-fit">
      <UserList room={room} users={players} />
      <GameContent playersCount={players.length} gameId={room}>
        {getGameContent(stage, role, room.toString())}
      </GameContent>
    </div>
  );
};

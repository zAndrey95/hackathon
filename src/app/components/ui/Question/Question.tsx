"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React, { useEffect } from "react";
import { useGame } from "../../provider/GameContext/GameContext";
import { CardsAgainstHumanity } from "@/app/contracts/types";
import { useSearchParams } from "next/navigation";
import { Loader } from "../Loader/Loader";

export const Question: React.FC<{ room: string }> = ({
  room,
}: {
  room: string;
}) => {
  const [question, setQuestion] = React.useState<string>();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { contract, getQuestion }: any = useGame();
  const searchParams = useSearchParams();

  const getJudge = async () => {
    const players = await contract?.getGamePlayers(room);

    for (const player of players) {
      const role = await contract?.getPlayerRoleInGame(player, room);
      if (role === 1) {
        console.log("role:::::", role, player);
        const q = await getQuestion(room, player);
        setQuestion(q);
        break;
      }
    }
    // return judge;
  };

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isConnected, contract);
    if (isConnected && contract) {
      getJudge();
    }
  }, [contract, isConnected]);
  return (
    <div className="p-6 border bg-black border-gray-300 rounded text-center mb-6 min-h-24 min-w-full">
      <div className="text-3xl font-bold">
        {question ? question : <Loader message="" />}
      </div>
    </div>
  );
};

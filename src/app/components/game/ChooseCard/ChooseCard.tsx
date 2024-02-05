"use client";
import { useEffect, useState } from "react";
import { Question } from "../../ui/Question/Question";
import { EGameStage, ERole } from "../../shared/types";
import { InfoMessage } from "../../ui/InfoMessage/InfoMessage";
import { Answers, useGame } from "../../provider/GameContext/GameContext";
import { ButtonConfirm } from "../../ui/ButtonConfirm/ButtonConfirm";
import { Cards } from "../../ui/Cards/Cards";
import { Button } from "../../ui/Button/Button";
import { BigNumber } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Loader } from "../../ui/Loader/Loader";

export const ChooseCard = ({ room }: { room: string }) => {
  const { address } = useWeb3ModalAccount();
  const { stage, role, contract, playerSendCard, getGameResults } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<BigNumber | null>(null);
  const [playerCards, setPlayerCards] = useState<Array<Answers>>([]);
  const [winner, setWinner] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (selectedAnswer !== null) {
      setIsLoading(true);
      try {
        setPlayerCards([]);
        await playerSendCard(room, selectedAnswer);
      } catch (error) {
        console.error("Error while sending card:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please select an answer before confirming.");
    }
  };

  const gameStatus = async () => {
    const [user, answer] = await getGameResults(room);
    console.log("status!!!!!", user, answer);
    setSelectedAnswer(answer as BigNumber);
    setWinner(user as string);
  };
  useEffect(() => {
    if (stage === EGameStage.ENDED && contract) {
      console.log("Selected answer:", selectedAnswer);
      gameStatus();
    }
  }, [contract, stage]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Question room={room} />

      <InfoMessage />

      <Cards
        setSelectedAnswer={setSelectedAnswer}
        room={room}
        selectedAnswer={selectedAnswer}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
      />

      <ButtonConfirm isLoading={isLoading} handleConfirm={handleConfirm} />

      {stage === EGameStage.ENDED && (
        <>
          <Button
            title="Home"
            handleClick={() => {
              window.location.href = "/";
            }}
          />
          {role === ERole.PLAYER && winner === address && (
            <Button title="Generate NFT" handleClick={() => {}} />
          )}
        </>
      )}
    </div>
  );
};

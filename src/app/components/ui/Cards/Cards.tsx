"use client";
import { useCallback, useEffect, useState } from "react";
import { Answers, useGame } from "../../provider/GameContext/GameContext";
import { EGameStage, ERole } from "../../shared/types";
import { Card } from "../Card/Card";
import { Loader } from "../Loader/Loader";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useSearchParams } from "next/navigation";
import { BigNumber } from "ethers";

const countPlayers = 4;

const answersPlayers = [
  {
    nickname: "Nicolas",
    text: "To get to the other side!",
  },
  {
    nickname: "Andrew",
    text: "An impasta!",
  },
  {
    nickname: "Max",
    text: "Stay here, I’m going on ahead!",
  },
];

export const Cards = ({
  room,
  selectedAnswer,
  setSelectedAnswer,
  playerCards,
  setPlayerCards,
}: {
  room: string;
  playerCards: Answers[];
  setPlayerCards: (cards: Answers[]) => void;
  selectedAnswer: BigNumber | null;
  setSelectedAnswer: (id: BigNumber) => void;
}) => {
  const { stage, role, contract, getAnswerCards, getPlayersSelectedAnswers } =
    useGame();
  const { address } = useWeb3ModalAccount();
  const searchParams = useSearchParams();
  const isDealer = role === ERole.DEALER;

  const handleAnswerSelection = (id: BigNumber) => {
    setSelectedAnswer(id);
  };

  // useEffect(() => {
  //   console.log("Selected answer:", answers[2]);
  //   if (stage === EGameStage.ENDED) {
  //     setSelectedAnswer(2);
  //   }
  // }, []);

  const getPlayerCards = useCallback(async () => {
    console.log("getPlayerCards!!!!!!!!!!!!!!!!!!!!!!!!!!");
    if (!contract || !address) return;
    const playerCards = await getAnswerCards(address, room);

    setPlayerCards(playerCards || []);
    console.log("playerCards", playerCards);
  }, [stage]);

  const getPlayersAnswers = useCallback(async () => {
    console.log(
      "getPlayersSelectedAnswers!!!!!!!!!!!!!!!!!!!!!!!!!!",
      contract || !address
    );
    if (!contract || !address) return;
    const playerCards = await getPlayersSelectedAnswers(room);

    setPlayerCards(playerCards || []);
    console.log("playerCards", playerCards);
  }, [stage]);

  useEffect(() => {
    if (stage === EGameStage.STARTED && role === ERole.PLAYER) {
      getPlayerCards();
    }
    if (role === ERole.DEALER) {
      getPlayersAnswers();
    }

    if (
      role === ERole.PLAYER &&
      (stage === EGameStage.ENDED || stage === EGameStage.FINISHED)
      // (stage === EGameStage.FINISHED && role === ERole.PLAYER) ||
      // (isDealer && stage === EGameStage.FINISHED)
    ) {
      getPlayersAnswers();
      const checkGameStatusInterval = setInterval(() => {
        getPlayersAnswers();

        if (playerCards.length === 3) {
          clearInterval(checkGameStatusInterval);
        }
      }, 4000);

      // Зупинка інтервалу при виході з компонента
      return () => clearInterval(checkGameStatusInterval);
    }
  }, [contract, address, stage]);

  const stageAnswers = playerCards;
  // stage === EGameStage.ENDED || (isDealer && stage === EGameStage.FINISHED)
  //   ? answersPlayers
  //   : playerCards;

  if (isDealer && stage === EGameStage.STARTED) {
    return (
      <Loader message="Please, wait while the players make their choice" />
    );
  }

  console.log("staaagggeeeeee", stage);
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {stageAnswers.map((answer, index) => {
        let text = answer.text;
        let nickname = answer.player;
        // let nickname = (answer as { nickname: string }).nickname;
        let id = (answer as Answers).id;
        return (
          <Card
            key={index}
            stage={stage}
            answer={text}
            nickname={nickname}
            id={id}
            index={index}
            handleSelect={handleAnswerSelection}
            selectedAnswer={selectedAnswer}
          />
        );
      })}
    </div>
  );
};

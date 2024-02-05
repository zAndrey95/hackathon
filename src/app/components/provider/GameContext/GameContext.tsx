"use client";
import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { EGameStage, ERole } from "../../shared/types";
import { GameContract } from "@/app/contracts/contracts/game";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { CardContracts } from "@/app/contracts/contracts/card";

import { BigNumber } from "ethers";

export type Props = {
  children: React.ReactNode;
};

export type Answers = {
  id: BigNumber;
  text: string;
  player?: string;
};

export type GameContextType = {
  stage: EGameStage;
  role: ERole;
  status: number;
  userStatus: number;
  contract: GameContract | undefined;
  cardsContract: CardContracts | undefined;
  isLoading: Boolean;
  test: () => void;
  setStage: (stage: EGameStage) => void;
  joinToGame: () => void;
  sendUserName: (name: string) => void;
  getUserName: (wallet: string) => void;
  getGameResults: (gameId: string) => Promise<Array<string | BigNumber>>;
  getPlayerRole: (gameId: string) => Promise<void>;
  playerSendCard: (gameId: string, id: BigNumber) => Promise<void>;
  getPlayersSelectedAnswers: (gameId: string) => Promise<Array<Answers>>;
  getAnswerCards: (
    player: string,
    gameId: string
  ) => Promise<Array<Answers> | undefined>;
  getQuestion: (gameId: string, player: string) => Promise<string | undefined>;

  getActiveGamesList: () => Promise<BigNumber[]>;
  getGamePlayers: (gameId: string) => Promise<string[]>;
  getStatusOfGame: (gameId: string) => Promise<number>;
  getGameStatus: (gameId: string) => Promise<void>;
};

const GameContext = createContext({
  stage: EGameStage.RULES,
  role: ERole.PLAYER,
} as GameContextType);

enum GameStatus {
  WAITING_FOR_PLAYERS,
  PLAYERS_RECEIVE_CARDS,
  PLAYERS_SUBMIT_ANSWERS,
  JUDGE_SELECTS_WINNER,
  WINNER_SELECTED,
}

enum UserStatus {
  NOT_JOINED,
  JOINED,
  RECEIVED_CARDS,
  SUBMITTED_ANSWERS,
  JUDGE_SELECTED_WINNER,
}

enum PlayerRole {
  PLAYER,
  JUDGE,
}

const GameProvider: React.FC<Props> = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [stage, setStage] = useState<EGameStage>(EGameStage.NOT_STARTED);
  const [role, setRole] = useState(ERole.PLAYER);
  const { walletProvider } = useWeb3ModalProvider();
  const [contract, setContract] = useState<GameContract>();
  const [cardsContract, setCardsContract] = useState<CardContracts>();
  const router = useRouter();
  const [status, setStatus] = useState<number>(0);
  const [userStatus, setUserStatus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const joinToGame = async () => {
    if (!isConnected || !address) throw new Error("Connect to wallet");
    try {
      setIsLoading(true);
      const randoms = localStorage.getItem("randoms");

      const activeGame = await contract?.getPlayerActiveGame(address);

      if (randoms && Number(activeGame) > 0) {
        if (activeGame) {
          setIsLoading(false);
          router.push(`/game/${Number(activeGame)}`, { scroll: false });
        }
        return console.log("activeGame", activeGame);
      }
      const game = await contract?.joinToGame();

      const activeGameAfterJoin = await contract?.getPlayerActiveGame(address);
      if (activeGameAfterJoin) {
        setIsLoading(false);
        router.push(`/game/${Number(activeGameAfterJoin)}`, { scroll: false });
        return;
      }
      console.log("game", game);
      router.push(`/game/${Number()}`, { scroll: false });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("provider.walletProvider", walletProvider);
    if (walletProvider) {
      const contract = new GameContract(walletProvider);
      const cardsContract = new CardContracts(walletProvider);
      setCardsContract(cardsContract);
      setContract(contract);
    }
  }, [walletProvider]);

  const test = async () => {
    // if (!isConnected && !address) throw new Error("Connect to wallet");
    // await contract?.getPlayerActiveGame(address).then((res: any) => {
    //   console.log("aaacccttiiive", res);
    // });
  };

  const getGameStatus = async (gameId: string) => {
    console.log("getGameStatus", address, gameId);
    if (!isConnected || !address) throw new Error("Connect to wallet");
    try {
      const status = await contract?.getGameStatus(gameId.toString());
      const userStatus = await contract?.getUserStatus(
        address,
        gameId.toString()
      );
      setStatus(Number(status));
      setUserStatus(Number(userStatus));
      console.log(
        "status",
        GameStatus[Number(status)],
        UserStatus[Number(userStatus)]
      );
      if (
        Number(status) === GameStatus.WAITING_FOR_PLAYERS ||
        (Number(status) === GameStatus.PLAYERS_RECEIVE_CARDS &&
          Number(userStatus) === UserStatus.JOINED)
      ) {
        setStage(EGameStage.RULES);
      }
      if (
        (Number(status) === GameStatus.WAITING_FOR_PLAYERS &&
          Number(userStatus) !== UserStatus.JOINED) ||
        (Number(status) === GameStatus.PLAYERS_RECEIVE_CARDS &&
          Number(userStatus) === UserStatus.RECEIVED_CARDS)
      ) {
        console.log("setStage????????????????????", EGameStage.WAITING);
        setStage(EGameStage.WAITING);
      }
      if (
        Number(status) === GameStatus.PLAYERS_SUBMIT_ANSWERS &&
        Number(userStatus) === UserStatus.RECEIVED_CARDS
      ) {
        console.log("test");
        setStage(EGameStage.STARTED);
      }
      if (Number(userStatus) === UserStatus.NOT_JOINED) {
        router.push(`/`, { scroll: false });
      }
      console.log(
        "????????????????????????????/",
        Number(status) === GameStatus.PLAYERS_SUBMIT_ANSWERS &&
          Number(userStatus) === UserStatus.SUBMITTED_ANSWERS
      );
      if (
        (Number(status) === GameStatus.PLAYERS_SUBMIT_ANSWERS &&
          Number(userStatus) === UserStatus.SUBMITTED_ANSWERS) ||
        (Number(status) === GameStatus.JUDGE_SELECTS_WINNER &&
          Number(userStatus) === UserStatus.SUBMITTED_ANSWERS) ||
        (Number(status) === GameStatus.JUDGE_SELECTS_WINNER &&
          Number(userStatus) === UserStatus.RECEIVED_CARDS)
      ) {
        setStage(EGameStage.FINISHED);
      }
      if (Number(status) === GameStatus.WINNER_SELECTED) {
        setStage(EGameStage.ENDED);
      }
    } catch (error) {
      console.log("error getGameStatus", error);
    }
  };

  const getUserName = async (wallet: string) => {
    try {
      const res = await fetch(`/api/users?wallet=${wallet}}`);

      const name = await res.json();
      return name ? name : wallet;
    } catch (err) {
      console.error("Error in getUserName", err);
      return wallet;
    }
  };

  const sendUserName = async (name: string) => {
    if (address) {
      fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({
          wallet: address,
          name: name,
        }),
      });
    }
  };

  const getQuestion = async (
    gameId: string,
    player: string
  ): Promise<string | undefined> => {
    if (!isConnected || !address) throw new Error("Connect to wallet");
    try {
      const id = await contract?.getPlayerQuestionCard(player, gameId);
      console.log("id", id);
      const question = await cardsContract?.getQuestionValue(Number(id));
      console.log("question", question);
      return question;
    } catch (error) {
      console.log("error getQuestion", error);
    }
  };

  const getAnswerCards = async (
    player: string,
    gameId: string
  ): Promise<Array<Answers> | undefined> => {
    if (!isConnected || !address) throw new Error("Connect to wallet");
    try {
      const ids = await contract?.getPlayerAnswerCards(player, gameId);
      let answers: Array<Answers> = [];
      for (const id of ids as BigNumber[]) {
        const answer = await cardsContract?.getAnswerValue(Number(id));
        console.log("answer", answer);
        answers.push({ id, text: answer as string, player });
      }

      return answers;
    } catch (error) {
      console.log("error getAnswerCards", error);
    }
  };

  const playerSendCard = async (gameId: string, id: BigNumber) => {
    if (!isConnected || !address) throw new Error("Connect to wallet");
    try {
      const res = await contract?.sendCard(gameId, id);
      if (role === ERole.DEALER) {
        return setStage(EGameStage.ENDED);
      }
      setStage(EGameStage.FINISHED);
      console.log("res", res);
    } catch (error) {
      console.log("error playerSendCard", error);
    }
  };

  const getActiveGamesList = async () => {
    // if (!isConnected || !address) {
    //   console.error('Not connected')
    //   return []
    // };
    try {
      console.log(contract);
      const res = await contract?.getActiveGames();
      console.log("actives", res);
      return res || [];
    } catch (err) {
      console.error("Not connected");
      return [];
    }
  };

  const getGamePlayers = async (gameId: string) => {
    return contract?.getGamePlayers(gameId) || [];
  };

  const getStatusOfGame = async (gameId: string) => {
    return (await contract?.getGameStatus(gameId)) || 0;
  };

  const getPlayersSelectedAnswers = async (
    gameId: string
  ): Promise<Array<Answers>> => {
    const players = await getGamePlayers(gameId);
    const selected = (await contract?.getGameSelectedAnswers(
      gameId
    )) as BigNumber[];
    console.log("players1111111", players, selected);
    const selectedAnswer: Array<Answers> = [];
    for (const answer of selected) {
      const card: string = (await cardsContract?.getAnswerValue(
        Number(answer)
      )) as string;
      const player = await getPlayerBySelectedAnswer(gameId, answer.toString());
      selectedAnswer.push({ text: card, id: answer, player });
    }
    return selectedAnswer;
  };

  const getPlayerRole = async (gameId: string) => {
    if (!isConnected || !address) throw new Error("Connect to wallet");
    const role = await contract?.getPlayerRoleInGame(address, gameId);

    if (role === 1) {
      setRole(ERole.DEALER);
    } else {
      setRole(ERole.PLAYER);
    }
  };

  const getGameResults = async (
    gameId: string
  ): Promise<Array<string | BigNumber>> => {
    return (await contract?.getGameResults(gameId)) as Array<
      string | BigNumber
    >;
  };

  const getPlayerBySelectedAnswer = async (
    gameId: string,
    answerId: string
  ) => {
    return await contract?.getPlayerBySelectedAnswer(gameId, answerId);
  };

  // getActiveGamesList().then(console.log)
  // console.log(getActiveGamesList())

  // useEffect(()=>{
  //   sendUserName('Nikki_test')
  // }, [])

  // getUserName('0x09d26778daDB3DbcD5769890AEf9390d57dCaa51')

  const gameContextValue: GameContextType = useMemo(
    () => ({
      stage,
      role,
      status,
      userStatus,
      contract,
      cardsContract,
      isLoading,
      test,
      setStage,
      joinToGame,
      getUserName,
      sendUserName,
      playerSendCard,
      getPlayerRole,
      getQuestion,
      getAnswerCards,
      getActiveGamesList,
      getPlayersSelectedAnswers,
      getGamePlayers,
      getGameResults,
      getStatusOfGame,
      getGameStatus,
    }),
    [
      stage,
      role,
      setStage,
      getAnswerCards,
      test,
      isLoading,
      joinToGame,
      contract,
      cardsContract,
      getActiveGamesList,
      getPlayersSelectedAnswers,
      getGamePlayers,
      getStatusOfGame,
      getGameStatus,
    ]
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export { GameContext, GameProvider, useGame };

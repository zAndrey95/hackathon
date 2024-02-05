import { useEffect, useState } from "react";
import { EGameStage } from "../../types";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useGame } from "@/app/components/provider/GameContext/GameContext";

export const useReceiveCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [random, setRandom] = useState("");
  const [sequence, setSequence] = useState(0);
  const { address, isConnected } = useWeb3ModalAccount();
  const { contract, setStage }: any = useGame();

  const receiveCards = async (
    gameId: string,
    seqNumber: string,
    providerRandom: string
  ) => {
    setIsLoading(true);
    console.log("sequence send", gameId, providerRandom, seqNumber);
    if (!contract || !isConnected) throw new Error("Connect to wallet");
    try {
      const cards = await contract?.playerReceiveCards(
        gameId,
        seqNumber,
        providerRandom
      );
      console.log("cards", cards);

      setStage(EGameStage.WAITING);
    } catch (error) {
      console.log("error receiveCards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderNumber = async (sequence: number) => {
    const response = await fetch(
      `https://fortuna-staging.pyth.network/v1/chains/lightlink-pegasus/revelations/${sequence}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch provider number for sequence ${sequence}`
      );
    }

    const providerNumber = await response.json();
    return providerNumber.value.data;
  };

  const getSequence = async () => {
    try {
      if (!contract) return;

      const sequenceNumber = await contract.getPlayerSequenceNumber(address);

      if (!sequenceNumber || Number(sequenceNumber) === 0) return;

      const sequenceValue = Number(sequenceNumber);
      setSequence(sequenceValue);

      const providerRandom = await getProviderNumber(sequenceValue);
      setRandom(`0x${providerRandom}`);
    } catch (error) {
      console.error("Error in getSequence:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSequence();
    };

    fetchData();
  }, [contract]);

  useEffect(() => {
    if (random && sequence) {
      setIsLoading(false);
    }
  }, [random, sequence]);

  return { random, sequence, isLoading, receiveCards };
};

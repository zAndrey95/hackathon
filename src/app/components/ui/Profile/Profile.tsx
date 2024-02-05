"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { CreateNftStep, useCreateNFT } from "@liteflow/react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useGame } from "../../provider/GameContext/GameContext";
import useUserName from "../../shared/hooks/useUserName";
import useShortenedAddress from "../../shared/hooks/useShortAddress";
import { Loader } from "../Loader/Loader";
import Link from "next/link";

export const Profile = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { joinToGame, contract, cardsContract, isLoading } = useGame();
  const { userName, getUserName, setNewUserName } = useUserName();
  const { shortenedAddress, updateShortenedAddress } = useShortenedAddress(address || '');
  const [lastGame, setLastGame] = useState<number>(0)

  const [name, setName] = useState<string>("");

  let signer!: ethers.providers.JsonRpcSigner;

  if (walletProvider) {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    signer = ethersProvider.getSigner();
  }

  const [createNFT, { activeStep, transactionHash }] = useCreateNFT(signer);

  useEffect(() => {
    if (address) {
      getUserName(address);
      setName(userName === address ? shortenedAddress : userName);
    }
  }, [address, userName]);

  useEffect(() => {
    address && updateShortenedAddress();
  }, [address]);

  useEffect(() => {
    if (contract && address) {
      contract.getPlayerPreviousGame(address).then(async (last) => {
        console.log('last', last)
        if (!last.isZero()) {
          const game = await contract.getGameResults(last.toString())
          if (game.winner === address) {
            setLastGame(last.toNumber())
          }
        }
      })
    }
  }, [contract, address])

  const handleSetNewUserName = () => {
    if (address) {
      setNewUserName(address, name);
    }
  };

  const convertURLToFile = async (url: string, fileName: string) => {
    const toDataURL = (url: string | URL | Request) =>
      fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    function dataURLtoFile(dataurl: any, filename: string) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    return await toDataURL(url).then((dataUrl) => {
      var fileData = dataURLtoFile(dataUrl, fileName);
      console.log("Here is JavaScript File Object", fileData);
      return fileData;
    });
  };

  const getNFTData = async () => {
    if (contract && cardsContract) {
      const game = await contract.getGameResults(lastGame.toString());
      const question = await cardsContract.getQuestionValue(game.question.toString());
      const answer = await cardsContract.getAnswerValue(game.winningAnswer.toString());

      return {
        question: question,
        answer: answer,
        id: lastGame.toString()
      }
    } else {
      console.error('No connection')
    }
  }

  const handleClickNFT = async () => {
    const isLazyMinted = false;
    let nftURL;
    let fileName;

    const nftData = await getNFTData()
    if (!nftData) return;

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: nftData.question,
          answer: nftData.answer,
        }),
      });

      if (!response.ok) {
        throw new Error("The generation of NFT pictures ended unsuccessfully.");
      }

      const data = await response.json();
      nftURL = data.nftURL;
      fileName = data.fileName;
    } catch (error) {
      console.error("The generation of NFT pictures ended unsuccessfully. Error: ", error);
    }

    const linkNFT = await convertURLToFile(nftURL, fileName);

    try {
      await createNFT(
        {
          chain: 1891,
          collection: "0x9757cd484abe8edbb5b7d6badc4ef2d5fcef71b9",
          metadata: {
            name: "Game #" + nftData.id,
            description: "Winned combination of Cards Against Humanity game.",
            attributes: [
              { traitType: "Question", value: nftData.question },
              { traitType: "Answer", value: nftData.answer },
            ],
            media: {
              content: linkNFT,
              isAnimation: false,
            },
          },
        },
        isLazyMinted
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black z-10 opacity-50 ${isLoading ? 'block' : 'hidden'}`}
      />
      {isLoading && <div className="fixed z-20 inset-0 flex items-center justify-center "><Loader message="Waiting for the game to start..." /></div>}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Welcome {userName === address ? shortenedAddress : userName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <strong>Cards Against Humanity </strong>
        is a fill-in-the-blank party game that turns your awkward personality
        and lackluster social skills into hours of fun! Wow.
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      This is our blockchain version of this great game. To start the game, click &quot;Join to game&quot;. 
      Can you be the funniest among them all?
      </p>
      <div className="grid md:grid-cols-2 gap-4 place-items-center">
        <Input
          inputValue={name}
          handleChange={(value) => setName(value)}
          placeholder="John"
          label="Your name"
        />
        <Button title="Change name" additionalClass="mt-9" handleClick={() => handleSetNewUserName()} />
      </div>

      <Button title="Join to game" handleClick={joinToGame} />
      {lastGame !== 0 && <Button title={`Generate NFT (Game #${lastGame}`} handleClick={handleClickNFT} />}
      {/* <button onClick={handleClick}>Create NFT</button> */}

      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        How to play.
      </h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>There are 4 players in each game.</li>
        <li>Everyone generates a set of random 4 cards for themselves using <Link href="https://docs.pyth.network/entropy" passHref={true}>  <strong>Pyth Entropy. </strong></Link></li>
        <li>
          After receiving all the cards, the Host is randomly selected from all players. 
        </li>
        <li>
          Players are shown a question and their set of cards, from which they must choose one. 
        </li>
        <li>
          When all players have chosen cards, the Host chooses the funniest card to determine the winner.
        </li>
      </ul>
    </div>
  );
};

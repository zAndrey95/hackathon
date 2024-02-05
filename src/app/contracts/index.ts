import { ethers } from "ethers";

import CardABI from "./abi/CAHCard.abi.json";
import GameABI from "./abi/CardsAgainstHumanity.abi.json";
import GovernABI from "./abi/CardsGovernor.abi.json";

export enum ContractTypes {
  GAME,
  ANSWERS,
  QUESTIONS,
  //   GOVERNOR,
  //   AWARDS,
}

const contractAddresses = {
  [ContractTypes.GAME]:
    process.env.NEXT_PUBLIC_GAME_CONTRACT ||
    "0x5622a1Fe9C994844E6A78D2abf6e9b8834b175E3",
  [ContractTypes.ANSWERS]:
    process.env.NEXT_PUBLIC_ANSWERS_CONTRACT ||
    "0x0Ae7eA919296a279EbCfD2F6F6Cb30a8a128C787",
  [ContractTypes.QUESTIONS]:
    process.env.NEXT_PUBLIC_QUESTIONS_CONTRACT ||
    "0x6445cC914C3F7F128d5Cbef781C8C54094Ab0566",
  // [ContractTypes.GOVERNOR]: 'process.env.GAME_CONTRACT',
  // [ContractTypes.AWARDS]: 'process.env.GAME_CONTRACT',
};

const contractAbis: { [key in ContractTypes]?: ethers.ContractInterface } = {
  [ContractTypes.GAME]: new ethers.utils.Interface(GameABI),
  [ContractTypes.ANSWERS]: new ethers.utils.Interface(CardABI),
  [ContractTypes.QUESTIONS]: new ethers.utils.Interface(CardABI),
  // [ContractTypes.GOVERNOR]: new ethers.utils.Interface(GovernABI),
  // [ContractTypes.AWARDS]: 'process.env.GAME_CONTRACT',
};

export function getContract(
  contractType: ContractTypes,
  signerOrProvider: any
  // | ethers.Signer
  // | ethers.providers.Provider
  // | string
  // | undefined
  // | any = undefined
) {
  const address = getContractAddress(contractType);
  const abi = contractAbis[contractType];
  if (!abi) {
    throw new Error("ABI is missed");
  }
  const contract = new ethers.Contract(address, abi);

  console.log("contract", signerOrProvider);

  if (signerOrProvider) {
    return contract.connect(signerOrProvider);
  }
  return contract;
}

export function getContractAddress(contractType: ContractTypes) {
  return contractAddresses[contractType];
}

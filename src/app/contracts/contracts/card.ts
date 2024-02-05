import { getContract, ContractTypes } from "../index";
import { CAHCard } from "../types";
import { ethers } from "ethers";

export class CardContracts {
  private questions: CAHCard;
  private answers: CAHCard;

  constructor(provider: ethers.providers.ExternalProvider) {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    this.questions = getContract(ContractTypes.QUESTIONS, signer) as CAHCard;

    this.answers = getContract(ContractTypes.ANSWERS, signer) as CAHCard;
  }

  getQuestionsContract() {
    return this.questions;
  }

  getAnswersContract() {
    return this.answers;
  }

  async getAnswerValue(id: string | number) {
    return await this.answers.tokenURI(id);
  }

  async getQuestionValue(id: string | number) {
    return await this.questions.tokenURI(id);
  }
}

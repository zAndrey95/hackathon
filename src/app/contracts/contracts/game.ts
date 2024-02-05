import ethers, { BigNumber, BytesLike, Signer, ethers as eth } from "ethers";
import { getContract, ContractTypes } from "..";
import { CardsAgainstHumanity } from "../types";
// [{"0":92,"1":251,"2":73,"3":58,"4":18,"5":81,"6":32,"7":217,"8":161,"9":147,"10":201,"11":254,"12":145,"13":231,"14":40,"15":104,"16":188,"17":39,"18":219,"19":209,"20":226,"21":148,"22":37,"23":160,"24":183,"25":40,"26":233,"27":163,"28":17,"29":223,"30":154,"31":114},{"0":195,"1":114,"2":236,"3":25,"4":77,"5":146,"6":62,"7":11,"8":137,"9":219,"10":154,"11":121,"12":254,"13":4,"14":48,"15":155,"16":33,"17":134,"18":180,"19":71,"20":99,"21":17,"22":10,"23":80,"24":112,"25":177,"26":210,"27":224,"28":127,"29":231,"30":50,"31":163},{"0":196,"1":104,"2":70,"3":250,"4":244,"5":239,"6":164,"7":51,"8":132,"9":102,"10":232,"11":39,"12":48,"13":215,"14":253,"15":185,"16":18,"17":58,"18":56,"19":204,"20":62,"21":147,"22":161,"23":158,"24":212,"25":9,"26":187,"27":148,"28":37,"29":220,"30":16,"31":247},{"0":237,"1":244,"2":188,"3":226,"4":127,"5":174,"6":150,"7":153,"8":23,"9":62,"10":122,"11":176,"12":146,"13":222,"14":203,"15":143,"16":87,"17":154,"18":211,"19":36,"20":101,"21":92,"22":140,"23":208,"24":203,"25":97,"26":113,"27":254,"28":196,"29":168,"30":15,"31":99},{"0":83,"1":76,"2":157,"3":72,"4":50,"5":39,"6":185,"7":201,"8":104,"9":41,"10":234,"11":24,"12":9,"13":31,"14":208,"15":240,"16":20,"17":7,"18":120,"19":165,"20":8,"21":119,"22":216,"23":146,"24":240,"25":145,"26":104,"27":138,"28":219,"29":178,"30":10,"31":6}]
const COMMITMENTS_COUNT = 5;
// const getSigner = async (provider: ethers.providers.ExternalProvider) => {
//   const ethersProvider = new eth.providers.Web3Provider(provider);
//   return ethersProvider.getSigner();
// }

export class GameContract {
  private contract: CardsAgainstHumanity;
  constructor(provider: ethers.providers.ExternalProvider) {
    const ethersProvider = new eth.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    this.contract = getContract(
      ContractTypes.GAME,
      signer
    ) as CardsAgainstHumanity;
  }

  getContract() {
    return this.contract;
  }

  async joinToGame() {
    const randomsNumbersRaw = [];
    const commitments = [];

    for (let i = 0; i < COMMITMENTS_COUNT; i++) {
      randomsNumbersRaw.push(eth.utils.randomBytes(32));
      commitments.push(eth.utils.keccak256(randomsNumbersRaw[i]) as BytesLike);
    }

    const numbers = randomsNumbersRaw.map(
      (e) => `0x${Buffer.from(e).toString("hex")}`
    );

    try {
      const fee = await this.contract.getRandomProviderFee();

      const tx = await this.contract.joinGame(
        commitments as [BytesLike, BytesLike, BytesLike, BytesLike, BytesLike],
        { value: fee }
      );
      const test = await tx.wait();
      localStorage.setItem("randoms", JSON.stringify(numbers));
      localStorage.setItem("commitments", JSON.stringify(commitments));
      return { tx, test };
    } catch (error) {
      console.log("error", error);
      throw new Error("Error in join to game");
    }
  }

  async playerReceiveCards(
    gameId: string,
    seqNumber: string,
    providerRandom: string
  ) {
    const r = localStorage.getItem("randoms");
    const c = localStorage.getItem("commitments");

    if (!r || !c) {
      throw new Error("Miss local data commitments");
    }

    const randoms = JSON.parse(r);
    console.log("parameters", gameId, seqNumber, randoms, providerRandom);
    const tx = await this.contract.playerReceivedCards(
      gameId,
      seqNumber,
      randoms,
      providerRandom
    );
    const receipt = await tx.wait();
    return receipt;
  }

  async sendCard(gameId: string, card: BigNumber) {
    const tx = await this.contract.playerSendSelected(gameId, card);
    const receipt = await tx.wait();
    return receipt;
  }

  async getActiveGames() {
    console.log("ttttqdajnkjnknkjn ", this);
    return await this.contract.getActiveGames();
  }

  async getGamePlayers(gameId: string) {
    return await this.contract.getGamePlayers(gameId);
  }

  async getGameResults(gameId: string) {
    return await this.contract.getGameResults(gameId);
  }

  async getGameStatus(gameId: string) {
    return await this.contract.getGameStatus(gameId);
  }

  async getPlayerActiveGame(player: string) {
    return this.contract.getPlayerActiveGame(player);
  }

  async getPlayerAnswerCards(player: string, gameId: string) {
    return await this.contract.getPlayerAnswerCards(player, gameId);
  }

  async getPlayerBySelectedAnswer(gameId: string, answer: string) {
    return this.contract.getPlayerBySelectedAnswer(gameId, answer);
  }

  async getPlayerQuestionCard(player: string, gameId: string) {
    return this.contract.getPlayerQuestionCard(player, gameId);
  }

  async getPlayerRoleInGame(player: string, gameId: string) {
    return await this.contract.getPlayerRoleInGame(player, gameId);
  }

  async getPlayerSelectedAnswer(player: string, gameId: string) {
    return await this.contract.getPlayerSelectedAnswer(player, gameId);
  }

  async getPlayerSequenceNumber(player: string) {
    return await this.contract.getPlayerSequenceNumber(player);
  }

  async getRandomProviderFee() {
    return await this.contract.getRandomProviderFee();
  }

  async getGameSelectedAnswers(gameId: string) {
    return await this.contract.getSelectedAnswers(gameId);
  }

  async getUserStatus(player: string, gameId: string) {
    return await this.contract.getUserStatus(player, gameId);
  }

  async isPlayer(player: string, gameId: string) {
    return this.contract.isPlayer(player, gameId);
  }

  async getUserStatistics(user: string) {
    return await this.contract.userStats(user);
  }

  async getGamesCount() {
    return this.contract.gamesCounter();
  }

  async getPlayerPreviousGame(user: string) {
    return this.contract.getPlayerPreviousGame(user);
  }
}

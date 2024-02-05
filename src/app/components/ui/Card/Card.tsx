import { BigNumber } from "ethers";
import { useGame } from "../../provider/GameContext/GameContext";
import { EGameStage, ERole } from "../../shared/types";
const colors = ["bg-green-500", "bg-red-500", "bg-blue-500", "bg-yellow-500"];

const SelectCard = ({
  id,
  isSelected,
  answer,
  handleSelect,
}: {
  isSelected: boolean;
  id: BigNumber;
  answer: string;
  handleSelect: (id: BigNumber) => void;
}) => {
  return (
    <div
      className={`p-6 border-2 rounded-lg bg-white text-gray-600 border-gray-300  cursor-pointer flex justify-center items-center text-center ${
        isSelected ? "border-orange-600 text-gray-800" : ""
      }`}
      onClick={() => handleSelect(id)}
    >
      {answer}
    </div>
  );
};

const WinnerCard = ({
  nickname,
  isWinner,
  answer,
}: {
  isWinner: boolean;
  answer: string;
  nickname?: string;
}) => {
  return (
    <div
      className={`p-6 break-all overflow-auto  border-2 rounded-lg border-gray-300  cursor-pointer flex justify-center items-center text-center ${
        isWinner ? "border-orange-600 text-orange-100" : ""
      }`}
    >
      {isWinner && "✅"}
      {nickname}
      <br />
      {answer}
    </div>
  );
};

interface ICard {
  id: BigNumber;
  index: number;
  stage: EGameStage;
  selectedAnswer: BigNumber | null;
  answer: string;
  nickname?: string;
  handleSelect: (index: BigNumber) => void;
}

const getStage = ({
  index,
  id,
  handleSelect,
  selectedAnswer,
  nickname,
  answer,
  stage,
}: ICard) => {
  const { role } = useGame();
  if (role === ERole.DEALER) {
    switch (stage) {
      case EGameStage.FINISHED:
        const isSelected = selectedAnswer === id;
        return (
          <SelectCard
            isSelected={isSelected}
            id={id}
            answer={answer}
            handleSelect={handleSelect}
          />
        );
      case EGameStage.ENDED:
        const isWinner = Number(selectedAnswer) === Number(id);
        return (
          <WinnerCard isWinner={isWinner} nickname={nickname} answer={answer} />
        );
      default:
        return <div>123</div>;
    }
  }
  if (role === ERole.PLAYER) {
    switch (stage) {
      case EGameStage.STARTED:
        const isSelected = selectedAnswer === id;
        return (
          <SelectCard
            isSelected={isSelected}
            id={id}
            answer={answer}
            handleSelect={handleSelect}
          />
        );
      case EGameStage.FINISHED:
        return (
          <div
            className={`p-6 border-2 rounded-lg ${colors[index]}  cursor-pointer flex justify-center items-center text-center`}
          >
            {answer}
          </div>
        );
      case EGameStage.ENDED:
        const isWinner = Number(selectedAnswer) === Number(id);
        return (
          <WinnerCard isWinner={isWinner} nickname={nickname} answer={answer} />
        );
      default:
        return <div>123</div>;
    }
  }
};

export const Card = ({
  index,
  id,
  selectedAnswer,
  answer,
  stage,
  nickname,
  handleSelect,
}: ICard) => {
  return getStage({
    id,
    index,
    handleSelect,
    selectedAnswer,
    answer,
    stage,
    nickname,
  });
};

import { Button } from "@/app/components/ui/Button/Button";
import { useReceiveCards } from "../../shared/hooks";

export const Rules = ({ room }: { room: string }) => {
  const { random, sequence, isLoading, receiveCards } = useReceiveCards();

  return (
    <>
      <div>
        Rules: <br />
        <ul className="list-disc pl-6">
          <li>Be funny!</li>
          <li>Have some fun!</li>
          <li>If you have joined the game, click on the &quot;Generate&quot; button to complete the random value generation for your cards. Wait for other players to confirm their random values.</li>
          <li>If you are a player, choose the funniest one. If you are a leader, generally do the same &#128517;</li>
        </ul>
      </div>
      <div>
        <Button
          title="Generate"
          isLoading={isLoading}
          handleClick={() => {
            console.log("roomId", room);
            receiveCards(room, String(sequence), random);
          }}
        />
      </div>
    </>
  );
};

import { Game } from "../../components/layout/Game/Game";
import { useRouter } from 'next/router'
 

export default function GamePage({ params }: {params: {room: string}}) {
  const roomId = Number(params.room);
  return (
    <main className="flex  flex-col">
      <Game room={roomId} />
    </main>
  );
}

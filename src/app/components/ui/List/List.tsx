import { Fragment, use, useEffect, useState } from "react";
import { useGame } from "../../provider/GameContext/GameContext";
import { BigNumber } from "ethers";
import useUserName from "../../shared/hooks/useUserName";

const fakeGamesList = [
  {
    name: "Mystic Haven",
    description: "Embark on an epic journey through enchanted realms.",
    players: 7,
  },
  {
    name: "Galactic Nexus",
    description: "Explore the vastness of space in this sci-fi adventure.",
    players: 4,
  },
  {
    name: "Emerald Quest",
    description:
      "Search for hidden treasures in a mythical land of emerald beauty.",
    players: 2,
  },
  {
    name: "Inferno Arena",
    description:
      "Battle fiery creatures and prove your mettle in the arena of flames.",
    players: 9,
  },
  {
    name: "Abyssal Odyssey",
    description: "Plunge into the depths of the abyss on a perilous odyssey.",
    players: 5,
  },
  {
    name: "Eclipse Conclave",
    description:
      "Join the secretive conclave and unravel the mysteries of the eclipse.",
    players: 8,
  },
  {
    name: "Chrono Expedition",
    description:
      "Travel through time on an expedition to uncover ancient secrets.",
    players: 3,
  },
  {
    name: "Spectral Sanctuary",
    description:
      "Seek refuge in a sanctuary where spectral beings guard ancient wisdom.",
    players: 6,
  },
  {
    name: "Lunar Uprising",
    description: "Join the rebellion on the moon and fight for lunar freedom.",
    players: 10,
  },
  {
    name: "Celestial Citadel",
    description:
      "Ascend to the celestial citadel and face celestial challenges.",
    players: 1,
  },
];

const Status = ({ status }: { status: number }) => {
  // const shortenedName = name
  //   .split(" ")
  //   .map((word: string) => word.substring(0, 1))
  //   .join("");

  return (
    <span className="font-medium text-gray-600 dark:text-gray-300">
      {status}
    </span>
  );
};

const Item = ({ key, gameId }: { key: number, gameId: number }) => {
  const [players, setPlayers] = useState<string[]>([])
  const [status, setStatus] = useState<number>(0)
  const [users, setUsers] = useState<string[]>([]);
  // const { getGamePlayers, getStatusOfGame } = useGame();
  const { contract } = useGame();

  const { getNameByWallet } = useUserName();

  useEffect(() => {
    if (contract) {
      contract.getGamePlayers(gameId.toString()).then(setPlayers);
      contract.getGameStatus(gameId.toString()).then(setStatus)

    }

  }, [contract])

  useEffect(() => {
    players.map(async (pl) => {
      const nameUser = await getNameByWallet(pl);
      setUsers((prev) => [...prev, nameUser.name]);
    });
  }, [players]);


  return (
    <li className="py-3 sm:py-4" key={key}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Status status={status} />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            #{gameId}
          </p>
          <p className="text-sm text-gray-100 dark:text-gray-400">
            {users.map(name => name.substring(0, 2) !== '0x' && name)}
            {/* {players.map(async pl => await getNameByWallet(pl))} */}
            {/* {players.toString()} */}
            {players.map((pl, index) => (
              <Fragment key = { index }>
                { pl.substring(0, 7) }...
            <br />
              </Fragment>
            ))}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        {players.length}
      </div>
    </div>
    </li >
  );
};

export const List = () => {
  const [games, setGames] = useState<number[]>([]);
  const { contract } = useGame();

  const getGames = async () => {
    console.log('get games')
    if (contract) {
      const games = await contract.getActiveGames()
      const actual = await contract.getGamesCount()
      const gamesWithActual = [actual.toNumber(), ...games.map(g => g.toNumber())];
      setGames(gamesWithActual)
    }
  };

  useEffect(() => {
    if (contract) {
      getGames();
      const intervalId = setInterval(() => {
        getGames();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [contract]);

  return (
    <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Games
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {games.map(game => <Item key={game} gameId={game} />)}
          {/* <Item gameId={/> */}
        </ul>
      </div>
    </div>
  );
};

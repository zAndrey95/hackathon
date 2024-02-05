
export const GameContent = ({ children, playersCount, gameId }: { children: React.ReactNode, playersCount: number, gameId: number }) => {
  return (
    <div className="flex flex-col col-span-8 col-start-5 p-6 border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg gap-4">
      <div className="flex justify-between mb-16">
        <h1 className="text-xl">Game #{gameId}</h1>
        
        <h2>{playersCount}/4 players</h2>
      </div>
      {children}
    </div>
  );
};

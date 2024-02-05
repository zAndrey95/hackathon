import { Loader } from "../../ui/Loader/Loader";

export const WaitingRoom = () => {
  return (
    <div>
      <div className="">
        <div className="flex w-full justify-center">
          <img
            className="h-[200px] mx-auto rounded-lg shadow-lg"
            src="https://ichef.bbci.co.uk/news/640/cpsprodpb/06FD/production/_93998710_16427450_10206889967482441_7675184686226534234_n.jpg"
            alt="test"
          />
        </div>

        <Loader message="Waiting for other players..." />
      </div>
    </div>
  );
};

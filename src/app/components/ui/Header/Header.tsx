"use client";
import { ConnectButton } from "../ConnectButton";
import { useSwitchNetwork } from "../../shared/hooks";

export const Header = () => {
  useSwitchNetwork();

  return (
    <header className="p-8 bg-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-lg">Cards Against Humanity </h4>
          <p className="text-sm text-gray-500">(lightlink edition)</p>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
};

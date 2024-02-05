import { useEffect } from "react";
import { testnet } from "../../../provider/Web3Modal/Web3Modal";
import { chainId } from "../../constants";

import { useState } from 'react';

const useUserName = () => {
  const [userName, setUserName] = useState<string>('');

  const getUserName = async (wallet: string) => {
    try {
      const response = await fetch(`/api/users?wallet=${wallet}`);
      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const getNameByWallet = async (wallet: string) => {
    try {
      const response = await fetch(`/api/users?wallet=${wallet}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const setNewUserName = async (wallet: string, name: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet, name }),
      });

      const data = await response.json();
      if (data.success) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error setting new username:', error);
    }
  };

  return { userName, getUserName, setNewUserName, getNameByWallet };
};

export default useUserName;

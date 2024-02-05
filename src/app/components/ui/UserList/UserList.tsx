"use client";

import React, { useEffect, useState } from "react";
import useUserName from "../../shared/hooks/useUserName";


export const UserList = ({ room, users }: { room: number, users: string[] }) => {
  const { getNameByWallet } = useUserName();
  const [userNames, setUserNames] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = await Promise.all(
        users.map((user) => getNameByWallet(user))
      );
      setUserNames(names);
    };

    fetchUserNames();
  }, [getNameByWallet, users]);

  return (
    <div className="flex flex-col col-span-4 p-6 border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg gap-4">
      {users.map((user, i) => (
        <div
          key={i}
          className="flex p-2 border dark:bg-gray-600 dark:border-gray-700 rounded-lg justify-between"
        >
          <div className="bg-gray-100 bg-[url('./avatar.svg')] bg-contain shadow h-[48px] w-[48px] min-w-[48px] rounded-full">
          </div>
          <div className="w-full overflow-hidden flex flex-col justify-center">
            {userNames[i]?.name && (
              <div className="px-6">
                {userNames[i]?.name.substring(0, 2) !== "0x" &&
                  userNames[i]?.name}
              </div>
            )}

            <div className=" w-full px-6 overflow-hidden">
              {user.substring(0, 25)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

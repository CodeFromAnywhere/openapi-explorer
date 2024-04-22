"use client";

import revalidateList from "../revalidateList";

export const RefreshButton = () => {
  return (
    <div
      onClick={() => {
        revalidateList();
      }}
      className="hover:text-blue-500 cursor-pointer hover:bg-gray-300 w-full p-4"
    >
      Refresh List
    </div>
  );
};

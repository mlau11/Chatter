import { XIcon } from "@heroicons/react/solid";
import React from "react";

const UserBadgeItem = ({ user, removeUser }) => {
  return (
    <div
      className="inline-flex items-center px-2 py-1 rounded-lg m-1 mb-2 bg-indigo-300 cursor-pointer text-sm text-white"
      onClick={removeUser}
    >
      {user.name}
      <XIcon className="h-4 w-4 ml-1" />
    </div>
  );
};

export default UserBadgeItem;

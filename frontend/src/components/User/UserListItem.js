import { Avatar } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/chatContext";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex items-center w-full px-3 py-2 mb-2 rounded-lg bg-[#E8E8E8] hover:bg-sky-400 text-black hover:text-white cursor-pointer"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <div>
        <p>{user.name}</p>
        <p className="text-sm">
          <b>Email : </b>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;

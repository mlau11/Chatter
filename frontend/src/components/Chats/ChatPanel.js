import React from "react";
import { ChatState } from "../../context/chatContext";
import DirectChat from "./DirectChat";

const ChatPanel = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col items-center rounded-lg bg-white p-3 w-full md:w-2/3 mx-6`}
      style={{ maxHeight: "100%", height: "90%" }}
    >
      <DirectChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatPanel;

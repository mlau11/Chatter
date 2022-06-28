import React, { useState } from "react";
import ChatPanel from "../components/Chats/ChatPanel";
import ChatList from "../components/Chats/ChatList";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { ChatState } from "../context/chatContext";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="flex flex-col w-full h-screen">
      {user && <SideDrawer />}
      <div
        className="flex w-full grow justify-between items-center"
        style={{ maxHeight: "93%" }}
      >
        {user && <ChatList fetchAgain={fetchAgain} />}
        {user && (
          <ChatPanel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

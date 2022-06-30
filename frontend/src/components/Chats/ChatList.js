import { useState } from "react";
import { Stack, useToast } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { ChatState } from "../../context/chatContext";
import axios from "axios";
import UserLoader from "../Loader/Loader";
import { getSender } from "./ChatLogic";
import GroupChatModal from "../Modals/GroupChatModal";

const Chats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (err) {
      toast({
        title: "Error occurred!",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div
      className={`${
        selectedChat ? "hidden" : "flex"
      } md:flex flex-col items center p-3 bg-white w-full h-5/6 md:w-1/3 rounded-lg border mx-6`}
      style={{ maxHeight: "100%", height: "90%" }}
    >
      <div className="flex justify-between items-center w-full pb-3 text-xl md:text-2xl font-medium">
        Chats
        <GroupChatModal>
          <button className="flex justify-center items-center text-xs md:text-xs lg:text-base bg-[#EDF2F7] rounded-md h-10 p-2">
            New Group Chat
            <PlusIcon className="h-5 w-5 ml-2" />
          </button>
        </GroupChatModal>
      </div>

      <div className="flex flex-col p-3 w-full h-full bg-[#F8F8F8] rounded-lg overflow-y-hidden">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`${
                  selectedChat === chat ? "bg-indigo-300" : "bg-[#E8E8E8]"
                } ${
                  selectedChat === chat ? "text-white" : "text-black"
                } font-semibold px-3 py-2 rounded-lg cursor-pointer`}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </p>
              </div>
            ))}
          </Stack>
        ) : (
          <UserLoader />
        )}
      </div>
    </div>
  );
};

export default Chats;

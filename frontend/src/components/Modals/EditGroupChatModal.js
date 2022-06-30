import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { ChatState } from "../../context/chatContext";
import UserBadgeItem from "../User/UserBadgeItem";
import axios from "axios";
import UserListItem from "../User/UserListItem";

const EditGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const rename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (err) {
      toast({
        title: "Failed to create group chat",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
      setGroupChatName("");
    }
  };

  const removeUser = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      toast({
        title: "Only admins can remove someone from the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupRemove",
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error occured",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const addUser = async (userToAdd) => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already in the group chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone to the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupAdd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setSearch("");
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error occured",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (err) {
      toast({
        title: "Error occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <button
        className="w-10 h-10 bg-[#EDF2F7] inline-flex items-center rounded-md"
        onClick={onOpen}
      >
        <EyeIcon className="h-5 w-5 grow" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h4 className="flex flex-initial justify-center text-2xl p-4 font-semibold">
            {selectedChat.chatName}
          </h4>
          <ModalCloseButton
            onClick={() => {
              setSearch("");
              setGroupChatName("");
              setSearchResults([]);
              onClose();
            }}
          />
          <ModalBody className="flex flex-col">
            <div>
              {selectedChat.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  removeUser={() => removeUser(user)}
                />
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex rounded-md border-inherit grow m-1"
                placeholder="Rename chat"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                bg="#a5b4fc"
                className="w-20 rounded-md font-semibold m-1 text-white hover:text-black"
                onClick={rename}
                isLoading={renameLoading}
              >
                Update
              </Button>
            </div>
            <div className="flex">
              <input
                type="text"
                value={search}
                placeholder="Add a user to the group"
                className="flex rounded-md border-inherit grow m-1"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                bg="#a5b4fc"
                className="w-20 rounded-md font-semibold m-1 text-white hover:text-black"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            <div className="m-1">
              {loading ? (
                <Spinner size="lg" />
              ) : (
                searchResults
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => addUser(user)}
                    />
                  ))
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => removeUser(user)}
              className="h-10 w-32 rounded-md bg-red-400 font-semibold text-white hover:text-black hover:bg-[#E2E8F0]"
            >
              Leave Group
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditGroupChatModal;

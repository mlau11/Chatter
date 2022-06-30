import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { ChatState } from "../../context/chatContext";
import ProfileModal from "../Modals/ProfileModal";
import UserLoader from "../Loader/Loader";
import UserListItem from "../User/UserListItem";
import { getSender } from "../Chats/ChatLogic";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    user,
    chats,
    setChats,
    setSelectedChat,
    notifications,
    setNotifications,
  } = ChatState();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please type in the search bar",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoadingSearch(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoadingSearch(false);
      setSearchResults(data);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const createChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSearch('')
      setSearchResults([])
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (err) {
      toast({
        title: "Error creating chat",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full px-2.5 py-1.5">
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <button
            onClick={onOpen}
            className="hover:bg-[#EDF2F7] inline-flex rounded-md md:w-36 w-16 h-10 p-3.5 items-center"
          >
            <SearchIcon className="h-5 w-5 md:mr-2 grow" />
            <p className="md:flex hidden font-semibold">Search User</p>
          </button>
        </Tooltip>

        <p className="text-2xl font-medium">Chatter</p>

        <div className="flex items-center">
          <Menu>
            <MenuButton mr={3} p={2}>
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
              />
              <BellIcon className="w-6" />
            </MenuButton>
            <MenuList>
              {!notifications.length && (
                <p className="pl-2 font-medium text-base">No new messages</p>
              )}
              {notifications.map((noti) => (
                <>
                  <MenuItem
                    key={noti._id}
                    onClick={() => {
                      setSelectedChat(noti.chat);
                      setNotifications(notifications.filter((n) => n !== noti));
                    }}
                  >
                    {noti.chat.isGroupChat
                      ? `New message in ${noti.chat.chatName}`
                      : `New message from ${getSender(user, noti.chat.users)}`}
                  </MenuItem>
                  <MenuDivider />
                </>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={2}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                // src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setSearch();
              setSearchResults([]);
              onClose();
            }}
          />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <div className="flex py-2">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                className="rounded-md h-10 border-inherit"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="inline-flex justify-center items-center font-semibold bg-indigo-300 hover:bg-[#E2E8F0] rounded-md ml-1 flex-1 text-xs md:text-base text-white hover:text-black"
              >
                Search
              </button>
            </div>
            {loadingSearch ? (
              <UserLoader />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    createChat(user._id);
                  }}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

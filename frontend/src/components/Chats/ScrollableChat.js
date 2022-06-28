import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/chatContext";
import { isLastMessage, isSameSender, isSameSenderMargin } from "./ChatLogic";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed forceScroll={true}>
      {messages &&
        messages.map((message, index) => (
          <div key={message._id} className="flex h-10">
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  // src={message.sender.pic}
                />
              </Tooltip>
            )}
            <span
              className={`${
                message.sender._id === user._id ? "bg-sky-300" : "bg-green-300"
              } rounded-lg px-3.5 py-1 font-medium mt-2 flex items-center`}
              style={{
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
                fontFamily: "Source Sans Pro",
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

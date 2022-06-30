import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/solid";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <button
          className="w-10 h-10 bg-[#EDF2F7] inline-flex items-center rounded-md"
          onClick={onOpen}
        >
          <EyeIcon className="h-5 w-5 md:flex sm:hidden grow" />
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h4 className="flex flex-initial justify-center text-2xl p-4 font-semibold">
            {user.name}
          </h4>
          <ModalCloseButton />
          <ModalBody className="flex justify-center items-center flex-col">
            {/* <img src={user.pic} alt={user.name} className="w-40 rounded-full" /> */}
            <p className="text-xl font-normal p-4">
              <span>Email : </span>
              {user.email}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

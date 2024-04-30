import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  faEllipsis,
  faGear,
  faInbox,
  faL,
  faMagnifyingGlass,
  faPhone,
  faPlus,
  faSearch,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { MessageProfileCard } from "../components/common/messagProfileCard";
import { none } from "ramda";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export const MessagesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="h-screen flex w-full ">
      <div className="w-2/4 bg-gray-700  border-gray-400 border-r-2">
        {/* <div className="w-full pt-2">
          <Input
            placeholder="Search conversation"
            border={"1px"}
            width={"xs"}
          />
        </div> */}
        <div className="space-y-4 ">
          <div className="flex items-center justify-between px-6 pb-2 ">
            <div className="text-black font-bold text-2xl">
              <p>Messsages</p>
            </div>
            <div className="text-black space-x-2">
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "white" }}
                  />
                }
              />
              <Input placeholder="Search for chats..." />
            </InputGroup>
          </div>
          <div className="bg-black rounded-lg mx-5 p-4 hover:cursor-pointer">
            <div className="flex items-center justify-center space-x-2 ">
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              <p className="text-white">Start New Chat</p>
            </div>
          </div>
          {/* <h1 className="text-white font-bold text-3xl">
            Inbox is empty send a message or two!
          </h1>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Write a message{" "}
          </Button> */}

          <MessageProfileCard />
        </div>
      </div>
      <div className="bg-gray-700 w-full h-full flex flex-col justify-between ">
        <div className="border-b h-1/10 flex items-center justify-between">
          <div className="flex space-x-2 items-center p-4">
            <div className="w-14 h-14 bg-white rounded-full"></div>

            <div className=" flex flex-col items-start">
              <p className="text-white font-bold text-2xl">username</p>
              <p className="text-white">Status</p>{" "}
            </div>
          </div>

          <div
            id="userAction"
            className="flex space-x-4 text-xl mr-2 text-white"
          >
            <div className="border px-4 py-3 rounded-full">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="border px-4 py-3 rounded-full">
              <FontAwesomeIcon icon={faVideoCamera} />
            </div>
            <div className="border px-4 py-3 rounded-full">
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </div>
        </div>
        <div className="h-1/10 flex items-center w-full rounded-2xl space-x-2 px-2">
          <div className="flex space-x-2">
            <div className="">
              <FontAwesomeIcon icon={faImage} size="2xl" />
            </div>
            <div className="inline-block border bg-blue-700 font-black text-white p-1 rounded-md">
              GIF
            </div>
          </div>
          <div className="w-full">
            <Input placeholder="Start a new message" rounded={"2xl"} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {<ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />}

        <ModalContent>
          <ModalHeader>New Message</ModalHeader>

          <ModalBody>
            <div>
              <div>
                <InputGroup>
                  <InputLeftAddon
                    children={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  />
                  <Input placeholder="Enter user" />
                </InputGroup>
              </div>
              <div>list of people</div>
            </div>
          </ModalBody>
          <ModalFooter>h</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

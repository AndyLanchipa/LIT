import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  faGear,
  faInbox,
  faL,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { MessageProfileCard } from "../components/common/messagProfileCard";

export const MessagesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="h-screen flex w-full ">
      <div className="w-1/4 bg-black  border-gray-400 border-r-2">
        {/* <div className="w-full pt-2">
          <Input
            placeholder="Search conversation"
            border={"1px"}
            width={"xs"}
          />
        </div> */}
        <div className="space-y-4 ">
          <div className="flex items-center justify-between px-6 pb-2 ">
            <div className="text-white font-bold text-2xl">
              <p>Messsages</p>
            </div>
            <div className="text-white space-x-2">
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon icon={faPlus} />
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
      <div className="w-full bg-black border-2 text-white  flex flex-col justify-center text-gray-500">
        {/* <FontAwesomeIcon icon={faInbox} size="8x" />
        <p className="text-4xl  font-bold">Very empty in here......</p> */}
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

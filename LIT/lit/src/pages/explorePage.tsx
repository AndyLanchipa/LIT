import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement, useState } from "react";
import { Post } from "../components/common/post";
import { PostType } from "../types/post";
import { POST } from "../services/apiservice";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faInbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; // Solid style house icon
import { useNavigate } from "react-router";

export const ExplorePage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const {
    getValues,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PostType>();
  const createPost: createPostType = (body) => {
    console.log("we made it to the post");
    // POST<PostType>("/posts/createPost", { method: "POST", body }).then(
    //   () => {}
    // );

    setOpen(true);
  };

  return (
    <div className="bg-zinc-800 h-screen flex justify-evenly items-center w-full space-x-6 ">
      <div className="bg-black h-full w-1/4 ">
        <div className="flex flex-col justify-between h-screen">
          <div className="flex  justify-center h-full">
            <div className="flex flex-col items-start space-y-4 ">
              <div className="space-x-4 items-start">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-white text-2xl"
                />
                <text className="text-white text-2xl ">Home</text>
              </div>
              <div className="space-x-4">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-white text-2xl"
                />
                <text className="text-white text-2xl">Notification</text>
              </div>
              <div
                className="space-x-4 hover:cursor-pointer"
                onClick={() => {
                  navigate("/messages");
                }}
              >
                <FontAwesomeIcon
                  icon={faInbox}
                  className="text-white text-2xl"
                />
                <text className="text-white text-2xl">Messages</text>
              </div>
              <div className="space-x-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-2xl"
                />
                <text className="text-white text-2xl">Profile</text>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-2 pb-20 space-x-4">
            <div className="flex space-x-2 items-center ">
              <div className="w-10 h-10 bg-white rounded-full"></div>
              <div className="p-0 m-0 flex flex-col justify-start">
                <p className="text-white font-bold text-md">username</p>

                <p className="text-slate-400 text-left ">@tag</p>
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {<ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />}
        <ModalContent className="rounded-lg">
          <ModalHeader className="flex items-center bg-gray-700 text-white">
            <div>
              {" "}
              <text>Add Post</text>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-gray-700">
            <Controller
              rules={{
                required: "cannot have an empty post!",
              }}
              control={control}
              name="content"
              render={({ field: { onChange, value } }) => (
                <div>
                  <div className="w-full flex">
                    <div className="w-10 h-10 bg-white rounded-full mr-2 p-4"></div>

                    <div className="w-full">
                      <Textarea
                        textColor={"white"}
                        placeholder="something interesting?"
                        resize={"none"}
                        value={value}
                        onChange={() => {
                          setValue("content", value);
                        }}
                      >
                        {value}
                      </Textarea>
                    </div>
                  </div>
                  {errors.content && (
                    <div className="error text-red-600 flex items-center justify-center">
                      {errors.content.message}
                    </div>
                  )}
                </div>
              )}
            />
          </ModalBody>

          <ModalFooter padding={"2"} className="bg-gray-700">
            <Button variant={"unstyled"} mr={3} onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() =>
                trigger().then((isValid) => isValid && createPost(getValues()))
              }
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="rounded-lg bg-slate-800 p-6 h-3/4 w-full overflow-scroll">
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
        <Post content="this is a first post" />
      </div>

      <div className="w-1/4 bg-black h-full space-y-4 p-6 pt-0">
        <div className="w-full h-2/4 bg-slate-600 rounded-lg">
          <text className="text-white  text-xl">Whats LIT</text>
        </div>

        <div className="bg-slate-600 w-full h-2/6 rounded-lg ">
          <text className="text-white text-xl">Who to follow?</text>
        </div>
      </div>
    </div>
  );
};
type createPostType = (body: PostType) => void;

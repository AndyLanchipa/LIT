import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

export const Post: PostComponent = ({ content, likeCount = 0 }) => {
  const [likes, setLikes] = useState(0);
  const [reposts, setReposts] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleRepost = () => {
    setReposts((prevReposts) => prevReposts + 1);
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col">
      <p className="text-gray-800 flex-grow p-5">{content}</p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white mr-2"
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faHeart} />({likes})
        </button>
        <button
          className="px-4 py-2 rounded-md bg-green-500 text-white"
          onClick={handleRepost}
        >
          <FontAwesomeIcon icon={faRetweet} />({reposts})
        </button>
      </div>
    </div>
  );
};

type PostProps = {
  content: string;
  likeCount?: number;
};

type PostComponent = (props: PostProps) => React.ReactElement;

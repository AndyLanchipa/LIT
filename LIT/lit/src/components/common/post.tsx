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
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 flex flex-col relative">
      <div className="flex space-x-2 items-center">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="p-0 m-0 flex flex-col justify-start">
          <p className="text-white font-bold text-md">username</p>

          <p className="text-slate-400 text-left ">@tag</p>
        </div>
      </div>
      <div className="text-left">
        <p className="text-white  py-2 text-xl text-left">{content}</p>
      </div>
      <div className="flex justify-between space-x-2 ">
        <p className="text-left text-slate-400">12:00 PM : June 1, 2020</p>

        <div className="space-x-2">
          <button onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} /> {likes}
          </button>
          <button onClick={handleRepost}>
            <FontAwesomeIcon icon={faRetweet} /> {reposts}
          </button>
        </div>
      </div>
    </div>
  );
};

type PostProps = {
  content: string;
  likeCount?: number;
};

type PostComponent = (props: PostProps) => React.ReactElement;

import React, { useEffect, useState } from "react";
import { Post } from "../components/common/post";
import { GET, POST } from "../services/apiservice";
import { PostType } from "../types/post";
import { Button, Image } from "@chakra-ui/react";
import StockImage from "../aleksandr-popov-9vDdkxSCAD4-unsplash.jpg";
import { Carousel } from "../components/common/carousel";

import Likes from "../likes.jpg";
import { useUser } from "../components/context/UserContext";
const Body: React.FC = () => {
  const user = useUser();

  const [postList, setPostList] = useState<PostType[]>([]);
  const getPosts = () => {
    GET<PostType>("/posts/getPosts", {
      method: "GET",
    }).then((res) => {
      setPostList(res.data);
    });
  };
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="w-full h-screen bg-black ">
      <div className="relative">
        <Image src={StockImage} objectFit="cover" />
        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-black to-black h-16"></div> */}

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl text-center p-20 px-20 ">
            Elevate Your Social Experience with Lit: Ignite Connections,
            Illuminate Moments
          </h1>
        </div>
      </div>
      <div className="w-full ">
        <Carousel posts={[]} />
      </div>

      <div className=" relative ">
        <Image src={Likes} />
        <div className="absolute inset-0 p-10 text-white w-2/4 ">
          <Post content="  are things that are cool" />
        </div>
      </div>
    </div>
  );
};

export default Body;

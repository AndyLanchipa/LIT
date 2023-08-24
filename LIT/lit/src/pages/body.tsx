import React from "react";
import { Post } from "../components/common/post";

const Body: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-900">
      {" "}
      <h1 className="text-white text-4xl text-center p-20 px-20">
        Elevate Your Social Experience with Lit: Ignite Connections, Illuminate
        Moments
      </h1>
      <Post
        content={
          "To get the most out of 360-degree videos, move to the middle of the image and, if on a mobile device, use your finger, or on a desktop, click and drag with the cursor."
        }
      />
    </div>
  );
};

export default Body;

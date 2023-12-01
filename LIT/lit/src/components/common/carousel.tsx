import React from "react";
import { PostType } from "../../types/post";
import { Post } from "./post";
import "../../css/carousel.css";
import Queens from "../../Queens.jpg";
import Grail from "../../Grail.jpg";
import OB from "../../OB.jpg";
import Pexel from "../../PexelBar.jpg";
import Arthur from "../../ArthurBar.jpg";

export const Carousel: CarouselComponent = () => {
  const imageWidth = "300px"; // Adjust the width as needed

  return (
    <div className="">
      <div className="slider">
        <div className="slide-track">
          <img src={Queens} className="slide" />
          <img src={Grail} className="slide" />
          <img src={OB} className="slide" />
          <img src={Pexel} className="slide" />
          <img src={Arthur} className="slide" />
          <img src={Queens} className="slide" />
          <img src={Grail} className="slide" />
          <img src={OB} className="slide" />
          <img src={Pexel} className="slide" />
          <img src={Arthur} className="slide" />
        </div>
      </div>
      {/* <div className="logos">
      <div className="logos-slide mx-4">
        <img src={Queens} />
        <img src={Grail} />
        <img src={OB} />
        <img src={Pexel} />
        <img src={Arthur} />
      </div>
      <div className="logos-slide">
        <img src={Queens} />
        <img src={Grail} />
        <img src={OB} />
        <img src={Pexel} />
        <img src={Arthur} />
      </div>
    </div> */}
    </div>
  );
};

type CarouselProps = {
  posts: PostType[];
};

type CarouselComponent = (props: CarouselProps) => React.ReactElement;

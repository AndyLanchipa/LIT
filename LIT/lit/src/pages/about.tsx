import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    console.log(localStorage.getItem("token"), []);
  });
  return (
    <div className="about">
      <h1 className="about__title">
        <span>
          Unleash the Night:Unleash the Night: Navigate the Pulse of the Bar
          Scene
        </span>
      </h1>
      <p className="about__description">
        <span>
          At our core, we're on a mission to unravel the pulse of the night,
          guiding you through the vibrant tapestry of bar culture. We empower
          you with real-time insights, revealing the ebb and flow of the city's
          hottest spots. Say goodbye to aimless wanderings and hello to informed
          decisions. Discover the heartbeat of the night, seamlessly navigating
          through the crowds to find your perfect haven. Join us on this
          exhilarating journey, where every step is fueled by the anticipation
          of unforgettable moments and the knowledge that your night will be one
          for the books. Together, let's unlock the secrets of the city's bars
          and embark on a nightlife adventure like no other.
        </span>
      </p>
    </div>
  );
};

export default About;

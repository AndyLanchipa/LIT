import React, {useState} from "react";
import nightlife from "../../nightlife.jpg";
import updates from "../../updates.jpg";
import finding from "../../finding.jpg";
import vibrant from "../../vibrant bars.jpg";
import drinking from "../../drinking.jpg";
import {ScrollContainer, ScrollPage, Animator, Sticky, batch,Fade,MoveOut, MoveIn,FadeIn,FadeOut,Zoom} from 'react-scroll-motion';

const About: React.FC = () => {
    const LeftZoomInMoveOut = batch(Sticky(40, 50), FadeOut(0,1), FadeIn(0,1), MoveIn(-100,0), MoveOut(0,-800));
    const RightZoomInMoveOut = batch(Sticky(60, 50), FadeOut(0,1), FadeIn(0,1), MoveIn(100, 0), MoveOut(0,-800));
    const LastZoom = batch(Sticky(),FadeIn(), MoveIn(0, 400));
    return (
        <div>
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0,-800), Zoom(5,1))}>   
                        <h1 className="text-4xl font-bold mb-6">About LIT</h1>
                        <p>Stands for Long Island iced tea by the way ;)</p>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={1}>
                    <Animator animation={LeftZoomInMoveOut} className="text-2xl flex items-center">
                        <p className="text-lg mr-10">
                            Welcome to our website! We are LIT - your ultimate nightlife guide.
                        </p>
                        <img className="w-1/2" src={nightlife} alt="about1" />
                    </Animator>
                </ScrollPage>
                <ScrollPage page={2}>
                    <Animator animation={RightZoomInMoveOut} className="text-2xl flex items-center">
                        <p className="text-lg mr-10">
                            At LIT, we're passionate about helping you discover the hottest bars, clubs, and nightlife experiences in your city.
                        </p>
                        <img className="w-1/2" src={updates} alt="about1" />
                    </Animator>
                </ScrollPage>
                <ScrollPage page={3}>
                    <Animator animation={LeftZoomInMoveOut} className="text-2xl flex items-center">
                        <img className="w-1/2 mb-5" src={finding} alt="about2"/>
                        <p className="text-lg ml-10">
                            Our mission is to be your go-to resource for finding the pulse of the night, providing real-time insights and recommendations.
                        </p>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={4}>
                    <Animator animation={RightZoomInMoveOut} className="text-2xl flex items-center">
                        <img className="w-1/2 mb-5" src={vibrant} alt="about2"/>
                        <p className="text-lg ml-10">
                            With our user-friendly platform, you can navigate the vibrant tapestry of the bar scene, making informed decisions and unlocking unforgettable moments.
                        </p>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={5}>
                    <Animator animation={LastZoom} className="text-2xl flex items-center">
                        <img className="w-1/2 mb-5" src={drinking} alt="about2"/>
                        <p className="text-lg ml-10">
                            Join us on this exhilarating journey as we uncover the secrets of the city's bars and embark on a nightlife adventure like no other.
                        </p>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        </div>
    );
};

export default About;
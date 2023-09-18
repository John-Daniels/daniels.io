import React, { useMemo } from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const SocialMedia = () => {
  const links = {
    twitter: "https://twitter.com/johnkoder",
    fb: "https://facebook.com/johndcoder",
    instagram: "https://www.instagram.com/johndkoder.js",
    github: "https://github.com/John-Daniels",
  };

  const socialMediaHandles = useMemo(
    () => [
      {
        url: "https://github.com/John-Daniels",
        icon: <AiFillGithub />,
        name: "github",
      },
      {
        url: "https://www.linkedin.com/in/johnkoder/",
        icon: <BsLinkedin />,
        name: "linkedin",
      },
      {
        url: "https://twitter.com/johnkoder",
        icon: <BsTwitter />,
        name: "twitter",
      },
      {
        url: "https://facebook.com/johndcoder",
        icon: <FaFacebookF />,
        name: "facebook",
      },
      {
        url: "https://www.instagram.com/johnkoder.dev",
        icon: <BsInstagram />,
        name: "instagram",
      },
    ],
    []
  );

  return (
    <div className="app__social">
      {socialMediaHandles.map((social, index) => (
        <SocialIcon handle={social} key={index} />
      ))}
    </div>
  );
};

const SocialIcon = ({ handle }) => {
  const { url, icon, name } = handle;

  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div>{icon}</div>
    </a>
  );
};

export default SocialMedia;

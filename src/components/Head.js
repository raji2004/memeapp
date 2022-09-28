import React from "react";
import t from "./img/Troll Face.png";
export default function Header() {
  return (
    <header className="header">
      <img src={t} alt="p" className="header--image" />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">React Course - Project 3</h4>
    </header>
  );
}

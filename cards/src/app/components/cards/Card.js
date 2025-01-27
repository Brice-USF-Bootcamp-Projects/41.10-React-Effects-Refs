// src/app/components/cards/Card.js

"use client";
import React, { useState } from "react";

/** Single card: just renders the card as received from deck. */
function Card({ name, image }) {
  const [{ angle, xPos, yPos }] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20,
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

  return (
    <img
      className="Card transition-transform duration-300"
      alt={name}
      src={image}
      style={{
        transform,
        width: "150px",
        height: "auto",
        position: "absolute",
      }}
    />
  );
}

export default Card;


// src/app/components/deck/Deck.js

"use client";
import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(response.data);
      } catch (err) {
        console.error("Error fetching deck:", err);
      }
    }
    fetchDeck();
  }, []);

  async function drawCard() {
    if (!deck) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (response.data.remaining === 0) {
        alert("Error: no cards remaining!");
        return;
      }
      const card = response.data.cards[0];
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          name: `${card.value} of ${card.suit}`,
          image: card.image,
        },
      ]);
    } catch (err) {
      console.error("Error drawing card:", err);
    }
  }

  async function shuffleDeck() {
    if (!deck) return;
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      console.error("Error shuffling deck:", err);
    } finally {
      setIsShuffling(false);
    }
  }

  return (
    <main className="Deck flex flex-col items-center">
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600 disabled:bg-gray-400"
          onClick={drawCard}
          disabled={isShuffling || !deck}
        >
          Draw Card
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mx-2 hover:bg-green-600 disabled:bg-gray-400"
          onClick={shuffleDeck}
          disabled={isShuffling || !deck}
        >
          Shuffle Deck
        </button>
      </div>
      <div className="relative h-96 w-96 bg-white border rounded-lg overflow-hidden">
        {drawn.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;

// src/app/page.js

import Deck from "./components/deck/Deck";

export default function HomePage() {
  return (
    <main className="h-screen w-screen bg-green-500 text-black flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Deck of Cards</h1>
        <Deck />
      </div>
    </main>
  );
}

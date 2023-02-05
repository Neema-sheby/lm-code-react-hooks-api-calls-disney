import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

  useEffect(() => {
    const fetchDataHandler = async () => {
      const response = await fetch("https://api.disneyapi.dev/characters");
      const { data } = await response.json();

      console.log(data);

      const disneyData: Array<DisneyCharacter> = data.map(
        (obj: DisneyCharacter) => {
          return {
            id: obj._id,
            name: obj.name,
            imageUrl: obj.imageUrl,
          };
        }
      );
      setCharacters(disneyData);
    };
    fetchDataHandler();
  }, [currentPage]);

  return (
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
};

export default App;

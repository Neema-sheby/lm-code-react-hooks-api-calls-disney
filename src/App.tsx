/////////////////////////////////////////////////////////////////////////////////////////

import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import { FavCharacterContext } from "./components/favCharacterContext";

/////////////////////////////////////////////////////////////////////////////////////////

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [favCharacters, setfavCharacters] = useState<Array<DisneyCharacter>>(
    []
  );
  const [totalNumPages, setTotalNumPages] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const getErrorMessage = ({ message }: { message: string }) => {
    console.error(message);
  };

  useEffect(() => {
    const getCharactersHandler = async (pageNumber: number) => {
      try {
        const response = await fetch(
          `https://api.disneyapi.dev/characters?page=${pageNumber}`
        );

        if (!response.ok)
          throw new Error("Something went wrong with data fectching!");

        const json = await response.json();

        setTotalNumPages(json.totalPages);

        setCharacters(json.data);
      } catch (err: unknown) {
        let message: string = "unknown error";
        if (err instanceof Error) message = err.message;
        getErrorMessage({ message });
      }
    };
    getCharactersHandler(currentPage);
  }, [currentPage]);

  const updateHandler = (favChar: Array<DisneyCharacter>) => {
    setfavCharacters([...favChar]);
  };

  const showFavCharacterHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <FavCharacterContext.Provider
      value={{ totalNumPages, favCharacters, isClicked }}
    >
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          showFavouriteCharacters={showFavCharacterHandler}
        />
        <CharacterContainer
          characters={characters}
          favCharacters={favCharacters}
          updateFavourites={updateHandler}
        />
      </div>
    </FavCharacterContext.Provider>
  );
};

export default App;

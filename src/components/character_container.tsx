/////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext } from "react";
import { DisneyCharacter } from "../disney_character";
import Character from "./character";
import { FavCharacterContext } from "./favCharacterContext";

/////////////////////////////////////////////////////////////////////////////////////////

interface CharacterContainerProp {
  characters: Array<DisneyCharacter>;
  updateFavourites: (T: Array<DisneyCharacter>) => void;
  favCharacters: Array<DisneyCharacter>;
}

/////////////////////////////////////////////////////////////////////////////////////////

const CharacterContainer: React.FC<CharacterContainerProp> = ({
  characters,
  updateFavourites,
}) => {
  const context = useContext(FavCharacterContext);
  const { favCharacters, isClicked } = context;

  const displayFavCharacters = () => {
    return favCharacters.map((character, index) => {
      return (
        <article className="character-item" key={index + character.name}>
          <h2>{character.name}</h2>

          <img
            className="character-item__img"
            src={character.imageUrl}
            alt={character.name}
          />
        </article>
      );
    });
  };

  const buildRows = () => {
    let rows: Array<JSX.Element> = [],
      cols: Array<JSX.Element> = [];

    characters.forEach((character, index) => {
      cols.push(
        <Character
          key={character._id}
          character={character}
          updateFavourites={updateFavourites}
        />
      );
      if ((index + 1) % 5 === 0) {
        rows.push(
          <div className="character-row" key={index}>
            {cols}
          </div>
        );
        cols = [];
      }
    });

    if (cols.length > 0) {
      rows.push(
        <div className="character-row" key={characters.length}>
          {cols}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="character-container">
      {isClicked ? (
        <div className="character-row">
          {favCharacters.length === 0 ? (
            <div className="character-msg">"No Favourite characters yet !"</div>
          ) : (
            displayFavCharacters()
          )}
        </div>
      ) : (
        buildRows()
      )}
    </div>
  );
};

export default CharacterContainer;

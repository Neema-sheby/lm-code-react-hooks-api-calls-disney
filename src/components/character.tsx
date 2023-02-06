/////////////////////////////////////////////////////////////////////////////////////////

import { useContext } from "react";
import { DisneyCharacter } from "../disney_character";
import { FavCharacterContext } from "./favCharacterContext";

/////////////////////////////////////////////////////////////////////////////////////////

interface CharacterProp {
  character: DisneyCharacter;
  updateFavourites: (T: Array<DisneyCharacter>) => void;
}

/////////////////////////////////////////////////////////////////////////////////////////

const Character: React.FC<CharacterProp> = ({
  character,
  updateFavourites,
}) => {
  const context = useContext(FavCharacterContext);
  const { favCharacters } = context;
  const addFavCharacterHandler = (char: DisneyCharacter) => {
    if (!favCharacters.includes(character)) {
      updateFavourites([...favCharacters, character]);
    } else {
      const updatedChar: Array<DisneyCharacter> = favCharacters.filter(
        (char) => char._id !== character._id
      );
      updateFavourites([...updatedChar]);
    }
  };

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <button
        id={character._id}
        className="character-item__actions"
        onClick={() => addFavCharacterHandler(character)}
      >
        {!favCharacters.includes(character)
          ? "Add to Favourites"
          : "my Favourite"}
      </button>

      <img
        className="character-item__img"
        src={character.imageUrl}
        alt={character.name}
      />
    </article>
  );
};

export default Character;

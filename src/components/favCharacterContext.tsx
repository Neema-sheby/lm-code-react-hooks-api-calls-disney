/////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { DisneyCharacter } from "../disney_character";

/////////////////////////////////////////////////////////////////////////////////////////

interface Context {
  totalNumPages: number;
  favCharacters: Array<DisneyCharacter>;
  isClicked: boolean;
}

export const FavCharacterContext = React.createContext<Context>({
  totalNumPages: 0,
  favCharacters: [],
  isClicked: false,
});

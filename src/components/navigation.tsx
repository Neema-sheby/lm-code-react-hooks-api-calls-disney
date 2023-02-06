/////////////////////////////////////////////////////////////////////////////////////////

import { useContext } from "react";
import { FavCharacterContext } from "./favCharacterContext";

/////////////////////////////////////////////////////////////////////////////////////////

const Navigation: React.FC<{
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showFavouriteCharacters: () => void;
}> = ({ currentPage, setCurrentPage, showFavouriteCharacters }) => {
  const context = useContext(FavCharacterContext);
  const { totalNumPages, isClicked } = context;

  const nextPage = () => {
    if (currentPage < totalNumPages) {
      const newPageNumber = currentPage + 1;
      setCurrentPage(newPageNumber);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  };

  return (
    <div role="navigation" className="navigation" aria-label="navigation">
      {isClicked ? null : (
        <div className="navigation__item">
          <button className="navigation__button" onClick={prevPage}>
            Prev Page
          </button>
        </div>
      )}

      <div className="navigation__item">
        <button
          aria-label="btn-show"
          className="navigation__button"
          onClick={showFavouriteCharacters}
        >
          {isClicked ? "Show All" : "Show Favourites"}
        </button>
      </div>
      {isClicked ? null : (
        <div className="navigation__item">
          <button className="navigation__button" onClick={nextPage}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;

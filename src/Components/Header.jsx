/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isRecipeFavorited, toggleFavorite } from '../Services/Utils';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Header = ({ recipe, path }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copy, setCopy] = useState(false);
  const { id, type, image, name, category, alcoholicOrNot } = recipe;

  useEffect(() => {
    setIsFavorite(isRecipeFavorited(id, type));
    console.log(isRecipeFavorited(id, type));
  }, [isFavorite]);

  const toClipboard = (link) => {
    navigator.clipboard.writeText(link)
    .then(() => {
      /* alert('Link copiado!'); */
      setCopy(true);
    })
    .catch(() => null);
  };

  return (
    <header className="basic">
      <div>
        <img className="foto" data-testid="recipe-photo" src={image} alt="" />
        <h3 data-testid="recipe-title">{name}</h3>
        <h4 data-testid="recipe-category">{alcoholicOrNot || category}</h4>
      </div>
      <div>
        <button
          id="share-btn"
          data-testid="share-btn"
          onClick={() => toClipboard(`http://localhost:3000${path}`)}
        >
          <img
            src={shareIcon}
            alt="Share"
          />
        </button>
        <button
          data-testid="favorite-btn"
          src={isFavorite ? blackHeartIcon : whiteHeartIcon}
          onClick={() => {
            setIsFavorite(toggleFavorite(recipe));
          }}
        >
          <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} alt="Favorite" />
        </button>
        {copy ? <h1>Link copiado!</h1> : null}
      </div>
    </header>
  );
};

Header.propTypes = {
  recipe: PropTypes.instanceOf(Object),
  path: PropTypes.string,
}.isRequired;


export default Header;

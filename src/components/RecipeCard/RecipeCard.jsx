import { NavLink } from 'react-router-dom';
import useBeerStore from '../../zustand/store';

import { ReactComponent as NotFavorite } from '../../assets/icons/notFavorite.svg';
import { ReactComponent as Favorite } from '../../assets/icons/favorite.svg';
import { ReactComponent as Calendar } from '../../assets/icons/calendar.svg';
import { ReactComponent as Bottle } from '../../assets/icons/bottle.svg';

import style from './RecipeCard.module.scss';

export const RecipeCard = ({ recipe }) => {
  const { image_url, name, id, description, tagline, first_brewed, volume } =
    recipe;

  const addFavoriteRecipe = useBeerStore(state => state.addFavoriteRecipe);
  const removeFavoriteRecipe = useBeerStore(
    state => state.removeFavoriteRecipe
  );
  const favoriteRecipes = useBeerStore(state => state.favoriteRecipes);
  const isFavorite = favoriteRecipes.includes(id);

  const handleFavorites = e => {
    e.preventDefault();

    if (!isFavorite) {
      return addFavoriteRecipe(id);
    }
    return removeFavoriteRecipe(id);
  };

  return (
    <li id={id} className={style.recipeCard} onContextMenu={handleFavorites}>
      <NavLink className={style.recipeCardLink} to={`/recipes/${id}`}>
        <div className={style.recipeCardImgBox}>
          <img src={image_url} alt="beer" />
        </div>
        <div className={style.recipeCardText}>
          <h2 className={style.recipeCardTitle}>{name}</h2>
          <p className={style.recipeCardText}>{tagline}</p>

          <div className={style.recipeCardBox}>
            <Calendar />
            <p className={style.recipeCardText}>{first_brewed}</p>
          </div>

          <div className={style.recipeCardBox}>
            <Bottle />
            <p
              className={style.recipeCardText}
            >{`${volume.value} ${volume.unit}`}</p>
          </div>
        </div>

        <button className={style.btnFavorite} onClick={handleFavorites}>
          {isFavorite ? (
            <Favorite className={style.iconFavorite} />
          ) : (
            <NotFavorite className={style.iconFavorite} />
          )}
          <p>{isFavorite ? 'remove from favorites' : 'add to favorites'}</p>
        </button>

        <div className={style.recipeCardOverlay}>
          <p className={style.recipeCardDiscription}>{description}</p>
        </div>
      </NavLink>
    </li>
  );
};

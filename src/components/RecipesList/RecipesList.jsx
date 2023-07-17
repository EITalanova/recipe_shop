import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import useBeerStore from '../../zustand/store';

import { RecipeCard } from 'components/RecipeCard/RecipeCard';

import style from './RecipesList.module.scss';

export const RecipesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const fetchRecipes = useBeerStore(state => state.fetchRecipes);
  const visibleRecipes = useBeerStore(state => state.visibleRecipes);
  const favoriteRecipesId = useBeerStore(state => state.favoriteRecipes);

  const updateVisibleRecipes = useBeerStore(
    state => state.updateVisibleRecipes
  );
  const updatePage = useBeerStore(state => state.updatePage);
  const page = useBeerStore(state => state.page);
  const recipes = useBeerStore(state => state.recipes);
  const listRef = useRef(null);

  useEffect(() => {
    const lastRecipeIndex = recipes[recipes.length - 1];
    window.scrollTo(0, 0);

    if (isLoading) {
      updateVisibleRecipes();
      setIsLoading(false);

      const lastVisibleRecipeIndex = visibleRecipes[visibleRecipes.length - 1];

      if (lastRecipeIndex.id === lastVisibleRecipeIndex.id) {
        updatePage();
      }
    }
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    fetchRecipes(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
      // eslint-disable-next-line
  }, []);

  const handleScroll = debounce(() => {
    const { scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= clientHeight + 110 && !isLoading) {
      setIsLoading(true);
    }
  }, 200);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    const favorites = recipes.filter(recipe =>
      favoriteRecipesId.includes(recipe.id)
    );
    setFavoriteRecipes(favorites);
  };

  return (
    <>
      <button
        onClick={handleShowFavorites}
        className={showFavorites ? style.btnOnFavorite : style.btnOffFavorite}
      >
        Show only favorites
      </button>
      <ul className={style.recipesList} ref={listRef}>
        {showFavorites
          ? favoriteRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          : visibleRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </ul>
    </>
  );
};

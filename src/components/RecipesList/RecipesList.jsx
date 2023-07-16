import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import useBeerStore from '../../zustand/store';
import { useEffect } from 'react';

import style from './RecipesList.module.scss';
import { useRef } from 'react';
import { useState } from 'react';

export const RecipesList = () => {
  const fetchRecipes = useBeerStore(state => state.fetchRecipes);
  const visibleRecipes = useBeerStore(state => state.visibleRecipes);

  const updateVisibleRecipes = useBeerStore(
    state => state.updateVisibleRecipes
  );
  const updatePage = useBeerStore(state => state.updatePage);

  const page = useBeerStore(state => state.page);
  const recipes = useBeerStore(state => state.recipes);
  // console.log(page);
  console.log(visibleRecipes);

  const [isLoading, setIsLoading] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
   window.scrollTo(0, 0);

    if (isLoading) {
      updateVisibleRecipes();
      setIsLoading(false);
    }
  }, [isLoading]);

   useEffect(() => {
fetchRecipes(page);
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setIsLoading(true);
    }
  };

  return (
    <ul className={style.recipesList} ref={listRef}>
      {visibleRecipes &&
        visibleRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </ul>
  );
};

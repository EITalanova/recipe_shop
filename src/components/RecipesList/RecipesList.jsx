import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import useBeerStore from '../../zustand/store';
import { useEffect } from 'react';

import style from './RecipesList.module.scss';


export const RecipesList = () => {
  const fetchRecipes = useBeerStore(state => state.fetchRecipes);
  const recipes = useBeerStore(state => state.recipes);

  useEffect(() => {
    fetchRecipes();
  },);

  return (
    <ul className={style.recipesList} >
      {recipes &&
        recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </ul>
  );
};

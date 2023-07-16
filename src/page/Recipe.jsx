import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import useBeerStore from '../zustand/store';

import { ButtonNav } from 'components/ButtonNav/ButtonNav';

import style from './styles/Recipe.module.scss';

const Recipe = () => {
  const { id } = useParams();
  const fetchRecipeById = useBeerStore(state => state.fetchRecipeById);
  const recipe = useBeerStore(state => state.oneRecipe);

  useEffect(() => {
    fetchRecipeById(id);
  }, [fetchRecipeById, id]);

  return (
    <div>
      <ButtonNav className={style.recipeBtn} path="/recipes" text="Back" />
      {recipe && (
        <div className={style.recipeBox}>
          <div className={style.recipeImgBox}>
            <img
              className={style.recipeImg}
              src={recipe.image_url}
              alt="beer"
            />
          </div>
          <div className={style.recipeTextBox}>
            <h2 className={style.recipeCardTitle}>{recipe.name}</h2>
            <p className={style.recipeText}>{recipe.description}</p>
            <ul className={style.recipeList}>
              Ingredients
              {recipe.ingredients.hops && recipe.ingredients.hops.map(hop => (
                <li className={style.recipeText} key={nanoid()}>
                  <p>
                    {hop.name}: {hop.amount.value} {hop.amount.unit}
                  </p>
                </li>
              ))}
            </ul>
            <ul className={style.recipeList}>
              Food pairing
              {recipe.food_pairing && recipe.food_pairing.map(food => (
                <li className={style.recipeText} key={nanoid()}>
                  <p>{food}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

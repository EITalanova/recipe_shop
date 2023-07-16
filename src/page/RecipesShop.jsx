import { ButtonNav } from 'components/ButtonNav/ButtonNav';
import { RecipesList } from 'components/RecipesList/RecipesList';

import style from './styles/RecipeShop.module.scss';


const RecipeShop = () => {
  return (
    <div className={style.recipeShop}>
      <ButtonNav path="/" text="Back" />
      <RecipesList />
    </div>
  );
};

export default RecipeShop;

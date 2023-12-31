import axios from 'axios';
import { create } from 'zustand';

axios.defaults.baseURL = 'https://api.punkapi.com/v2';

const useBeerStore = create(set => ({
  recipes: [],
  oneRecipe: null,
  favoriteRecipes: [],
  visibleRecipes: [],
  page: 1,

  fetchRecipes: async page => {
    try {
      const res = await axios.get(`/beers?page=${page}`);
      const recipes = res.data;

      set({ recipes: res.data });
      return set(state => ({
        recipes,
        visibleRecipes: recipes.slice(0, 15),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  fetchRecipeById: async id => {
    try {
      const res = await axios.get(`/beers/${id}`);
      set({ oneRecipe: res.data[0] });
    } catch (error) {
      console.error(error);
    }
  },

  addFavoriteRecipe: id => {
    set(state => ({ favoriteRecipes: [...state.favoriteRecipes, id] }));
  },

  removeFavoriteRecipe: id => {
    set(state => ({
      favoriteRecipes: state.favoriteRecipes.filter(
        idFavorite => idFavorite !== id
      ),
    }));
  },
  updatePage: () => set(state => ({ page: state.page + 1 })),

  updateVisibleRecipes: () => {
    set(state => {
      const lastRecipeIndex = state.recipes.indexOf(
        state.visibleRecipes[state.visibleRecipes.length - 1]
      );
      const addedRecipes = state.recipes.slice(
        lastRecipeIndex + 1,
        lastRecipeIndex + 1 + 5
      );
      // eslint-disable-next-line
      const removedRecipes = state.visibleRecipes.splice(10, 5);

      const newVisibleRecipes = [...addedRecipes, ...state.visibleRecipes];
      return { visibleRecipes: newVisibleRecipes };
    });
  },
}));

export default useBeerStore;

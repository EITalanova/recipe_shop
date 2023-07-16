import axios from 'axios';
import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

axios.defaults.baseURL = 'https://api.punkapi.com/v2';

const useBeerStore = create(set => ({
  recipes: [],
  oneRecipe: null,
  favoriteRecipes: [],
  visibleRecipes: [],
  page: 1,

  fetchRecipes: async (page) => {
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
  updateVisibleRecipes: () => {
    set(state => {
      const removedRecipes = state.visibleRecipes.splice(0, 5);
      const lastRecipeIndex = state.recipes.indexOf(
        state.visibleRecipes[state.visibleRecipes.length - 1]
      );
      const addedRecipes = state.recipes.slice(
        lastRecipeIndex + 1,
        lastRecipeIndex + 1 + 5
      );

      const newVisibleRecipes = [...state.visibleRecipes, ...addedRecipes];
      return { visibleRecipes: newVisibleRecipes };
    });
  },
  updatePage: 
  () => 
  {
  //   set(state => {
  //     // const { page, recipes, visibleRecipes } = state;
  //     const lastRecipeIndex = state.recipes[state.recipes.length - 1];
  //     console.log(lastRecipeIndex);
  //     // const lastVisibleRecipeIndex = visibleRecipes[visibleRecipes.length - 1];

  //     // if (lastRecipeIndex.id === lastVisibleRecipeIndex.id) {
  //     //   return page + 1;
  //     // }
  //   });
  },
}));

export default useBeerStore;

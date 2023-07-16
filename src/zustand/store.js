import axios from 'axios';
import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

axios.defaults.baseURL = 'https://api.punkapi.com/v2';

const useBeerStore = create(set => ({
  recipes: [],
  oneRecipe: null,
  favoriteRecipes: [],

  fetchRecipes: async () => {
    try {
      const res = await axios.get(`/beers?page=1`);
      set({ recipes: res.data });
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
}));

export default useBeerStore;

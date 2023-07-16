import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Layuot } from 'components/Layout/Layout';

const Home = lazy(() => import('./page/Home'));
const Recipe = lazy(() => import('./page/Recipe'));
const RecipeShop = lazy(() => import('./page/RecipesShop'));

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layuot />}>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<RecipeShop />} />
        <Route path={'/recipes/:id'} element={<Recipe />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

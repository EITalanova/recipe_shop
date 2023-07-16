import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import style from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={style.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

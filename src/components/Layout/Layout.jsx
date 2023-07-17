import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { PulseLoader } from 'react-spinners';

import style from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={style.container}>
      <Suspense fallback={<PulseLoader color="#1A7C40" size={40} />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './ButtonNav.module.scss';

export const ButtonNav = ({ path, text, className, onClick }) => {
  return (
    <Link onClick={onClick} to={path} className={cn(style.btn, `${className}`)}>
      {text}
    </Link>
  );
};

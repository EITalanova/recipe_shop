import { ButtonNav } from 'components/ButtonNav/ButtonNav';

import style from './styles/Home.module.scss';

const Home = () => {
  return (
    <div className={style.home}>
      <ButtonNav
        className={style.homeBtn}
        path="/recipes"
        text="Go to recipes shop!"
      />
    </div>
  );
};

export default Home;

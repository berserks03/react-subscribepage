import { FC } from 'react';
import logo from '../../assets/images/logo_pineapple.svg';
import style from './Header.module.scss';

interface Props {
  onClick: () => void;
}

const Header: FC<Props> = ({ onClick }) => {
  return (
    <header className={style.header}>
      <div className={style.logoWrapper}>
        <a href='/#' onClick={onClick}>
          <img className={style.logo} src={logo} alt='pineapple logo' />
        </a>
      </div>
      <nav className={style.navigation}>
        <a href='/#'>About</a>
        <a href='/#'>How it works</a>
        <a href='/#'>Contact</a>
      </nav>
    </header>
  );
};

export default Header;

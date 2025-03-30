import { Link } from "react-router";
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles['header']}>
      <Link className={styles['header__logo']} to='/'>
        Thesaurus App
      </Link>
    </header>
  );
};

export default Header;
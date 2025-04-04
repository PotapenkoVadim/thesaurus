import { Link } from "react-router";
import { APP_PATHS } from "../../constants";
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles['header']}>
      <Link className={styles['header__logo']} to={APP_PATHS.home}>
        Thesaurus App
      </Link>
    </header>
  );
};

export default Header;
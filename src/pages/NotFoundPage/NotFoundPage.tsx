import { Link } from "react-router";
import { APP_PATHS } from "../../constants";
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles['notfound']}>
      <div className={styles['notfound__description']}>Такой страницы не существует.</div>
      <Link className={styles['notfound__link']} to={APP_PATHS.home}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
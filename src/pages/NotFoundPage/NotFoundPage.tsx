import { Link } from "react-router";
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles['notfound']}>
      <div className={styles['notfound__description']}>Такой страницы не существует.</div>
      <Link className={styles['notfound__link']} to='/'>Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
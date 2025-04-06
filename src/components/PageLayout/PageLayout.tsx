import { Outlet } from "react-router";
import Header from "../Header/Header";
import styles from './PageLayout.module.scss';

const PageLayout = () => {
  return (
    <main className={styles['page-layout']}>
      <div className={styles['page-layout__content']}>
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default PageLayout;
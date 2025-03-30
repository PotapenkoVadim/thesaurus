import { Outlet } from "react-router";
import Header from "../Header/Header";
import styles from './PageLayout.module.scss';

const PageLayout = () => {
  return (
    <main className={styles['page-layout']}>
      <Header />
      <Outlet />
    </main>
  );
}

export default PageLayout;
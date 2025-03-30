import { Link } from "react-router";
import { Toolbar } from "../../components";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const onSearch = () => console.log('SEARCH');
  const onSort = () => console.log('SORT');
  const onAdd = () => console.log('ADD')

  return (
    <>
      <Toolbar onSearch={onSearch} onSort={onSort} onAdd={onAdd} />

      <div className={styles['word-list-page__container']}>
        <Link to='/word/123'>To Word Page</Link>
      </div>
    </>
  );
};

export default WordListPage;
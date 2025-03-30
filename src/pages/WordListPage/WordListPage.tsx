import { Toolbar, WordList } from "../../components";
import { wordList } from "../../mock";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const onSearch = () => console.log('SEARCH');
  const onSort = () => console.log('SORT');
  const onAdd = () => console.log('ADD')

  return (
    <>
      <Toolbar onSearch={onSearch} onSort={onSort} onAdd={onAdd} />

      <div className={styles['word-list-page__container']}>
        <WordList words={wordList} />
      </div>
    </>
  );
};

export default WordListPage;
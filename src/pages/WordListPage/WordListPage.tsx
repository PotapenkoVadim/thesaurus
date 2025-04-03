import { useEffect, useState } from "react";
import { BottomSheet, SearchForm, Spinner, Toolbar, WordForm, WordList } from "../../components";
import { useWords } from "../../hooks";
import { FormWord } from "../../interfaces";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const [isWordFormOpen, setIsWordFormOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    addWord,
    error,
    getWords,
    searchWord,
    words,
    search,
    sort,
    sortWords
  } = useWords();

  const openWordForm = () => setIsWordFormOpen(true);
  const closeWordForm = () => setIsWordFormOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const handleAdd = (value: FormWord) => {
    closeWordForm();
    addWord(value, search, sort);
  };

  const handleSearch = (value: string | null) => {
    closeSearch();
    searchWord(value);
  }

  useEffect(() => {
    getWords(search, sort);
  }, [search, sort]);

  return (
    <>
      {words && <Toolbar onSearch={openSearch} onSort={sortWords} onAdd={openWordForm} />}
      <div className={styles['word-list-page__container']}>
        {!words && !error && <Spinner className={styles['word-list-page__spinner']} />}
        {words && <WordList words={words} />}
        {error && <div className={styles['word-list-page__error']}>{error}</div>}
      </div>

      <BottomSheet
        isOpen={isWordFormOpen}
        title="Добавить новое слово"
        onClose={closeWordForm}
      >
        <WordForm onSubmit={handleAdd} />
      </BottomSheet>

      <BottomSheet
        isOpen={isSearchOpen}
        onClose={closeSearch}
        title="Поиск слова"
      >
        <SearchForm searchText={search} onSearch={handleSearch} />
      </BottomSheet>
    </>
  );
};

export default WordListPage;
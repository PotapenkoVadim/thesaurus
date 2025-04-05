import { useEffect, useState } from "react";
import { BottomSheet, SearchForm, Spinner, Toolbar, WordForm, WordList } from "../../components";
import { useWait, useWords } from "../../hooks";
import { FormWord } from "../../interfaces";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const [isWordFormOpen, setIsWordFormOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMounted = useWait();

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

  if (!isMounted) {
    return <Spinner className={styles['word-list-page__spinner']} />;
  }

  return (
    <>
      {words && <Toolbar onSearch={openSearch} onSort={sortWords} onAdd={openWordForm} />}
      <div className={styles['word-list-page__container']}>
        {words && <WordList words={words} />}
        {error && <div className={styles['word-list-page__error']}>{error}</div>}
      </div>

      <BottomSheet
        isOpen={isWordFormOpen}
        title="Добавить"
        onClose={closeWordForm}
      >
        <WordForm onSubmit={handleAdd} words={words} />
      </BottomSheet>

      <BottomSheet
        isOpen={isSearchOpen}
        onClose={closeSearch}
        title="Поиск"
      >
        <SearchForm searchText={search} onSearch={handleSearch} />
      </BottomSheet>
    </>
  );
};

export default WordListPage;
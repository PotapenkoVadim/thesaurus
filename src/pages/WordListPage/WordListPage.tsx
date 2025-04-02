import { useEffect, useState } from "react";
import { BottomSheet, Spinner, Toolbar, WordForm, WordList } from "../../components";
import { FormWord, Word } from "../../interfaces";
import Database from "@tauri-apps/plugin-sql";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const [words, setWords] = useState<Array<Word> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  const getWords = async () => {  
    try {
      const db = await Database.load("sqlite:mydatabase.db");
      const dbWords = await db.select<Word[]>("SELECT * FROM words");

      setError(null);
      setWords(dbWords);
    } catch (error) {
      console.warn(error);
      setError("Упс, что-то пошло не так...");
    }
  };

  const addWord = async (word: FormWord) => {
    try {
      closeForm();
      setWords(null);
      setError(null);
      const db = await Database.load("sqlite:mydatabase.db");
      await db.execute("INSERT INTO words (word, description) VALUES ($1, $2)", [
        word.word,
        word.description,
      ]);

      getWords();
    } catch (error) {
      console.warn(error);
      setError("Упс, что-то пошло не так...");
    }
  }

  const onSearch = () => console.log('SEARCH');
  const onSort = () => console.log('SORT');

  useEffect(() => {
    getWords();
  }, []);

  return (
    <>
      {words && <Toolbar onSearch={onSearch} onSort={onSort} onAdd={openForm} />}
      <div className={styles['word-list-page__container']}>
        {!words && !error && <Spinner className={styles['word-list-page__spinner']} />}
        {words && <WordList words={words} />}
        {error && <div className={styles['word-list-page__error']}>{error}</div>}
      </div>

      <BottomSheet isOpen={isOpen} title="Добавить новое слово" onClose={closeForm}>
        <WordForm onSubmit={addWord} />
      </BottomSheet>
    </>
  );
};

export default WordListPage;
import { useEffect, useState } from "react";
import { Spinner, Toolbar, WordList } from "../../components";
import { wordList } from "../../mock";
import { Word } from "../../interfaces";
import Database from "@tauri-apps/plugin-sql";
import styles from './WordListPage.module.scss';

const WordListPage = () => {
  const [words, setWords] = useState<Array<Word> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSearch = () => console.log('SEARCH');
  const onSort = () => console.log('SORT');
  const onAdd = () => console.log('ADD');

  // useEffect(() => {
  //   const getWords = async () => {
  //     try {
  //       const db = await Database.load("sqlite:mydatabase.db");
  //       const dbWords = await db.select<Word[]>("SELECT * FROM words");
  
  //       setError(null);
  //       setWords(dbWords);
  //     } catch (error) {
  //       console.log(error);
  //       setError("Упс, что-то пошло не так...");
  //     }
  //   };

  //   getWords();
  // }, []);

  return (
    <>
      {words && <Toolbar onSearch={onSearch} onSort={onSort} onAdd={onAdd} />}
      <div className={styles['word-list-page__container']}>
        {!words && !error && <Spinner className={styles['word-list-page__spinner']} />}
        {words && <WordList words={wordList} />}
        {error && <div className={styles['word-list-page__error']}>{error}</div>}
      </div>
    </>
  );
};

export default WordListPage;
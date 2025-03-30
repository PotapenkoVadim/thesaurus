import { Link } from "react-router";
import { Word } from "../../interfaces";
import { sortWordsAbcs } from "../../utils";
import EmptyText from "../EmptyText/EmptyText";
import styles from './WordList.module.scss';

const WordList = ({
  words
}: {
  words: Array<Word>;
}) => {
  const hasWords = Boolean(words) && words.length > 0;
  const wordsByAbcs = sortWordsAbcs(words);

  return (
    <div className={styles['word-list']}> 
        {hasWords ? (
          <>
            <div className={styles['word-list__words-container']}>
              {Object.entries(wordsByAbcs).map(([letter, words]) => (
                <div id={letter} key={letter}>
                  <div className={styles['word-list__letter']}>{letter}</div>
                  <div className={styles['word-list__words']}>
                    {words.map(({id, word}) => (
                      <Link
                        className={styles['word-list__link']}
                        key={id}
                        to={`/word/${id}`}
                      >
                        {word}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
    
            <button className={styles['word-list__nav']}>АБВ</button>
          </>
        ) : (
          <EmptyText text="У вас пока нет добавленных слов." className={styles['word-list__empty']} />
        )}
    </div>
  );
};

export default WordList;
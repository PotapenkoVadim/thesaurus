import { useState } from "react";
import { Link } from "react-router";
import { Word } from "../../interfaces";
import { sortWordsAbcs } from "../../utils";
import EmptyText from "../EmptyText/EmptyText";
import BottomSheet from "../BottomSheet/BottomSheet";
import styles from './WordList.module.scss';

const WordList = ({
  words
}: {
  words: Array<Word>;
}) => {
  const hasWords = Boolean(words) && words.length > 0;
  const wordsByAbcs = sortWordsAbcs(words);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const moveToWord = () => {
    setIsOpen(false);
  }

  return (
    <div className={styles['word-list']}> 
        {hasWords ? (
          <>
            <div className={styles['word-list__words-container']}>
              {Object.entries(wordsByAbcs)
                .sort(([a], [b]) => a.localeCompare(b, 'ru'))
                .map(([letter, words]) => (
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
    
            <button onClick={handleOpen} className={styles['word-list__nav']}>
              <span className="material-symbols-outlined">
                abc
              </span>
            </button>
          </>
        ) : (
          <EmptyText text="У вас пока нет добавленных слов." className={styles['word-list__empty']} />
        )}

        <BottomSheet title="Алфавитный указатель" isOpen={isOpen} onClose={handleClose}>
          <div className={styles['word-list__pointer-list']}>
            {Object.keys(wordsByAbcs)
              .sort((a, b) => a.localeCompare(b, 'ru'))
              .map(item => (
                <a
                  onClick={moveToWord}
                  key={item}
                  href={`/?#${item}`}
                  className={styles['word-list__pointer']}
                >
                  {item}
                </a>
            ))}
          </div>
        </BottomSheet>
    </div>
  );
};

export default WordList;
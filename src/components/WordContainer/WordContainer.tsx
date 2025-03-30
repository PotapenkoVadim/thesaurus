import { Word } from '../../interfaces';
import styles from './WordContainer.module.scss'

const WordContainer = ({
  word,
  className
}: {
  word: Word;
  className?: string;
}) => {
  const {word:definition, description} = word;

  return (
    <div className={className}>
      <div className={styles['word-container__word']}>{definition}</div>
      <div className={styles['word-container__description']}>{description}</div>
    </div>
  );
};

export default WordContainer;
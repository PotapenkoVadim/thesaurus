import { Link } from 'react-router';
import { Word } from '../../interfaces';
import EmptyText from '../EmptyText/EmptyText';
import { APP_PATHS } from '../../constants';
import styles from './SynonymsList.module.scss';

const SynonymsList = ({
  synonymsList,
  className
}: {
  synonymsList?: Array<Word>;
  className?: string;
}) => {
  const hasSynonyms = synonymsList && synonymsList.length > 0;

  return (
    <div className={className}>
      <div className={styles['synonyms-list__title']}>Синонимы:</div>

      <div className={styles['synonyms-list__list']}>
        {hasSynonyms ? synonymsList.map(item => (
          <Link
            className={styles['synonyms-list__item']}
            to={`${APP_PATHS.word}/${item.id}`}
            key={item.id}
          >
            {item.word}
          </Link>
        )) : (
          <EmptyText text='Вы еще не указали синонимы для этого слова.' className={styles['synonyms-list__empty']} />
        )}
      </div>
    </div>
  );
}

export default SynonymsList;
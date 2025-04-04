import BackButton from "../BackButton/BackButton";
import IconButton from "../IconButton/IconButton";
import styles from './WordActions.module.scss';

const WordActions = ({
  onDelete,
  onEdit,
  hasWord = false
}: {
  onDelete: () => void;
  onEdit: () => void;
  hasWord: boolean;
}) => {
  return (
    <div className={styles['word-actions']}>
      <BackButton />

      {hasWord && (
        <div className={styles['word-actions__sub-container']}>
          <IconButton icon='edit' onClick={onEdit} />
          <IconButton icon='delete' onClick={onDelete} />
        </div>
      )}
    </div>
  );
}

export default WordActions;
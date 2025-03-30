import BackButton from "../BackButton/BackButton";
import IconButton from "../IconButton/IconButton";
import styles from './WordActions.module.scss';

const WordActions = ({
  onDelete,
  onEdit
}: {
  onDelete: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className={styles['word-actions']}>
      <BackButton />

      <div className={styles['word-actions__sub-container']}>
        <IconButton icon='edit' onClick={onEdit} />
        <IconButton icon='delete' onClick={onDelete} />
      </div>
    </div>
  );
}

export default WordActions;
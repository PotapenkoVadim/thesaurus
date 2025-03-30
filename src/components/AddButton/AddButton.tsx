import styles from './AddButton.module.scss';

const AddButton = ({
  onClick
}: {
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} type='button' className={styles['add-button']}>
      <span className="material-symbols-outlined">
        add
      </span>

      Добавить слово
    </button>
  );
}

export default AddButton;
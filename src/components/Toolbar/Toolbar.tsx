import AddButton from "../AddButton/AddButton";
import IconButton from "../IconButton/IconButton";
import styles from './Toolbar.module.scss';

const Toolbar = ({
  onSearch,
  onSort,
  onAdd
}: {
  onSearch: () => void;
  onSort: () => void;
  onAdd: () => void;
}) => {
  return (
    <div className={styles['toolbar']}>
      <AddButton onClick={onAdd} />

      <div className={styles['toolbar__sub-container']}>
        <IconButton icon="search" onClick={onSearch} />
        <IconButton icon="sort" onClick={onSort} />
      </div>
    </div>
  );
}

export default Toolbar;
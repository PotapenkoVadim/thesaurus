import { ChangeEventHandler, useState } from "react";
import styles from './SearchForm.module.scss';

const SearchForm = ({
  searchText,
  onSearch
}: {
  searchText: string | null,
  onSearch: (value: string | null) => void
}) => {
  const [value, setValue] = useState(searchText ?? '');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const handleSearch = () => onSearch(value || null);
  const handleReset = () => onSearch(null);

  return (
    <div className={styles['search-form']}>
      <input
        className={styles['search-form__input']}
        value={value ?? ''}
        onChange={handleChange}
        placeholder="Введите текст"
      />

      <div className={styles['search-form__actions']}>
        <button
          className={styles['search-form__button']}
          onClick={handleReset}
          type='button'
        >
          Сбросить
        </button>

        <button
          className={styles['search-form__button']}
          onClick={handleSearch}
          type='button'
        >
          Искать
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
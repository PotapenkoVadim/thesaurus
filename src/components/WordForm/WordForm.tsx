import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FormWord, Word } from "../../interfaces";
import EmptyText from "../EmptyText/EmptyText";
import styles from './WordForm.module.scss';

const WordForm = ({
  onSubmit,
  words,
  editedWord
}: {
  onSubmit: (value: FormWord) => void;
  words: Array<Word> | null;
  editedWord?: Word | null
}) => {
  const [word, setWord] = useState(editedWord?.word || '');
  const [description, setDescription] = useState(editedWord?.description || '');
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [search, setSearch] = useState('');
  const [synonymsList, setSynonymsList] = useState<Array<number>>(() => {
    if (editedWord?.synonyms && editedWord.synonyms.length > 0) {
      return editedWord.synonyms.map(item => item.id)
    }

    return [];
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const synonymsIds = showSynonyms ? synonymsList : null;
    onSubmit({word, description, synonymsIds});
    setWord('');
    setDescription('');
  };

  const changeWord: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWord(e.target.value);
  }

  const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value);
  }

  const toggleSynonyms = () => setShowSynonyms(prev => !prev);
  const addSynonyms = (id: number) => setSynonymsList(prev => {
    if (prev.includes(id)) {
      return prev.filter(item => item !== id);
    }

    return [...prev, id]
  });

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  }

  const synonyms = words?.filter(item => {
    if (item.id === editedWord?.id) {
      return false;
    }

    return search
      ? item.word.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      : true;
  });

  const hasSynonyms = synonyms && synonyms.length > 0;

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <label className={styles['form__row']}>
        Термин:
        <input
          type='text'
          value={word}
          onChange={changeWord}
          required
          className={styles['form__input']}
          placeholder="Введите термин"
        />
      </label>

      <label className={styles['form__row']}>
        Определение:
        <textarea
          value={description}
          required
          onChange={changeDescription}
          className={styles['form__input']}
          placeholder="Введите определение"
          rows={5}
        />
      </label>

      <div className={styles['form__buttons']}>
        <button
          onClick={toggleSynonyms}
          className={styles['form__button']}
          type='button'
        >
          Добавить синоним
        </button>

        <button className={styles['form__button']} type='submit'>
          Сохранить
        </button>
      </div>

      {showSynonyms && (
        <div className={styles['form__list']}>
          {hasSynonyms && (
            <input
              type='text'
              value={search}
              onChange={handleSearch}
              className={styles['form__input']}
              placeholder="Поиск синонима"
            />
          )}

          {synonyms?.map(({id, word}) => (
            <button
              type='button'
              className={`
                ${styles['form__synonym-btn']}
                ${synonymsList?.includes(id) ? styles['form__synonym-btn_check'] : ''}
              `}
              key={id}
              onClick={() => addSynonyms(id)}
            >
              {word}
            </button>
          ))}

          {!hasSynonyms && <EmptyText text='Список слов пуст' />}
        </div>
      )}
    </form>
  );
}

export default WordForm;
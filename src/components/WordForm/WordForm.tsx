import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FormWord, Word } from "../../interfaces";
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit({word, description});
    setWord('');
    setDescription('');
  };

  const changeWord: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWord(e.target.value);
  }

  const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value);
  }

  const handleSynonyms = () => {
    console.log(words);
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <label className={styles['form__row']}>
        Введите термин:
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
        Введите определение:
        <textarea
          value={description}
          required
          onChange={changeDescription}
          className={styles['form__input']}
          placeholder="Введите слово"
          rows={5}
        />
      </label>

      <div className={styles['form__buttons']}>
        <button
          onClick={handleSynonyms}
          className={styles['form__button']}
          type='button'
        >
          Добавить синоним
        </button>

        <button className={styles['form__button']} type='submit'>
          Сохранить слово
        </button>
      </div>
    </form>
  );
}

export default WordForm;
import { useNavigate, useParams } from "react-router";
import {
  BottomSheet,
  Spinner,
  SynonymsList,
  WordActions,
  WordContainer,
  WordForm
} from "../../components";
import { useWait, useWordDetails } from "../../hooks";
import { useEffect, useState } from "react";
import { APP_PATHS } from "../../constants";
import { FormWord } from "../../interfaces";
import styles from './WordPage.module.scss';

const WordPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isMounted = useWait(id);

  const {error, getWord, word, words, deleteWord, editWord, getWords} = useWordDetails();

  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const handleEdit = async (value: FormWord) => {
    if (id) {
      await editWord(value, id)
    }

    closeEdit();
  }

  const handleDelete = async () => {
    if (id) {
      await deleteWord(id);
    }

    closeDelete();
    navigate(APP_PATHS.home);
  };

  useEffect(() => {
    if (id) {
      getWord(id);
    }
  }, [id]);

  useEffect(() => {
    getWords();
  }, []);

  if (!isMounted) {
    return <Spinner className={styles['word-page__spinner']} />;
  }

  return (
    <>
      <WordActions onDelete={openDelete} onEdit={openEdit} hasWord={Boolean(word)} />
      {error && <div className={styles['word-page__error']}>{error}</div>}
      {word && <WordContainer word={word} className={styles['word-page__container']} />}
      {word && <SynonymsList synonymsList={word.synonyms} className={styles['word-page__container']} />}

      <BottomSheet
        isOpen={isDeleteOpen}
        title="Удалить"
        onClose={closeDelete}
      >
        <>
          <div className={styles['word-page__text']}>Вы действительно хотите удалить слово {word?.word}?</div>
          <div className={styles['word-page__actions']}>
          <button
            className={styles['word-page__button']}
            onClick={closeDelete}
            type='button'
          >
            Отменить
          </button>

          <button
            className={styles['word-page__button']}
            onClick={handleDelete}
            type='button'
          >
            Удалить
          </button>
        </div>
        </>
      </BottomSheet>

      <BottomSheet
        isOpen={isEditOpen}
        title="Редактировать"
        onClose={closeEdit}
      >
        <WordForm onSubmit={handleEdit} words={words} editedWord={word} />
      </BottomSheet>
    </>
  );
};

export default WordPage;
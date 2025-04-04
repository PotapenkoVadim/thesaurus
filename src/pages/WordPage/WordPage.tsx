import { useNavigate, useParams } from "react-router";
import { BottomSheet, Spinner, SynonymsList, WordActions, WordContainer } from "../../components";
import styles from './WordPage.module.scss';

// TODO: should remove
import { synonymsList } from "../../mock";
import { useWordDetails } from "../../hooks";
import { useEffect, useState } from "react";
import { APP_PATHS } from "../../constants";

const WordPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {error, getWord, word, deleteWord} = useWordDetails();

  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  const onEdit = () => console.log('EDIT: ', id);

  const handleDelete = () => {
    if (id) {
      deleteWord(id).then(() => {
        closeDelete();
        navigate(APP_PATHS.home);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getWord(id);
    }
  }, [id]);

  return (
    <>
      <WordActions  onDelete={openDelete} onEdit={onEdit} hasWord={Boolean(word)} />
      {!word && !error && <Spinner className={styles['word-page__spinner']} />}
      {error && <div className={styles['word-page__error']}>{error}</div>}
      {word && <WordContainer word={word} className={styles['word-page__container']} />}
      {synonymsList && <SynonymsList synonymsList={synonymsList} className={styles['word-page__container']} />}

      <BottomSheet
        isOpen={isDeleteOpen}
        title="Удаление слова"
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
    </>
  );
};

export default WordPage;
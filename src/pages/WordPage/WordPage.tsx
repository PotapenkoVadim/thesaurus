import { useParams } from "react-router";
import { Spinner, SynonymsList, WordActions, WordContainer } from "../../components";
import styles from './WordPage.module.scss';

// TODO: should remove
import { synonymsList } from "../../mock";
import { useWordDetails } from "../../hooks";
import { useEffect } from "react";

const WordPage = () => {
  const {id} = useParams();

  const {error, getWord, word} = useWordDetails();

  const onDelete = () => console.log('DELETE: ', id);
  const onEdit = () => console.log('EDIT: ', id);

  useEffect(() => {
    if (id) {
      getWord(id);
    }
  }, [id]);

  return (
    <>
      <WordActions onDelete={onDelete} onEdit={onEdit} />
      {!word && !error && <Spinner className={styles['word-page__spinner']} />}
      {error && <div className={styles['word-page__error']}>{error}</div>}
      {word && <WordContainer word={word} className={styles['word-page__container']} />}
      {synonymsList && <SynonymsList synonymsList={synonymsList} className={styles['word-page__container']} />}
    </>
  );
};

export default WordPage;
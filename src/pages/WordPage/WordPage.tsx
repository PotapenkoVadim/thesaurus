import { useParams } from "react-router";
import { SynonymsList, WordActions, WordContainer } from "../../components";
import styles from './WordPage.module.scss';

// TODO: should remove
import { word, synonymsList } from "../../mock";

const WordPage = () => {
  const {id} = useParams();

  const onDelete = () => console.log('DELETE: ', id);
  const onEdit = () => console.log('EDIT: ', id);

  return (
    <>
      <WordActions onDelete={onDelete} onEdit={onEdit} />
      <WordContainer word={word} className={styles['word-page__container']} />
      <SynonymsList synonymsList={synonymsList} className={styles['word-page__container']} />
    </>
  );
};

export default WordPage;
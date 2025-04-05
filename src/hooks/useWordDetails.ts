import { useCallback, useReducer } from "react";
import { FormWord, Word } from "../interfaces";
import { ERROR_TEXT } from "../constants";
import { deleteWordById, selectWordById, selectWords, updateWordById } from "../services";

type WordDetailsActions =
  | {type: 'set-word', payload: Word}
  | {type: 'set-error', payload: string}
  | {type: 'delete-word'}
  | {type: 'set-words', payload: Array<Word>};

type WordDetailsState = {
  word: Word | null;
  words: Array<Word> | null;
  error: string | null;
}

const wordDetailsReducer = (
  state: WordDetailsState,
  action: WordDetailsActions
): WordDetailsState => {
  switch (action.type) {
    case 'set-word':
      return {
        ...state,
        error: null,
        word: action.payload
      };

    case 'set-error':
      return {
        ...state,
        error: action.payload,
        word: null
      };

    case 'delete-word':
      return {
        ...state,
        word: null,
        error: null
      };

    case 'set-words':
      return {
        ...state,
        error: null,
        words: action.payload
      };

    default:
      return state;
  }
}

export const useWordDetails = () => {
  const [state, dispatch] = useReducer(wordDetailsReducer, {
    word: null,
    error: null,
    words: null
  });

  const getWord = useCallback(async (id: string) => {
    try {
      const selectedWord = await selectWordById(id);
      if (selectedWord === undefined) {
        throw new Error();
      }

      dispatch({type: 'set-word', payload: selectedWord});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const getWords = useCallback(async () => {
    try {
      const dbWords = await selectWords('');
      dispatch({type: 'set-words', payload: dbWords});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const deleteWord = useCallback(async (id: string) => {
    try {
      await deleteWordById(id)
      dispatch({type: 'delete-word'});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const editWord = useCallback(async (value: FormWord, id: string) => {
    try {
      await updateWordById(value, id);
      const selectedWord = await selectWordById(id);
      if (selectedWord === undefined) {
        throw new Error();
      }

      dispatch({type: 'set-word', payload: selectedWord});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  return {
    ...state,
    getWord,
    deleteWord,
    editWord,
    getWords
  }
}
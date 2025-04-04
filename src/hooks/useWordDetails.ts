import { useCallback, useReducer } from "react";
import { Word } from "../interfaces";
import Database from "@tauri-apps/plugin-sql";
import { DB_NAME, ERROR_TEXT } from "../constants";

type WordDetailsActions =
  | {type: 'set-word', payload: Word}
  | {type: 'set-error', payload: string};

type WordDetailsState = {
  word: Word | null;
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

    default:
      return state;
  }
}

export const useWordDetails = () => {
  const [state, dispatch] = useReducer(wordDetailsReducer, {
    word: null,
    error: null,
  });

  const getWord = useCallback(async (id: string) => {
    try {
      const db = await Database.load(DB_NAME);
      const dbWord = await db.select<Array<Word>>(`SELECT * FROM words WHERE id = ${id}`);

      dispatch({type: 'set-word', payload: dbWord[0]});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  return {
    ...state,
    getWord
  }
}
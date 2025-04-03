import { useCallback, useReducer } from "react";
import { FormWord, Word } from "../interfaces";
import { DB_NAME, ERROR_TEXT } from "../constants";
import Database from "@tauri-apps/plugin-sql";

type WordsActions = 
  | {type: 'set-words', payload: Array<Word>}
  | {type: 'add-word', payload: Array<Word>}
  | {type: 'set-error', payload: string}
  | {type: 'set-search', payload: string | null};

type WordsState = {
  words: Array<Word> | null;
  error: string | null;
  search: string | null;
}

const wordsReducer = (state: WordsState, action: WordsActions): WordsState => {
  switch (action.type) {
    case 'add-word':
    case 'set-words':
      return {
        ...state,
        error: null,
        words: action.payload
      };

    case 'set-error':
      return {
        ...state,
        words: null,
        error: action.payload
      }

    case 'set-search':
      return {
        ...state,
        search: action.payload
      };

    default:
      return state;
  }
}

export const useWords = () => {
  const [{words, error, search}, dispatch] = useReducer(wordsReducer, {
    words: null,
    error: null,
    search: null
  });

  const getWords = useCallback(async (search: string | null) => {
    try {
      const searchText = search ?? '';
      const db = await Database.load(DB_NAME);
      const dbWords = await db.select<Word[]>(`SELECT * FROM words WHERE LOWER(word) LIKE LOWER('%${searchText}%')`);

      dispatch({type: 'set-words', payload: dbWords});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const addWord = useCallback(async (word: FormWord, search: string | null) => {
    try {
      const searchText = search ?? '';
      const db = await Database.load(DB_NAME);
      await db.execute("INSERT INTO words (word, description) VALUES ($1, $2)", [
        word.word,
        word.description,
      ]);
      const dbWords = await db.select<Word[]>(`SELECT * FROM words WHERE LOWER(word) LIKE LOWER('%${searchText}%')`);

      dispatch({type: 'add-word', payload: dbWords});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const searchWord = useCallback(async (value: string | null) => {
    dispatch({type: 'set-search', payload: value})
  }, []);

  return {
    words,
    error,
    search,
    getWords,
    addWord,
    searchWord
  }
}
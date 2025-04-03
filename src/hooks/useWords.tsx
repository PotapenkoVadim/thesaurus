import { useCallback, useReducer } from "react";
import { FormWord, Word } from "../interfaces";
import { DB_NAME, ERROR_TEXT } from "../constants";
import Database from "@tauri-apps/plugin-sql";
import { SortType } from "../types";
import {sortWords as sortWordsUtil} from '../utils';

type WordsActions = 
  | {type: 'set-words', payload: Array<Word>}
  | {type: 'add-word', payload: Array<Word>}
  | {type: 'set-error', payload: string}
  | {type: 'set-search', payload: string | null}
  | {type: 'set-sort'};

type WordsState = {
  words: Array<Word> | null;
  error: string | null;
  search: string | null;
  sort: SortType;
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
    
    case 'set-sort':
      return {
        ...state,
        sort: state.sort === 'ASC' ? 'DESC' : 'ASC'
      }

    default:
      return state;
  }
}

export const useWords = () => {
  const [state, dispatch] = useReducer(wordsReducer, {
    words: null,
    error: null,
    search: null,
    sort: 'ASC'
  });

  const getWords = useCallback(async (search: string | null, sort: SortType) => {
    try {
      const searchText = search ?? '';
      const db = await Database.load(DB_NAME);
      const dbWords = await db.select<Word[]>(`SELECT * FROM words WHERE LOWER(word) LIKE LOWER('%${searchText}%')`);
      const sortedWords = sortWordsUtil(dbWords, sort);

      dispatch({type: 'set-words', payload: sortedWords});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const addWord = useCallback(async (word: FormWord, search: string | null, sort: SortType) => {
    try {
      const searchText = search ?? '';
      const db = await Database.load(DB_NAME);
      await db.execute("INSERT INTO words (word, description) VALUES ($1, $2)", [
        word.word,
        word.description,
      ]);
      const dbWords = await db.select<Word[]>(`SELECT * FROM words WHERE LOWER(word) LIKE LOWER('%${searchText}%')`);
      const sortedWords = sortWordsUtil(dbWords, sort);

      dispatch({type: 'add-word', payload: sortedWords});
    } catch (error) {
      console.warn(error);
      dispatch({type: 'set-error', payload: ERROR_TEXT});
    }
  }, []);

  const searchWord = useCallback((value: string | null) => {
    dispatch({type: 'set-search', payload: value})
  }, []);

  const sortWords = useCallback(() => {
    dispatch({type: 'set-sort'});
  }, []);

  return {
    ...state,
    getWords,
    addWord,
    searchWord,
    sortWords
  }
}
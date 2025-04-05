export interface Word {
  id: number;
  word: string;
  description?: string;
  synonyms?: Array<Word>;
}

export type FormWord = {
  synonymsIds?: Array<number> | null;
} & Pick<Word, 'word' | 'description'>;
export interface Word {
  id: number;
  word: string;
  description?: string;
}

export type FormWord = Pick<Word, 'word' | 'description'>;
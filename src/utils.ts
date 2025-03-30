import { Word } from './interfaces';

export const sortWordsAbcs = (words: Array<Word>) =>
  words.reduce(
    (acc, item) => {
      const firstLetter = item.word[0];

      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(item);

      return acc;
    },
    {} as Record<string, Array<Word>>,
  );

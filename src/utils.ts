import { Word } from './interfaces';
import { SortType } from './types';

export const sortWordsAbcs = (words: Array<Word>) =>
  words.reduce(
    (acc, item) => {
      const firstLetter = item.word[0].toUpperCase();

      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(item);

      return acc;
    },
    {} as Record<string, Array<Word>>,
  );

export function throttle<T extends (...args: never[]) => never>(
  callee: T,
  timeout: number,
): (...args: Parameters<T>) => void {
  let timer: number | null = null;

  return function perform(...args: Parameters<T>): void {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      callee(...args);
      clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
}

export const sortWords = (words: Array<Word>, sort: SortType) => {
  return words.sort((a, b) => {
    if (sort === 'ASC') {
      return a.word.localeCompare(b.word, 'ru');
    }

    return b.word.localeCompare(a.word, 'ru');
  });
};

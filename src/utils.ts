import { Word } from './interfaces';

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

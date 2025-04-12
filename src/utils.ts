import { Word } from './interfaces';
import { Settings } from './interfaces/Settings';
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

export function throttle<Args extends unknown[], Return>(
  callee: (...args: Args) => Return,
  timeout: number,
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function perform(...args: Args): void {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);
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

export const setSettings = ({ font, theme }: Partial<Settings>) => {
  document.body.setAttribute('data-theme', theme || 'dark');
  document.documentElement.setAttribute('data-font', font || 'regular');

  return { font, theme };
};

export const getSettings = () => {
  const font = document.documentElement.getAttribute('data-font');
  const theme = document.body.getAttribute('data-theme');

  return { font, theme };
};

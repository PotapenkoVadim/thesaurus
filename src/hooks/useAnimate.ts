import {useEffect, useState} from 'react';

export const useAnimation = (
  isMounted: boolean,
  animationDuration: number = 300
) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    if (isMounted && !shouldAnimate) {
      setShouldAnimate(true);
    } else if (!isMounted && shouldAnimate) {
      timeoutId = setTimeout(() => {
        setShouldAnimate(false);
      }, animationDuration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animationDuration, isMounted, shouldAnimate]);

  return shouldAnimate;
};

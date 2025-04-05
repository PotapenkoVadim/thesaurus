import { useEffect, useState } from "react"

export const useWait = <T, >(trigger?: T, wait: number = 750) => {
  const [isExisted, setIsExisted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsExisted(true);
    }, wait);

    return () => {
      clearTimeout(timeoutId);
      setIsExisted(false);
    };
  }, [wait, trigger]);

  return isExisted;
}
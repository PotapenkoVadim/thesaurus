import { useEffect } from "react";

export const useLockBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};
import {useEffect, useRef, useState} from 'react';
import { throttle } from '../../../utils';
import { getBodyContainer } from '../utils';

export const useScrollObserve = (isShow: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetNode = getBodyContainer(contentRef.current);

    const handleScroll = throttle(() => {
      if (targetNode) {
        setIsScrolled(targetNode.scrollTop > 0);
      }
    }, 250);

    if (targetNode) {
      targetNode.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (targetNode) {
        targetNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isShow]);

  return {
    isScrolled,
    contentRef,
  };
};

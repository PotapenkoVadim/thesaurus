import {ReactNode, useRef} from 'react';
import {createPortal} from 'react-dom';

const Portal = ({
  children
}: {
  children: ReactNode
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const firstRenderRef = useRef(true);

  if (firstRenderRef.current) {
    containerRef.current = document.body;

    firstRenderRef.current = false;
  }

  if (!containerRef.current) {
    return null;
  }

  return createPortal(children, containerRef.current);
};

export default Portal;

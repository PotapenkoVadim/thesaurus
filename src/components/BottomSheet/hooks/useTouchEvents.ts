import {TouchEventHandler, useReducer, useRef} from 'react';
import { getHeaderContainer } from '../utils';

type BottomSheetTouchActions =
  | {type: 'touch-start'; payload: number}
  | {type: 'touch-move'; payload: number}
  | {type: 'touch-end'};

type BottomSheetState = {
  startY: number;
  currentY: number;
  isDragging: boolean;
};

function reducer(state: BottomSheetState, action: BottomSheetTouchActions): BottomSheetState {
  switch (action.type) {
    case 'touch-start':
      return {
        ...state,
        startY: action.payload,
        isDragging: true,
      };

    case 'touch-move':
      return {
        ...state,
        currentY: action.payload,
      };

    case 'touch-end':
      return {
        ...state,
        isDragging: false,
        currentY: 0,
      };

    default:
      throw new Error();
  }
}

export const useTouchEvents = ({
  onClose,
  isScrolled
}: {
  onClose?: () => void;
  isScrolled: boolean;
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  const [{currentY, isDragging, startY}, dispatch] = useReducer(reducer, {
    startY: 0,
    currentY: 0,
    isDragging: false,
  });

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    dispatch({type: 'touch-start', payload: event.touches[0].clientY});
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    const headerTarget = getHeaderContainer(event.target as Element);

    if (!isDragging || (isScrolled && !headerTarget)) {
      return;
    }

    const deltaY = event.touches[0].clientY - startY;

    if (deltaY > 0) {
      dispatch({type: 'touch-move', payload: deltaY});
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    if (currentY > 100) {
      if (sheetRef.current) {
        sheetRef.current.style.transform = 'translateY(100%)';
      }

      onClose && onClose();
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transform = 'translateY(0%)';
      }
    }

    dispatch({type: 'touch-end'});
  };

  return {
    currentY,
    isDragging,
    startY,
    sheetRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

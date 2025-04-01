import { ReactNode } from "react";
import { useAnimation, useLockBodyScroll } from "../../hooks";
import Portal from "../Portal/Portal";
import { useScrollObserve } from "./hooks/useScrollObserve";
import { useTouchEvents } from "./hooks/useTouchEvents";
import { BOTTOM_SHEET_BODY_ID, BOTTOM_SHEET_HEADER_ID } from "./constants";
import styles from './BottomSheet.module.scss';

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title
}: {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  title: string;
}) => {
  const hasTransitionedIn = useAnimation(isOpen);
  const isShow = isOpen && hasTransitionedIn;

  const {contentRef, isScrolled} = useScrollObserve(isShow);
  const {handleTouchEnd, handleTouchMove, handleTouchStart, sheetRef} = useTouchEvents({
    onClose,
    isScrolled,
  });

  const backdropStyles = `${styles['bottom-sheet__backdrop']} ${isShow ? styles['bottom-sheet__backdrop_show'] : ''}`;

  useLockBodyScroll(isShow);

  if (!isOpen && !hasTransitionedIn) {
    return null;
  }

  return (
    <Portal>
      <div className={backdropStyles} onClick={onClose} />
      <div
        className={styles['bottom-sheet']}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={sheetRef}
        style={{transform: `translateY(${isShow ? 0 : '100%'})`}}
      >
        <div className={styles['bottom-sheet__content']} ref={contentRef}>
          <div className={styles["bottom-sheet__header"]} id={BOTTOM_SHEET_HEADER_ID}>
            {title}
          </div>

          <div className={styles["bottom-sheet__body"]} id={BOTTOM_SHEET_BODY_ID}>
            <div className={styles["bottom-sheet__body-content"]}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default BottomSheet;
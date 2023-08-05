import React, { useEffect } from 'react';

const useTouchMove = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: (isMovingDownUp: boolean) => void
) => {
  useEffect(() => {
    let deltaPrevious = 0;
    let headStartY = 0;
    let isDragging = false;

    const handleWrapperHeadTouchStart = (event: TouchEvent) => {
      headStartY = event.touches[0].clientY;
    };

    const defineDirection = (deltaY: number) => {
      if (deltaY === 0) return '';

      let signDirection = '';

      if (deltaPrevious < deltaY) signDirection = 'up';
      if (deltaPrevious > deltaY) signDirection = 'down';
      if (signDirection === '') return '';

      return signDirection;
    };

    const handleWrapperHeadTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      const SHIFT = 5;

      if (headStartY === null) return;

      const headEndY = event.touches[0].clientY;
      const deltaY = headStartY - headEndY;
      const isMoving = deltaY > SHIFT;

      if (!defineDirection(deltaY)) return;

      const deltaCurrent = deltaY - deltaPrevious;
      deltaPrevious = deltaY;

      if (isDragging !== isMoving) {
        isDragging = isMoving;
        return;
      }

      const isMovingDownUp = deltaY < 0 && deltaCurrent < 0;

      callback(isMovingDownUp);
    };

    const headElement = ref.current;
    if (headElement instanceof HTMLDivElement) {
      headElement.addEventListener('touchstart', handleWrapperHeadTouchStart, { passive: false });
      headElement.addEventListener('touchmove', handleWrapperHeadTouchMove, { passive: false });
    }

    return () => {
      if (headElement instanceof HTMLDivElement) {
        headElement.removeEventListener('touchstart', handleWrapperHeadTouchStart);
        headElement.removeEventListener('touchmove', handleWrapperHeadTouchMove);
      }
    };
  }, [ref.current]);
};

export default useTouchMove;

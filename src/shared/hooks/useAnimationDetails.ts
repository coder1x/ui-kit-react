import { useEffect } from 'react';

const useAnimationDetails = (
  detailsRef: React.MutableRefObject<HTMLDetailsElement | null>,
  summaryRef: React.MutableRefObject<HTMLElement | null>,
  contentRef: React.MutableRefObject<HTMLDivElement | null>,
  isAnimation?: boolean,
  duration?: number
) => {
  useEffect(() => {
    if (!isAnimation) return;

    let animation: Animation | null = null;
    let isClosing = false;
    let isExpanding = false;

    const details = detailsRef.current;
    const summary = summaryRef.current;
    const content = contentRef.current;

    if (!details || !summary || !content) return;

    const onAnimationFinish = (open: boolean) => {
      details.open = open;
      animation = null;
      isClosing = false;
      isExpanding = false;
      details.style.removeProperty('max-height');
      details.style.removeProperty('overflow');
    };

    const animationToggle = (startHeight: string, endHeight: string, open: boolean) => {
      if (startHeight === endHeight) return;

      animation = details.animate(
        {
          maxHeight: [startHeight, endHeight],
        },
        {
          duration: duration ?? 300,
          easing: 'linear',
        }
      );

      animation.onfinish = () => onAnimationFinish(open);
      animation.oncancel = () => {
        isClosing = false;
        return false;
      };
    };

    const shrink = () => {
      isClosing = true;
      const startHeight = `${details.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight}px`;

      if (animation) animation.cancel();

      animationToggle(startHeight, endHeight, false);
    };

    const expand = () => {
      if (!summary || !content) return;

      isExpanding = true;

      const startHeight = `${details.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

      if (animation) animation.cancel();

      animationToggle(startHeight, endHeight, true);
    };

    const open = () => {
      details.style.maxHeight = `${details.offsetHeight}px`;
      details.open = true;

      window.requestAnimationFrame(expand);
    };

    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      details.style.overflow = 'hidden';

      if (isClosing || !details.open) {
        open();
      } else if (isExpanding || details.open) {
        shrink();
      }
    };

    summary.addEventListener('click', onClick);

    return () => {
      summary.removeEventListener('click', onClick);
    };
  }, [contentRef, detailsRef, duration, isAnimation, summaryRef]);
};

export default useAnimationDetails;

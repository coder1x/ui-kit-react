import { MouseEvent } from 'react';

const animationDetails = (isAnimation?: boolean, duration?: number): Function => {
  if (!isAnimation) return () => {};

  let animation: Animation | null = null;
  let isClosing = false;
  let isExpanding = false;
  let details: HTMLDetailsElement | null = null;
  let summary: HTMLElement | null = null;
  let content: HTMLDivElement | null = null;

  const onAnimationFinish = (open: boolean) => {
    if (!details) return;

    details.open = open;
    animation = null;
    isClosing = false;
    isExpanding = false;
    details.style.removeProperty('max-height');
    details.style.removeProperty('overflow');
  };

  const animationToggle = (startHeight: string, endHeight: string, open: boolean) => {
    if (startHeight === endHeight || !details) return;

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
    if (!summary || !details) return;

    isClosing = true;
    const startHeight = `${details.offsetHeight}px`;
    const endHeight = `${summary.offsetHeight}px`;

    if (animation) animation.cancel();

    animationToggle(startHeight, endHeight, false);
  };

  const expand = () => {
    if (!summary || !content || !details) return;

    isExpanding = true;

    const startHeight = `${details.offsetHeight}px`;
    const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

    if (animation) animation.cancel();

    animationToggle(startHeight, endHeight, true);
  };

  const open = () => {
    if (!details) return;

    details.style.maxHeight = `${details.offsetHeight}px`;
    details.open = true;

    window.requestAnimationFrame(expand);
  };

  return (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const element = event.target;

    if (!(element instanceof HTMLElement)) return;
    if (element.tagName !== 'SUMMARY') return;

    if (element.parentElement instanceof HTMLDetailsElement) {
      details = element.parentElement;
    }

    summary = element;

    if (element.nextElementSibling instanceof HTMLDivElement) {
      content = element.nextElementSibling;
    }

    if (!details) return;

    details.style.overflow = 'hidden';

    if (isClosing || !details.open) {
      open();
    } else if (isExpanding || details.open) {
      shrink();
    }
  };
};

export default animationDetails;

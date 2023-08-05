import { FC, memo, useRef } from 'react';
import './spoilerDetails.scss';
import useAnimationDetails from '@shared/hooks/useAnimationDetails';

type Props = {
  title: string;
  paragraphs: string[];
  tabIndex?: number;
  isAnimation?: boolean;
};

const SpoilerDetails: FC<Props> = ({ title, paragraphs, tabIndex, isAnimation = true }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useAnimationDetails(detailsRef, summaryRef, contentRef, isAnimation);

  return (
    <details ref={detailsRef} className="spoiler-details" tabIndex={tabIndex && -1}>
      <summary ref={summaryRef} className="spoiler-details__title">
        {title ?? 'Раскрывающийся список'}
      </summary>
      <div ref={contentRef} className="spoiler-details__wrapper-content">
        {paragraphs &&
          paragraphs.map((text, index) => {
            return (
              <p key={index} className="spoiler-details__text">
                {text ?? ''}
              </p>
            );
          })}
      </div>
    </details>
  );
};

export default memo(SpoilerDetails);

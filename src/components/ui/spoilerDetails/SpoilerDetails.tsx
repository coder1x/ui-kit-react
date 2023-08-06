import { FC, memo } from 'react';
import './spoilerDetails.scss';

type Props = {
  title: string;
  paragraphs: string[];
  tabIndex?: number;
};

const SpoilerDetails: FC<Props> = ({ title, paragraphs, tabIndex }) => {
  return (
    <details className="spoiler-details" tabIndex={tabIndex && -1}>
      <summary className="spoiler-details__title">{title ?? 'Раскрывающийся список'}</summary>
      <div className="spoiler-details__wrapper-content">
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

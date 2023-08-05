import { FC, memo } from 'react';
import './tab.scss';

type Props = {
  title: string;
  index: number;
  isActive?: boolean;
};

const Tab: FC<Props> = ({ title, index, isActive = false }) => {
  return (
    <button className={`tab${isActive ? ' tab_current' : ''}`} data-index={index}>
      {title}
    </button>
  );
};

export default memo(Tab);

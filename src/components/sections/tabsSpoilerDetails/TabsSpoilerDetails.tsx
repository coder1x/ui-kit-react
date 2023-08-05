import { FC } from 'react';
import { Tabs } from '@components/blocks';
import './tabsSpoilerDetails.scss';
import Data from './data/tabsSpoilerDetails.json';

const TabsSpoilerDetails: FC = () => {
  return (
    <section className="tabs-spoiler-details">
      <h1 className="tabs-spoiler-details__title">Компонент: Табы со спойлерами</h1>
      <Tabs tabs={Data.tabs} isAnimation />
    </section>
  );
};

export default TabsSpoilerDetails;

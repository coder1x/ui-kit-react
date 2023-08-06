import { FC, useState, MouseEvent } from 'react';
import { Tab, SpoilerDetails } from '@components/ui';
import { animationDetails } from '@helpers/index';
import './tabs.scss';

export type Props = {
  tabs?: {
    title: string;
    titleContent?: string;
    spoilerDetails?: {
      title: string;
      paragraphs: string[];
    }[];
  }[];
  isAnimation?: boolean;
  activeTab?: number;
};

const Tabs: FC<Props> = ({ tabs, isAnimation, activeTab = 0 }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const classNameContainer = ` tabs__container_${isAnimation ? 'current-animation' : 'current'}`;

  const clickTab = (event: MouseEvent<HTMLDivElement>) => {
    const index = (event.target as HTMLButtonElement).getAttribute('data-index');

    if (index) setCurrentTab(Number(index) ?? currentTab);
  };

  const clickContainer = (event: MouseEvent<HTMLDivElement>) => {
    animationDetails(isAnimation)(event);
  };

  return (
    <div className="tabs">
      <div className="tabs__navigation" onClick={clickTab}>
        {tabs &&
          tabs.map((tab, index) => (
            <Tab key={index} index={index} title={tab.title} isActive={index === currentTab} />
          ))}
      </div>
      <div className="tabs__content">
        {tabs &&
          tabs.map((tab, index) => {
            const isShown = index === currentTab;

            return (
              <div
                key={index}
                onClick={clickContainer}
                className={`tabs__container${isShown ? classNameContainer : ''}`}
              >
                {tab.titleContent && <h2 className="tabs__container-title">{tab.titleContent}</h2>}
                {tab.spoilerDetails &&
                  tab.spoilerDetails.map((spoiler, indexSpoiler) => {
                    return (
                      <SpoilerDetails
                        tabIndex={!isShown ? -1 : undefined}
                        key={indexSpoiler}
                        title={spoiler.title}
                        paragraphs={spoiler.paragraphs}
                      />
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tabs;

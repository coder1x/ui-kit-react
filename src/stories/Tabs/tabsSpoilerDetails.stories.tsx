import { Meta, StoryObj } from '@storybook/react';
import Tabs, { Props } from '@components/blocks/tabs/Tabs';
import Data from '@sections/tabsSpoilerDetails/data/tabsSpoilerDetails.json';

export default {
  title: 'Tabs/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      description: 'Массив объектов содержащий табы и контент для каждого таба',
    },
    activeTab: {
      type: 'number',
      defaultValue: 0,
      description: 'Задаёт по умолчанию активный таб (не работает в storybook)',
    },
    isAnimation: {
      type: 'boolean',
      defaultValue: true,
      description: 'Включает или отключает анимацию',
      control: 'radio',
      options: [true, false],
    },
  },
} as Meta;

type Story = StoryObj<Props>;

/**
 * Базовый вид компонента.
 */
export const Default: Story = {
  name: 'Default',
  args: {
    tabs: Data.tabs,
    activeTab: 0,
    isAnimation: true,
  },
};

import { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import Demo from '@pages/demo/Demo';

export default {
  title: 'Pages/Demo',
  component: Demo,
  argTypes: {},
} as Meta;

type Story = StoryObj<FC>;

/**
 * Базовый вид компонента.
 */
export const Default: Story = {
  name: 'Default',
  args: {},
};

import type { StorybookConfig } from '@storybook/react-webpack5';
import commonConfig from '../config/webpack.common';
import moduleConfig from '../config/webpack.module';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  webpackFinal: async (config: any) => {
    return {
      ...config,
      module: { ...config.module, rules: [...config.module.rules, ...moduleConfig.module.rules] },
      resolve: {
        ...config.resolve,
        alias: {
          ...commonConfig.resolve.alias,
        },
      },
    };
  },
};
export default config;

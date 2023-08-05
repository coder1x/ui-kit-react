import type { StorybookConfig } from '@storybook/react-webpack5';
import commonConfig from '../config/webpack.common';
const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    builder: '@storybook/builder-webpack5',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
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
      externals: ['react-dom/client'],
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          ...[
            {
              test: /\.s[ac]ss$/,
              include: path.resolve(__dirname, '../'),
              use: [
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      'src/shared/styles/functions.scss',
                      'src/shared/styles/variables.scss',
                      'src/shared/styles/mixins.scss',
                    ],
                  },
                },
              ],
            },
            {
              test: /\.(ttf|woff|woff2|eot)$/,
              type: 'asset/resource',
              generator: {
                filename: 'src/assets/fonts/[name].[hash][ext]',
              },
            },
            {
              test: /\.(ts|tsx|js)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    configFile: 'tsconfig.web.json',
                  },
                },
              ],
            },
            {
              test: /\.(png|jpg|svg|gif|webp|avif)$/,
              type: 'asset/resource',
              generator: {
                filename: 'src/assets/images/[name].[hash][ext]',
              },
            },
          ],
        ],
      },
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

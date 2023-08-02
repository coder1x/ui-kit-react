import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import routes from './routes';

const Demo = lazy(() => import('@pages/demo/Demo'));

const appRoutes: RouteObject[] = [
  {
    path: routes.demo,
    element: <Demo />,
  },
];

export default appRoutes;

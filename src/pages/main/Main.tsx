import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import appRoutes from '@appRoutes/appRoutes';
import Layout from '@pages/layout/Layout';

const Main: FC = () => {
  const routes = useRoutes(appRoutes);

  return <Layout>{routes}</Layout>;
};

export default Main;

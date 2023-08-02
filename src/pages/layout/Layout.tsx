import { FC, ReactNode } from 'react';
import Header from '@components/common/header/Header';
import Footer from '@components/common/footer/Footer';
import './layout.scss';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="page__wrapper">
        <main className="content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

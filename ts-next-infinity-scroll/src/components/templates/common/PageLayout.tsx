import Header from '@/components/organisms/Header';
import Main from '@/components/organisms/Main';
import Footer from '@/components/organisms/Footer';

import { ComponentProps } from 'react';

interface PageLayoutProps extends ComponentProps<typeof Main> {}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default PageLayout;

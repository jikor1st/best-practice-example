import { Header, Main, Footer } from '@/components/organisms';

import { ComponentProps } from 'react';

interface PageLayoutProps
  extends ComponentProps<typeof Header>,
    ComponentProps<typeof Main> {}

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

import { NextPageContext } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

// **PageLayout
import PageLayout from '@/templates/common/PageLayout';
import type { PageLayoutProps } from '@/types';

// **Emotion, styles
import { ThemeProvider, Global } from '@emotion/react';
import { resetStyles, globalStyles } from '@/styles';

// **React-Query
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// **Redux
import { Provider } from 'react-redux';
import store from '@/store';

import { InitialApp } from '@/extendsComponents';

interface PageProps {
  dehydratedState: DehydratedState;
}
interface AppPropsWithLayoutProps<P> extends AppProps<P> {
  Component: PageLayoutProps<P>;
}

function AppPage({ Component, pageProps }: AppPropsWithLayoutProps<PageProps>) {
  // **react queryClient
  const [queryClient] = useState(() => new QueryClient());

  // **pageLayouts
  const getLayout =
    Component.getLayout ?? (page => <PageLayout>{page}</PageLayout>);
  return (
    <>
      <Head>
        {/* **viewport */}
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={{}}>
              <Global styles={[resetStyles, globalStyles]} />
              <InitialApp />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default AppPage;

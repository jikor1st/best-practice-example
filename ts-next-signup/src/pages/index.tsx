import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import type { PageLayoutProps } from '@/types';

import { Seo } from '@/extendsComponents';
import { PageLayout } from '@/templates/common';

import { useExample, fetchExample, EXAMPLE_QUERY } from '@/hooks/api';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';
import { plusCounter } from '@/store/slices';

// example page
const Home: PageLayoutProps = () => {
  // example simple react redux
  const exampleValue = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  // example simple useQuery for hooks (react-query)
  const { isLoading, error, data } = useExample();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An Error has occurred</div>;

  const handlePlusExample = () => dispatch(plusCounter(1));
  const handleMinusExample = () => dispatch(plusCounter(1));

  return (
    <>
      {/* example for setting simple seo */}
      <Seo
        siteName="Home"
        description="Next Js Boilerplates Site"
        keywords={['next js', 'boilerplates']}
      />
      <div>
        <h1>Home</h1>
        <p>My name is {data?.name}</p>
        <div
          style={{
            marginTop: 40,
          }}
        >
          <p>example value</p>
          <p>{exampleValue}</p>
          <button onClick={handlePlusExample}>-</button>
          <button onClick={handleMinusExample}>+</button>
        </div>
      </div>
    </>
  );
};

// example for hydrate prefetch react query
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(EXAMPLE_QUERY, fetchExample);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

// example for pageLayout change per page
Home.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Home;

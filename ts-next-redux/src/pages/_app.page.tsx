import type { AppProps } from 'next/app';

// redux settings
import { Provider } from 'react-redux';
import wrapper from '@/lib/store';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

// legacy code | 레거시 코드입니다.
// wrapper의 withRedux 매서드는 redux 상태 동기화, Provider의 store 까지 주입해줍니다.
// export default wrapper.withRedux(MyApp);

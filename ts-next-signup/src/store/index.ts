// **server 상의 redux를 사용하지 않을 때
// react query로 서버 상태를 관리해줍니다.

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// **active if use redux logger
// import logger from 'redux-logger';

// **imports  slices
import { exampleSlice } from './slices';

const isDev = process.env.NODE_ENV === 'development';

// **스토어 생성
const makeStore = () => {
  // **middleware 생성
  const middleware = getDefaultMiddleware();

  // **active if use redux logger
  // if (isDev) {
  // middleware.push(logger);
  // }

  // **통합 slice store 생성
  const store = configureStore({
    reducer: {
      example: exampleSlice.reducer,
    },
    middleware,
    devTools: isDev,
  });

  return store;
};

// **리덕스 스토어 생성
const store = makeStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;

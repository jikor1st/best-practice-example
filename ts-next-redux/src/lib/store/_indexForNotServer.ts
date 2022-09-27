// **server 상의 redux를 사용하지 않을 때

import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// **imports  slices
import { counterSlice } from './module';

const isDev = process.env.NODE_ENV === 'development';

// **스토어 생성
const makeStore = () => {
  // **middleware 생성
  const middleware = getDefaultMiddleware();
  if (isDev) {
    middleware.push(logger);
  }

  // **통합 slice store 생성
  const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      // --same code
      // [counterSlice.name]:counterSlice.reducer
    },
    middleware,
    // middleware : [...getDefaultMiddleware(). logger]
    devTools: isDev,
  });

  return store;
};

// **리덕스 스토어 생성
const store = makeStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;

// **간단하게 사용할때 예제
/*
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger]
  devTools: process.env.NODE_ENV === 'development'
});
*/

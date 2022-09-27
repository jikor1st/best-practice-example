// **server 상의 redux를 사용할 때
// next-redux-wrapper의 wrapper을 생성해 사용합니다.

import {
  configureStore,
  Reducer,
  AnyAction,
  ThunkAction,
  Action,
  CombinedState,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

// **imports slices
import {
  // counterSlice
  counterSlice,
  CounterSliceType,
  // userSlice
  userSlice,
  UserSliceType,
} from './module';

const isDev = false;
// const isDev = process.env.NODE_ENV === 'development';

// **interface reducer
export interface ReducerStates {
  counter: CounterSliceType;
  user: UserSliceType;
}

// **generate reducer
// 1- hydrate actions
// 2- unite slices
const rootReducer = (
  state: ReducerStates,
  action: AnyAction,
): CombinedState<ReducerStates> => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload,
      };
      if (state.counter) nextState.counter = state.counter;
      return nextState;

    default: {
      const combinedReducer = combineReducers({
        counter: counterSlice.reducer,
        user: userSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

// **redux store creator
const makeStore = () => {
  // **middleware
  const middleware = getDefaultMiddleware();
  if (isDev) {
    middleware.push(logger);
  }

  // **store create
  const store = configureStore({
    reducer: rootReducer as Reducer<ReducerStates, AnyAction>,
    middleware,
    devTools: isDev,
  });

  return store;
};

// **export types

// store type
export type AppStore = ReturnType<typeof makeStore>;
// rootState type
export type RootState = ReturnType<typeof rootReducer>;
// dispatch type
export type AppDispatch = AppStore['dispatch'];
// thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

// **wrapper
const wrapper = createWrapper<AppStore>(makeStore, {
  debug: isDev,
});

export default wrapper;

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
// import { RootState } from '..';

// **initialState
interface IUser {
  user_name: string;
  user_email: string;
  user_age: string;
}
export interface UserSliceType {
  value: IUser;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserSliceType = {
  value: {
    user_name: '',
    user_email: '',
    user_age: '',
  },
  status: 'idle',
};

// **thunk fetch 함수
export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const resp = await fetch(
    'https://jikor1st.github.io/FakeApi/userData/user.json',
  );
  const data = await resp.json();
  return data;
});

// **slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // **actions
    updateUserEmail: (state: UserSliceType, action: PayloadAction<string>) => {
      state.value.user_email = action.payload;
    },
  },
  extraReducers: {
    // **thunk process
    [fetchUser.pending.type]: state => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled.type]: (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    },
    [fetchUser.rejected.type]: state => {
      state.status = 'failed';
    },
    // [fetchUser.pending.type]: state => {
    //   state.status = 'loading';
    // },
    // [fetchUser.fulfilled.type]: (state, action) => {
    //   state.status = 'idle';
    //   state.value = action.payload;
    // },
    // [fetchUser.rejected.type]: state => {
    //   state.status = 'failed';
    // },
  },

  // **builder을 사용해서 thunk reducer생성할 때
  // extraReducers: builder => {
  //   builder.addCase(fetchUser.fulfilled, state => {
  //     state.status = 'loading';
  //   }),
  //     builder.addCase(fetchUser.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value = action.payload;
  //     }),
  //     builder.addCase(fetchUser.rejected, state => {
  //       state.status = 'failed';
  //     });
  // },
});

// **export actions
export const { updateUserEmail } = userSlice.actions;

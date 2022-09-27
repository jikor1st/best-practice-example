import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// **initialState
export interface CounterSliceType {
  value: number;
}

const initialState: CounterSliceType = { value: 0 };

// **generate slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // **actions
    plusCounter: (state: CounterSliceType, action: PayloadAction<number>) => {
      // has immer
      state.value += action.payload;
    },
    minusCounter: (state: CounterSliceType, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

// **export actions
export const { plusCounter, minusCounter } = counterSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// **initialState
export interface ExampleSlice {
  value: number;
}

const initialState: ExampleSlice = { value: 0 };

// **generate slice
export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // **actions
    plusCounter: (state: ExampleSlice, action: PayloadAction<number>) => {
      // has immer
      state.value += action.payload;
    },
    minusCounter: (state: ExampleSlice, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

// **export actions
export const { plusCounter, minusCounter } = exampleSlice.actions;

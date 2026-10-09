import { createSlice } from '@reduxjs/toolkit'
import type { CounterState } from '../types'

const initialState: CounterState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer

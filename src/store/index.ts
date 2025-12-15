import { configureStore } from '@reduxjs/toolkit'
import exam from './models/exam'

// 创建 store
const store = configureStore({
  reducer: {
    exam
  }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default store
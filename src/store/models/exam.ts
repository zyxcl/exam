import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Question } from '@/services/type'

export type Exam = {
  questions: Question[]
  score: number
  date: string
  id: number
}


type State = {
  record: Exam[]
  num: number
  title: string
}

const initialState: State = {
  record: [],
  num: 10,
  title: 'xxxxxxx'
}

export const userSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    addExam: (state, action: PayloadAction<{ score: number; questions: Question[] }>) => {
      state.record.push({
        questions: action.payload.questions,
        score: action.payload.score,
        date: new Date().toLocaleString(),
        id: Date.now()
      })
    },
    addNum: (state, action: PayloadAction<number>) => {
      state.num += action.payload
    }
  },
})

export const { addExam, addNum } = userSlice.actions

export default userSlice.reducer
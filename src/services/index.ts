import axios from 'axios'
import type { Question } from './type'

export const getData = () => {
  return axios.get<Question[]>('http://39.96.210.90:3000/api/exam_questions')
}
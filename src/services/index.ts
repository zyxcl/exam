import axios from 'axios'
import type { Question } from './type'

export const getData = () => {
  return axios.get<Question[]>('https://zyxcl.xyz/data/api/exam_questions')
}
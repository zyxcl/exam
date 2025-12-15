import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useParams } from 'react-router-dom'

const Mistake = () => {
  const params = useParams()
  const exam = useSelector((state: RootState) => {
    return state.exam.record.find(v => v.id === Number(params.id))
  })

  const title = useSelector((state: RootState) => state.exam.title)

  console.log(exam)
  return (
    <div>
      <h2>错题本</h2>
      {JSON.stringify(exam)}
    </div>
  )
}

export default Mistake
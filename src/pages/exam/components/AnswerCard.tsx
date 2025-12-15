import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, List, Radio } from 'antd'
import type { Question } from '@/services/type'
import { useNavigate } from 'react-router-dom'

interface Props {
  questions: Question[]
  done: boolean
  onJump: (index: number) => void
  onSubmit: () => void
}

const AnswerCard: React.FC<Props> = ({
  done,
  questions,
  onJump,
  onSubmit
}) => {
  const navigate = useNavigate()
  const [ms, setMs] = useState(20000)
  const [timeStr, setTimeStr] = useState('00:00:00')
  const intervalId = useRef<number>(-1)

  const addZero = (n: number) => n >= 10 ? n : '0' + n
  const format = (ms: number) => {
    const h = addZero(Math.floor(ms / 1000 / 60 / 60))
    const m = addZero(Math.floor(ms / 1000 / 60 % 60))
    const s = addZero(Math.floor(ms / 1000 % 60))
    return `${h}:${m}:${s}`
  }

  useEffect(() => {
    setTimeStr(format(ms))
    intervalId.current = setInterval(() => {
      setMs(prev => {
        let ms = prev - 1000
        if (ms <= 0) {
          ms = 0
          clearInterval(intervalId.current)
          onSubmit()
        }
        setTimeStr(format(ms))
        return ms
      })
    }, 1000)
    return () => clearInterval(intervalId.current)
  }, [])

  
  const renderActions = () => {
    const actions = [
      <Button disabled={done} type="primary" onClick={() => {
        onSubmit()
        clearInterval(intervalId.current)
      }}>提交试卷</Button>
    ]
    if (done) {
      actions.push(<Button type="primary" onClick={() => navigate('/record', { replace: true })}>考试记录</Button>)
    }
    return actions
  }

  return (
    <div style={{ width: 300 }}>
      <Card
        style={{ position: 'sticky', top: 0 }}
        title="答题卡"
        extra={timeStr}
        actions={renderActions()}
      >
        {questions.map((v, i) =>
          <Button
            type={v.answer ? 'primary' : 'default'}
            style={{ width: 30, margin: 4 }}
            onClick={() => onJump(i)}
          >{i + 1}</Button>
        )}
      </Card>
    </div>
  )
}

export default AnswerCard
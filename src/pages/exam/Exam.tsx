import {useEffect, useState, useRef } from 'react'
import { getData } from '../../services'
import { useRequest } from 'ahooks'
import { Modal, List, Radio } from 'antd'
import AnswerCard from './components/AnswerCard'
import { Question } from '@/services/type'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addExam } from '@/store/models/exam'

const letter = ['A', 'B', 'C', 'D']

const Exam = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useRequest(getData)
  const [questions, setQuestions] = useState<Question[]>([])
  const questionsRef = useRef<Question[]>([])
  const questionTitle = useRef<(HTMLHeadElement | null)[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setQuestions(data?.data || [])
  }, [data])

  const onJump = (index: number) => {
    document.documentElement.scrollTop = questionTitle.current[index]?.offsetTop || 0
  }

  useEffect(() => {
    questionsRef.current = questions
  }, [questions])

  const onSubmit = () => {
    const totalScore = questionsRef.current.reduce((prev, val) => {
      return prev + (val.answer === val.result ? val.score : 0)
    }, 0)
    setTotal(totalScore)
    setIsModalOpen(true)
    setDone(true)
    // 添加历史记录
    dispatch(addExam({
      questions: questionsRef.current,
      score: totalScore
    }))
  }

  return (
    <div style={{
      display: 'flex',
      width: 1200,
      margin: '0 auto'
    }}>
      <div style={{ flex: 1 }}>
        <h3>单选题</h3>
        <List
          itemLayout="horizontal"
          dataSource={questions}
          rowKey="question"
          renderItem={(item, index) => (
            <List.Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <h3
                ref={el => questionTitle.current[index] = el}
                style={{ marginBottom: 10 }}
              >{index + 1 + '.' + item.question}</h3>
              <Radio.Group
                disabled={done}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
                value={item.answer}
                options={item.options.map((val, i) => ({
                  value: letter[i],
                  label: letter[i] + '.' + val
                }))}
                onChange={e => {
                  const newQuestions = [...questions]
                  newQuestions[index].answer = e.target.value
                  setQuestions(newQuestions)
                }}
              />
              {done && <div style={{ color: item.answer === item.result ? 'green' : 'red' }}>正确答案：{item.result}</div>}
            </List.Item>
          )}
        />
      </div>
      <AnswerCard
        questions={questions}
        onJump={onJump}
        onSubmit={onSubmit}
        done={done}
      />
      <Modal
        title="试卷总分"
        open={isModalOpen}
        cancelText="关闭弹窗"
        okText="考试记录"
        onOk={() => navigate('/record', { replace: true })}
        onCancel={() => setIsModalOpen(false)}
      >
        {total}分
      </Modal>
    </div>
  )
}

export default Exam
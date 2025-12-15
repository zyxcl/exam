import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { useParams, useNavigate } from 'react-router-dom'
import { List, Radio, Button, Empty, Tag } from 'antd'

const letter = ['A', 'B', 'C', 'D']

const Mistake = () => {
  const params = useParams()
  const navigate = useNavigate()
  const exam = useSelector((state: RootState) => {
    return state.exam.record.find(v => v.id === Number(params.id))
  })

  // 筛选出答错的题目
  const wrongQuestions = useMemo(() => {
    if (!exam) return []
    return exam.questions.filter(q => q.answer && q.answer !== q.result)
  }, [exam])

  if (!exam) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Empty description="未找到考试记录" />
        <Button type="primary" onClick={() => navigate('/record')} style={{ marginTop: 16 }}>
          返回考试记录
        </Button>
      </div>
    )
  }

  return (
    <div style={{
      width: 1200,
      margin: '0 auto',
      padding: '20px 0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <div>
          <h2 style={{ margin: 0 }}>错题本</h2>
          <div style={{ color: '#666', marginTop: 8 }}>
            考试时间: {exam.date} | 考试得分: {exam.score}分 | 错题数量: {wrongQuestions.length}题
          </div>
        </div>
        <Button onClick={() => navigate('/record')}>返回记录</Button>
      </div>

      {wrongQuestions.length === 0 ? (
        <Empty
          description="恭喜！本次考试全部答对，没有错题"
          style={{ marginTop: 60 }}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={wrongQuestions}
          rowKey="question"
          renderItem={(item, index) => (
            <List.Item
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: '#fff',
                padding: 24,
                marginBottom: 16,
                borderRadius: 8,
                border: '1px solid #f0f0f0'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16,
                width: '100%'
              }}>
                <Tag color="red" style={{ marginRight: 8 }}>错题</Tag>
                <h3 style={{ margin: 0, flex: 1 }}>
                  {index + 1}. {item.question}
                </h3>
                <Tag color="blue">分值: {item.score}分</Tag>
              </div>

              <Radio.Group
                disabled
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  width: '100%',
                  marginBottom: 16
                }}
                value={item.answer}
              >
                {item.options.map((option, i) => {
                  const optionLetter = letter[i]
                  const isCorrect = optionLetter === item.result
                  const isUserAnswer = optionLetter === item.answer

                  return (
                    <Radio
                      key={i}
                      value={optionLetter}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 4,
                        background: isCorrect ? '#f6ffed' : isUserAnswer ? '#fff2f0' : '#fafafa',
                        border: `1px solid ${isCorrect ? '#b7eb8f' : isUserAnswer ? '#ffccc7' : '#d9d9d9'}`,
                      }}
                    >
                      <span style={{
                        fontWeight: isCorrect || isUserAnswer ? 'bold' : 'normal',
                        color: isCorrect ? '#52c41a' : isUserAnswer ? '#ff4d4f' : 'inherit'
                      }}>
                        {optionLetter}. {option}
                        {isCorrect && <Tag color="success" style={{ marginLeft: 8 }}>正确答案</Tag>}
                        {isUserAnswer && !isCorrect && <Tag color="error" style={{ marginLeft: 8 }}>你的答案</Tag>}
                      </span>
                    </Radio>
                  )
                })}
              </Radio.Group>

              <div style={{
                display: 'flex',
                gap: 24,
                padding: '12px 16px',
                background: '#f5f5f5',
                borderRadius: 4,
                width: '100%'
              }}>
                <div>
                  <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>你的答案: </span>
                  <span style={{ color: '#ff4d4f' }}>{item.answer || '未作答'}</span>
                </div>
                <div>
                  <span style={{ color: '#52c41a', fontWeight: 'bold' }}>正确答案: </span>
                  <span style={{ color: '#52c41a' }}>{item.result}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default Mistake
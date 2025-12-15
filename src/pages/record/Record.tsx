import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { Button, Table, Empty, Card, Statistic, Row, Col, Space, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined, TrophyOutlined, FileTextOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import type { Exam } from '@/store/models/exam'
import { useMemo } from 'react'

const Record = () => {
  const navigate = useNavigate()
  const record = useSelector((state: RootState) => state.exam.record)

  // 计算统计信息
  const statistics = useMemo(() => {
    if (record.length === 0) {
      return { total: 0, average: 0, highest: 0, lowest: 0 }
    }

    const scores = record.map(r => r.score)
    const total = record.length
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / total)
    const highest = Math.max(...scores)
    const lowest = Math.min(...scores)

    return { total, average, highest, lowest }
  }, [record])

  const columns: TableProps<Exam>['columns'] = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: '考试时间',
      dataIndex: 'date',
      key: 'date',
      width: 200,
    },
    {
      title: '总题数',
      key: 'totalQuestions',
      width: 100,
      align: 'center',
      render: (_, record) => record.questions.length
    },
    {
      title: '正确题数',
      key: 'correctCount',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const correct = record.questions.filter(q => q.answer === q.result).length
        return (
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{correct}</span>
          </Space>
        )
      }
    },
    {
      title: '错误题数',
      key: 'wrongCount',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const wrong = record.questions.filter(q => q.answer && q.answer !== q.result).length
        return (
          <Space>
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{wrong}</span>
          </Space>
        )
      }
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: 120,
      align: 'center',
      render: (score) => {
        const color = score >= 90 ? '#52c41a' : score >= 60 ? '#faad14' : '#ff4d4f'
        return (
          <Tag color={color} style={{ fontSize: 16, fontWeight: 'bold', padding: '4px 12px' }}>
            {score} 分
          </Tag>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => navigate(`/mistake/${record.id}`)}
          >
            查看错题
          </Button>
        )
      }
    },
  ]

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
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileTextOutlined />
          考试记录
        </h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>

      {record.length > 0 && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="考试次数"
                value={statistics.total}
                suffix="次"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="平均分"
                value={statistics.average}
                suffix="分"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="最高分"
                value={statistics.highest}
                suffix="分"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="最低分"
                value={statistics.lowest}
                suffix="分"
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card>
        <Table
          rowKey="id"
          dataSource={record}
          columns={columns}
          locale={{
            emptyText: (
              <Empty
                description="暂无考试记录，快去考试吧！"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" onClick={() => navigate('/exam')}>
                  开始考试
                </Button>
              </Empty>
            )
          }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条记录`,
            showSizeChanger: false
          }}
        />
      </Card>
    </div>
  )
}

export default Record
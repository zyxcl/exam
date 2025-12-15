import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { TableProps } from 'antd'
import type { Exam } from '@/store/models/exam'

const Record = () => {
  const navigate = useNavigate()
  const record = useSelector((state: RootState) => state.exam.record)
  
  const columns: TableProps<Exam>['columns'] = [
    {
      title: '考试时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return <Button onClick={() => navigate(`/mistake/${record.id}`)}>查看详情</Button>
      }
    },
  ]
  return (
    <div>
      <h3>考试记录</h3>
      <Table rowKey="id" dataSource={record} columns={columns} />
    </div>
  )
}

export default Record
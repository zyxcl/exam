import { Button, Space } from 'antd'
import style from './home.module.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={style.home}>
      <Space>
        <Button type="primary" onClick={() => navigate('/exam')}>开始考试</Button>
        <Button onClick={() => navigate('/record')}>考试历史</Button>
      </Space>
    </div>
  )
}

export default Home
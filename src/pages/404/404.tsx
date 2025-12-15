import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="访问的页面不存在！"
      extra={<Button type="primary" onClick={() => navigate('/')}>返回首页</Button>}
    />
  )
}

export default Notfound
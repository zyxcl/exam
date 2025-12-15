import React, { useEffect } from 'react'
import {
  useRoutes, // 配置路由
} from 'react-router-dom'
import routeConfig from './router'

const App: React.FC = () => {
  const routes = useRoutes(routeConfig)

  return <div style={{ minWidth: 1000 }}>{routes}</div>
}

export default App
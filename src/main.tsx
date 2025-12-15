import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Suspense } from 'react'
import {
  // 路由根组件，所有和路由相关的内容必须包含在根组件内
  HashRouter, // hash 模式 url 有 #， 原理：hashchange 事件监听#后的内容变换切换组件
  BrowserRouter // history 模式, h5 的 pushState 修改历史记录和 url
} from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  // 把 stroe 传给所有的后代组件
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<div style={{ height: 200, fontSize: 20, color: 'blue' }}>loading...</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </Provider>
)

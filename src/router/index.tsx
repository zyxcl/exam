import Home from '../pages/home/Home'
import Mistake from '../pages/mistake/Mistake'
import Record from '../pages/record/Record'
import Exam from '../pages/exam/Exam'

import Notfound from '../pages/404/404'

const routeConfig = [
  { path: '/', element: <Home /> },
  { path: '/mistake/:id', element: <Mistake />},
  { path: '/record', element: <Record />},
  { path: '/exam', element: <Exam />},
  { path: '/*', element: <Notfound /> },
]
export default routeConfig

import { RouteObject, Navigate } from 'react-router-dom'
// import Home from '../views/home/home'
import Scene from '@/views/scene/scene'
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Scene />
  },
  {
    path: '*',
    element: <Navigate to="/"></Navigate>
  }
]
export default routes

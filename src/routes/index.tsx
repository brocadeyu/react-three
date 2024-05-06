import { RouteObject, Navigate } from 'react-router-dom'
import Home from '../views/home/home'
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <Navigate to="/"></Navigate>
  }
]
export default routes

import { useRoutes } from 'react-router-dom'
import routes from './routes'
export default function App() {
  const elements = useRoutes(routes)
  return <>{elements}</>
}

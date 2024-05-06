import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const routeTo = () => {
    navigate('/DataManage')
  }
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <div
          className="h-200px w-100px bg-blue flex justify-center items-center rd-2 select-none cursor-pointer "
          onClick={routeTo}>
          数据治理
        </div>
        <div className="h-200px w-100px bg-blue flex justify-center items-center rd-2 select-none ml-10 ">
          数据查看
        </div>
      </div>
    </>
  )
}

export default Home

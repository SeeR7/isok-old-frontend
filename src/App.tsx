import React from 'react'
import Layout from './components/interface/Layout';
import { checkIsAuth} from './rtk/features/authSlice';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './rtk/store';


const App: React.FC = () => {
  
  const isAuth = useAppSelector(checkIsAuth)

  return (<>
    {isAuth && <Layout/>}
    {!isAuth && <LoginPage/>}
</>
  )
}

export default App

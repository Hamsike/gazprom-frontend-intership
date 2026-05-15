import type React from 'react'
import './App.css'
import { useAppStore } from './store'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainPage } from './pages/MainPage/MainPage'

const App: React.FC = () =>  {
  const isAuthenticated = useAppStore(state => state.isAuth)

  return (
    <div className='app'>
      {!isAuthenticated ? <LoginPage/> : <MainPage/>}
    </div>
  )
}

export default App

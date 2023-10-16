import './App.css'
import CowsPage from './pages/Cows/CowsPage'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './pages/Protected/ProtectedRoutes'
import { Routes, Route } from 'react-router-dom'
import Notice from './utils/Notice'
import { useState } from 'react'


function App() {

  const [message, setMessage] = useState('')
  const [modal, setModal] = useState(false)
  const [green, setGreen] =useState(false)

  const notice = (message1, changeColor) => {
    setMessage(message1)
    if(changeColor){
      setGreen(true)
    }
    setModal(true)
    setTimeout(() => {
      setModal(false)
      setGreen(false)
    }, 2000);
  }
  return (
    <div className='app__main'>
       {
        modal ? <Notice
        message={message}
        green={green}
        /> : ''
       }
      <Routes>
        
        <Route path="/" element={<HomePage 
          notice={notice}
        
        />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/cows" element={<CowsPage
              notice={notice}
            
            />} />
          </Route>
      </Routes>
    </div>
  )
}

export default App

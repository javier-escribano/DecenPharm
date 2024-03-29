import { Route, BrowserRouter, Routes } from 'react-router-dom'
import DashBoard from './Components/DashBoard/DashBoard'
import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'
import Register from './Components/Register/Register'
import { Configuration } from './Providers/Configuration'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <Configuration>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/dashboard" element={<DashBoard />}></Route>
          </Routes>
        </BrowserRouter>
      </Configuration>
    </div>
  )
}

export default App

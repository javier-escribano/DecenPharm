import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useConfiguration from '../../Hooks/useConfiguration'
import './Header.css'

const Header = () => {
  const { auth, checkUserRegister } = useConfiguration()
  const location = useLocation()

  const getBg = () => {
    if (location.pathname === '/') {
      return 'bg-none'
    } else return 'bg-gray-800'
  }

  useEffect(() => {
    const checkConnection = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      const account = accounts[0]
      if (account) {
        checkUserRegister(account)
      }
    }
    checkConnection()
  }, [checkUserRegister])

  return (
    <nav
      className={`flex items-center h-10vh justify-between flex-wrap ${getBg()}`}
    >
      <div className="mt flex items-center flex-shrink-0 text-white ml-2">
      <img src= {require('../../public/bru.png')} width='50px' height='20px' ></img>
        <Link to="/">
          <span className="ml-3 font-bold text-white decen-title text-2xl tracking-tight">
            DecenPharm
          </span>
        </Link>
      </div>
      {auth.address &&
        auth.agent &&
        auth.address.length > 0 &&
        auth.agent.length > 0 && (
          <span className="bg-slate-100 h-10 py-2 px-3 mr-5 rounded-lg shadow-md">
            Connected
          </span>
        )}
    </nav>
  )
}

export default Header

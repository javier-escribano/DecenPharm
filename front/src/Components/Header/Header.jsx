import { useEffect } from 'react'
import useConfiguration from '../../Hooks/useConfiguration'
import './Header.css'

const Header = () => {
  const { auth, connectMetamask, checkUserRegister } = useConfiguration()

  const handleClick = async () => {
    await connectMetamask()
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
    <header className="bg-gray-800 h-10vh flex justify-between items-center">
      <h1 className="text-slate-50 font-semibold text-xl ml-5">DecenPharm</h1>
      {auth.address &&
        auth.agent &&
        auth.address.length > 0 &&
        auth.agent.length > 0 && (
          <span className="bg-slate-100 h-10 py-2 px-3 mr-5 rounded-lg shadow-md">
            Connected
          </span>
        )}
      {(!auth.address || !auth.agent) && (
        <button
          onClick={handleClick}
          className="bg-slate-100 h-10 py-2 px-3 mr-5 rounded-lg shadow-md"
        >
          Connect to Metamask!
        </button>
      )}
    </header>
  )
}

export default Header

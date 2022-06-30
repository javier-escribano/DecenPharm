import { useCallback, useContext } from 'react'
import { ConfigurationContext } from '../Providers/Configuration'
import { useNavigate } from 'react-router-dom'

const useConfiguration = () => {
  const { auth, setAuth } = useContext(ConfigurationContext)
  const navigate = useNavigate()

  const checkUserRegister = useCallback(
    (account) => {
      setAuth({
        address: account,
        agent_type: '',
      })
      fetch(`http://localhost:9075/user/${account}`).then((res) => {
        if (res.status === 404) {
          navigate('/register')
        } else if (res.status === 200) {
          res.json().then((r) => {
            setAuth({
              address: account,
              agent: r.agent,
            })
          })
          navigate('/dashboard')
        }
      })
    },
    [navigate, setAuth]
  )

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0]
    if (account) {
      checkUserRegister(account)
    }
  }

  const registerUser = (account, agent) => {
    let body = JSON.stringify({
      address: account,
      agent: agent,
    })
    fetch(`http://localhost:9075/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    }).then((res) => {
      if (res.status === 200) {
        setAuth({
          address: account,
          agent: agent,
        })
        navigate('/dashboard')
      }
    })
  }

  return {
    auth,
    setAuth,
    connectMetamask,
    registerUser,
    checkUserRegister,
  }
}

export default useConfiguration

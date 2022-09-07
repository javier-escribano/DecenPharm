import { useCallback, useContext } from 'react'
import { ConfigurationContext } from '../Providers/Configuration'
import { useNavigate } from 'react-router-dom'
import MedChain from '../truffle_abis/MedChain.json'
import Web3 from 'web3'
import { useNotifications } from './useNotifications'
import { convertState } from '../utils'
//import keys from '../secrets.json'

const useConfiguration = () => {
  const { auth, setAuth } = useContext(ConfigurationContext)
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const web3 = new Web3('http://127.0.0.1:7545')

  const medChainData = MedChain.networks[5777]
  const medchain = new web3.eth.Contract(MedChain.abi, medChainData.address)

  const PinataToken = 'YOUR_API_KEY'

  const EpochToDate = (date) => {
    return new Date(date * 1000).toLocaleString()
  }

  const checkUserRegister = useCallback(
    async (account) => {
      setAuth({
        address: account,
        agent: '',
      })

      const agentCall = await medchain.methods.agentsHash(account).call()

      if (Object.values(agentCall)[0] === '') {
        navigate('/register')
      } else {
        setAuth({
          address: account,
          agent: agentCall.agent_type,
        })
        navigate('/dashboard')
      }
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

  const searchMedicine = async (account, id) => {
    if (id <= 0) {
      return 1
    }

    let x = await medchain.methods.medicines(id).call({ from: account })
    let y = await medchain.methods.GetRestMedicine(id).call({ from: account })
    x['manufacturing_date'] = EpochToDate(x['manufacturing_date'])
    y[0] = y[0].map((pos) => convertState(pos))
    y[1] = y[1].map((pos) => EpochToDate(pos))

    return {
      ...x,
      ...y,
    }
  }

  const searchWorker = async (account, address) => {
    let z = await medchain.methods.agentsHash(address).call({ from: account })

    return {
      ...z,
    }
  }

  const registerUser = async (
    account,
    agent,
    name,
    surname,
    latitude,
    longitude
  ) => {
    await medchain.methods
      .AddWorker([
        agent,
        account,
        name,
        surname,
        latitude.toString(),
        longitude.toString(),
      ])
      .send({ from: account, gas: 200000 })

    setAuth({
      address: account,
      agent: agent,
    })

    navigate('/dashboard')
  }

  const getTotalMedicines = async (address) => {
    let x = await medchain.methods.totalMedicines().call({ from: address })
    let result = parseInt(x)
    return result + 1
  }

  const addMedicine = async (address, name, description, uri) => {
    await medchain.methods
      .AddMedicine(name, description, uri)
      .send({ from: address, gas: 800000 })
    let id = (await getTotalMedicines(auth.adress)) - 1
    addNotification(
      `Medicine successfully created. Medicine ID is ${id}`,
      'Medicine',
      'success'
    )
  }

  const createJSON = (manufacturer, name, description, id, date) => {
    return JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataContent: {
        Manufacturer: manufacturer,
        Name: name,
        Description: description,
        TokenID: id,
        ManufacturingDate: date,
      },
    })
  }

  const createURI = (hash) => {
    return 'ipfs://' + hash
  }

  const addIPFS = (jsontext) => {
    return fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      body: jsontext,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + PinataToken,
      },
    })
      .then((response) => response.json())
      .then((body) => body)
  }

  const addState = async (address, tokenID, state) => {

    let y = await medchain.methods.medicines(tokenID).call()

    await medchain.methods
      .AddState(tokenID, state)
      .send({ from: address, gas: 600000 })

    let final = Number(state) + Number(1)

    if (final == y.statesCount) {
      addNotification(
        `State "${convertState(state)}" already added`,
        '',
        'warning'
      )
    } else {
      addNotification(
        `State "${convertState(state)}" successfully added`,
        '',
        'success'
      )
    }
  }

  return {
    auth,
    setAuth,
    connectMetamask,
    registerUser,
    checkUserRegister,
    searchWorker,
    searchMedicine,
    addMedicine,
    addState,
    createJSON,
    getTotalMedicines,
    addIPFS,
    createURI,
  }
}

export default useConfiguration

import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useConfiguration from '../../Hooks/useConfiguration'
import { getStateOptions} from '../../utils'
import Map from '../Map/Map'
import Visible from '../Visible/Visible'
import './styles.css'
import { useNotifications } from '../../Hooks/useNotifications'

const DashBoard = () => {
  const {
    auth,
    searchMedicine,
    searchWorker,
    addMedicine,
    addState,
    createJSON,
    getTotalMedicines,
    addIPFS,
    createURI,
  } = useConfiguration()

  const [stateOptions, setStateOptions] = useState([])

  useEffect(() => {
    setStateOptions(getStateOptions(auth.agent))
  }, [auth])

  const [selectedId, setSelectedId] = useState()

  const [selectedAddress, setSelectedAddress] = useState()

  const [medicineInfo, setMedicineInfo] = useState()

  const [workerInfo, setWorkerInfo] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm()

  const { isSubmitting } = formState

  const { addNotification } = useNotifications()

  const handleSearchMedicine = useCallback(async (e) => {
    if (Number(selectedId) <= 0){
      console.log(selectedId)
      addNotification(
        `Invalid ID number`,
        '',
        'danger'
      )
    }
    else {
      console.log("hola")
      e.preventDefault()
      let info = await searchMedicine(auth.address, selectedId)
      setMedicineInfo({ ...info })
    }
  }, [auth, selectedId])

  const handleAddMedicine = async (data) => {
    let id = await getTotalMedicines()
    let date = new Date()
    let jsonText = createJSON(
      auth.address,
      data.name,
      data.description,
      id,
      date
    )
    let hash = await Promise.resolve(addIPFS(jsonText))
    let uri = createURI(hash.IpfsHash)
    addMedicine(auth.address, data.name, data.description, uri)
  }

  const handleState = async (data) => {
    addState(auth.address, data.tokenID, data.state)
  }

  const searchWorkerValidation = async (e) => {  
    try {
      e.preventDefault()
      let worker = await searchWorker(auth.address, selectedAddress)
      setWorkerInfo({ ...worker })
    } catch (error) {
      addNotification(
        `Invalid Address. ETH addresses need 0x chars followed by 40 hex chars.`,
        '',
        'danger'
      )
    }
  }

  return (
    <>
      <h1 className="text-3xl text-center text-gray-800 mt-3">
        Connected as {auth.agent}
      </h1>
      <div className="grid grid-cols-2 gap-4 w-5/6 my-6 mx-auto">
        <Visible auth={auth} role="USER">
          <form onSubmit={handleSearchMedicine}>
            <input
              placeholder="ej: 1478234238"
              className="shadow w-2/3 appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectedId(e.target.value)}
            ></input>
            <button
              type="submit"
              className="shadow w-1/3 bg-gray-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
            >
              Search Medicine
            </button>
          </form>
        </Visible>
        <Visible auth={auth} role="USER">
          <form onSubmit={searchWorkerValidation}>
            <input
              placeholder="ej: 0xe9cCC29CEba70C7A6F1468C68Dcb68005f6A882D"
              className="shadow w-2/3 appearance-none border py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectedAddress(e.target.value)}
            ></input>
            <button
              type="submit"
              className="shadow w-1/3 bg-gray-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
            >
              Search Worker
            </button>
          </form>
        </Visible>
        <Visible auth={auth} role="CREATOR">
          <form
            id="register-form"
            className="flex flex-col"
            onSubmit={handleSubmit(handleAddMedicine)}
          >
            <div className="flex flex-col">
              <input
                placeholder="Name"
                className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register('name')}
              ></input>
              <p>{errors.name?.message}</p>
              <input
                placeholder="Description"
                className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register('description')}
              ></input>
              <p>{errors.description?.message}</p>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="shadow bg-gray-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
            >
              {isSubmitting && (
                <div className="spinner-border">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              Add Medicine
            </button>
          </form>
        </Visible>
        <Visible auth={auth} role="CONTRIBUTOR">
          <form id="register-form" onSubmit={handleSubmit(handleState)}>
            <div className="flex flex-col">
              <input
                placeholder="Token ID"
                className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register('tokenID', {
                  value: '',
                })}
              ></input>
              <p>{errors.tokenID?.message}</p>
              <select
                className="h-10 px-1 py-2"
                {...register('state')}
                defaultValue={'manufactured'}
                form="register-form"
              >
                {stateOptions.map((o) => {
                  return (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  )
                })}
              </select>
            </div>
            <button
              type="submit"
              className="shadow flex justify-center w-full bg-gray-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
            >
              Add State
            </button>
          </form>
        </Visible>
      </div>
      {workerInfo && (
        <div className="results my-10 justify-center flex flex-row">
          <div className="info border grid grid-cols-2">
            <h2 className="text-center bg-gray-800 text-white border-b-2 py-2 col-span-full">
              Worker Information
            </h2>
            <h4 className="pl-3 py-1 border-r border-b">Collaborator type</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.agent_type}</span>
            <h4 className="pl-3 py-1 border-r border-b">Address</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.addr}</span>
            <h4 className="pl-3 py-1 border-r border-b">Name</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.name}</span>
            <h4 className="pl-3 py-1 border-r border-b">Last Name</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.last_name}</span>
            <h4 className="pl-3 py-1 border-r border-b">Latitude</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.latitude}</span>
            <h4 className="pl-3 py-1 border-r border-b">Longitud</h4>
            <span className="pl-3 py-1 border-b">{workerInfo.longitud}</span>
          </div>
        </div>
      )}
      {medicineInfo && (
        <div className="h-full mx-20 my-20 grid grid-cols-2">
          <div>
            <Map coords={medicineInfo[2]}></Map>
          </div>
          <div className="info border grid grid-cols-2">
            <h2 className="text-center bg-gray-800 text-white border-b-2 py-2 col-span-full">
              Medicine Information
            </h2>
            <h4 className="pl-3 py-1 border-r border-b">Manufacturer</h4>
            <span className="pl-3 py-1 border-b break-all">
              {medicineInfo.manufacturer}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Identifier</h4>
            <span className="pl-3 py-1 border-b">{medicineInfo.tokenID}</span>
            <h4 className="pl-3 py-1 border-r border-b">Name</h4>
            <span className="pl-3 py-1 border-b">{medicineInfo.name}</span>
            <h4 className="pl-3 py-1 border-r border-b">Description</h4>
            <span className="pl-3 pr-3 py-1 border-b">
              {medicineInfo.description}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Manufacturing date</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo.manufacturing_date}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">NFT Data</h4>
            <a
              className="break-all pl-3 py-1 border-b underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href={medicineInfo.tokenURI}
            >
              {medicineInfo.tokenURI}
            </a>
            <h4 className="pl-3 py-1 border-r border-b">Number of States</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo.statesCount}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">States</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo[0].join(', ')}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Number of Dates</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo.datesCount}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Dates</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo[1].join(', ')}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">
              Number of Coordinates
            </h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo.agentsCount}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Coordinates</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo[2].join(', ')}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Number of Agents</h4>
            <span className="pl-3 py-1 border-b">
              {medicineInfo.coordenatesCount}
            </span>
            <h4 className="pl-3 py-1 border-r border-b">Agents</h4>
            <div>
              {medicineInfo[3].map((record) => {
                return (
                  <div key={record[1]} className="pl-3 py-1 border-b">
                    <span className="break-all">{record[1]}</span>
                    <br />
                    <span>{record[0]}</span>
                    <br />
                    <span>{record[2]}</span>
                    <br />
                    <span>{record[3]}</span>
                    <br />
                    <span>
                      [{record[4]}, {record[5]}]
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashBoard

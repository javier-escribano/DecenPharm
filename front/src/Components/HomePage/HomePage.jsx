import useConfiguration from '../../Hooks/useConfiguration'
import './HomePage.css'

const HomePage = () => {
  const { auth, connectMetamask, checkUserRegister } = useConfiguration()

  const handleClick = async () => {
    await connectMetamask()
  }

  return (
    <>
      <div className="bg-img"></div>
      <div className="flex h90 w-4/5 my-0 mx-auto">
        <div className="w-5/12 gap-3 flex justify-center flex-col">
          <h1 className="text-7xl text-white">Decentralized Pharmaceuticals</h1>
          <span className="text-white">
            Welcome to DecenPharm! In order to start visualizing
            data from medicines or workers, please connect 
            your wallet.
          </span>
          {(!auth.address || !auth.agent) && (
            <button
              onClick={handleClick}
              className="shadow w-1/2 meta-btn text-white hover:bg-white border-2 border-white focus:shadow-outline focus:outline-none font-bold py-2 px-3"
            >
              Connect to Metamask!
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage

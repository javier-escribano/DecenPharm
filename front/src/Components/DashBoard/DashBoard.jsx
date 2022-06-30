import useConfiguration from '../../Hooks/useConfiguration'
import ClientDashBoard from '../ClientDashBoard/ClientDashBoard'

const DashBoard = () => {
  const { auth } = useConfiguration()

  if (auth.agent === 'client') {
    return <ClientDashBoard />
  } else {
    return <h1>Dashboard</h1>
  }
}

export default DashBoard

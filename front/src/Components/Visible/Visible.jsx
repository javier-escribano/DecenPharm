import { hasPermissions } from '../../utils'

const Visible = ({ role, children, auth }) => {
  return hasPermissions(role, auth.agent) && children
}

export default Visible

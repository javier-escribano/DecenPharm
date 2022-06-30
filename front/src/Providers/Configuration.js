import { createContext, useState } from "react";

export const ConfigurationContext = createContext()

export const Configuration = (props) => {

  const [auth, setAuth] = useState({
    address: "",
    agent_type: ""
  })

  return (
    <ConfigurationContext.Provider value={{auth,setAuth}}>
      {props.children}
    </ConfigurationContext.Provider>
  )
}
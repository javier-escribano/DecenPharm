import { useState } from "react"
import useConfiguration from "../../Hooks/useConfiguration"

const Register = () => {

  const {auth, registerUser} = useConfiguration()

  const [selectedOption, setSelectedOption] = useState("client")

  const handleRegister = (e) => {
    e.preventDefault()
    registerUser(auth.address, selectedOption)
  }

  return (
    <div className="h-full flex flex-col mt-10 items-center">
      <h1 className="text-4xl mb-4">¡Welcome!</h1>
      <form id="register-form" onSubmit={handleRegister}>
        <select className="h-10 rounded px-1 py-2" defaultValue={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} form="register-form">
          <option value="client">Client</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="distributor">Distributor</option>
        </select>
        <button type="submit" className="bg-gray-800 text-white rounded-md shadow-md px-2 h-10">Register</button>
      </form>
    </div>
  )
}

export default Register
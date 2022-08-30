import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useConfiguration from '../../Hooks/useConfiguration'
import './Register.css'

const Register = () => {
  const { auth, registerUser } = useConfiguration()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleRegister = (data) => {
    registerUser(
      auth.address,
      data.agentType,
      data.name,
      data.surname,
      data.latitude,
      data.longitude
    )
  }

  useEffect(() => {
    const location = window.navigator.geolocation
    location.getCurrentPosition((pos) => {
      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)
    })
  }, [setValue])

  return (
    <>
      <div className="register-form bg-white flex flex-col w-2/5 my-8 mx-auto items-center">
        <h1 className="text-4xl text-gray-800 mb-4">Register User</h1>
        <form
          id="register-form"
          className="flex gap-1 flex-col w-full"
          onSubmit={handleSubmit(handleRegister)}
        >
          <input
            placeholder="Name"
            className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('name', { required: 'Name is mandatory' })}
          ></input>
          <p>{errors.name?.message}</p>
          <input
            placeholder="Surname"
            className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('surname', { required: 'Surname is mandatory' })}
          ></input>
          <p>{errors.surname?.message}</p>
          <input
            placeholder="Latitude"
            className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('latitude', {
              required: 'Latitude is mandatory',
              value: '',
            })}
          ></input>
          <p>{errors.latitude?.message}</p>
          <input
            placeholder="Longitude"
            className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('longitude', {
              required: 'Longitude is mandatory',
              value: '',
            })}
          ></input>
          <p>{errors.longitude?.message}</p>
          <select
            className="h-10 px-1 py-2"
            {...register('agentType', { required: true })}
            defaultValue={'client'}
            form="register-form"
          >
            <option value="client">Client</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="distributor">Distributor</option>
          </select>
          <button
            type="submit"
            className="bg-gray-800 text-white shadow-md px-2 h-10"
          >
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default Register

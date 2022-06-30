const ClientDashBoard = () => {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <input
          placeholder="ej: 1478234238"
          className="shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></input>
        <button className="shadow bg-gray-800 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4">
          Buscar
        </button>
      </div>
      <div className="results mt-10 mx-20 flex flex-row">
        <div></div>
        <div className="info border grid grid-cols-2">
          <h2 className="text-center border-b-2 py-2 col-span-full">
            Medicine Information
          </h2>
          <h4 className="pl-3 py-1 border-r border-b">Manufacturer</h4>
          <span className="pl-3 py-1 border-b">Bayern</span>
          <h4 className="pl-3 py-1 border-r border-b">Identifier</h4>
          <span className="pl-3 py-1 border-b">84293482</span>
          <h4 className="pl-3 py-1 border-r border-b">Name</h4>
          <span className="pl-3 py-1 border-b">Ibuprofeno</span>
          <h4 className="pl-3 py-1 border-r border-b">Description</h4>
          <span className="pl-3 pr-3 py-1 border-b">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            incidunt aliquid esse eligendi repellat in dicta excepturi odio
            asperiores? Distinctio, dolore. Quas, mollitia est incidunt quisquam
            odit non sint iure.
          </span>
          <h4 className="pl-3 py-1 border-r">Manufacturing date</h4>
          <span className="pl-3 py-1">19/06/2022</span>
        </div>
      </div>
    </div>
  )
}
export default ClientDashBoard

export const convertState = (number_state) => {
  switch (number_state) {
    case '0':
      return 'Manufactured'
    case '1':
      return 'Delivered by manufacturer'
    case '2':
      return 'Received by distributor'
    case '3':
      return 'Delivered by distributor'
    case '4':
      return 'Received by pharmacy'
    case '5':
      return 'Sold'
    default:
      return 'Unknown'
  }
}

const permissions = {
  client: ['USER'],
  pharmacist: ['USER', 'CONTRIBUTOR'],
  distributor: ['USER', 'CONTRIBUTOR'],
  manufacturer: ['USER', 'CONTRIBUTOR', 'CREATOR'],
}

const stateOptions = {
  pharmacist: [
    { value: 4, label: 'Received by pharmacy' },
    { value: 5, label: 'Sold' },
  ],
  distributor: [
    { value: 2, label: 'Received by distributor' },
    { value: 3, label: 'Delivered by distributor' },
  ],
  manufacturer: [{ value: 1, label: 'Delivered by manufacturer' }],
}

export const getStateOptions = (agent) => {
  if (agent == 'client'){
    return []
  }
  if (agent) {
    return stateOptions[agent]
  }
  return []
}

export const hasPermissions = (role, agent) => {
  if (agent) {
    return permissions[agent].includes(role)
  }
  return false
}

export const coordsParser = (coord) => {
  let parsedCoords = coord
    .split(',')
    .map((coord) => coord.replace(/[\[|\]]/, ''))
  return {
    latitude: parseFloat(parsedCoords[0]),
    longitude: parseFloat(parsedCoords[1]),
  }
}

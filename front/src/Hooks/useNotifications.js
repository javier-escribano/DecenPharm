import { Store } from 'react-notifications-component'

export const useNotifications = () => {
  const addNotification = (message, title, type) => {
    Store.addNotification({
      title: title,
      type: type,
      container: 'top-right',
      message: message,
      dismiss: {
        duration: 10000,
        pauseOnHover: true,
        onScreen: true
      },
    })
  }

  return { addNotification }
}

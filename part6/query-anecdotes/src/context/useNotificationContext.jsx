import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const timeOut = {
  current: null
}

export const useNotificationContext = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  function setNotification(notiObj) {
    if(timeOut.current) clearTimeout(timeOut.current)
    
    notificationDispatch({
      type: 'SET',
      payload: notiObj
    })

    timeOut.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return { notification, notificationDispatch, setNotification }
}
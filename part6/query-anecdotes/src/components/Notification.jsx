import { useNotificationContext } from "../context/useNotificationContext"

const Notification = () => {
  const { notification } = useNotificationContext()

  if(notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: notification.type === 'error' ? 'red' : 'green',
    color: 'white'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification

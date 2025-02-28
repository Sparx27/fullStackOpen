import { createContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  const { type, payload } = action
  if(type === 'SET') return payload
  if(type === 'CLEAR') return null
  return state
}

export const NotificationContextProvider = ({ children }) => {
 const [notification, notificationDispatch] = useReducer(notificationReducer, null)

 return <NotificationContext.Provider value={[notification, notificationDispatch]}>
  {children}
 </NotificationContext.Provider>
}

export default NotificationContext
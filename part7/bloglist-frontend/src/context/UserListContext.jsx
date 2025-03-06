import { createContext, useState } from 'react'

const UserListContext = createContext()

export const UserListContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  return <UserListContext.Provider value={{ users, setUsers }}>
    {children}
  </UserListContext.Provider>
}

export default UserListContext
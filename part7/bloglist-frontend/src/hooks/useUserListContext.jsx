import { useContext } from 'react'
import UserListContext from '../context/UserListContext'

const useUserListContext = () => {
  const { users, setUsers } = useContext(UserListContext)
  return [users, setUsers]
}

const useUserList = () => {
  const { users } = useContext(UserListContext)
  return users
}

const useSetUserList = () => {
  const { setUsers } = useContext(UserListContext)
  return setUsers
}

const useFindInUserList = (id) => {
  const { users } = useContext(UserListContext)
  return users.find(u => u.id === id)
}

export {
  useUserList,
  useSetUserList,
  useFindInUserList
}

export default useUserListContext
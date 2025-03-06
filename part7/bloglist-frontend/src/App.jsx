import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/Home/Home'
import Blogs from './pages/Blogs/Blogs'
import ProtectedRoute from './pages/general/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/slices/userSlice'
import { useEffect } from 'react'
import Users from './pages/Users/Users'
import User from './pages/Users/User'
import Blog from './pages/Blog/Blog'
import NotFound from './pages/general/NotFound'
import Header from './components/Header'
import { setAllBlogs } from './store/slices/blogsSlice'

const App = () => {
  const logUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)))
    }
  }, [])

  useEffect(() => {
    if(logUser) {
      dispatch(setAllBlogs())
    }
  }, [logUser])

  return (
    <main className='bg-dark text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute logUser={logUser} />}>
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<Blog blog={blog} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
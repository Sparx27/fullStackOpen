import { Link } from 'react-router-dom'

const Menu = () => {
  const margin = {
    marginRight: '12px'
  }
  return (
    <div style={{ fontSize: '18px' }}>
      <Link to='/' style={margin}>anecdotes</Link>
      <Link to='create' style={margin}>create new</Link>
      <Link to='about' style={margin}>about</Link>
    </div>
  )
}

export default Menu
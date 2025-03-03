import Menu from '../components/Menu'

const Header = () => {
  return (
    <header style={{ padding: '30px 15px', backgroundColor: 'grey' }}>
      <h1 style={{ margin: '0 0 10px', color: 'white' }}>Software anecdotes</h1>
      <Menu />
    </header>
  )
}

export default Header
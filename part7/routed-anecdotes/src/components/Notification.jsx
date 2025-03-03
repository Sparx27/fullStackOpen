
const Notification = ({ message }) => {
  const messageStyle = {
    marginTop: '10px',
    padding: '8px',
    border: 'solid'
  }
  return (
    <div style={messageStyle}>{message}</div>
  )
}

export default Notification
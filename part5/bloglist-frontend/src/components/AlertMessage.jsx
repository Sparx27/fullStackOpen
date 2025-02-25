const AlertMessage = ({ message, type }) => {
  if(type === 'error') {
    return (
      <div style={{ padding: '8px', background: 'rgb(237, 170, 170)', marginBottom: '8px' }}>
        <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
          {message}
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '8px', background: 'rgb(191, 235, 191)', marginBottom: '8px' }}>
      <p style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>
        {message}
      </p>
    </div>
  )
}

export default AlertMessage
const unknownPath = (req, res) => res.status(404).json({ message: 'Unknown path' })

const errorsHandler = (err, req, res, next) => {
  if(err.name === 'CastError') {
    return res.status(400).json({ message: 'Malformatted ID' })
  }
  if(err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message?.substring(err.message.lastIndexOf(':') + 2) || 'Error in validations'
    })
  }
  if(err.name === 'MongoServerError') {
    if(err.message.includes('E11000 duplicate key error')) {
      if(err.message.includes('username')) return res.status(409).json({ message: 'Username already taken' })
    }
  }

  console.log('ERROR NAME ', err?.name)
  console.log('ERROR MESSAGE ', err?.message)
  console.log('ERROR CODE ', err?.message)
  next(err)
}

module.exports = {
  unknownPath,
  errorsHandler
}
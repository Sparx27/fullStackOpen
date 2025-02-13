const unknownPath = (req, res) => res.status(404).json({ message: 'Unknown path' })

const errorsHandler = (err, req, res, next) => {
  if(err.name === 'CastError') return res.status(400).json({ message: 'Malformatted ID' })

  next(err)
}

module.exports = {
  unknownPath,
  errorsHandler
}
const logInfo = (info) => console.log(info)

const logError = (err) => console.log(`\x1b[31m${err}\x1b[0m`)

module.exports = {
  logInfo,
  logError
}
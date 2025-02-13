const app = require('./app.js')
const { PORT } = require('./src/utils/config.js')
const { logInfo } = require('./src/utils/logger.js')

app.listen(PORT, () => logInfo(`Server running at port ${PORT}`))
const mongoose = require('mongoose')
const mongoPath = process.env.DB

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    })
    return mongoose
}

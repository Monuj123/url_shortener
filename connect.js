const mongoose = require('mongoose')

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}
mongoose.exports = {
    connectToMongoDB,
};
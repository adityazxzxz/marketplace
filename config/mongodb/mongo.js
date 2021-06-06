const mongoose = require('mongoose');
const mongodConfig = require('./config').mongodb;

console.log(mongodConfig)

mongoose.Promise = global.Promise;

const getConfig = () => {
    let options = {
        useNewUrlParser:true,
        poolSize:5,
        reconnectTries:Number.MAX_VALUE,
        keepAlive:120,
    }

    return options
}

const getUrl = ()=>{
    let mongoUrl = 'mongodb://';
    let dbName = mongodConfig.db;
    mongoUrl += `${mongodbConfig.host}:${mongodbConfig.port}`;
    mongoUrl += `/${dbName}`;

    return mongoUrl;
}

let mongoClient = mongoose.createConnection(getUrl(),getConfig());

mongoClient.on('connected',() => {
    console.log('mongoose connects to :'+getUrl())
})

mongoClient.on('error', (err) => {
    console.log('mongoose connection failed reason '+err)
})

mongoClient.on('disconnected',() => {
    console.log('mongoose connection closed')
})

const close = () => {
    mongoClient.close()
}

module.exports = {
    mongoClient,
    close
}
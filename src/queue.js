const config  = require("./config");
const amqp    = require('amqplib/callback_api');
let credentials = require('amqplib').credentials;

/** Message Queue Rabbit MQ */
const options   = { credentials: credentials.plain(config.mq.username, config.mq.password) }
const queue     = () => new Promise((resolve, reject) => amqp.connect('amqp://'+config.mq.host,options, (error, connection) => error ? reject(error) : resolve(connection)))
const channel   = () => new Promise((resolve,reject) => queue().then(connection => connection.createChannel((error,channel) => error ? reject(error) : resolve(channel))).catch(error => reject(error)));
const message   = (subject,message,durable = false,persistent = true) => new Promise((resolve,reject) => channel().then(channel => {
    channel.assertQueue(subject, {durable})
    channel.sendToQueue(subject, Buffer.from(message), {persistent});
    return resolve(true);
}).catch(error => reject(error)));

module.exports = {
    queue,
    channel,
    message,
}
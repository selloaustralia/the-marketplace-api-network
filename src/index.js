const { randomBytes, randomUUID, randomFill, randomInt } = require("crypto");
const express = require("express");
const http    = require("http");
const server  = express(http);
const config  = require("./config");
const mq      = require("./queue");


/** Routes */
/**
 * GET /{provider}/connection
 * GET /{provider}/authenticate
 * GET /{provider}/authorize
 * GET /{provider}/categories
 * GET /{provider}/products #
 * GET /{provider}/orders   #
 * GET /{provider}/order/{id}
 * POST /{provider}/product
 * GET /{provider}/product/{id}
 * POST /{provider}/product/{id}
 * GET /{provider}/order/{id}/fulfilments
 * POST /{provider}/order/{id}/fulfilment
 * DELETE /{provider}/order/{id}/cancel
 */


/** Server  */
server.listen(3000,async ()=> {
    const ch = await mq.channel();
    let nusm = randomInt(50).toString()
    
    setTimeout(async () => {
        await mq.message(nusm,'Server Ready on '+nusm,true).then(r => console.log(r)).catch(err => console.log(err.message));
    }, 2000);
    ch.assertQueue(nusm,{durable:true})
    ch.consume(nusm, (message,error) => {
        if(error) console.error(error.message);
        if(message) console.log( message.content.toString())
    },{noAck:true})
})
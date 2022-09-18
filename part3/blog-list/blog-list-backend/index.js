// const config = require("./utils/config");
// const http=require('http');
// const express=require('express')
// const { response } = require("express");
// const app=express()
// app.get('/',(request,response)=>{
//   response.send('HELLO')
// })
// app.listen(config.PORT,()=>{
//   console.log('connected')
// })
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const config = require("./utils/config");
const logger = require("./utils/logger");

server.listen(3001, () => {
  logger.info(`server listening at PORT ${config.PORT}`);
});

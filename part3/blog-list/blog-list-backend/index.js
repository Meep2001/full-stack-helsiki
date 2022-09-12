const { response } = require('express')
require('dotenv').config();
const cors=require('cors')
const express=require('express')

const app=express()
app.use(cors())
app.use(express.json())

app.post('/api/blogs',(request,response)=>{
    console.log('Listening');
    response.send('hhh')
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`)
})

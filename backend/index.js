const express = require('express')
const app = express()


const HTML = `<div>
    <h1>welcome to nodejs app</h1>
    <p>Im going to start from zero</p>
</div>`

app.get('/',(req,res)=>{
    res.send(HTML)
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})
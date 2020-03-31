const express = require('express');
require('./db/mongoose')
const Member = require('./models/member')
const app = express()

const port = 3000
app.use(express.json())
app.post('/signup',(req,res) =>
{
    const member = new Member(req.body)
    member.save().then(() =>
    {
        res.send(member)
    }).catch((e) =>
    {
        res.status(400).send(e)
    })
})
app.listen(port,() =>
{
    console.log("Server is up and running on port " + port)
})
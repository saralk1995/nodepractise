const path = require('path')
const express = require('express');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = 3000
app.use(express.json())
app.post('/users',async (req,res) =>
{
    const user = new User(req.body)
    try
    {
        await user.save()   //a promise is returned.following this code will only run if this line run successfully
        res.status(201).send(user)
    } 
    catch(e)
    {
        res.status(400).send(e)
    }        
    // user.save().then(() =>
    // {
    //     res.status(201).send(user)
    // }).catch((e) =>
    // {
    //     res.status(400).send(e)
    // })
})
app.get('/users',async (req,res) =>
{   
    try
    {
        const users = await User.find({})
        res.send(users) 
    }
    catch(e)
    {   
        res.status(500).send(e)
    }
    // User.find({}).then((users) =>       //sends back all users in db and if this is successfull we get in users variable
    // {
    //     res.send(users)                 
    // }).catch((e) =>
    // {   
    //     res.status(500).send(e)
    // })                               
})
app.get('/users/:id',async (req,res) =>   //here you get the id using :id passed in url and use it to search operation in DB
{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user)
            return res.status(500).send(user)

        res.send(user)
    }
    catch(e)
    {
        res.status(500).send("User not found")
    }
    // User.findById(_id).then((user) =>
    // {
    //     if(!user)
    //         return res.status(500).send(user)
    
    //     res.send(user)
    // }).catch((e) =>
    // {
    //     res.status(500).send("User not found")
    // })
})
app.post('/tasks',async (req,res) =>
{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
    // task.save().then(() =>
    // {
    //     res.status(201).send(task)
    // }).catch((e) =>
    // {
    //     res.status(500).send(e)
    // })
})
app.get('/tasks',async (req,res) =>
{
    try
    {
        const users = await Task.find({})
        res.status(200).send(users)
    }
    catch(e)
    {
        res.staus(500).send("User not found")
    }
    // Task.find({}).then((users) =>
    // {
    //     res.status(200).send(users)
    // }).catch((e) =>
    // {
    //     res.staus(500).send("User not found")
    // })
})
app.get('/task/:id',async (req,res) =>
{
    const _id = req.params.id
    try
    {
        const task = await Task.findById(_id)
        if(!task)
            return res.status(500).send("task not found")
        res.status(200).send(task)        
    }
    catch(e)
    {
        res.status(500).send("task not found")
    }
    // Task.findById(_id).then((task) =>
    // {
    //     if(!task)
    //         return res.status(500).send("task not found")
    //     res.status(200).send(task)
    // }).catch((e) =>
    // {
    //     res.status(500).send("task not found")
    // })
})
app.listen(port,() =>
{
    console.log("Server is up and running on port " + port)
})

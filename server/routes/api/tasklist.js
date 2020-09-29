const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// route get
router.get('/', async (req, res) => {
    const tasklist = await loadTasksCollection();

    res.send(await tasklist.find({}).toArray())
})

// route post
router.post('/', async(req, res) => {
    const tasklist = await loadTasksCollection();

    console.log(req.body.task)
    await tasklist.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    })

    res.status(201).send()
})

// route delete
router.delete('/:id', async(req, res) => {
    const tasklist = await loadTasksCollection();
    await tasklist.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

async function loadTasksCollection(){
    // object to connect with database
    const client = await mongodb.MongoClient.connect("mongodb+srv://abc123:@Kimhak2019@hengkimhak.ils0t.mongodb.net/HengKimhak?retryWrites=true&w=majority", {useNewUrlParser: true})

    // return the object of collection mytask
    return client.db('my_tasklist').collection("mytasks")
}


module.exports = router
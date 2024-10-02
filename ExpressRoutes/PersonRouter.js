const express = require('express')
const router = express.Router();
const Person = require('../DataModal/PersonDataModal')

//Post person data
router.post('/', async (req, res) => {
    try {
        const data = req.body;//Assuming the request body contains the person data
        //create new Person document using the mongoose modal
        const newPerson = new Person(data);
        //  Save new person data
        const response = await newPerson.save();
        console.log('PersonData is saved success fully')
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' })

    }
})
//get data for person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("PersonData is fetched success fully");
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'inter error' })
    }
})
//Get data for person work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;//Extract the data from url parameters

        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType })
            res.status(200).json(response)
            console.log("Get the Person work type")
        } else {
            res.status(404).json({ ERROR: "Data is not found" })
        }

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'inside server error' })

    }
})


//Update date in person

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//extract the id from the url parameters
        const UpdatePersonData = req.body;//update data for the person body
        const response = await Person.findByIdAndUpdate(personId, UpdatePersonData, {
            new: true,//return update documents
            runValidators: true//Run mongoose validation
        })

        if (!response) {
            res.status(400).json({ error: 'data is not  found' })
        }
        console.log("PersonData has been update success fully")
        res.status(200).json(response)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'inside server error' })

    }

})


//Delete person data

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            res.status(404).json({ error: 'PersonData is not found' })
        }

        console.log(" Person Data is deleted success fully")
        res.status(200).json(response)

    } catch (error) {
        console.log('ERROR', error);
        res.status(500).json({ error: 'internal server error' })
    }
})



module.exports = router;
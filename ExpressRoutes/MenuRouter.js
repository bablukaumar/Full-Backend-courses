const express = require('express')
const router = express.Router();
const MenuItems = require('../DataModal/MenuDataModel')

// Post menu data 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newData = new MenuItems(data);
        const response = await newData.save();
        console.log("Menu item  is post success fully");
        res.status(200).json(response);
    } catch (error) {
        console.log("ERROR", error);
        res.status(404).json({ error: 'inter server error' })
    }
})

// Get menuData
router.get('/', async (req, res) => {
    try {
        const data = await MenuItems.find();
        console.log("Menu items has been get successfully")
        res.status(200).json(data)

    } catch (error) {
        console.log("ERROR".error);
        res.status(404).json({ error: 'internal server error' })
    }
})

//get menu item from menu data
router.get('/:Items', async (req, res) => {
    try {
        const Items = req.params.Items;
        if (Items == 'spicy' || Items == 'sour' || Items == 'sweet') {
            const response = await MenuItems.find({ taste: Items });
            console.log("MenuItem data is find / get successfully");
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'MenuData/Item is not found' })
        }

    } catch (error) {
        console.log("ERROR".error);
        res.status(404).json({ error: 'internal server error' })

    }
})

//Put or update menu Data in database

router.put('/:id',async(req,res)=>{
    try {
        const data=req.params.id;
        const updateData= req.body;
        const response=await MenuItems.findByIdAndUpdate(data,updateData,{
            new:true,
            runValidators:true
        })

        if(!response){
            res.status(404).json({ERROR:'Data is not found'})
        }
        console.log("MenuData is updated successfully")
        res.status(200).json(response)
        
    } catch (error) {
        console.log('ERROR',error);
        res.status(500).json({error:'internal error on the server'})
        
    }
})


//Delete data menu data

router.delete('/:id',async(req,res)=>{
    try {
        const data=req.params.id;
        const deleteData=await MenuItems.findByIdAndDelete(data);
        if(!deleteData){
            res.status(404).json({ERROR:'MenuData do not find'})
        }
        console.log("Menu Data deleted successfully");
        res.status(200).json(deleteData)
        
    } catch (error) {
        console.log('ERROR',error);
        res.status(500).json({ERROR:'internal error on the server'})
        
    }
})
module.exports = router;
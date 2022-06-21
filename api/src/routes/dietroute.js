const { Router } = require('express');
const { dietPreload } = require('../contollers/diets');
const { DietList } = require('../contollers/diets')
const router = Router();

// const { dietPreload }=require('../contollers/diets')


router.get('/', async(req,res)=>{
    try{
        await dietPreload()
        let dietdb= await DietList()
        res.status(200).send(dietdb)
    } 
    catch (error){res.status(400).send(error)}
})



module.exports=router;
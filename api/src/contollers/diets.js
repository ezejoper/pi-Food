const { Diet } = require('../db')
const axios= require("axios")
require('dotenv').config();


const dietPreload= async()=>{
    try{
        const diets= await Diet.bulkCreate([
        {name: 'gluten free'},
        {name: 'ketogenic'},
        {name: 'vegetarian'},
        {name: 'lacto ovo vegetarian'},
        {name: 'ovo vegetarian'},
        {name: 'vegan'},
        {name: 'pescatarian'},
        {name: 'paleolithic'},
        {name: 'primal'},
        {name: 'fodmap friendly'},
        {name: 'whole 30'},
        {name: 'dairy free'}
        ])
}catch(error){ console.log(error)
}
}
// const dietas = ["gluten free","paleolithic", "vegetarian", "lacto ovo vegetarian","vegan","pescatarian","primal","whole 30", "fodmap friendly","dairyFree"];
//     dietas.forEach(async (element) => await Diet.create({name: element}));
//     console.log(dietas)
    
//     console.log('Tipos de dieta pre-cargadas')
    const DietList= async()=>{
        try{
            return await Diet.findAll()
        } catch(error){
            console.log(error)
        }
    }
module.exports={dietPreload,
DietList}
const { Diet } = require('../db')
const axios= require("axios")
require('dotenv').config();
const { API_KEY }= process.env;

const dietPreload= async()=>{
    try{
        const diets= await Diet.bulkCreate([
            {name: 'gluten free'},
            {name:'Vegetarian'},
            {name: 'Ketogenic'},
            {name: 'Lacto-Vegetarian'},
            {name: 'Ovo-Vegetarian'},
            {name: 'Vegan'},
            {name: 'Pescetarian'},
            {name: 'Paleo'},
            {name: 'Primal'},
            {name:'Low FODMAP'},
            {name:'Whole30'}
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
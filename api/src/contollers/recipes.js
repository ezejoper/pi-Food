const { Recipe , Diet } = require("../db")
const axios = require("axios")
require('dotenv').config()
const { API_KEY } = process.env;

const getApiRecipes = async() =>{

    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiRecipes = apiInfo.data?.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            diets: e.diets.map(each => ({ name: each })),
            dishTypes: e.dishTypes, 
            steps: e.analyzedInstructions[0]?.steps.map(e => { return e.step })
        }
    })
    return apiRecipes
}

const getDataBaseInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            } //ver si la sintaxis esta bien escrita
        }
    })
}

const getAllRecipes = async () => {
    try{
        const apiInfo = await getApiRecipes()
        const dbInfo= await getDataBaseInfo()
        const infoTotal = apiInfo.concat(dbInfo)
        return infoTotal
    } catch (error){
        console.log(error)
    }
}






const searchByIdAtApi = async(id)=>{
    try {
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`) 
        const e = recipe.data
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            diets: e.diets.map(each => ({ name: each })),
            dishTypes: e.dishTypes, 
            steps: e.analyzedInstructions[0]?.steps.map(e => { return e.step })
        }
    } catch {
        return undefined;
    }
    
}

const searchByIdAtDB = async (id) => {
    try {
        const recipe = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                } //ver si la sintaxis esta bien escrita
            }
        })
        return recipe
    } catch {
        return undefined;
    }
}
// const searchById = async(id)=>{
//     try {
//         const apiId= await searchByIdAtApi(id)
//         const dbId = await searchByIdAtDB(id)
//         const infoTotal= apiId.concat(dbId)
//         return infoTotal
        
//     } catch (error) {
//         console.log(error)}
// }
const searchById = async(id)=>{
    const apiRecipeProm = searchByIdAtApi(id)
    const dbRecipeProm = searchByIdAtDB(id)

    const [apiRecipe, dbRecipe] = await Promise.all([apiRecipeProm, dbRecipeProm])

    return apiRecipe || dbRecipe
}
module.exports = {
    getApiRecipes,
    getDataBaseInfo,
    getAllRecipes,
    searchById
}
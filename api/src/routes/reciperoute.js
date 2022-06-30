const { Router } = require('express');

const router = Router();
const{ getAllRecipes, searchById} =require('../contollers/recipes')
const { Recipe }= require('../db')

router.get('/',async (req,res)=>{
    try{
        const { name }= req.query
        const recipesAll = await getAllRecipes()
        if(name){
            let recipe= recipesAll.filter(r=>r.title?.toLowerCase().includes(name.toString().toLowerCase()))
            if(recipe.length){
                res.status(200).json(recipe)
            }else{
                res.status(404).send('error recipes does not exist')
            }
        }
            else{
                res.status(200).json(recipesAll)
            }
        }catch(error){
            res.send(error)
}
})
// router.get("/:idRecipe", async(req,res) => {
//     try {
//         const id = req.params.idRecipe
//         const detailById = await searcheById(id)
//         if (!detailById){ 
//             return res.status(404).send("Recipe by Id doesn´t exist")
//         }
//         res.status(200).send(detailById)

//     } catch (error) {      
//     }
// })

router.get('/:idRecipe', async(req,res)=>{
    try{
        const id= req.params.idRecipe
        const idDetail= await searchById(id)
        if(idDetail){
            return  res.status(200).send(idDetail)
        }
        res.status(404).send('Error - Recipe by Id doesn´t exist')
    } catch(error){}
})

router.post('/',async(req,res)=>{
    try{
        const { title, summary, healthScore, steps, image, diets}= req.body

        const CreateRecipe = await Recipe.create({
            title:title,
            summary:summary,
            healthScore: healthScore,
            steps:steps,
            image:image,

        
        })
        await diets.map(d=>CreateRecipe.addDiet(d))
        res.status(200).send('akdjalkdjal')
        return CreateRecipe
    }
    catch (error){
        console.log(error)
    }
})
    router.delete('/delete/:idRecipe', async(req,res)=>{
        try{
            const {idRecipe}=req.params

            await Recipe.destroy({
                where:{id: idRecipe}
            })
            return res.status(200).send('Receta Eliminada')
        
        }catch(error){}
    })
module.exports=router
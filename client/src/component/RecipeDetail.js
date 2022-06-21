import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getrecipeDetail } from "../actions";
import './styles/RecipesDetail.css'
import { Link } from "react-router-dom";


export default function RecipeDetail(){
    const dispatch = useDispatch()
    const idRecipe=useParams() // para traer objeto de la url 
    const recipeDetail= useSelector(state=>state.detail)
    
    useEffect(()=>{
        dispatch(getrecipeDetail(idRecipe.id))
    },[dispatch])

    return(
        <div>
            <Link to='/home'>
            <button className="volverboton">Volver</button>
            </Link>
        <div className="detailconteiner" >

                <div className="imgd">
                    <img className='imagend' src={recipeDetail.image}/>
                </div>
                <div className="titlerecipe">
                    <h2>{recipeDetail.title}</h2>
                </div> 
                <div className="Summary">
                    <h5>{recipeDetail.summary}</h5>
                </div>
            {/* <div>
                <h3> Puntaje Spoonacular </h3>
                <p>{recipeDetail.spoonacularScore}</p>
            </div> */}
                <div>
                    <h3 className="salud">Puntuaje de Salud</h3>
                    <p className="numsalud">{recipeDetail.healthScore}</p>
                </div>
                <div>
                    <h3 className="diet">Dietas</h3>
                    <p className="diettype">{recipeDetail.diets?.map(r => (<li>{r.name} </li>))}</p>
            </div>
                <h3 className="stepin">Instrucciones</h3>
                <p className="inst">{recipeDetail.steps}</p>
            </div>
            </div>
    )
}


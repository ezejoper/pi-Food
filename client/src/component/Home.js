import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByDiet, getAllRecipes, orderByPoints, orderByTitle,getDiets}  from "../actions";
import Header from "./Header";
import NavBar from "./NavBar";
import Page from "./Page";
import RecipesCard from './recipesCard';
import SearchBar from "./SearchBar";
import './styles/Home.css'


export default function Home(){
const dispatch= useDispatch();
const recipes=useSelector((state)=>state.allRecipes)
const allDiets=useSelector((state)=>state.diets)

// const params= props.match.params.id
const [paged, setPaged] = useState(1) //paginas
const [forPage, setForPage]=useState(9)

const recipesForPage= paged * forPage; //1*1 1*2
const firstRecipePage= recipesForPage- forPage //2-1
const verRecipesPage=recipes.slice(firstRecipePage, recipesForPage)

const max= Math.ceil(recipes.length/forPage)


React.useEffect(()=>{
    dispatch(getAllRecipes())
},[dispatch])

React.useEffect(()=>{
    dispatch(getDiets())
},[dispatch])

const[order, setOrder] = useState('')
const[point, setPoint] = useState('')



function handleOrderByTitle(e){
    dispatch(orderByTitle(e.target.value))
    setOrder(e.target.value)
    setPaged(1)
    e.preventDefault()
}
function handleOrderByPoint(e){
    dispatch(orderByPoints(e.target.value))
    setOrder(e.target.value)
    setPaged(1)
    e.preventDefault()
}   

function handleFilterForDiet(e){
    dispatch(filterByDiet(e.target.value))
    setPaged(1)
    e.preventDefault()
}
return(
    <div className="bodyHome">
        <NavBar/>
        <SearchBar/>
        <Header/>
        
        <div className="filterConteiner">
        <select className="SelectOrderTitle" onChange={e=>handleOrderByTitle(e)}>
        <option>Seleccione el Orden</option>
        <option value='Asc'>A - Z</option>
        <option value='Desc'>Z - A</option>
        </select>

        <select className="SelectOrderPoint" onChange={e=>handleOrderByPoint(e)}>
        <option value=''>Seleccione por puntos</option>
        <option value='HealthScorePointMax'>Puntaje Max</option>
        <option value='HealthScorePointMin'>Puntaje Min</option>
        </select>

        <select className="dietfil" onChange={e=>handleFilterForDiet(e)}>
        <option value="">Seleccione Dieta</option>
        {allDiets?.map(d=>{
            return (<option value={d.name}>{d.name}</option>)
        })}
        </select>
        </div>

    <div className="Conteiner"> 
        
        {verRecipesPage?.map(recipe=>{
            return(
                <Link className="linkHome" to={`/recipes/${recipe.id}`}>
                <RecipesCard
                    image={recipe.image}
                    title={recipe.title}
                    diets={recipe.diets.map(d=> <p className="diets">{d.name}</p>)}
                    key={recipe.id}
                />
                </Link>
            )
        })
    }
    </div>
    <div>
    <Page paged={paged}  setPaged={setPaged} max={max}/>
    </div>
    </div>
)


}



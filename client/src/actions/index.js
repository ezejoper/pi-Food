import axios from "axios"
export const GET_ALL_RECIPES='GET_ALL_RECIPES'
export const SEARCH_RECIPES='SEARCH_RECIPES'
export const RECIPE_DETAIL= 'RECIPE_DETAIL'
export const GET_DIETS= 'GET_DIETS'
export const ORDER_BY_TITLE= 'ORDER_BY_TITLE'
export const ORDER_BY_POINTS='ORDER_BY_POINTS'
export const FILTER_BY_DIETS="FILTER_BY_DIETS"
export const RETURN_ORDER='RETURN_ORDER'
// const LocalHost= 'http://localhost:3000/'

export function getAllRecipes(){

    return async function(dispatch){
        axios.get("/recipes")
        .then(res => {
            dispatch({ type: GET_ALL_RECIPES, 
                payload:res.data})
            })
    }
}

export function getDiets(){
    return async function(dispatch){
        try {
            var json = await axios.get("/diets")
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function searchRecipe(name){
    return async function(dispatch){
        try{
            var res= await axios.get(`/recipes?name=${name}`)
            return dispatch({
                type: SEARCH_RECIPES,
                payload: res.data
            })
        } catch(error){
            dispatch({
                type: SEARCH_RECIPES,
                payload: [] })
        }
    }}


export function getrecipeDetail(id){
        return async function(dispatch){
        try{
            var res=await axios.get(`/recipes/${id}`)
            return dispatch({
                type: 'RECIPE_DETAIL',
                payload: res.data
        })
    } catch(error){
        console.log(error)
    }
}
}
export function postRecipes(payload){
    return async function(dispatch){
    try{
        var res=await axios.post(`/recipes`, payload)
        return res
} catch(error){
    console.log(error)
}
}
}

export function orderByTitle(payload){
    return {
        type: ORDER_BY_TITLE,
        payload
    }
}
export function orderByPoints(payload){
    return {
        type: ORDER_BY_POINTS,
        payload
    }
}

export function filterByDiet(payload){ 
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}

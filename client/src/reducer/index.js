import { GET_ALL_RECIPES, RECIPE_DETAIL, SEARCH_RECIPES, GET_DIETS, ORDER_BY_TITLE, ORDER_BY_POINTS,FILTER_BY_DIETS} from '../actions/index'


const initialState={
    allRecipes:[],
    recipesC:[],
    diets:[],
    detail:[],
    
}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipesC: action.payload,
                allRecipes:action.payload,
                detail:[]
            }
            case GET_DIETS :
            return {
                ...state,
                diets: action.payload
            }

        case FILTER_BY_DIETS:
                const recipes = state.recipesC
                const dietFiltered = action.payload === "" ? recipes : recipes.filter(recipe => {
                        let diet = recipe.diets.map(d => d.name)
                        if (diet.includes(action.payload)){
                            return recipe
                        }
                    })  
                return {
                    ...state,
                    allRecipes: dietFiltered
                }
        case ORDER_BY_TITLE:
            const orderReciperTitle= action.payload === 'Asc'  ?
                state.allRecipes.sort(function(a , b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return 1
                    }
                    if(b.title.toLowerCase() > a.title.toLowerCase()){
                        return -1
                    }
                    
                    return 0
                }) : state.allRecipes.sort(function(a,b){
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return -1
                    }
                    if(b.title.toLowerCase() > a.title.toLowerCase()){
                        return 1
                    }
                    return 0
                })
            return{
                ...state,
                allRecipes: orderReciperTitle
            }
        case ORDER_BY_POINTS:
            const orderReciperPoint= action.payload === 'HealthScorePointMax' ?
                state.allRecipes.sort(function(a , b) {
                    if(a.healthScore < b.healthScore){
                        return 1
                    }
                    if(b.healthScore < a.healthScore){
                        return -1
                    }
                    return 0
                }) : state.allRecipes.sort(function(a,b){
                    if(a.healthScore < b.healthScore){
                        return -1
                    }
                    if(b.healthScore < a.healthScore){
                        return 1
                    }
                    return 0
                })
            return{
                ...state,
                allRecipes: orderReciperPoint
            }
        case SEARCH_RECIPES:
            return{
                ...state,
                allRecipes: action.payload
            }
        case RECIPE_DETAIL:
            return{
                ...state,
                detail:action.payload
            }
            default:
                return state
    }
}
 


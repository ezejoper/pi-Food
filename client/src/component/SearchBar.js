import React from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../actions";
import { useState } from "react";
import './styles/SearchBar.css'


export default  function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName]= useState('')


    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchRecipe(name))
        setName("")
    }

    return(
        <div className='searchBarConteiner'>
            <input className='inputSearch' type='search' placeholder="Buscar Receta.." value={name}  onChange={e=>handleInputChange(e)}/>
            <button className='boton'type="submit" onClick={e=>handleSubmit(e)}>Buscar</button>

        </div>
    )
}

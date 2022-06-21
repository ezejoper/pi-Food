import React from "react";
import { Link, Route } from "react-router-dom";
import './styles/NavBar.css'


export default function NavBar(){
return(
    <nav className="Navegador">
        <div>
    <Link className='LinkInicio'to='/'>Inicio</Link>
    <Link className='LinkHome'to='/home'>Recetas</Link>
    <Link className='LinkCreate'to='/create'>Crear Receta</Link>
    </div>
    </nav>
    
)}
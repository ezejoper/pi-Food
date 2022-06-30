import React from "react";
import './styles/About.css'
import git from '../Imagen/GitHub.png'
import linkedin from '../Imagen/linkimg.png'

export default function AboutPage(){
    return(
        <div className="About">
            <h3>Mis Datos</h3>
            <ul>
                App realizada por Ezequiel Peralta para el Proyecto individual Bootcamp Henry
            </ul>
            <div className="linkGit">
            <>Mis Redes:</>
            <a href="https://github.com/ezejoper" target="_blank"><img className="gitImg" src={git}/></a>
            <a href="https://www.linkedin.com/in/ezequiel-peralta-07ba9721a/" target="_blank"><img className="linkImg" src={linkedin}/></a>
            </div>
        </div>
    )
}
import React from "react";
import styles from './styles/recipeCard.css'


export default  function RecipesCard({ image , title , diets }){
    return (
        <div className= 'Card'>
            <img clasname='imagen' src={image} alt="Imagen no encontrada"/>
            <div className="detailconteinter">
                <h2 className={styles.title}>{title}</h2>
                <h5 className="diets" >{diets}</h5>
            </div>
        </div>
    )
}


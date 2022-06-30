import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getDiets, postRecipes } from "../actions";
import { useEffect } from "react";
import {  Link, useHistory } from "react-router-dom";
import './styles/Create.css'




function validate(post) {
    const errors = {};
    
    if (!post.title) errors.title = 'Complete con un nombre de receta';
    
    if(post.title.length > 45 ) errors.title='El nombre de su receta es muy largo'
    if (!post.summary) errors.summary = 'Por favor agregue un comentario';
    if(post.image && ! /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/.test(post.image)){
        errors.image = 'Ingrese una URL valida'
    }
    if (!post.steps) errors.steps = 'Por favor detalle los pasos para su receta';
    return errors;
};
export default function RecipeCreate(){
    const dispatch= useDispatch()
    const allDiets= useSelector(state=> state.diets)
    
    const history = useHistory();
    const [errors, setErrors] = useState({})
   

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    const [post, setPost]= useState({
        title:'',
        summary:'',
        healthScore:50,
        steps:'',
        image:'',
        diets: []
    })

    function handleSelect(e){
        if(post.diets.includes(e.target.value)){
            return 'Diet Type exists'
        }else{
            setPost({
            ...post,
            diets: [...post.diets, e.target.value]
        })
    }
    }
    function handleInputChange(e){
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }))
    }
    function handleDelete(e){
        
        setPost({
            ...post,
            diets: post.diets.filter(d=> d !==e)


        })
        
       
    }




    function handleSubmit(e){
        if(!post.title) {
            e.preventDefault()
            return alert('Coloque un Titulo')
        }
        if(!post.summary) {
            e.preventDefault()
            return alert('Coloque un Resumen')
        }
        if(!post.diets.length) {
            e.preventDefault()
            return alert('Agregue una dieta')
        }else {
            if (!post.image || post.image && ! /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/.test(post.image)) {
            post.image = "https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image-620x600.jpg"
                    }
        }   
        
        dispatch(postRecipes(post))
            alert('Receta creada con exito')
        setPost({
            title:'',
            summary:'',
            healthScore:50,
            steps:'',
            image:'',
            diets: []
        })
        history.push('/home')
    
}
    



    return(
        <div>
            <Link to='/home'>
            <button className="volverboton">Volver</button>
            </Link>
            <h1>Crea tus propias Recetas</h1>
            
            <form className="FormConteiner">

            
                <div className="Titulo">
                    <label className="TituloReceta" > Titulo de Receta</label>
                    <input className="InputReceta" size='50' type='text' value={post.title} name='title' onChange={e=>handleInputChange(e)}/>
                    {errors.title && (<p className='errortitle'>{errors.title}</p>)}
                </div>
                <div className="Resumen">
                    <label className="TituloResumen">Resumen</label>
                    <textarea className="InputResumen" type='text' value={post.summary} name='summary' onChange={e=>handleInputChange(e)}/>
                    {errors.summary && (<p className='errorResumen'>{errors.summary}</p>)}
                </div>
                <div className="Puntuacion2">
                    <label className="Puntuacion">Health Score</label>
                    <input className="InputPuntacion" type='range' min='0' max='100' value={post.healthScore} name='healthScore' onChange={e=>handleInputChange(e)}/>
                    {<p className='puntuacionnum'>{post.healthScore}</p>}
                </div>
                <div className="Steps">
                    <label className="instrucciones">Instrucciones</label>
                    <textarea className="StepInput" type='text' value={post.steps} name='steps'onChange={e=>handleInputChange(e)}/>
                    {errors.steps && (<p className='error'>{errors.steps}</p>)}
                </div>
                <div className="Imagen">
                    <label className="ImgUrl">Agregue una Imagen</label>
                    <input className="InputImagen" type='url' value={post.image} name='image' onChange={e=>handleInputChange(e)}/>
                    {errors.image && (<p className='errorimg'>{errors.image}</p>)}
                </div>
                <div className="DietSelect">
                    <select className="selectDiet" onChange={e=>handleSelect(e)}>
                    <option value=''  name='dietslist'>Seleccione una Dieta</option>
                    {allDiets?.map(d=>{ return (<option value={d.id} key={d.id}>{d.name}</option>)
                    })}
                </select>                     
                                
                            {post.diets.map(diet => 
                            <div className='selectedDiets'>
                                <div className="listita">
                                <p className="dietname">{allDiets?.find(element => element.id === diet)?.name}</p>
                                <button className="botondelete" onClick={e=>handleDelete(e)}>x</button>
                                </div>
                            </div>
                            )}
                        
    
                </div>
                <button className='submitButton' type="submit" onClick={(e) => handleSubmit(e)}>Crear Receta</button>
            </form>
        </div>
    )
        
}
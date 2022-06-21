import React, { useState } from "react";
import './styles/Page.css'

export default function Page({paged, setPaged,max}){

const [pageInput, setPageInput]=useState(1)

function nextPage(){
    setPageInput(parseInt(pageInput )+ 1)
    setPaged(parseInt(paged)+1)

}

function previousPage(){
    setPageInput(parseInt(pageInput) - 1)
    setPaged(parseInt(paged)-1)
}
function onKeyDown (e){
if(e.keyCode == 13){
    setPaged(parseInt(e.target.value))
    if (
        parseInt (e.target.value < 1) ||
        parseInt (e.target.value) > Math.ceil (max) ||
        isNaN (parseInt (e.target.value))
){
    setPaged(1)
    setPageInput(1)
}else{
    setPaged(parseInt(e.target.value))
}
}
}
function onChange(e){
    setPageInput(e.target.value)
}
return(
    <div className="Paginadox">
        <button className='botonAnt btn-slid'disabled={paged === 1 || paged < 1} onClick={previousPage}>
       
       Anterior
        
       
        </button>
        <input className='inputNum' onChange={e=>onChange(e)} 
        onKeyDown={e=>onKeyDown(e)} 
        name='page' autoComplete='off' value={pageInput}/>
        <p> de {max}</p>
        <button className='botonAnt btn-slid'disabled={paged === Math.ceil (max) || paged > Math.ceil (max)}
        onClick={nextPage}>Siguiente</button>
    </div>
)
            }
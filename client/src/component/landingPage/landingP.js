import React from "react";
import { Link } from "react-router-dom";
import '../styles/landingP.css'



export function LandingPage(){
    return(
        <div className="landinPage">
                <p className="msg"> <b>Delicious Food is waiting for you</b></p>
                <Link   className="LinkLanding" to='/home'>
                <button  className="buttonHome" >Inicio</button>
                </Link>
        </div>
    )
}
//ver si hay que cambiar a home
export default LandingPage;
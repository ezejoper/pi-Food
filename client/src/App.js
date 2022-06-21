import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LandingPage } from './component/landingPage/landingP';
import Home from './component/Home'
import RecipeDetail from './component/RecipeDetail';
import RecipeCreate from './component/CreateRecipe';



export function App() {
  return (
    <BrowserRouter>
      
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
      <Route exact path="/create" component={RecipeCreate}/>
      
    
    </BrowserRouter>

  );
}

export default App;

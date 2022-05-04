import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);
  
const filteredIngredientsHandler = useCallback(filteredIngredients => {
  setUserIngredients(filteredIngredients);
}, []);

  const addIngredientHandler = ingredient => {
  fetch('https://react-hooks-update-58af8-default-rtdb.firebaseio.com/ingredients.json',
  {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: { 'Content-Type': 'application/json' }
}).then(response => {
  return response.json();
}).then(responseData => {
  setUserIngredients(prevIngredients => [...prevIngredients, {id: responseData.name, ...ingredient} ]);
});
  };
  const removeIngredientHandler = ingredientID => {
    fetch(`https://react-hooks-update-58af8-default-rtdb.firebaseio.com/ingredients/${ingredientID}.json`,
  {
    method: 'DELETE',
}).then(response => {
  setUserIngredients(prevIngredients => prevIngredients.filter(ingredientItem => ingredientItem.id !== ingredientID));
})


  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem= {removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;

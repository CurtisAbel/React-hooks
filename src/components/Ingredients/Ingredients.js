import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [...prevIngredients, {id: Math.random().toString(), ...ingredient} ]);
  }

  const removeIngredientHandler = ingredientID => {

    setUserIngredients(prevIngredients => prevIngredients.filter(ingredientItem => ingredientItem.id !== ingredientID));

  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem= {removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;

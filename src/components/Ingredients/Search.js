import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;
  const [inputData, setInputData] = useState('');
  const inputRef = useRef();
  

  useEffect(() =>{
const timer = setTimeout( () => {
  if(inputData === inputRef.current.value ){
    const query = inputData.length === 0 ? '' : `?orderBy="title"&equalTo="${inputData}"`
    fetch('https://react-hooks-update-58af8-default-rtdb.firebaseio.com/ingredients.json' + query).then(
      response =>response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData){
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }

        onLoadIngredients(loadedIngredients);
      });

      }

    }, 500);
    return () => {
      clearTimeout(timer);
    }
   
  }, [inputData, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef}  type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

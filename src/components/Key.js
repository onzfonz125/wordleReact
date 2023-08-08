import React, {useContext} from 'react'
import { AppContext } from '../App';

function Key({keyVal, bigKey }) {
  const {onEnter, onSelectLetter, onDelete, correctLetters, almostLetters, disabledLetters} = useContext(AppContext);

  const selectLetter = () => { 
    
    if (keyVal === "ENTER")
    {
      onEnter();
    }
    else if (keyVal === "DEL")
    { 
      onDelete();      
    }
    else
    {
      onSelectLetter(keyVal);
    } 
  }; 
  return (
    <div className='key' id= {bigKey ? "big": correctLetters.includes(keyVal) ? "correct" : almostLetters.includes(keyVal) ? "almost" : disabledLetters.includes(keyVal) ? "disabled" : ""} onClick={selectLetter}>{keyVal}</div>
  )  
}

export default Key
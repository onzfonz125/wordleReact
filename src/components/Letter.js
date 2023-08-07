import React, {useContext, useEffect  } from 'react'
import App, { AppContext } from '../App';

function Letter({letterPos, attemptVal}) {
    const {board, currAttempt, letterStatesArr, setDisabledLetters, notAWord}  = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = letterStatesArr[attemptVal][letterPos] === "0";
    const almost = letterStatesArr[attemptVal][letterPos] === "1";
    
    const letterState = notAWord && currAttempt.attempt === attemptVal ? "NaW" : currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
      if(!correct && !almost && letter !== "") {
        setDisabledLetters((prev) => [...prev, letter]);
      }
    }, [currAttempt.attempt])
  return (
    <div className="letter" id={letterState}>{letter}</div> 
  )
}

export default Letter
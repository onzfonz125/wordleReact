import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, setGameOver, correctWord, currAttempt} = useContext(AppContext);
  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord ? "Hai indovinato la parola!" : "Non hai indovinato la parola"}</h3>
        <h1>La parola corretta era: {correctWord}</h1>
        {gameOver.guessedWord && (<h3>Hai indovinato in {currAttempt.attempt} tentativi</h3>)}
    </div>
  )
}

export default GameOver
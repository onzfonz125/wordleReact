import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Keyboard from './components/Keyboard';
import { boardDefault, letterStatesArrDefault} from './Words';
import { createContext, useEffect, useState } from 'react'; 
import wordBank from "./wordle-bank.txt";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);  
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [letterStatesArr, setLetterStatesArr] = useState(letterStatesArrDefault);
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false}) ;
  const [correctWord, setCorrectWord] = useState(""); 

 
  useEffect(() => {
    fetch(wordBank).then((response) =>  response.text()).then((result) => {
        const wordArray = result.split("\n");
        setCorrectWord(wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase());
        setWordSet(new Set(wordArray));
    });
  }, [])

  console.log(wordSet);

  function checkLettersPos() {
    letterStatesArr[currAttempt.attempt].forEach((value, i) => {
      if(board[currAttempt.attempt][i] === correctWord[i]) {
        letterStatesArr[currAttempt.attempt][i] = "0"; //correct
      }
    })

    let correctlessWord = ""
    let correctWordCopy = ""
    board[currAttempt.attempt].forEach((value, j) => {
      if(letterStatesArr[currAttempt.attempt][j] !== "0") {
        correctlessWord += board[currAttempt.attempt][j];
        correctWordCopy += correctWord[j];
      }
      else {
        correctlessWord += " ";
        correctWordCopy += " ";
      }
    })
    correctWordCopy = Array.from(correctWordCopy);
    correctlessWord = Array.from(correctlessWord);
    let tries = 0;
    do
    {
      tries = 0;
      for (var j = 0; j < correctlessWord.length; j++) {
        if(correctlessWord[j] !== " ") {
          if(correctWordCopy.join("").includes(correctlessWord[j])) {
            letterStatesArr[currAttempt.attempt][j] = "1";
            correctWordCopy[correctWordCopy.indexOf(correctlessWord[j])] = " ";
            correctlessWord[j] = " ";
            tries++;
          }
        }
      }
    }while(tries !== 0)
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return; 
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1});
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({attempt: currAttempt.attempt, letterPos: currAttempt.letterPos - 1});
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for(let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if(wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
      checkLettersPos();
    } else {
      alert("Word not found!"); 
    }

    if(currWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }

    if(currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }

  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1> 
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, letterStatesArr, disabledLetters, setDisabledLetters, gameOver, setGameOver }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

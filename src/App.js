import React from 'react';
import Welcome from './components/Welcome'
import Question from './components/Question'
import {nanoid} from "nanoid"

export default function App() {

  const [isQuizzStarted, setIsQuizzStarted] = React.useState(false);
  const [isQuizzEnded, setIsQuizzEnded] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [newGame, setNewGame] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setQuestions(data.results.map((item) => {
            return {
              key: nanoid(),
              id: nanoid(),
              question: item.question,
              correctAnswer: item.correct_answer,
              incorrectAnswers: item.incorrect_answers,
              isCorrect: false,
              choosenAnswer: '',
              isCorrect: false
            }
        })))
}, [newGame])

  function startQuizz() {
    setIsQuizzStarted(true)
  }

  function chooseOption(event, id) {
    setQuestions(prevList => prevList.map(question => {
      return question.id === id ? 
          {
            ...question, 
            choosenAnswer: event.target.textContent,
            isCorrect: event.target.textContent === question.correctAnswer ? true : false
          } :
          question
    }))
  }

  const questionsList = questions.map((item) => {
    return (
        <Question
          {...item}
          chooseOption={chooseOption}
          isQuizzEnded={isQuizzEnded}
        />
      )
  })

  function checkAnswers() {
    setIsQuizzEnded(true)
    countCorrectAnswers()
  }

  function playAgain() {
    setNewGame(prev => {return !prev})
    setIsQuizzEnded(false)
    setCount(0)
  }

  function countCorrectAnswers() {
    const count = questions.filter((item)=> item.isCorrect === true)
    setCount(count.length)
  }

  return (
    <div className='wrapper'>
       {isQuizzStarted ? 
        <div className='question-wrapper'>
          <div className="questions">
            {questionsList}
          </div>
          <div className='footer'>
            {isQuizzEnded && <p className='result'>You scored {count}/{questions.length} correct answers</p>}
            <button className='btn btn--question' onClick={isQuizzEnded ? playAgain : checkAnswers}>
              { isQuizzEnded ? 'Play again' : 'Check answers'}
            </button>
          </div>
          
        </div>
        : <Welcome startQuizz={startQuizz}/>
        }
    </div>
    
  );
}


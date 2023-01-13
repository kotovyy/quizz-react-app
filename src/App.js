import React from 'react';
import Welcome from './components/Welcome'
import Question from './components/Question'
import {nanoid} from "nanoid"

export default class App extends React.Component {

  state = {
        isQuizzStarted: false,
        isQuizzEnded: false,
        questions: [],
        newGame: false,
        count: 0
    }

  getQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => this.setState({
          questions: data.results.map((item) => {
            return {
              key: nanoid(),
              id: nanoid(),
              question: this.convert(item.question),
              correctAnswer: this.convert(item.correct_answer),
              incorrectAnswers: item.incorrect_answers,
              isCorrect: false,
              choosenAnswer: '',
              isCorrect: false
            }
          })
        }))
}

  componentDidMount() {
    this.getQuestions()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.newGame !== this.state.newGame) {
        this.getQuestions()
    }
  }

  startQuizz = () => {
    this.setState({
      isQuizzStarted: true
    })
  }

  chooseOption = (event, id) => {
    this.setState(prevState => ({
      questions: prevState.questions.map(question => {
        return question.id === id ? 
            {
              ...question, 
              choosenAnswer: event.target.textContent,
              isCorrect: event.target.textContent === question.correctAnswer ? true : false
            } :
            question
      })
    }))
  }

  checkAnswers = () => {
    this.setState({
      isQuizzEnded: true
    })
    this.countCorrectAnswers()
  }

  playAgain = () => {
    this.setState({
      isQuizzEnded: false,
      count: 0
    })

    this.setState(prevState => ({
      newGame: !prevState.newGame
  }))
  }

  countCorrectAnswers = () => {
    const total = this.state.questions.filter((item)=> item.isCorrect === true)

    this.setState({
      count: total.length
    })
  }

  convert = (string) => { 
    var text = document.createElement("textarea")
    text.innerHTML = string
    return text.value
  }

  render() {
    const questionsList = this.state.questions.map((item) => {
      return (
          <Question
            {...item}
            chooseOption={this.chooseOption}
            isQuizzEnded={this.state.isQuizzEnded}
          />
        )
    })

  return (
    <div className='wrapper'>
      {this.state.isQuizzStarted ? 
        <div className='question-wrapper'>
          <div className="questions">
            {questionsList}
          </div>
          <div className='footer'>
            {this.state.isQuizzEnded && <p className='result'>You scored {this.state.count}/{this.state.questions.length} correct answers</p>}
            <button className='btn btn--question' onClick={this.state.isQuizzEnded ? this.playAgain : this.checkAnswers}>
              { this.state.isQuizzEnded ? 'Play again' : 'Check answers'}
            </button>
          </div>
          
        </div>
        : <Welcome startQuizz={this.startQuizz}/>
        }
    </div>
  );
}

}


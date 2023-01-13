import React from 'react';
import '../style.css';
import {nanoid} from "nanoid"


export default class Question extends React.Component {

    

    getOptions = () => {
        let options = this.props.incorrectAnswers;
        if (!(options.includes(this.props.correctAnswer))) {
            options.push(this.props.correctAnswer);
            options.sort(() => Math.random() - 0.5);
        }
    
        options = options.map((item) => {
            const selectedClass = 
                item === this.props.choosenAnswer ? 
                'question-option--selected' : ''
    
            const resultClass = 
                item === this.props.choosenAnswer && this.props.isCorrect ? 
                'question-option--right' : 
                item === this.props.choosenAnswer && !this.props.isCorrect ?
                'question-option--wrong' : ''
    
            const modifiedClass = this.props.isQuizzEnded ? resultClass : selectedClass;
            
            return (
                <span className={ `${modifiedClass} question-option`}
                    onClick={(event) => this.props.chooseOption(event, this.props.id)}
                    key={nanoid()}>
                    {item}
                </span>
            )
        })

        return options
    }

    render() {
        return (
            <div className='question'>
                <div className='question-subject'>{this.props.question}</div>
                <div className='question-options'>
                    {this.getOptions()}
                </div>
            </div>
            )
    }   
}
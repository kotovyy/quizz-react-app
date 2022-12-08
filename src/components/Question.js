import React from 'react';
import '../style.css';
import {nanoid} from "nanoid"


export default function Question(props) {

    let options = props.incorrectAnswers;
    if (!(options.includes(props.correctAnswer))) {
        options.push(props.correctAnswer);
        options.sort(() => Math.random() - 0.5);
    }

    options = options.map((item) => {
        const selectedClass = 
            item === props.choosenAnswer ? 
            'question-option--selected' : ''

        const resultClass = 
            item === props.choosenAnswer && props.isCorrect ? 
            'question-option--right' : 
            item === props.choosenAnswer && !props.isCorrect ?
            'question-option--wrong' : ''

        const modifiedClass = props.isQuizzEnded ? resultClass : selectedClass;
        
        return (
            <span className={ `${modifiedClass} question-option`}
                onClick={(event) => props.chooseOption(event, props.id)}
                key={nanoid()}>
                {item}
            </span>
        )
    })

    return (
        <div className='question'>
            <div className='question-subject'>{props.question}</div>
            <div className='question-options'>
                {options}
            </div>
        </div>
        )
}
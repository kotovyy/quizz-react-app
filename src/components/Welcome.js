import React from 'react';
import '../style.css';


export default function Welcome(props) {

    return (
        <div className="welcome-block">
            <h1 className="welcome-header">Quizzical!</h1>
            <button className="btn" onClick={props.startQuizz}>
                Start quizz
            </button>
        </div>
    );
  }
import React from 'react';
import '../style.css';


export default class Welcome extends React.Component {

    render() {
        return (
            <div className="welcome-block">
                <h1 className="welcome-header">Quizzical!</h1>
                <button className="btn" onClick={this.props.startQuizz}>
                    Start quizz
                </button>
            </div>
        );
    }
    
  }
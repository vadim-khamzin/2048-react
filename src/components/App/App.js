import React, { Component } from 'react'
import Score from '../Score'
import Game from '../Game'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            score: 0
        }

        this.updateScore = this.updateScore.bind(this)
    }

    updateScore(score) {
        this.setState({ score })
    }

    render() {
        const { score } = this.state

        return (
            <div>
                <Score score={score} />
                <Game onScore={this.updateScore} />
            </div>
        )
    }
}

export default App
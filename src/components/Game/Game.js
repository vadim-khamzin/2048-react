import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { moveValues, addRandomValue } from './gameLogic'

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matrix: Array(4).fill(
                Array(4).fill(null)
            )
        }

        this.onKeydown = this.onKeydown.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.addValueToMatrix = this.addValueToMatrix.bind(this)
    }

    componentWillMount() {
        this.addValueToMatrix(2)
        window.addEventListener('keydown', this.onKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.matrix.toString() !== this.state.matrix.toString()
    }

    render() {
        const { matrix } = this.state
        return (
            <div className="game">
                {
                    matrix.map((row, i) => (
                        <div key={i} className="game__row">
                            {row.map((el, j) => (
                                <span key={j} className="game__cell">
                                    {el !== null ? el : '*'}
                                </span>
                            ))}
                        </div>
                    ))
                }
            </div>
        )
    }

    addValueToMatrix(count = 1) {
        const { matrix } = this.state
        this.setState({ matrix: addRandomValue(matrix, count) })
    }

    onKeydown(e) {
        const keyCodes = [37, 38, 39, 40]

        if (keyCodes.includes(e.keyCode)) {
            this.handleKeyDown(e.keyCode)
        }
    }

    handleKeyDown(key) {
        const { matrix } = this.state
        const { newMatrix, score } = moveValues(matrix, key)

        this.setState({
            matrix: newMatrix
        })

        this.props.onScore(score)
    }
}

Game.propTypes = {
    onScore: PropTypes.func.isRequired
}

export default Game
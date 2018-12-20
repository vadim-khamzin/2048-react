import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score=0 }) => {
    return (
        <div className="score">
            <span className="score__title">Счет</span>
            <span className="score__number">{score}</span>
        </div>
    )
}

Score.propTypes = {
    score: PropTypes.number.isRequired
}

Score.defaultProps = {
    score: 0
}

export default Score
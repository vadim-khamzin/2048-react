import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score=0 }) => {
    return (
        <h3>Счёт: {score}</h3>
    )
}

Score.propTypes = {
    score: PropTypes.number.isRequired
}

Score.defaultProps = {
    score: 0
}

export default Score
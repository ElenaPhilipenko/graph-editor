import React, { PropTypes } from 'react'


const MiddlePointCircle = ({x, y})=> {
    return (
        <circle cx={x} cy={y}
                r={3}
                stroke='blue' strokeWidth="1" fill="white"/>
    )
};

MiddlePointCircle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default MiddlePointCircle

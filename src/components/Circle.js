import React, { PropTypes } from 'react'

const Circle = ({x, y, size, borderColor, onMouseDown})=> {
    return <circle cx={x} cy={y}
                   r={size/2}
                   onMouseDown={onMouseDown}
                   stroke={borderColor} strokeWidth="2" fill="red"/>
};

Circle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default Circle

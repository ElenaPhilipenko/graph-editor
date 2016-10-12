import React, { PropTypes } from 'react'

const Square = ({x, y, size, onMouseDown})=> {
    return (
        <rect x={x-(size/2)} y={y-(size/2)} width={size} height={size}
              onMouseDown={onMouseDown}
              stroke="black" strokeWidth="2" fill="red"/>
    )
};

Square.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default Square


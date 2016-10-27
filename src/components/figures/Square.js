import React, { PropTypes } from 'react'
import {movableFigure} from '../../css/figures'
import BoundingBox from './../edit/BoundingBox'

const Square = ({x, y, size, selected, borderColor, onMouseDown, onResize})=> {
    return (
        <g>
            <rect x={x-(size/2)} y={y-(size/2)} width={size} height={size}
                  onMouseDown={onMouseDown}
                  stroke={borderColor} strokeWidth="2" fill="red"
                  style={movableFigure}/>

            {selected ? <BoundingBox x={x-size/2} y={y-size/2} length={size} onResize={onResize}/> : null}
        </g>)
};

Square.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
};

export default Square


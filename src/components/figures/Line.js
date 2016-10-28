import React, { PropTypes } from 'react'
import BoundingBox from './../edit/BoundingBox'
import {movableFigure} from '../../css/figures'

const Line = ({x, y, size, selected, borderColor, onMouseDown, onResize})=> {

    return (
        <g>
            <line x1={x} y1={y}
                  x2={x + size} y2={y+size}
                  stroke={borderColor} strokeWidth="1.5"
                  onMouseDown={onMouseDown}
                  style={movableFigure}
            />
            {selected ? <BoundingBox x={x} y={y} length={size}
                                     onMouseDown={onMouseDown}
                                     onResize={onResize}/> : null}
        </g>)
};

Line.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
};

export default Line

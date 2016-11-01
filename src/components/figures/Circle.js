import React, { PropTypes } from 'react'
import {movableFigure} from '../../css/figures'
import BoundingBox from './../edit/BoundingBox'


const Circle = ({x, y, size, selected, borderColor, onMouseDown, onResize})=> {

    return (
        <g>
            <circle cx={x} cy={y}
                    r={size/2}
                    onMouseDown={onMouseDown}
                    stroke={borderColor} strokeWidth="1" fill="red"
                    style={movableFigure}
            />
            {selected ? <BoundingBox x={x-size/2} y={y-size/2} height={size}
                                     width={size}
                                     onResize={onResize}/> : null}
        </g>)
};

Circle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
};

export default Circle

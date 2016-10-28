import React, {PropTypes} from 'react'
import {movableFigure} from '../../css/figures'
import BoundingBox from './../edit/BoundingBox'

const Triangle = ({x, y, size, selected, borderColor, onMouseDown, onResize}) => {

    function composeCoordinates(x, y, size) { // expected format of coordinates is: 'x1,y1 x2,y2 x3,y3'
        return `${x},${y} ${x - size},${y} ${x},${y - size}`
    }

    return (
        <g>
            <polygon stroke={borderColor} strokeWidth="1" fill="red"
                     points={composeCoordinates(x, y, size)}
                     onMouseDown={onMouseDown}
                     style={movableFigure}/>
            {selected ? <BoundingBox x={x-size} y={y-size} length={size} onResize={onResize}/> : null}
        </g>
    );
};

Triangle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onResize: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default Triangle
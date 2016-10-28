import React, { PropTypes } from 'react'
import ResizeTool from './ResizeTool'
import MiddlePointCircle from './MiddlePointCircle'

const BoundingBox = ({x, y, length, onResize})=> {
    const lineStyle = {
        strokeWidth: 0.8,
        stroke: 'blue',
        strokeDasharray: '5,2',
        fill: 'none'
    };
    return (
        <g>
            <rect x={x} y={y} width={length} height={length} style={lineStyle}/>

            <MiddlePointCircle x={x+length} y={y+length/2}/>
            <MiddlePointCircle x={x+length/2} y={y}/>
            <MiddlePointCircle x={x} y={y+length/2}/>
            <MiddlePointCircle x={x+length/2} y={y+length}/>

            <ResizeTool x={x+length} y={y+length} onMouseDown={onResize}/>
        </g>
    )
};

BoundingBox.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onResize: PropTypes.func.isRequired
};

export default BoundingBox

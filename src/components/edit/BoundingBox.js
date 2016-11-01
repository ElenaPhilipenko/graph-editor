import React, { PropTypes } from 'react'
import ResizeTool from './ResizeTool'
import MiddlePointCircle from './MiddlePointCircle'

const BoundingBox = ({x, y, width, height, onResize})=> {
    const lineStyle = {
        strokeWidth: 0.8,
        stroke: 'blue',
        strokeDasharray: '5,2',
        fill: 'none'
    };
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} style={lineStyle}/>

            <MiddlePointCircle x={x+width} y={y+height/2}/>
            <MiddlePointCircle x={x+width/2} y={y}/>
            <MiddlePointCircle x={x} y={y+height/2}/>
            <MiddlePointCircle x={x+width/2} y={y+height}/>

            <ResizeTool x={x+width} y={y+width} onMouseDown={onResize}/>
        </g>
    )
};

BoundingBox.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onResize: PropTypes.func.isRequired
};

export default BoundingBox

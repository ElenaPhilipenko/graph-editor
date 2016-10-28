import React, { PropTypes } from 'react'
import ResizeTool from './ResizeTool'
import MiddlePointCircle from './MiddlePointCircle'


const BoundingBox = ({x, y, length, onResize})=> {
    const s = {
        strokeWidth: 1,
        stroke: 'blue'
    };
    return (
        <g>
            <line strokeDasharray="2, 2"
                  style={s}
                  x1={x} y1={y}
                  x2={x} y2={y+length}/>
            <line strokeDasharray="2, 2"
                  style={s}
                  x1={x} y1={y+length}
                  x2={x+length} y2={y+length}/>
            <line strokeDasharray="2, 2"
                  style={s}
                  x1={x+length} y1={y+length}
                  x2={x+length} y2={y}/>
            <line strokeDasharray="2, 2"
                  style={s}
                  x1={x+length} y1={y}
                  x2={x} y2={y}/>

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

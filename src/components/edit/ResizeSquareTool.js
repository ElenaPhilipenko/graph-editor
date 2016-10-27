import React, { PropTypes } from 'react'
import {arrows} from '../../css/figures'


const ResizeSquareTool = ({x, y, onMouseDown=null})=> {
    const size = 7;
    return (
    <rect x={x-size} y={y-size} width={size} height={size}
          onMouseDown={onMouseDown}
          stroke="blue" strokeWidth="1" fill="blue"
          style={arrows.downRight}/>
    )
};

ResizeSquareTool.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired
};

export default ResizeSquareTool

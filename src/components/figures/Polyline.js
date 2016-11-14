import React, { PropTypes } from 'react'
import BoundingBox from './../edit/BoundingBox'
import {movableFigure} from '../../css/figures'

const Polyline = ({points, selected, size, borderColor, onMouseDown, onResize})=> {

    function formatPoints(points) {
        return points.map(p => {
            return `${p.x},${p.y}`
        }).join(' ');
    }

    function findMinx() {
        return Math.min(...points.map(p=> {
            return p.x
        }));
    }

    function findMinY() {
        return Math.min(...points.map(p=>p.y));
    }

    return (
        <g>
            <polyline points={formatPoints(points)}
                      stroke={borderColor}
                      strokeWidth="2"
                      onMouseDown={onMouseDown}
                      fill="none"
                      style={movableFigure}
            />
            {selected ? <BoundingBox x={findMinx()} y={findMinY()} width={size.width} height={size.height}
                                     onMouseDown={onMouseDown}
                                     onResize={onResize}/> : null}
        </g>)
};

Polyline.propTypes = {
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }),
    points: PropTypes.array.isRequired,
    selected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
};

export default Polyline

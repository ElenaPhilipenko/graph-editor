import React, {PropTypes} from 'react'

function composeCoordinates(x, y, size) { // expected format of coordinates is: 'x1,y1 x2,y2 x3,y3'
    return x.toString().concat(
        ',', y, ' ',
        x - size, ',', y, ' ',
        x, ',', y - size
    )
}

const Triangle = ({x, y, size, onMouseDown}) => {
    return (<polygon stroke="black" strokeWidth="2" fill="red"
                     points={composeCoordinates(x, y, size)}
                     onMouseDown={onMouseDown}
    />);
};

Triangle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    onMouseDown : PropTypes.func.isRequired
};

export default Triangle
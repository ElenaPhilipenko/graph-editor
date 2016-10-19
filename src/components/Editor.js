import React, { PropTypes } from 'react'
import Circle from './Circle'
import Square from './Square'
import Triangle from './Triangle'
import uuid from '../uuid'

const canvasStyle = {
    width: "800px",
    height: "900px"
};

const Editor = React.createClass({
    render: function () {
        return <div>
            <svg id="canvas" style={canvasStyle}
                 onMouseMove={(event)=>{this.props.onCanvasMouseDrag(event, this.props.mode)}}
                 onMouseDown={(event)=>{this.props.onCanvasMouseDown(uuid(), event, this.props.mode)}}
                 onMouseUp={()=>{this.props.onCanvasMouseUp(this.props.figures, this.props.mode)}}
                 onClick={(event)=>{this.props.onCanvasClick(event)}}
            >
                {this.props.figures.map(figure => {
                        if (figure.size > 0) {
                            let borderColor = figure.selected ? 'blue' : figure.borderColor;
                            switch (figure.type) {
                                case 'circle':
                                    return <Circle key={figure.id}
                                                   x={figure.x}
                                                   y={figure.y}
                                                   size={figure.size}
                                                   borderColor={borderColor}
                                                   onMouseDown={()=>{this.props.onFigureMouseDown(figure.id, this.props.mode)}}
                                    />;
                                case 'square':
                                    return <Square key={figure.id}
                                                   x={figure.x}
                                                   y={figure.y}
                                                   size={figure.size}
                                                   borderColor={borderColor}
                                                   onMouseDown={()=>{this.props.onFigureMouseDown(figure.id, this.props.mode)}}
                                    />;
                                case 'triangle':
                                    return <Triangle key={figure.id}
                                                     x={figure.x}
                                                     y={figure.y}
                                                     size={figure.size}
                                                     borderColor={borderColor}
                                                     onMouseDown={()=>{this.props.onFigureMouseDown(figure.id, this.props.mode)}}
                                    />;
                                default:
                                    console.log("Can not render: " + figure.type);
                                    return null;
                            }
                        } else {
                            return null;
                        }
                    }
                )}
            </svg>
        </div>
    }
});

Editor.propTypes = {
    figures: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired).isRequired,
    mode: PropTypes.string.isRequired,
    onCanvasClick: PropTypes.func.isRequired,
    onFigureMouseDown: PropTypes.func.isRequired,
    onCanvasMouseDrag: PropTypes.func.isRequired,
    onCanvasMouseDown: PropTypes.func.isRequired,
    onCanvasMouseUp: PropTypes.func.isRequired
};

export default Editor

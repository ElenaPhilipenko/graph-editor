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

    getInitialState: function () {
        return {mouseDown: false};
    },

    calcCoordinates: function (event) {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        return [event.pageX - canvas.left, event.pageY - canvas.top];
    },

    onEmptyCanvasClick: function () {
        return function (event) {
            if (event.target.localName === 'svg') {
                this.props.onEmptyCanvasClick (uuid(), ...this.calcCoordinates(event), this.props.mode);
            }
        }.bind(this)
    },

    onFigureMouseDown: function (id) {
        return function (event) {
            event.preventDefault();
            this.props.onFigureMouseDown(id, ...this.calcCoordinates(event), this.props.mode);
        }.bind(this)
    },

    onCanvasMouseDrag: function () {
        return function (event) {
            if (this.state.mouseDown) {
                this.props.onCanvasMouseDrag(...this.calcCoordinates(event), this.props.mode);
            }
        }.bind(this)
    },

    onCanvasMouseUp: function () {
        return function () {
            this.setState({mouseDown: false});
            this.props.onCanvasMouseUp(this.props.figures, this.props.mode);
        }.bind(this);
    },

    onCanvasMouseDown: function () {
        return function (event) {
            this.props.onCanvasMouseDown(...this.calcCoordinates(event), this.props.mode);
            this.setState({mouseDown: true});
        }.bind(this);
    },

    render: function () {
        return <div>
            <svg id="canvas" style={canvasStyle}
                 onMouseMove={this.onCanvasMouseDrag()}
                 onMouseUp={this.onCanvasMouseUp()}
                 onMouseDown={this.onCanvasMouseDown()}
                 onClick={this.onEmptyCanvasClick()}
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
                                                   onMouseDown={this.onFigureMouseDown(figure.id)}
                                    />;
                                case 'square':
                                    return <Square key={figure.id}
                                                   x={figure.x}
                                                   y={figure.y}
                                                   size={figure.size}
                                                   borderColor={borderColor}
                                                   onMouseDown={this.onFigureMouseDown(figure.id)}
                                    />;
                                case 'triangle':
                                    return <Triangle key={figure.id}
                                                     x={figure.x}
                                                     y={figure.y}
                                                     size={figure.size}
                                                     borderColor={borderColor}
                                                     onMouseDown={this.onFigureMouseDown(figure.id)}
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
    onEmptyCanvasClick: PropTypes.func.isRequired,
    onFigureMouseDown: PropTypes.func.isRequired,
    onCanvasMouseDrag: PropTypes.func.isRequired,
    onCanvasMouseDown: PropTypes.func.isRequired,
    onCanvasMouseUp: PropTypes.func.isRequired
};

export default Editor

import React, { PropTypes } from 'react'
import Circle from './Circle'
import Square from './Square'
import Triangle from './Triangle'
import uuid from '../uuid'

let canvasStyle = {
    width: "800px",
    height: "900px"
};

const Editor = React.createClass({

    getCanvas: function () {
        return document.getElementById('canvas').getBoundingClientRect()
    },

    onEmptyCanvasClick: function (action) {
        return function (event) {
            action(uuid(), event.pageX - this.getCanvas().left, event.pageY - this.getCanvas().top);
        }.bind(this)
    },

    onFigureMouseDown: function (selectAction, id) {
        return function (event) {
            selectAction(id, event.pageX - this.getCanvas().left, event.pageY - this.getCanvas().top);
        }.bind(this)
    },

    convertCoordsAndCall: function (moveAction) {
        return function (event) {
            moveAction(event.pageX - this.getCanvas().left, event.pageY - this.getCanvas().top);
        }.bind(this)
    },

    componentDidMount: function () {
        document.addEventListener("keydown", ()=> {
            this.props.onCtrlDown();
        }, false);
    },

    render: function () {
        return <div>
            <svg id="canvas" style={canvasStyle}
                 onMouseMove={this.convertCoordsAndCall(this.props.onCanvasMouseMove)}
                 onMouseUp={this.props.onCanvasMouseUp}
                 onClick={this.onEmptyCanvasClick(this.props.onAddClick)}
            >
                {this.props.figures.map(figure => {
                        switch (figure.type) {
                            case 'circle':
                                return <Circle key={figure.id}
                                               x={figure.x}
                                               y={figure.y}
                                               size={figure.size}
                                               onMouseDown={this.onFigureMouseDown(this.props.onFigureMouseDown, figure.id)}
                                />;
                            case 'square':
                                return <Square key={figure.id}
                                               x={figure.x}
                                               y={figure.y}
                                               size={figure.size}
                                               onMouseDown={this.onFigureMouseDown(this.props.onFigureMouseDown, figure.id)}
                                />;
                            case 'triangle':
                                return <Triangle key={figure.id}
                                                 x={figure.x}
                                                 y={figure.y}
                                                 size={figure.size}
                                                 onMouseDown={this.onFigureMouseDown(this.props.onFigureMouseDown, figure.id)}
                                />;
                            default:
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
    onAddClick: PropTypes.func.isRequired,
    onFigureMouseDown: PropTypes.func.isRequired,
    onCanvasMouseUp: PropTypes.func.isRequired,
    onCtrlDown: PropTypes.func.isRequired,
    onCanvasMouseMove: PropTypes.func.isRequired
};

export default Editor

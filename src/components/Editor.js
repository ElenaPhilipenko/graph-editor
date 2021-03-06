import React, { PropTypes } from 'react'
import Circle from './figures/Circle'
import Square from './figures/Square'
import Line from './figures/Line'
import Polyline from './figures/Polyline'
import Triangle from './figures/Triangle'
import Grid from './edit/Grid'
import uuid from '../uuid'
import {FIGURES} from '../actions/figureActions'

const canvasStyle = {
    width: "800px",
    height: "900px"
};

const cmdCode = 91;
const del = 46;
const back = 8;

const Editor = React.createClass({
    componentDidMount() {
        document.addEventListener('keydown', (event)=> {
            if (event.keyCode === cmdCode) {
                this.props.onCommandPressed(this.props.mode);
            } else if (event.keyCode === del || event.keyCode === back) {
                this.props.onDelete();
            }
        });

        document.addEventListener('keyup', (event)=> {
            if (event.keyCode === cmdCode) {
                this.props.onCommandUp();
            }
        });
    },

    render () {
        return <div>
            <svg id="canvas" style={canvasStyle}
                 onMouseMove={(event)=>{this.props.onCanvasMouseDrag(event, this.props.mode)}}
                 onMouseDown={(event)=>{this.props.onCanvasMouseDown(uuid(), event, this.props.mode)}}
                 onMouseUp={()=>{this.props.onCanvasMouseUp()}}
            >\
                <Grid/>

                {this.props.figures.map(figure => {
                        if (figure.size.width > 0 || figure.size.height > 0) {
                            let borderColor = figure.selected ? 'blue' : figure.borderColor;
                            switch (figure.type) {
                                case FIGURES.CIRCLE:
                                    return <Circle key={figure.id}
                                                   x={figure.x}
                                                   y={figure.y}
                                                   size={figure.side}
                                                   borderColor={borderColor}
                                                   selected={figure.selected}
                                                   onMouseDown={(event)=>{this.props.onFigureMouseDown(figure.id, event, this.props.mode, this.props.figures)}}
                                                   onResize={(event) => {this.props.onResizeToolMouseDown(event)}}

                                    />;
                                case FIGURES.SQUARE:
                                    return <Square key={figure.id}
                                                   x={figure.x}
                                                   y={figure.y}
                                                   size={figure.side}
                                                   borderColor={borderColor}
                                                   selected={figure.selected}
                                                   onMouseDown={(event)=>{this.props.onFigureMouseDown(figure.id, event, this.props.mode, this.props.figures)}}
                                                   onResize={(event) => {this.props.onResizeToolMouseDown(event)}}
                                    />;
                                case FIGURES.TRIANGLE:
                                    return <Triangle key={figure.id}
                                                     x={figure.x}
                                                     y={figure.y}
                                                     size={figure.side}
                                                     borderColor={borderColor}
                                                     selected={figure.selected}
                                                     onMouseDown={(event)=>{this.props.onFigureMouseDown(figure.id, event, this.props.mode, this.props.figures)}}
                                                     onResize={(event) => {this.props.onResizeToolMouseDown(event)}}
                                    />;

                                case FIGURES.LINE:
                                    return <Line key={figure.id}
                                                 x={figure.x}
                                                 y={figure.y}
                                                 size={figure.side}
                                                 borderColor={borderColor}
                                                 selected={figure.selected}
                                                 onMouseDown={(event)=>{this.props.onFigureMouseDown(figure.id, event, this.props.mode, this.props.figures)}}
                                                 onResize={(event) => {this.props.onResizeToolMouseDown(event)}}
                                    />;
                                case FIGURES.POLYLINE:
                                    return <Polyline key={figure.id}
                                                     size={figure.size}
                                                     points={figure.points}
                                                     borderColor={borderColor}
                                                     selected={figure.selected}
                                                     onMouseDown={(event)=>{this.props.onFigureMouseDown(figure.id, event, this.props.mode, this.props.figures)}}
                                                     onResize={(event) => {this.props.onResizeToolMouseDown(event)}}
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
        borderColor: PropTypes.string.isRequired,
        x: PropTypes.number,
        y: PropTypes.number,
        size: PropTypes.shape,
        points: PropTypes.array
    }).isRequired).isRequired,
    mode: PropTypes.string.isRequired,
    onFigureMouseDown: PropTypes.func.isRequired,
    onResizeToolMouseDown: PropTypes.func.isRequired,
    onCanvasMouseDrag: PropTypes.func.isRequired,
    onCanvasMouseDown: PropTypes.func.isRequired,
    onCanvasMouseUp: PropTypes.func.isRequired,
    onCommandPressed: PropTypes.func.isRequired,
    onCommandUp: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Editor

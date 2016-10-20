import React, { PropTypes } from 'react'
import {FIGURES} from '../actions/figureActions'

const ToolBar = ({mode, onModeClick, onDelete, onUndo, onRedo, canUndo, canRedo}) => {
    return (
        <div>
            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.CIRCLE)}>
                <span className="glyphicon glyphicon-minus">circle</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.SQUARE)}>
                <span className="glyphicon glyphicon-minus">square</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.TRIANGLE)}>
                <span className="glyphicon glyphicon-minus">triangle</span>
            </button>

            <br/>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("move")}>
                <span className="glyphicon glyphicon-minus">move</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("resize")}>
                <span className="glyphicon glyphicon-minus">resize</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("select")}>
                <span className="glyphicon glyphicon-minus">select</span>
            </button>

            <br/>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onDelete()}>
                <span className="glyphicon glyphicon-minus">delete</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" disabled={!canUndo} onClick={() => onUndo()}>
                <span className="glyphicon glyphicon-minus">undo</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" disabled={!canRedo} onClick={() => onRedo()}>
                <span className="glyphicon glyphicon-minus">redo</span>
            </button>

            {mode}
        </div>)
};

ToolBar.propTypes = {
    mode: PropTypes.string.isRequired,
    onModeClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ToolBar
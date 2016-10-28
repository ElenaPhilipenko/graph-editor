import React, { PropTypes } from 'react'
import {FIGURES} from '../actions/figureActions'

const ToolBar = ({mode, onModeClick, onDelete, onUndo, onRedo, canUndo, canRedo}) => {
    return (
        <div>
            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.CIRCLE)}>
                <span className="glyphicon glyphicon-plus-sign"></span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.SQUARE)}>
                <span className="glyphicon glyphicon-stop"></span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.TRIANGLE)}>
                <span className="glyphicon glyphicon-play"></span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick(FIGURES.LINE)}>
                <span>---</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onDelete()}>
                <span>delete</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" disabled={!canUndo} onClick={() => onUndo()}>
                <span className="glyphicon glyphicon-menu-left"></span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" disabled={!canRedo} onClick={() => onRedo()}>
                <span className="glyphicon glyphicon-menu-right"></span>
            </button>

            {mode}
        </div>)
};

ToolBar.propTypes = {
    mode: PropTypes.string.isRequired,
    canUndo: PropTypes.bool.isRequired,
    onModeClick: PropTypes.func.isRequired,
    canRedo: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ToolBar
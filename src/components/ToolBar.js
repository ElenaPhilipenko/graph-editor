import React, { PropTypes } from 'react'
import {FIGURES} from '../actions/figureActions'

const ToolBar = ({mode, onModeClick, onDelete, onUndo, onRedo, canUndo, canRedo, onFront, onBack}) => {
    return (
        <div>
            <button className={mode !== FIGURES.CIRCLE ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onModeClick(FIGURES.CIRCLE)}>
                <span className="glyphicon glyphicon-plus-sign"/>
            </button>

            <button className={mode !== FIGURES.SQUARE ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onModeClick(FIGURES.SQUARE)}>
                <span className="glyphicon glyphicon-stop"/>
            </button>

            <button className={mode !== FIGURES.TRIANGLE ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onModeClick(FIGURES.TRIANGLE)}>
                <span className="glyphicon glyphicon-play"/>
            </button>

            <button className={mode !== FIGURES.LINE ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onModeClick(FIGURES.LINE)}>
                <span>---</span>
            </button>

            <button className={mode !== FIGURES.POLYLINE ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onModeClick(FIGURES.POLYLINE)}>
                <span className="glyphicon glyphicon-pencil"/>
            </button>

            <button className={mode !== 'delete' ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onDelete()}>
                <span>delete</span>
            </button>

            <button className={mode !== 'back' ? 'btn btn-default': 'btn btn-default active'}
                    type="button" onClick={() => onFront()}>
                <span>front</span>
            </button>

            <button className='btn btn-default' type="button" onClick={() => onBack()}>
                <span>back</span>
            </button>

            <button className='btn btn-default' type="button" disabled={!canUndo} onClick={() => onUndo()}>
                <span className="glyphicon glyphicon-menu-left"/>
            </button>

            <button className='btn btn-default' type="button" disabled={!canRedo} onClick={() => onRedo()}>
                <span className="glyphicon glyphicon-menu-right"/>
            </button>

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
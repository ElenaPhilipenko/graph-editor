import React, { PropTypes } from 'react'

const ToolBar = ({mode, onModeClick}) => {
    return (
        <div>
            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("circle")}>
                <span className="glyphicon glyphicon-minus">circle</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("square")}>
                <span className="glyphicon glyphicon-minus">square</span>
            </button>

            <button className="btn btn-default dropdown-toggle" type="button" onClick={() => onModeClick("triangle")}>
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
            {mode}
        </div>)
};

ToolBar.propTypes = {
    mode: PropTypes.string.isRequired,
    onModeClick: PropTypes.func.isRequired
};

export default ToolBar
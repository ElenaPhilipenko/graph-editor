import { connect } from 'react-redux'
import ToolBar from '../components/ToolBar'
import Immutable from 'immutable'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const mapStateToProps = (state) => {
    return {
        mode: state.present.mode,
        canRedo: state.future.length > 0,
        canUndo: state.past.length > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModeClick: (mode) => {
            dispatch({type: 'CHANGE_MODE', mode});
        },
        onDelete: () => {
            dispatch({type: 'DELETE_FIGURE'});
        },
        onUndo: () => {
            dispatch(UndoActionCreators.undo())
        },
        onRedo: () => {
            dispatch(UndoActionCreators.redo())
        }
    }
};

const ToolBarConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar);

export default ToolBarConnector
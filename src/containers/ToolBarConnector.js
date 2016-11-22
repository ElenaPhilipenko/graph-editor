import { connect } from 'react-redux'
import ToolBar from '../components/ToolBar'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {FigureActions, changeMode} from '../actions/figureActions'

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
            dispatch(changeMode(mode));
        },
        onFront: () => {
            dispatch(FigureActions.sendFigureBack());
        },
        onBack: () => {
            dispatch(FigureActions.sendFigureFront());
        },
        onDelete: () => {
            dispatch(FigureActions.deleteFigure());
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
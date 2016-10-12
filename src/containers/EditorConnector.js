import { connect } from 'react-redux'
import Editor from '../components/Editor'

const mapStateToProps = (state) => {
    var figures = Object.keys(state.figuresById).map(key => {
        var item = state.figuresById[key];
        item.id = key;
        return item;
    });
    return {
        figures: figures,
        mode: state.mode
    }
};

const mapDispatchToProps = (dispatch, getState) => {
    return {
        onAddClick: (id, x, y) => {
            dispatch({type: 'ADD_FIGURE', x, y, id});
        },
        onFigureMouseDown: (id, x, y) => {
            dispatch({type: 'SELECT_FIGURE', id});
            dispatch({type: 'START_DRAGGING', x, y});
            console.log(getState());
        },
        onCanvasMouseMove: (x, y) => {
            dispatch({type: 'DRAG', x, y})
        },
        onCanvasMouseUp: () => {
            dispatch({type: 'DESELECT_FIGURE'});
            dispatch({type: 'END_DRAGGING'})
        },
        onCtrlDown: () => {
            dispatch({type: 'CHANGE_MODE', mode: 'select'})
        }

    }
};

const EditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);

export default EditorConnector
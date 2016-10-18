import { connect } from 'react-redux'
import Editor from '../components/Editor'

const figureNames = ['circle', 'square', 'triangle'];

const mapStateToProps = (state) => {
    const figures = Object.keys(state.figuresById)
        .filter(key => {
            return state.figuresById.hasOwnProperty(key)
        })
        .map(key => {
            var item = state.figuresById[key];
            item.id = key;
            item.selected = state.selectedFigures.indexOf(key) > -1;
            return item;
        });
    return {
        figures: figures,
        mode: state.mode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFigureMouseDown: (id, x, y, mode) => {
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'SELECT_FIGURE', id});
            } else if (mode === 'select') {
                dispatch({type: 'CHANGE_FIGURE_SELECTION', id});
            }
        },
        onEmptyCanvasClick: (id, x, y, mode) => {
            if (figureNames.indexOf(mode) > -1) {
                dispatch({type: 'ADD_FIGURE', x, y, id});
            } else {
                dispatch({type: 'DESELECT_ALL_FIGURES'});
            }
        },
        onCanvasMouseDown: (x, y, mode) => {
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'START_DRAGGING', x, y});
            }
        },
        onCanvasMouseDrag: (x, y, mode) => {
            if (mode === 'resize') {
                dispatch({type: 'RESIZE_FIGURE', x, y});
            } else if (mode === 'move') {
                dispatch({type: 'MOVE_FIGURE', x, y});
            }
        },

        onCanvasMouseUp: (figures, mode) => {
            if (mode === 'move' || mode === 'resize') {
                let selected = figures.filter(f => { return f.selected }).length;
                if (selected === 1) {
                    dispatch({type: 'DESELECT_ALL_FIGURES'})
                }
            }
        }
    }
};

const EditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);

export default EditorConnector
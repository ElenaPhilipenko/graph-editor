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
        mode: state.mode,
        mouseDown: state.mouseDown
    }
};

const mapDispatchToProps = (dispatch) => {

    const calcCoordinates = (event)=> {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        return {x: event.pageX - canvas.left, y: event.pageY - canvas.top};
    };

    return {
        onFigureMouseDown: (id, mode) => {
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'SELECT_FIGURE', id});
            } else if (mode === 'select') {
                dispatch({type: 'CHANGE_FIGURE_SELECTION', id});
            }
        },
        onEmptyCanvasClick: (event, mode) => {
            if (event.target.localName === 'svg' && figureNames.indexOf(mode) === -1) {
                dispatch({type: 'DESELECT_ALL_FIGURES'});
            }
        },
        onCanvasMouseDown: (id, event, mode) => {
            dispatch({type: 'MOUSE_DOWN'});
            const coords = calcCoordinates(event);
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'START_DRAGGING', ...coords});
            } else if (figureNames.indexOf(mode) > -1) {
                dispatch({type: 'ADD_FIGURE', ...coords, id});
            }
        },
        onCanvasMouseDrag: (event, mode, mouseDown) => {
            if (!mouseDown) return;
            const coords = calcCoordinates(event);
            if (mode === 'resize') {
                dispatch({type: 'RESIZE_FIGURE', ...coords});
            } else if (mode === 'move') {
                dispatch({type: 'MOVE_FIGURE', ...coords});
            }
        },

        onCanvasMouseUp: (figures, mode) => {
            dispatch({type: 'MOUSE_UP'});
            if (mode === 'move' || mode === 'resize') {
                let selected = figures.filter(f => {
                    return f.selected
                }).length;
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
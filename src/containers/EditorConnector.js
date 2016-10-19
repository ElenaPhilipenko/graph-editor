import { connect } from 'react-redux'
import Editor from '../components/Editor'

const figureNames = ['circle', 'square', 'triangle'];

const mapStateToProps = (state) => {
    const figures = Object.keys(state.present.figuresById)
        .filter(key => {
            return state.present.figuresById.hasOwnProperty(key)
        })
        .map(key => {
            return Object.assign({}, state.present.figuresById[key],
                {id: key, selected: state.present.selectedFigures.indexOf(key) > -1})
        });
    return {
        figures: figures,
        mode: state.present.mode
    }
};

const mapDispatchToProps = (dispatch) => {

    const calcCoordinates = (event)=> {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        return {x: event.pageX - canvas.left, y: event.pageY - canvas.top};
    };

    const isEmptyCanvasClick = (event)=> {
        return event.target.localName === 'svg';
    };

    let mouseDown = false;

    return {
        onFigureMouseDown: (id, mode) => {
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'SELECT_FIGURE', id});
            } else if (mode === 'select') {
                dispatch({type: 'CHANGE_FIGURE_SELECTION', id});
            }
        },
        onCanvasClick: (event, mode) => {
            if (isEmptyCanvasClick(event) && figureNames.indexOf(mode) === -1) {
                dispatch({type: 'DESELECT_ALL_FIGURES'});
            }
        },
        onCanvasMouseDown: (id, event, mode) => {
            mouseDown = true;
            const coords = calcCoordinates(event);
            if (mode === 'resize' || mode === 'move') {
                dispatch({type: 'START_DRAGGING', ...coords});
            } else if (figureNames.indexOf(mode) > -1) {
                dispatch({type: 'ADD_FIGURE', ...coords, id});
            }
        },
        onCanvasMouseDrag: (event, mode) => {
            if (!mouseDown) return;
            const coords = calcCoordinates(event);
            if (mode === 'resize') {
                dispatch({type: 'RESIZE_FIGURE', ...coords});
            } else if (mode === 'move') {
                dispatch({type: 'MOVE_FIGURE', ...coords});
            }
        },

        onCanvasMouseUp: (figures, mode) => {
            mouseDown = false;
            if (mode === 'move' || mode === 'resize') {
                let selected = figures.filter(f => {
                    return f.selected
                }).length;
                if (selected === 1) {
                    dispatch({type: 'DESELECT_ALL_FIGURES'});
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
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import {FIGURES, FigureActions} from '../actions/figureActions'

const mapStateToProps = (state) => {
    const figures = Object.getOwnPropertyNames(state.present.figuresById)
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
        return [event.pageX - canvas.left, event.pageY - canvas.top];
    };

    const isEmptyCanvasClick = (event)=> {
        return event.target.localName === 'svg';
    };

    let mouseDown = false;
    let isFirstMove = true;

    return {
        onFigureMouseDown: (id, mode) => {
            if (mode === 'resize' || mode === 'move') {
                dispatch(FigureActions.selectFigure(id));
            } else if (mode === 'select') {
                dispatch(FigureActions.changeFigureSelection(id));
            }
        },
        onCanvasClick: (event, mode) => {
            if (isEmptyCanvasClick(event) && !FIGURES.isFigure(mode)) {
                dispatch(FigureActions.deselectAllFigures());
            }
        },
        onCanvasMouseDown: (id, event, mode) => {
            mouseDown = true;
            const coords = calcCoordinates(event);
            if (mode === 'resize' || mode === 'move') {
                dispatch(FigureActions.startDragging(...coords));
            } else if (FIGURES.isFigure(mode)) {
                dispatch(FigureActions.addFigure(id, ...coords));
            }
        },
        onCanvasMouseDrag: (event, mode) => {
            if (!mouseDown) return;
            const coords = calcCoordinates(event);
            if (mode === 'resize') {
                dispatch(FigureActions.resizeFigure(...coords, !isFirstMove));
            } else if (mode === 'move') {
                dispatch(FigureActions.moveFigure(...coords, !isFirstMove));
            }
            isFirstMove = false;
        },
        onCanvasMouseUp: (figures, mode) => {
            mouseDown = false;
            isFirstMove = true;
            if (mode === 'move' || mode === 'resize') {
                let selected = figures.filter(f => {
                    return f.selected
                }).length;
                if (selected === 1) {
                    dispatch(FigureActions.deselectAllFigures());
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
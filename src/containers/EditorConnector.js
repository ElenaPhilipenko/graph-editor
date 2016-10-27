import { connect } from 'react-redux'
import Editor from '../components/Editor'
import {FIGURES, FigureActions, changeMode} from '../actions/figureActions'

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

export const mapDispatchToProps = (dispatch) => {

    const calcCoordinates = (event)=> {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        return [event.pageX - canvas.left || 0, event.pageY - canvas.top || 0];
    };

    const isEmptyCanvasClick = (event)=> {
        return event.target.localName === 'svg';
    };

    const isSelectedFigure = (id, figures)=> {
        return figures.filter(f => f.id === id)[0].selected;
    };

    let mouseDown = false;
    let isFirstMove = true;
    let prevMode = 'move';

    return {
        onFigureMouseDown (id, event, mode, figures) {
            if (mode === 'select') {
                dispatch(FigureActions.changeFigureSelection(id));
            } else {
                dispatch(FigureActions.startDragging(...calcCoordinates(event)));
                if (isSelectedFigure(id, figures)) {
                    dispatch(changeMode('move'));
                } else  {
                    dispatch(FigureActions.deselectAllFigures());
                    dispatch(FigureActions.changeFigureSelection(id));
                }
            }
        },
        onResizeToolMouseDown (event) {
            dispatch(changeMode('resize'));
            dispatch(FigureActions.startDragging(...calcCoordinates(event)));
        },
        onCanvasMouseDown (id, event, mode) {
            mouseDown = true;
            const coords = calcCoordinates(event);
            if (isEmptyCanvasClick(event)) {
                if (FIGURES.isFigure(mode)) {
                    dispatch(FigureActions.addFigure(id, ...coords));
                } else {
                    dispatch(FigureActions.deselectAllFigures());
                }
            }
        },
        onCanvasMouseDrag (event, mode) {
            if (!mouseDown) return;
            const coords = calcCoordinates(event);
            if (mode === 'resize') {
                dispatch(FigureActions.resizeFigure(...coords, !isFirstMove));
            } else if (mode === 'move') {
                dispatch(FigureActions.moveFigure(...coords, !isFirstMove));
            }
            isFirstMove = false;
        },
        onCanvasMouseUp () {
            mouseDown = false;
            isFirstMove = true;
        },
        onCommandPressed(mode) {
            prevMode = mode;
            dispatch(changeMode('select'))
        },
        onCommandUp() {
            dispatch(changeMode(prevMode))
        },
        onDelete(){
            dispatch(FigureActions.deleteFigure());
        }
    }
};

const EditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);

export default EditorConnector
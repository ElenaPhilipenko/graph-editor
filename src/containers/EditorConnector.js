import { connect } from 'react-redux'
import Editor from '../components/Editor'
import {FIGURES, FigureActions, changeMode} from '../actions/figureActions'

const mapStateToProps = (state) => {
    const figures = state.present.figuresOrder
        .map(key => {
            return Object.assign({}, state.present.figuresById[key],
                {
                    id: key,
                    selected: state.present.selectedFigures.indexOf(key) > -1,
                    size: state.present.figuresById[key].size
                })
        });
    return {
        figures: figures,
        mode: state.present.mode
    }
};

export const mapDispatchToProps = (dispatch) => {

    const calcCoordinates = (event)=> {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        return [event.pageX - canvas.left - window.pageXOffset || 0,
            event.pageY - canvas.top - window.pageYOffset || 0];
    };

    const isEmptyCanvasClick = (event)=> {
        return event.target.localName === 'svg' || event.target.id === 'gridRect';
    };

    const isSelectedFigure = (id, figures)=> {
        return figures.filter(f => f.id === id)[0].selected;
    };

    let mouseDown = false;
    let isFirstMove = true;
    let prevMode = 'move';

    let drawingFigureId;

    return {
        onFigureMouseDown (id, event, mode, figures) {
            if (mode === 'select') {
                dispatch(FigureActions.changeFigureSelection(id));
            } else if (mode === 'front') {
                dispatch(FigureActions.sendFigureFront(id));
            } else if (mode === 'back') {
                dispatch(FigureActions.sendFigureBack(id));
            } else {
                dispatch(FigureActions.startDragging(...calcCoordinates(event)));
                dispatch(changeMode('move'));
                if (!isSelectedFigure(id, figures)) {
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
                    if (mode === FIGURES.POLYLINE) {
                        drawingFigureId = id;
                    }
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
            } else if (mode === FIGURES.POLYLINE) {
                dispatch(FigureActions.addPoint(drawingFigureId, ...coords))

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
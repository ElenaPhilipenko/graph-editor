export const FIGURES = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    LINE: 'line',
    POLYLINE: 'polyline',
    isFigure (figure){
        return [this.CIRCLE, this.SQUARE, this.TRIANGLE, this.LINE, this.POLYLINE].indexOf(figure) > -1
    }
};

export const SELECT_FIGURE = 'SELECT_FIGURE';
export const CHANGE_FIGURE_SELECTION = 'CHANGE_FIGURE_SELECTION';
export const DESELECT_ALL_FIGURES = 'DESELECT_ALL_FIGURES';
export const START_DRAGGING = 'START_DRAGGING';
export const ADD_FIGURE = 'ADD_FIGURE';
export const MOVE_FIGURE = 'MOVE_FIGURE';
export const DELETE_FIGURE = 'DELETE_FIGURE';
export const CHANGE_MODE = 'CHANGE_MODE';
export const RESIZE_FIGURE = 'RESIZE_FIGURE';
export const ADD_POINT = 'ADD_POINT';
export const SEND_FIGURE_BACK = 'SEND_FIGURE_BACK';
export const SEND_FIGURE_FRONT = 'SEND_FIGURE_FRONT';

export const FigureActions = {
    selectFigure (id) {
        return {type: SELECT_FIGURE, id, skip: true};
    },

    changeFigureSelection (id) {
        return {type: CHANGE_FIGURE_SELECTION, id, skip: true};
    },

    deselectAllFigures () {
        return {type: DESELECT_ALL_FIGURES, skip: true};
    },

    startDragging (x, y) {
        return {type: START_DRAGGING, x, y, skip: true};
    },

    addFigure (id, x, y) {
        return {type: ADD_FIGURE, id, x, y};
    },

    addPoint (id, x, y) {
        return {type: ADD_POINT, x, y, id, skip: true};
    },

    moveFigure (x, y, skip = true) {
        return {type: MOVE_FIGURE, x, y, skip};
    },

    resizeFigure (x, y, skip = true) {
        return {type: RESIZE_FIGURE, x, y, skip};
    },

    sendFigureBack(){
        return {type: SEND_FIGURE_BACK}
    },

    sendFigureFront(){
        return {type: SEND_FIGURE_FRONT}
    },

    deleteFigure () {
        return {type: DELETE_FIGURE};
    }
};

export function changeMode(mode) {
    return {type: CHANGE_MODE, mode, skip: true};
}



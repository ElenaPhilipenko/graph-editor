import {createStore} from 'redux'

let figureNames = ['circle', 'square', 'triangle'];

function createFigure(state = {
    figuresById: {},
    selectedFigures: [],

    mode: 'circle',

    moving: false,
    moveStartX: 0,
    moveStartY: 0
}, action) {
    switch (action.type) {
        case 'ADD_FIGURE':
            if (figureNames.indexOf(state.mode) > -1) {
                var newState = Object.assign({}, state);
                newState.figuresById[action.id] = {x: action.x, y: action.y, size: 80, type: state.mode};
                return newState;
            }
            return state;
        case 'SELECT_FIGURE':
            return Object.assign({}, state, {
                selectedFigures: [...state.selectedFigures, action.id]
            });

        case 'DESELECT_FIGURE':
            return Object.assign({}, state, {
                selectedFigures: []
            });

        case 'START_DRAGGING':
            if (state.mode === 'move' || state.mode == 'resize') {
                return Object.assign({}, state, {
                    moveStartX: action.x, moveStartY: action.y, moving: true
                });
            }
            return state;

        case 'END_DRAGGING':
            return Object.assign({}, state, {
                moving: false
            });

        case 'DRAG':
            if (!state.moving || (state.mode !== 'move' && state.mode !== 'resize')) {
                return state;
            }
            var newState = Object.assign({}, state, {moveStartX: action.x, moveStartY: action.y});
            state.selectedFigures.forEach(id => {
                var figure = state.figuresById[id];
                let updatedPart = state.mode === 'move' ?
                {
                    x: figure.x + (action.x - state.moveStartX),
                    y: figure.y + (action.y - state.moveStartY)
                } :
                {
                    size: figure.size + (action.x - state.moveStartX)
                };

                newState.figuresById[id] = Object.assign({}, figure, updatedPart);
            });
            return Object.assign({}, newState, {moveStartX: action.x, moveStartY: action.y});


        case 'CHANGE_MODE':
            return Object.assign({}, state, {
                mode: action.mode
            });

        default:
            return state;
    }
}

export default createFigure

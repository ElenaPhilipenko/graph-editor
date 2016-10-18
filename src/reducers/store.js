import {createStore} from 'redux'
import Immutable from 'immutable'

function createFigure(state = {
    figuresById: {},
    selectedFigures: [],

    mode: 'circle',

    moveStartX: 0,
    moveStartY: 0
}, action) {
    switch (action.type) {
        case 'ADD_FIGURE':
        {
            var newState = Object.assign({}, state);
            newState.figuresById[action.id] = {
                x: action.x,
                y: action.y,
                size: 80,
                borderColor: 'black',
                type: state.mode
            };
            return newState;
        }
        case 'SELECT_FIGURE':
        {
            const index = state.selectedFigures.indexOf(action.id);
            if (index === -1) {
                return Object.assign({}, state, {
                    selectedFigures: [...state.selectedFigures, action.id]
                });
            }
            return state;
        }
        case 'CHANGE_FIGURE_SELECTION':
        {
            const index = state.selectedFigures.indexOf(action.id);
            if (index === -1) {
                return Object.assign({}, state, {
                    selectedFigures: [...state.selectedFigures, action.id]
                });
            } else {
                return Object.assign({}, state, {
                    selectedFigures: Immutable.List(state.selectedFigures).delete(index).toArray()
                });
            }
        }
        case 'DESELECT_ALL_FIGURES':
        {
            return Object.assign({}, state, {
                selectedFigures: []
            });
        }
        case 'START_DRAGGING':
            return Object.assign({}, state, {
                moveStartX: action.x, moveStartY: action.y
            });

        case 'MOVE_FIGURE':
        {
            const newState = Object.assign({}, state, {moveStartX: action.x, moveStartY: action.y});
            newState.selectedFigures.forEach(id => {
                var figure = state.figuresById[id];
                let updatedPart = {
                    x: figure.x + (action.x - state.moveStartX),
                    y: figure.y + (action.y - state.moveStartY)
                };

                newState.figuresById[id] = Object.assign({}, figure, updatedPart);
            });
            return newState
        }
        case 'RESIZE_FIGURE':
        {
            const newState = Object.assign({}, state, {moveStartX: action.x, moveStartY: action.y});
            newState.selectedFigures.forEach(id => {
                var figure = state.figuresById[id];
                let updatedPart = {size: figure.size + (action.x - state.moveStartX)};

                newState.figuresById[id] = Object.assign({}, figure, updatedPart);
            });
            return newState
        }
        case 'CHANGE_MODE':
            return Object.assign({}, state, {mode: action.mode});

        default:
            return state;
    }
}

export default createFigure

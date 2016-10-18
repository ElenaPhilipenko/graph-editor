import {createStore} from 'redux'
import Immutable from 'immutable'

function createFigure(state = {
    figuresById: {},
    selectedFigures: [],

    mode: 'circle',

    mouseDown: false,
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
        case 'DELETE_FIGURE':
        {
            const notSelected = {};
            Object.keys(state.figuresById)
                .filter(f => {
                    return state.selectedFigures.indexOf(f) === -1
                })
                .forEach(id => {
                    notSelected[id] = state.figuresById[id]
                });
            return Object.assign({}, state, {
                selectedFigures: [],
                figuresById: notSelected
            });
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

        case 'MOUSE_DOWN':
            return Object.assign({}, state, {mouseDown: true});

        case 'MOUSE_UP':
            return Object.assign({}, state, {mouseDown: false});

        default:
            return state;
    }
}

export default createFigure

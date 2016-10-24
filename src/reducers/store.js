import Immutable from 'immutable'
import undoable from 'redux-undo'
import {SELECT_FIGURE, CHANGE_FIGURE_SELECTION, DELETE_FIGURE, DESELECT_ALL_FIGURES,
START_DRAGGING, ADD_FIGURE, MOVE_FIGURE, RESIZE_FIGURE, CHANGE_MODE, FIGURES } from '../actions/figureActions'
import filter from './actionUndoFilter'

function figures(state = {
    figuresById: {},
    selectedFigures: [],

    mode: FIGURES.CIRCLE,

    moveStartX: 0,
    moveStartY: 0
}, action) {
    switch (action.type) {
        case ADD_FIGURE:
        {
            let newFigure = Immutable.Map(state.figuresById).set(action.id, {
                x: action.x,
                y: action.y,
                size: 80,
                borderColor: 'black',
                type: state.mode
            }).toJS();
            return Object.assign({}, state, {figuresById: newFigure});
        }
        case SELECT_FIGURE:
        {
            const index = state.selectedFigures.indexOf(action.id);
            if (index === -1) {
                return Object.assign({}, state, {selectedFigures: [...state.selectedFigures, action.id]});
            }
            return state;
        }
        case DELETE_FIGURE:
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
        case CHANGE_FIGURE_SELECTION:
        {
            const index = state.selectedFigures.indexOf(action.id);
            if (index === -1) {
                return Object.assign({}, state, {
                    selectedFigures: [...state.selectedFigures, action.id]
                });
            } else {
                return Object.assign({}, state, {
                    selectedFigures: Immutable.List(state.selectedFigures).delete(index).toJS()
                });
            }
        }
        case DESELECT_ALL_FIGURES:
        {
            return Object.assign({}, state, {
                selectedFigures: []
            });
        }
        case START_DRAGGING:
            return Object.assign({}, state, {
                moveStartX: action.x, moveStartY: action.y
            });

        case MOVE_FIGURE:
        {
            let moved = Immutable.fromJS(state.figuresById);
            Object.keys(state.figuresById).forEach(id => {
                const figure = state.figuresById[id];
                if (state.selectedFigures.indexOf(id) > -1) {
                    moved = moved.setIn([id, 'x'], figure.x + (action.x - state.moveStartX));
                    moved = moved.setIn([id, 'y'], figure.y + (action.y - state.moveStartY));
                }
            });
            return Object.assign({}, state, {
                moveStartX: action.x,
                moveStartY: action.y,
                figuresById: moved.toJS()
            });
        }
        case RESIZE_FIGURE:
        {
            let resized = Immutable.fromJS(state.figuresById);
            Object.keys(state.figuresById).forEach(id => {
                const figure = state.figuresById[id];
                if (state.selectedFigures.indexOf(id) > -1) {
                    resized = resized.setIn([id, 'size'], figure.size + (action.x - state.moveStartX));
                }
            });
            return Object.assign({}, state, {
                moveStartX: action.x,
                moveStartY: action.y,
                figuresById: resized.toJS()
            });
        }
        case CHANGE_MODE:
            return Object.assign({}, state, {mode: action.mode});

        default:
            return state;
    }
}

const undoableFigures = undoable(figures, {filter});
export default undoableFigures

import Immutable from 'immutable'
import undoable from 'redux-undo'
import {SELECT_FIGURE, CHANGE_FIGURE_SELECTION, DELETE_FIGURE, DESELECT_ALL_FIGURES,
    START_DRAGGING, ADD_FIGURE, MOVE_FIGURE, RESIZE_FIGURE, CHANGE_MODE, FIGURES, ADD_POINT,
    SEND_FIGURE_BACK, SEND_FIGURE_FRONT} from '../actions/figureActions'
import filter from './actionUndoFilter'
import Figure from '../model/Figure'

function figures(state = {
    figuresById: {},
    selectedFigures: [],
    figuresOrder: [],

    mode: FIGURES.CIRCLE,

    moveStartX: 0,
    moveStartY: 0
}, action) {
    console.log(action);
    const updateFiguresById = (id, newFigure)=> {
        return Object.assign({}, state.figuresById, {[id]: newFigure});
    };

    switch (action.type) {
        case ADD_FIGURE:
        {
            let newFigure = updateFiguresById(action.id, Figure.createFigure(state.mode, action.x, action.y));
            return Object.assign({}, state, {
                figuresById: newFigure,
                figuresOrder: [...state.figuresOrder, action.id]
            });
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
            let figuresOrder = {};
            Object.keys(state.figuresById)
                .filter(f => {
                    return state.selectedFigures.indexOf(f) === -1
                })
                .forEach(id => {
                    notSelected[id] = state.figuresById[id];
                    figuresOrder = Immutable.List(state.figuresOrder).delete(state.figuresOrder.indexOf(id)).toJS();
                });
            return Object.assign({}, state, {
                selectedFigures: [],
                figuresOrder: figuresOrder,
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
                    moved = moved.set(id, figure.move(action.x - state.moveStartX, action.y - state.moveStartY));
                }
            });
            return Object.assign({}, state, {
                moveStartX: action.x,
                moveStartY: action.y,
                figuresById: moved.toJS()
            });
        }

        case SEND_FIGURE_FRONT:
        {
            let figuresOrder = Immutable.List(state.figuresOrder)
                .delete(state.figuresOrder.indexOf(action.id))
                .insert(0, action.id).toJS();
            return Object.assign({}, state, {
                figuresOrder: figuresOrder
            });
        }

        case SEND_FIGURE_BACK:
        {
            let figuresOrder = Immutable.List(state.figuresOrder)
                .delete(state.figuresOrder.indexOf(action.id))
                .set(state.figuresOrder.length-1, action.id).toJS();
            return Object.assign({}, state, {
                figuresOrder: figuresOrder
            });
        }

        case RESIZE_FIGURE:
        {
            let resized = Immutable.fromJS(state.figuresById);
            Object.keys(state.figuresById).forEach(id => {
                const figure = state.figuresById[id];
                if (state.selectedFigures.indexOf(id) > -1) {
                    resized = resized.set(id, figure.resize(action.x - state.moveStartX));
                }
            });
            return Object.assign({}, state, {
                moveStartX: action.x,
                moveStartY: action.y,
                figuresById: resized.toJS()
            });
        }
        case ADD_POINT:
        {
            let updated = Immutable.fromJS(state.figuresById);
            Object.keys(state.figuresById).forEach(id => {
                const figure = state.figuresById[id];
                if (action.id === id) {
                    updated = updated.set(id, figure.addPoint(action.x, action.y));
                }
            });
            return Object.assign({}, state, {
                moveStartX: action.x,
                moveStartY: action.y,
                figuresById: updated.toJS()
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

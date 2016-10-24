import {mapDispatchToProps} from './EditorConnector'
import {FIGURES, SELECT_FIGURE, DESELECT_ALL_FIGURES, ADD_FIGURE, START_DRAGGING,
MOVE_FIGURE, RESIZE_FIGURE} from '../actions/figureActions'

let mapDispatch = {};
let dispatchMock = jest.fn();

function createMouseEventWithCoords(x = 1, y = 22) {
    return {
        pageX: x,
        pageY: y
    }
}

beforeEach(()=> {
    dispatchMock = jest.fn();
    mapDispatch = mapDispatchToProps(dispatchMock);
    document.body.innerHTML =
        '<div>' +
        '  <div id="canvas" />' +
        '</div>';
});

it('should create figure on figure mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), FIGURES.CIRCLE);

    expect(dispatchMock.mock.calls[0][0].type).toBe(ADD_FIGURE);
});

it('should select a figure on mouse down on the figure', ()=> {
    mapDispatch.onFigureMouseDown('1', 'move');

    expect(dispatchMock.mock.calls[0][0].type).toBe(SELECT_FIGURE);
    expect(dispatchMock.mock.calls[0][0].id).toBe('1');
});

it('should start dragging on mouse down on canvas on move mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), 'move');

    expect(dispatchMock.mock.calls[0][0].type).toBe(START_DRAGGING);
});

it('should start dragging on mouse down on canvas on resize mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), 'resize');

    expect(dispatchMock.mock.calls[0][0].type).toBe(START_DRAGGING);
});

it('should deselect all figures on mouse click on empty canvas', ()=> {
    const emptyCanvasClick = {target: {localName: 'svg'}};

    mapDispatch.onCanvasClick(emptyCanvasClick, 'move');

    expect(dispatchMock.mock.calls[0][0].type).toBe(DESELECT_ALL_FIGURES);
});

it('should do nothing on mouse click on figure', ()=> {
    const emptyCanvasClick = {target: {localName: 'circle'}};

    mapDispatch.onCanvasClick(emptyCanvasClick, 'move');

    expect(dispatchMock.mock.calls.length).toBe(0);
});

it('should deselect a figure after finish moving', ()=> {
    const movingFigures = [{id: '1', selected: true}];

    mapDispatch.onCanvasMouseUp(movingFigures, 'move');

    expect(dispatchMock.mock.calls[0][0].type).toBe(DESELECT_ALL_FIGURES);
});

it('should do nothing after finish moving group of figures', ()=> {
    const movingFigures = [{id: '1', selected: true},
        {id: '2', selected: true}];

    mapDispatch.onCanvasMouseUp(movingFigures, 'move');

    expect(dispatchMock.mock.calls.length).toBe(0);
});

it('should do nothing on mouse move', ()=> {

    mapDispatch.onCanvasMouseDrag(createMouseEventWithCoords(), 'move');

    expect(dispatchMock.mock.calls.length).toBe(0);
});

it('should move figure on mouse drag on move mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), 'move');
    dispatchMock.mockClear();

    mapDispatch.onCanvasMouseDrag(createMouseEventWithCoords(), 'move');

    expect(dispatchMock.mock.calls[0][0].type).toBe(MOVE_FIGURE);
});

it('should resize figure on mouse drag on resize mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), 'resize');
    dispatchMock.mockClear();

    mapDispatch.onCanvasMouseDrag(createMouseEventWithCoords(), 'resize');

    expect(dispatchMock.mock.calls[0][0].type).toBe(RESIZE_FIGURE);
});


import {mapDispatchToProps} from './EditorConnector'
import {FIGURES, SELECT_FIGURE, DESELECT_ALL_FIGURES, ADD_FIGURE, START_DRAGGING,
    MOVE_FIGURE, RESIZE_FIGURE, CHANGE_FIGURE_SELECTION, CHANGE_MODE} from '../actions/figureActions'

let mapDispatch = {};
let dispatchMock = jest.fn();

function createMouseEventWithCoords(x = 1, y = 22) {
    return {
        pageX: x,
        pageY: y,
        target: {localName: 'svg'}
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

it('should deselect all selected figures on mouse down on the not selected figure', ()=> {
    mapDispatch.onFigureMouseDown('1', createMouseEventWithCoords(), 'move', [{id: '1', selected: false}]);

    expect(dispatchMock.mock.calls.map(a => a[0].type)).toContain(DESELECT_ALL_FIGURES);
});

it('should not deselect all selected figures on mouse down on the selected figure', ()=> {
    mapDispatch.onFigureMouseDown('1', createMouseEventWithCoords(), 'move', [{id: '1', selected: true}]);

    expect(dispatchMock.mock.calls.map(a => a[0].type)).not.toContain(DESELECT_ALL_FIGURES);
});

it('should select the figure on mouse down on the figure', ()=> {
    mapDispatch.onFigureMouseDown('1', createMouseEventWithCoords(), 'move', [{id: '1', selected: false}]);

    expect(dispatchMock.mock.calls.map(a => a[0].type)).toContain(CHANGE_FIGURE_SELECTION);
});

it('should deselect all figures on mouse down on empty canvas on not figure mode', ()=> {
    mapDispatch.onCanvasMouseDown('1', createMouseEventWithCoords(), 'resize');

    expect(dispatchMock.mock.calls[0][0].type).toBe(DESELECT_ALL_FIGURES);
});

it('should do nothing after finish moving group of figures', ()=> {
    const movingFigures = [{id: '1', selected: true},
        {id: '2', selected: true}];

    mapDispatch.onCanvasMouseUp(movingFigures, 'move');

    expect(dispatchMock.mock.calls.length).toBe(0);
});

it('should do nothing on mouse move', () => {

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

it('should set resize mode on mouse down on resize tool', ()=> {
    mapDispatch.onResizeToolMouseDown(createMouseEventWithCoords());

    expect(dispatchMock.mock.calls[0][0].type).toBe(CHANGE_MODE);
    expect(dispatchMock.mock.calls[0][0].mode).toBe('resize');
});

it('should start dragging on mouse down on resize tool', ()=> {
    mapDispatch.onResizeToolMouseDown(createMouseEventWithCoords());

    expect(dispatchMock.mock.calls.map(a => a[0].type)).toContain(START_DRAGGING);
});


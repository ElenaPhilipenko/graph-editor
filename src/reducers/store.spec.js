import figures from './store'
import {FigureActions, FIGURES, changeMode} from '../actions/figureActions'
import Figure from '../model/Figure'

function createSquare(x = 1, y = 1, size = 80) {
    return Figure.createFigure('square', x, y, size);
}

function createPolyline(x = 1, y = 1) {
    return Figure.createFigure('polyline', x, y);
}

let state = {};

function createEmptyState() {
    return {
        future: [],
        past: [],
        present: {
            figuresById: {},
            figuresOrder: [],
            selectedFigures: [],
            mode: '',
            moveStartX: 0,
            moveStartY: 0
        }
    }
}

beforeEach(()=> {
    state = createEmptyState();
});

it('should  add a square', () => {
    state.present.mode = FIGURES.SQUARE;

    const result = figures(state, FigureActions.addFigure('1', 1, 3));

    expect(result.present.figuresById['1']).toEqual(createSquare(1, 3))
});

it('should resize a square', () => {
    state.present.figuresById['1'] = createSquare(1, 33, 20);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 1;
    state.present.moveStartY = 1;

    const result = figures(state, FigureActions.resizeFigure(3, 1));

    expect(result.present.figuresById['1'].size.width).toEqual(22);
});

it('should add a point to a polyline', () => {
    state.present.figuresById['1'] = createPolyline(1, 33);
    state.present.selectedFigures.push('1');

    const result = figures(state, FigureActions.addPoint('1', 3, 1));

    expect(result.present.figuresById['1'].points).toEqual([{x: 1, y: 33}, {x: 3, y: 1}]);
});

it('should resize a square twice', () => {
    state.present.figuresById['1'] = createSquare(1, 33, 20);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 1;
    state.present.moveStartY = 1;

    let result = figures(state, FigureActions.resizeFigure(3, 1));
    result = figures(state, FigureActions.resizeFigure(4, 1));

    expect(result.present.figuresById['1'].size.width).toEqual(23);
});

it('should move a square', () => {
    state.present.figuresById['1'] = createSquare(100, 100);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 110;
    state.present.moveStartY = 110;

    const result = figures(state, FigureActions.moveFigure(150, 160));

    expect(result.present.figuresById['1'].x).toEqual(140);
    expect(result.present.figuresById['1'].y).toEqual(150);
});

it('should move all selected square', () => {
    state.present.figuresById['1'] = createSquare(100, 100);
    state.present.figuresById['2'] = createSquare(1, 1);
    state.present.selectedFigures.push('1');
    state.present.selectedFigures.push('2');
    state.present.moveStartX = 110;
    state.present.moveStartY = 110;

    const result = figures(state, FigureActions.moveFigure(150, 160));

    expect(result.present.figuresById['1'].x).toEqual(140);
    expect(result.present.figuresById['2'].x).toEqual(41);
    expect(result.present.figuresById['1'].y).toEqual(150);
    expect(result.present.figuresById['2'].y).toEqual(51);
});

it('should not move not selected figures', () => {
    state.present.figuresById['1'] = createSquare(100, 100);
    state.present.figuresById['2'] = createSquare(2, 2);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 110;
    state.present.moveStartY = 110;

    const result = figures(state, FigureActions.moveFigure(150, 160));

    expect(result.present.figuresById['2'].x).toEqual(2);
    expect(result.present.figuresById['2'].y).toEqual(2);
});

it('should  delete a figure', () => {
    state.present.figuresById['1'] = createSquare(1, 34);
    state.present.selectedFigures.push('1');

    const result = figures(state, FigureActions.deleteFigure());

    expect(Object.getOwnPropertyNames(result.present.figuresById).length).toBe(0);
    expect(result.present.selectedFigures.length).toBe(0);
});

it('should change mode', () => {
    const result = figures(state, changeMode(FIGURES.TRIANGLE));

    expect(result.present.mode).toBe(FIGURES.TRIANGLE);
});

it('should select a figure', ()=> {
    state.present.figuresById['1'] = createSquare();

    const result = figures(state, FigureActions.selectFigure('1'));

    expect(result.present.selectedFigures.indexOf('1')).toBeGreaterThan(-1);
});

it('should deselect all figures', ()=> {
    state.present.selectedFigures = ['1', '3', '4'];

    const result = figures(state, FigureActions.deselectAllFigures());

    expect(result.present.selectedFigures.length).toBe(0);
});

it('should change selection of a not selected figure', ()=> {
    state.present.figuresById['1'] = createSquare();
    state.present.selectedFigures = ['3'];

    const result = figures(state, FigureActions.changeFigureSelection('1'));

    expect(result.present.selectedFigures.indexOf('1')).toBeGreaterThan(-1);
});

it('should change selection of a selected figure', ()=> {
    state.present.figuresById['1'] = createSquare();
    state.present.selectedFigures = ['3', '1'];

    const result = figures(state, FigureActions.changeFigureSelection('1'));

    expect(result.present.selectedFigures.indexOf('1')).toBe(-1);
});

it('should keep order of creation', ()=> {
    state.present.mode = 'line';

    let result = figures(state, FigureActions.addFigure('2', 1, 1));
    result = figures(result, FigureActions.addFigure('3', 4, 4));

    expect(result.present.figuresOrder).toEqual(['2', '3']);
});

it('should send figure from middle to the front', ()=> {
    state.present.figuresOrder = ['1', '2', '3'];

    const result = figures(state, FigureActions.sendFigureFront('2'));

    expect(result.present.figuresOrder).toEqual(['2', '1', '3']);
});

it('should send figure from back to the front', ()=> {
    state.present.figuresOrder = ['1', '2', '3', '4'];

    const result = figures(state, FigureActions.sendFigureFront('4'));

    expect(result.present.figuresOrder).toEqual(['4', '1', '2', '3']);
});

it('should do nothing on send figure from front to the front', ()=> {
    state.present.figuresOrder = ['1', '2', '3', '4'];

    const result = figures(state, FigureActions.sendFigureFront('1'));

    expect(result.present.figuresOrder).toEqual(['1', '2', '3', '4']);
});

it('should send figure from middle to the back', ()=> {
    state.present.figuresOrder = ['1', '2', '3'];

    const result = figures(state, FigureActions.sendFigureBack('2'));

    expect(result.present.figuresOrder).toEqual(['1', '3', '2']);
});

it('should send figure from front to the back', ()=> {
    state.present.figuresOrder = ['1', '2', '3', '4'];

    const result = figures(state, FigureActions.sendFigureBack('1'));

    expect(result.present.figuresOrder).toEqual(['2', '3', '4', '1']);
});

it('should do nothing on send figure from back to the back', ()=> {
    state.present.figuresOrder = ['1', '2', '3', '4'];

    const result = figures(state, FigureActions.sendFigureBack('4'));

    expect(result.present.figuresOrder).toEqual(['1', '2', '3', '4']);
});

it('should remove delted figure from order', ()=> {
    state.present.figuresOrder = ['1', '2', '3', '4'];
    state.present.selectedFigures = ['3'];
    state.present.figuresById['1'] =createSquare();
    state.present.figuresById['2'] =createSquare();
    state.present.figuresById['3'] =createSquare();
    state.present.figuresById['4'] =createSquare();

    const result = figures(state, FigureActions.deleteFigure());

    expect(result.present.figuresOrder).toEqual(['1', '2', '4']);
});






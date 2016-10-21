import figures from './store'
import {FigureActions, FIGURES, changeMode} from '../actions/figureActions'

function createSquare(x = 1, y = 1, size = 80) {
    return {x, y, type: FIGURES.SQUARE, size, borderColor: 'black'};
}

let state = {};

beforeEach(()=> {
    state = {
        future: [],
        past: [],
        present: {
            figuresById: {},
            selectedFigures: [],
            mode: '',
            moveStartX: 0,
            moveStartY: 0
        }
    }
});

it('should  add a square', () => {
    state.present.mode = FIGURES.SQUARE;

    const result = figures(state, FigureActions.addFigure('1', 1, 3));

    expect(result.present.figuresById['1']).toEqual(createSquare(1, 3))
});

it('should resize a square', () => {
    state.present.figuresById["1"] = createSquare(1, 33, 20);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 1;
    state.present.moveStartY = 1;

    const result = figures(state, FigureActions.resizeFigure(3, 1));

    expect(result.present.figuresById['1'].size).toEqual(22);
});

it('should move a square', () => {
    state.present.figuresById["1"] = createSquare(100, 100);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 110;
    state.present.moveStartY = 110;

    const result = figures(state, FigureActions.moveFigure(150, 160));

    expect(result.present.figuresById['1'].x).toEqual(140);
    expect(result.present.figuresById['1'].y).toEqual(150);
});

it('should not move not selected figures', () => {
    state.present.figuresById["1"] = createSquare(100, 100);
    state.present.figuresById["2"] = createSquare(2, 2);
    state.present.selectedFigures.push('1');
    state.present.moveStartX = 110;
    state.present.moveStartY = 110;

    const result = figures(state, FigureActions.moveFigure(150, 160));

    expect(result.present.figuresById['2'].x).toEqual(2);
    expect(result.present.figuresById['2'].y).toEqual(2);
});

it('should  delete a figure', () => {
    state.present.figuresById["1"] = createSquare(1, 34);
    state.present.selectedFigures.push("1");

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

    expect(result.present.selectedFigures.indexOf("1")).toBeGreaterThan(-1);
});

it('should deselect all figures', ()=> {
    state.present.selectedFigures = ["1", "3", "4"];

    const result = figures(state, FigureActions.deselectAllFigures());

    expect(result.present.selectedFigures.length).toBe(0);
});

it('should change selection of a not selected figure', ()=> {
    state.present.figuresById["1"] = createSquare();
    state.present.selectedFigures = ["3"];

    const result = figures(state, FigureActions.changeFigureSelection("1"));

    expect(result.present.selectedFigures.indexOf("1")).toBeGreaterThan(-1);
});

it('should change selection of a selected figure', ()=> {
    state.present.figuresById["1"] = createSquare();
    state.present.selectedFigures = ["3", "1"];

    const result = figures(state, FigureActions.changeFigureSelection("1"));

    expect(result.present.selectedFigures.indexOf("1")).toBe(-1);
});






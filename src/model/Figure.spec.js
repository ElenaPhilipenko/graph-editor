import {FIGURES} from '../actions/figureActions'
import {PolyFigure} from './Figure'


it('PolyFigure should calculate width', ()=> {
    const line = new PolyFigure(FIGURES.POLYLINE, 'black', [{x: 0, y: 0},
        {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}
    ]);

    const size = line.size;

    expect(size.width).toBe(1);
});

it('PolyFigure should calculate height', ()=> {
    const line = new PolyFigure(FIGURES.POLYLINE, 'black', [{x: 0, y: 0},
        {x: 23, y: 22}, {x: 25, y: 11}, {x: 111, y: 55}
    ]);

    const size = line.size;

    expect(size.height).toBe(55);
});

it(' should move a polyline by x', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}, {x: 25, y: 11}, {x: 111, y: 55}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.move(23, 0);

    expect(line.points[0].x).toBe(23);
});

it(' should move a polyline by y', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}, {x: 25, y: 11}, {x: 111, y: 55}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.move(23, 44);

    expect(line.points[0].y).toBe(44);
});

it(' should not move a polyline by y', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}, {x: 25, y: 11}, {x: 111, y: 55}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.move(23, 0);

    expect(line.points[0].y).toBe(0);
});

it('should not move after resizing a polyline', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(2);

    expect(line.points[0].y).toBe(0);
});

it('should have negative width if resizing after 0-width', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(-25);

    expect(line.size.width).toBeLessThan(0);
});

it('should have negative height if resizing after 0-height', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(-25);

    expect(line.size.height).toBeLessThan(0);
});

it('should have negative height if resizing after 0-height', ()=> {
    const points = [{x: 0, y: 0}, {x: 23, y: 22}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(-25);

    expect(line.size.height).toBeLessThan(0);
});

it('should not flip horizontally after negative resizing', ()=> {
    const points = [{x: 0, y: 0}, {x: 2, y: 2}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(-2).resize(-3).resize(5);

    expect(line.size.width).toBeCloseTo(2, 2);
});

it('should not flip vertically after negative resizing', ()=> {
    const points = [{x: 0, y: 2}, {x: 2, y: 10}];
    let line = new PolyFigure(FIGURES.POLYLINE, 'black', points);

    line = line.resize(-9).resize(3);

    expect(line.points[0].y).toBeGreaterThan(0);
});
import filter from './actionUndoFilter'
import {FigureActions} from '../actions/figureActions'

it('should use skip action when skip is not defined', () => {
    const action = {};

    const shouldUse = filter(action, {a: 1}, {a: 2});

    expect(shouldUse).toBe(true);
});

it('should not skip action when skip is "false"', () => {
    const shouldUse = filter({skip: false}, {a: 1}, {a: 2});

    expect(shouldUse).toBe(true);
});

it('should skip action if skip is "true"', () => {
    const shouldUse = filter({skip: true}, {a:1}, {a:2});

    expect(shouldUse).toBe(false);
});

it('should skip action if state has not changed', () => {
    const current = {a: 2, b: {c: 3}};
    const prev = {a: 2, b: {c: 3}};

    const shouldUse = filter(FigureActions.moveFigure("1"), current, prev);

    expect(shouldUse).toBe(false);
});


it('should not skip action if state has changed', () => {
    const current = {a: 2, b: {c: 3}};
    const prev = {a: 2, b: {c: 1133}};

    const shouldUse = filter(FigureActions.deleteFigure("1"), current, prev);

    expect(shouldUse).toBe(true);
});







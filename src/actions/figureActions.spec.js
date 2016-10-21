import {FIGURES} from './figureActions'

it("should recognize circle as a figure", () => {
    expect(FIGURES.isFigure('circle')).toBe(true)
});

it("should not recognize table as a figure", () => {
    expect(FIGURES.isFigure('table')).toBe(false)
});
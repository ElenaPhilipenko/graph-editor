import {FIGURES} from '../actions/figureActions'

class Figure {
    constructor(type, borderColor) {
        this.type = type;
        this.borderColor = borderColor;
    }

    static createFigure(type, x, y, size = 80, color = 'red', borderColor = 'black') {
        if (type === FIGURES.POLYLINE) {
            return new PolyFigure(type, borderColor, [{x, y}]);
        }
        return new SymmetricalFigure(type, x, y, size, color, borderColor);
    }

}

class SymmetricalFigure extends Figure {
    constructor(type, x, y, size, color, borderColor) {
        super(type, borderColor);
        this.x = x;
        this.y = y;
        this.side = size;
        this.color = color;
    }

    move(distanceX, distanceY) {
        return new SymmetricalFigure(this.type,
            this.x + distanceX,
            this.y + distanceY,
            this.side,
            this.color,
            this.borderColor)
    }

    resize(sizeChange) {
        return new SymmetricalFigure(this.type,
            this.x,
            this.y,
            this.side + sizeChange,
            this.color,
            this.borderColor);
    }

    get size() {
        return {width: this.side, height: this.side}
    }
}

export class PolyFigure extends Figure {
    constructor(type, borderColor, points, width, height) {
        super(type, borderColor);
        this.points = points;
        this.width = width;
        this.height = height;
    }

    addPoint(x, y) {
        return new PolyFigure(this.type, this.borderColor, [...this.points, {x, y}])
    }

    move(distanceX, distanceY) {
        return new PolyFigure(this.type, this.borderColor,
            this.points.map(p => {
                    return {x: (p.x + distanceX), y: (p.y + distanceY)}
                }
            ))
    }

    calculateSize() {
        let minY = this.points[0].y;
        let maxY = minY;
        let minX = this.points[0].x;
        let maxX = minX;
        this.points.forEach(p => {
            if (p.x > maxX) {
                maxX = p.x
            }
            if (p.x < minX) {
                minX = p.x;
            }
            if (p.y > maxY) {
                maxY = p.y
            }
            if (p.y < minY) {
                minY = p.y;
            }
        });
        return {height: maxY - minY, width: maxX - minX}
    }

    get size() {
        if (this.width === undefined || this.height === undefined) {
            return this.calculateSize();
        }
        return {width: this.width, height: this.height};
    }

    resize(sizeChangeX) {
        if (sizeChangeX === 0) {
            return this;
        }
        const size = this.size;

        const expectedWidth = sizeChangeX + size.width;
        const expectedHeight = sizeChangeX + size.height;

        if (expectedWidth <= 0 || expectedHeight <= 0) {
            return new PolyFigure(this.type, this.borderColor, this.points, expectedWidth, expectedHeight);
        }

        const scaleX = expectedWidth / this.calculateSize().width;
        const scaledPoints = scalePoints(this.points, scaleX, scaleX);

        const distanceX = -scaledPoints[0].x + this.points[0].x;
        const distanceY = -scaledPoints[0].y + this.points[0].y;
        return new PolyFigure(this.type, this.borderColor, scaledPoints)
            .move(distanceX, distanceY);
    }
}

const scalePoints = function (points, xScale, yScale) {
    return points.map(p => {
        return {
            x: Math.abs(p.x * xScale),
            y: Math.abs(p.y * yScale)
        };
    });
};

export default Figure;
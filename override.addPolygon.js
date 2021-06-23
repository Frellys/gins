function ovrPolygon({ points }) {
    this.points = (Array.isArray(points) && points.length >= 4) ? points : control2.handler.line.geometry.components.map(el => [el.x, el.y]);
    this.lines = Array.from(new Array(this.points.length - 1).keys(), (p, pdx) => [this.points[pdx], this.points[pdx + 1]]);
    /**
     * returns whether polygon contains intersecting lines
     * @param {number[][]} lines
     * @returns {boolean}
     */
    this.selfIntersecting = function (lines) {
        let flag = false;
        outer: for (let l1dx = 0; l1dx < lines.length; l1dx++) {
            for (let l2dx = 0; l2dx <= (l1dx - 2); l2dx++) {
                let [x1, y1] = lines[l1dx][0];
                let [x2, y2] = lines[l1dx][1];
                let [x3, y3] = lines[l2dx][0];
                let [x4, y4] = lines[l2dx][1];
                let dy = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
                if (dy) {
                    let dx = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
                    let b1x = Math.min(x1, x2) <= dx && Math.max(x1, x2) >= dx;
                    let b1y = Math.min(y1, y2) <= dy && Math.max(y1, y2) >= dy;
                    let b2x = Math.min(x3, x4) <= dx && Math.max(x3, x4) >= dx;
                    let b2y = Math.min(y3, y4) <= dy && Math.max(y3, y4) >= dy;
                    if (b1x && b1y && b2x && b2y) {
                        flag = true;
                        break outer;
                    }
                }
            }
        }
        return flag;
    }(this.lines);
    /**
     * checks if polygon is correct
     * @param {number[][]} lines
     * @param {boolean} selfIntersecting
     * @returns {boolean}
     */
    this.isCorrect = function (lines, selfIntersecting) {
        return (lines.length >= 3) && (selfIntersecting == false);
    }(this.lines, this.selfIntersecting);
};
/**
 * test case
 */
if (window.inDevelopment = true) {
    let poly = new ovrPolygon({
        points: [
            [0, 0],
            [4, 4],
            [4, 0],
            [0, 4]
        ]
    });
    console.log(poly);
}
const r = require("raylib");

function setup() {
    const HEIGHT = 800;
    const WIDTH = 800;

    const data = randomData();

    const gap = WIDTH / (data.length + 1);
    const maxValue = findMax(data);
    const unitHeight = getUnitHeight(HEIGHT, maxValue);

    const world = { HEIGHT, WIDTH, data, maxValue, unitHeight, gap };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Average");
    r.SetTargetFPS(60);

    return world;
}

function randomData() {
    const data = [];
    for (let i = 0; i < 200; i++) {
        data.push(Math.floor(100 * Math.random()));
    }
    return data;
}

function findMax(arr) {
    let max = -Infinity;
    for (const element of arr) {
        max = Math.max(element, max);
    }

    return max;
}

function getUnitHeight(HEIGHT, maxValue) {
    return (HEIGHT * 0.9) / maxValue;
}

function isPeakPoint(w, i) {
    return w.data[i - 1] < w.data[i] && w.data[i] > w.data[i + 1];
}

function getPeakPoints(w) {
    const peakPoints = [];
    for (let i = 0; i < w.data.length; i++) {
        if (isPeakPoint(w, i)) {
            peakPoints.push([i * w.gap, calcCordinateY(w, i)]);
        }
    }
    return peakPoints;
}

function calcCordinateY(w, i) {
    return w.HEIGHT - w.data[i] * w.unitHeight;
}

function drawPeakPoints(w) {
    const peakPoints = getPeakPoints(w);

    for (let i = 0; i < peakPoints.length; i++) {
        r.DrawCircle(peakPoints[i][0], peakPoints[i][1], 5, r.RED);
    }
}

function updateCoordinate(w, p) {
    p.y1 = p.y2;
    p.x1 += w.gap;
    p.x2 += w.gap;
}

function drawLineGraph(w) {
    const p = {
        x1: 0,
        y1: calcCordinateY(w, 0),
        x2: w.gap,
        y2: 0,
    };
    for (let i = 1; i < w.data.length; i++) {
        p.y2 = calcCordinateY(w, i);

        r.DrawLine(p.x1, p.y1, p.x2, p.y2, r.BLACK);

        updateCoordinate(w, p);
    }
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    drawLineGraph(w);
    drawPeakPoints(w);

    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();

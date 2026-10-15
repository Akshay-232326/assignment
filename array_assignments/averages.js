const r = require("raylib");

function setup() {
    const HEIGHT = 800;
    const WIDTH = 800;
    const data = [];
    for (let i = 0; i < 400; i++) {
        data.push(Math.floor(100 * Math.random()));
    }
    const maxValue = findMax(data);
    const unitHeight = getUnitHeight(HEIGHT, maxValue);
    const gap = 1;
    const barWidth = 1;

    const world = { HEIGHT, WIDTH, data, maxValue, unitHeight, gap, barWidth };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Average");
    r.SetTargetFPS(60);

    return world;
}

function findMax(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}

function getUnitHeight(HEIGHT, maxValue) {
    return (HEIGHT * 0.9) / maxValue;
}

function getAverage(w) {
    let sum = 0;

    for (let i = 0; i < w.data.length; i++) {
        sum += w.data[i] * w.unitHeight;
    }

    return sum / w.data.length;
}

function drawAverageLine(w) {
    r.DrawLine(
        0,
        w.HEIGHT - getAverage(w),
        w.WIDTH,
        w.HEIGHT - getAverage(w),
        r.RED,
    );
}

function drawBar(w) {
    for (let i = 0; i < w.data.length; i++) {
        const height = w.data[i] * w.unitHeight;
        const x = i * (w.barWidth + w.gap);
        const y = w.HEIGHT - height;

        r.DrawRectangle(x, y, w.barWidth, height, r.DARKBLUE);
    }
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    drawBar(w);
    drawAverageLine(w);

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

const r = require("raylib");

function setup() {
    const HEIGHT = 500;
    const WIDTH = 800;

    const noOfCircles = 400;

    const x1 = 0;
    const x2 = WIDTH;
    const xPoints = createPoints(x1, x2, noOfCircles);

    const y1 = 0;
    const y2 = HEIGHT;
    const yPoints = createPoints(y1, y2, noOfCircles);

    const circle = {
        x: xPoints,
        y: yPoints,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Random_Circles");
    r.SetTargetFPS(60);

    world = { HEIGHT, WIDTH, circle, noOfCircles };
    return world;
}

function createPoints(stPoint, endPoint, noOfPoints) {
    const points = [];
    for (let i = 0; i < noOfPoints; i++) {
        points.push(stPoint + endPoint * Math.random());
    }

    return points;
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    for (let i = 0; i < w.noOfCircles; i++) {
        r.DrawCircle(w.circle.x[i], w.circle.y[i], 5, r.WHITE);
    }

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();

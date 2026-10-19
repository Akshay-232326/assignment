const r = require("raylib");

function setup() {
    const HEIGHT = 500;
    const WIDTH = 800;
    const xPoints = [];
    const x1 = 100;
    const x2 = 400;
    for (let i = 0; i < 70; i++) {
        xPoints.push(x1 + x2 * Math.random());
    }

    const rec = {
        x: xPoints,
        y: 0,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "RandomLines");
    r.SetTargetFPS(60);

    world = { HEIGHT, WIDTH, rec };
    return world;
}

function draw(w) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (let i = 0; i < 70; i++) {
        r.DrawRectangle(w.rec.x[i], w.rec.y, 1, w.HEIGHT, r.WHITE);
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

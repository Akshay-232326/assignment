const r = require("raylib");

function setup() {
    const HEIGHT = 500;
    const WIDTH = 800;
    const xPoints = [];
    for (let i = 0; i < 100; i++) {
        xPoints.push(WIDTH * Math.random());
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

    for (let i = 0; i < 100; i++) {
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

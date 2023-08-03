// The WebGL context
var gl;
var canvas;

var angle;
var angularSpeed;

async function setup() {

    initializeContext();
    
    // createData();

    // createBuffers();

    // await loadShaders();
    // compileShaders();

    // createVertexArrayObjects();

    // angle = 0.0;
    // angularSpeed = 0.0;

    requestAnimationFrame(render);
}

window.onload = setup;

function initializeContext() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" ); 
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );

	gl.clearColor( 0.357, 0.561, 0.945, 1.0 ); // light blue background color
    
    // Enable depth testing.
    gl.enable(gl.DEPTH_TEST);

    logMessage("WebGL initialized.");
}

// Draws the vertex data.
function render(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog);

    updateAngle(timestamp);

    setUniformVariables();
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
    
    requestAnimationFrame(render);
}

// Logging
function logMessage(message) {
    console.log(`[msg]: ${message}\n`);
}

function logError(message) {
    console.log(`[err]: ${message}\n`);
}

function logObject(obj) {
    let message = JSON.stringify(obj, null, 2);
    console.log(`[obj]:\n${message}\n\n`);
}
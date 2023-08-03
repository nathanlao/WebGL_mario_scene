// The WebGL context
var gl;
var canvas;

var angle;
var angularSpeed;

// Shader handles
var vs;
var fs;
var prog;

// Shader sources
var vs_source;
var fs_source;

async function setup() {

    initializeContext();
    
    // createData();

    // createBuffers();

    await loadShaders();
    compileShaders();

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

    // updateAngle(timestamp);

    // setUniformVariables();
    // gl.bindVertexArray(vao);
    // gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);
    
    requestAnimationFrame(render);
}

function loadShaderFile(url) {
    return fetch(url).then(response => response.text());
}

// Loads the shader data from the files.
async function loadShaders() {
    const shaderURLs = [
        './main.vert',
        './main.frag'
    ];

    // Load shader files.
    const shader_files = await Promise.all(shaderURLs.map(loadShaderFile));

    vs_source = shader_files[0];
    fs_source = shader_files[1];

    logMessage("Shader files loaded.")
}

// Compile the GLSL shader stages and combine them
// into a shader program.
function compileShaders() {
    // Create a shader of type VERTEX_SHADER.
    vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vs_source);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        logError(gl.getShaderInfoLog(vs));
        gl.deleteShader(vs);
    }

    // Repeat for the fragment shader.
    fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fs_source);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        logError(gl.getShaderInfoLog(fs));
        gl.deleteShader(fs);
    }

    // Create a shader program.
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);

    // Link the program
    gl.linkProgram(prog);

    // Check the LINK_STATUS using getProgramParameter
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        logError(gl.getProgramInfoLog(prog));
    }

    logMessage("Shader program compiled successfully.");
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
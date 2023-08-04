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

let platformVertices = [];
let platformIndices = [];
let platformTextureCoordinates = [];

let platformPositionBuffer;
let platformIndexBuffer;
let platformTextureCoordBuffer;

let platformVAO;

function createPlatformData() {
    // Vertices for the platform
    platformVertices = [
        vec3(-0.5, -5.5,  0.5), 
        vec3(-0.5, -4.5,  0.5), 
        vec3( 0.5, -4.5,  0.5), 
        vec3( 0.5, -5.5,  0.5), 
        vec3(-0.5, -5.5, -0.5), 
        vec3(-0.5, -4.5, -0.5), 
        vec3( 0.5, -4.5, -0.5), 
        vec3( 0.5, -5.5, -0.5)  
    ];

    // Indices for the cuboid
    platformIndices = [
        0, 1, 2,  0, 2, 3, // front face
        3, 2, 6,  3, 6, 7, // right face
        7, 6, 5,  7, 5, 4, // back face
        4, 5, 1,  4, 1, 0, // left face
        1, 5, 6,  1, 6, 2, // top face
        4, 0, 3,  4, 3, 7  // bottom face
    ];

    platformTextureCoordinates = [
        // Front face
        0.0, 0.0,
        3.0, 0.0,
        3.0, 1.0,
        0.0, 1.0,
        // Back face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Top face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Bottom face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Right face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];
    
}

function createPlatformBuffers() {
    platformPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(platformVertices), gl.STATIC_DRAW);

    platformIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, platformIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(platformIndices), gl.STATIC_DRAW);

    platformTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(platformTextureCoordinates), gl.STATIC_DRAW);

    logMessage("Created buffers.");
}


function createPlatformVertexArrayObjects() {
    platformVAO = gl.createVertexArray();
    gl.bindVertexArray(platformVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, platformPositionBuffer);
    var vPosition = gl.getAttribLocation(prog, 'vPosition');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, platformTextureCoordBuffer);
    var aTextureCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTextureCoord);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, platformIndexBuffer);

    gl.bindVertexArray(null);

    logMessage("Created vertex array objects.");
}


function setPlatformUniformVariables() { 
    const identityMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    // var angle = performance.now() / 2000; 

    var model = rotate(0, [0.0, 1.0, 0.0]);

    // Scale factors for x, y, and z
    var scaleX = 1.5;
    var scaleY = 0.1;
    var scaleZ = 1.0; 

    model = mult(scalem(scaleX, scaleY, scaleZ), model); // Scaling transformation

    var eye = vec3(0.0, 1, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, mult(view, model));

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));

    // uTexture
    let uTextureLocation = gl.getUniformLocation(prog, 'uTexture');
    gl.uniform1i(uTextureLocation, 0);
}

let platformTexture;

async function setup() {

    initializeContext();
    
    // 1.
    createPlatformData();
    // 2. 
    createPlatformBuffers();

    // 3. Load texture image
    platformTexture = gl.createTexture();
    let platformImage = new Image();
    platformImage.onload = function() { 
        handleTextureLoaded(platformImage, platformTexture); 
    }
    platformImage.src = "texture.png"; // texture image

    await loadShaders();
    compileShaders();

    // 4.
    createPlatformVertexArrayObjects();

    // angle = 0.0;
    // angularSpeed = 0.0;

    requestAnimationFrame(render);
}

window.onload = setup;

// Draws the vertex data.
function render(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog);

    // updateAngle(timestamp);

    // 4. 
    setPlatformUniformVariables();
    
    
    // 5. 
    gl.bindVertexArray(platformVAO);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, platformTexture);

    gl.drawElements(gl.TRIANGLES, platformIndices.length, gl.UNSIGNED_SHORT, 0);
    
    requestAnimationFrame(render);
}

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

// Compile the GLSL shader stages and combine them into a shader program.
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

// Create the texture from the image
function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
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
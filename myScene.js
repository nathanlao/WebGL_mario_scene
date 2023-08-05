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
let platformNormals;
let platformNormalBuffer;

let brickVertices, brickIndices, brickTexCoords;
let brickPositionBuffer, brickTexCoordBuffer, brickIndexBuffer;
let brickVAO;
let brickNormals;
let brickNormalBuffer;

var lightAngle = 0.0;
var lightPosition = vec3(2.0, 2.0, 2.0);

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

    platformNormals = [
        // Front face
        vec3(0, 0, 1),
        vec3(0, 0, 1),
        vec3(0, 0, 1),
        vec3(0, 0, 1),
    
        // Back face
        vec3(0, 0, -1),
        vec3(0, 0, -1),
        vec3(0, 0, -1),
        vec3(0, 0, -1),
    
        // Top face 
        vec3(0, -1, 0),
        vec3(0, -1, 0),
        vec3(0, -1, 0),
        vec3(0, -1, 0),
    
        // Bottom face
        vec3(0, 1, 0),
        vec3(0, 1, 0),
        vec3(0, 1, 0),
        vec3(0, 1, 0),
    
        // Right face
        vec3(1, 0, 0),
        vec3(1, 0, 0),
        vec3(1, 0, 0),
        vec3(1, 0, 0),
    
        // Left face
        vec3(-1, 0, 0),
        vec3(-1, 0, 0),
        vec3(-1, 0, 0),
        vec3(-1, 0, 0)
    ];
    
}

function createBrickData() {
    // Vertices for the brick
    brickVertices = [
       // Front
        vec3(-0.5, 2,  0.5),
        vec3(-0.5,  3,  0.5),
        vec3(0.5,  3,  0.5),
        vec3(0.5, 2,  0.5),
        // Back
        vec3(-0.5, 2, -0.5),
        vec3(-0.5,  3, -0.5),
        vec3(0.5,  3, -0.5),
        vec3(0.5, 2, -0.5),
        // Right
        vec3(0.5, 2,  0.5),
        vec3(0.5,  3,  0.5),
        vec3(0.5,  3, -0.5),
        vec3(0.5, 2, -0.5),
        // Left
        vec3(-0.5, 2,  0.5),
        vec3(-0.5,  3,  0.5),
        vec3(-0.5,  3, -0.5),
        vec3(-0.5, 2, -0.5),
        // Top
        vec3(-0.5,  3,  0.5),
        vec3(-0.5,  3, -0.5),
        vec3(0.5,  3, -0.5),
        vec3(0.5,  3,  0.5),
        // Bottom
        vec3(-0.5, 2,  0.5),
        vec3(-0.5, 2, -0.5),
        vec3(0.5, 2, -0.5),
        vec3(0.5, 2,  0.5),
    ];

    // Indices for the brick
    brickIndices = [
       // Front
        0, 1, 2,
        0, 2, 3,

        // Back
        4, 5, 6,
        4, 6, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Left
        12, 13, 14,
        12, 14, 15,

        // Top
        16, 17, 18,
        16, 18, 19,

        // Bottom
        20, 21, 22,
        20, 22, 23
    ];

    // Texture coordinates for the brick
    brickTexCoords = [
         // Front
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Back
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Right
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Left
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Top
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Bottom
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),
    ];

    brickNormals = [
        // Front
        vec3(0, 0, 1),
        vec3(0, 0, 1),
        vec3(0, 0, 1),
        vec3(0, 0, 1),

        // Back
        vec3(0, 0, -1),
        vec3(0, 0, -1),
        vec3(0, 0, -1),
        vec3(0, 0, -1),

        // Right
        vec3(1, 0, 0),
        vec3(1, 0, 0),
        vec3(1, 0, 0),
        vec3(1, 0, 0),

        // Left
        vec3(-1, 0, 0),
        vec3(-1, 0, 0),
        vec3(-1, 0, 0),
        vec3(-1, 0, 0),

        // Top
        vec3(0, 1, 0),
        vec3(0, 1, 0),
        vec3(0, 1, 0),
        vec3(0, 1, 0),

        // Bottom
        vec3(0, -1, 0),
        vec3(0, -1, 0),
        vec3(0, -1, 0),
        vec3(0, -1, 0),
    ];
}

function createPlatformBuffers() {
    platformPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(platformVertices), gl.STATIC_DRAW);

    platformIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, platformIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(platformIndices), gl.STATIC_DRAW);

    platformNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(platformNormals), gl.STATIC_DRAW);

    platformTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(platformTextureCoordinates), gl.STATIC_DRAW);

    logMessage("Created buffers.");
}

function createBrickBuffers() {
    brickPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, brickPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(brickVertices), gl.STATIC_DRAW);

    brickTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, brickTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(brickTexCoords), gl.STATIC_DRAW);

    brickNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, brickNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(brickNormals), gl.STATIC_DRAW);

    brickIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, brickIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(brickIndices), gl.STATIC_DRAW);
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

    gl.bindBuffer(gl.ARRAY_BUFFER, platformNormalBuffer);
    var vNormal = gl.getAttribLocation(prog, 'vNormal');
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, platformIndexBuffer);

    gl.bindVertexArray(null);

    logMessage("Created vertex array objects.");
}

function createBrickVertexArrayObjects() {
    brickVAO = gl.createVertexArray();
    gl.bindVertexArray(brickVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, brickPositionBuffer);
    var vPosition = gl.getAttribLocation(prog, 'vPosition');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, brickTexCoordBuffer);
    var vTexCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.bindBuffer(gl.ARRAY_BUFFER, brickNormalBuffer);
    var vNormal = gl.getAttribLocation(prog, 'vNormal');
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, brickIndexBuffer);

    gl.bindVertexArray(null);
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
    var scaleX = 2.5;
    var scaleY = 0.1;
    var scaleZ = 1.5; 

    model = mult(scalem(scaleX, scaleY, scaleZ), model); // Scaling transformation

    var eye = vec3(2, 2, 2);
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

function setBrickUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Scale factors
    var scaleX = 0.2;
    var scaleY = 0.2;
    var scaleZ = 0.2;

    model = mult(scalem(scaleX, scaleY, scaleZ), model); // Scaling transformation
    model = mult(translate(1.0, 1.0, 1.0), model); // Translation transformation

    var eye = vec3(2, 2, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);
    var modelView = mult(view, model); // Model-view matrix for the Phong model

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, mult(view, model));

    // Normal matrix for the Phong model
    var normalMatrix = [
        vec3(modelView[0][0], modelView[0][1], modelView[0][2]),
        vec3(modelView[1][0], modelView[1][1], modelView[1][2]),
        vec3(modelView[2][0], modelView[2][1], modelView[2][2])
    ];

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));

    // Uniform variables for the Phong model
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    // Lighting properties
    gl.uniform3fv(gl.getUniformLocation(prog, "uLightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightAmbient"), flatten(vec4(0.8, 0.8, 0.8, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightDiffuse"), flatten(vec4(0.6, 0.6, 0.6, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightSpecular"), flatten(vec4(1.0, 1.0, 1.0, 1.0)));

    // Material properties for a yellowish brick
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialAmbient"), flatten(vec4(0.6, 0.6, 0.1, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialDiffuse"), flatten(vec4(1.0, 1.0, 0.2, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialSpecular"), flatten(vec4(0.5, 0.5, 0.1, 1.0)));
    gl.uniform1f(gl.getUniformLocation(prog, "uMaterialShininess"), 10.0);
}

var lastTime = Date.now();

function updateLightAnimate() {
    // Time elapsed since the last frame
    var now = Date.now();
    var elapsed = now - lastTime;
    lastTime = now;

    // Light makes one full rotation every 10 secs
    lightAngle += (360.0 / 10.0) * (elapsed / 1000.0); 

    var angleInRadians = lightAngle * Math.PI / 180.0;

    // New light position
    var lightRadius = 5.0;
    var lightZ = 2.0 + 1.0 * Math.sin(angleInRadians); 
    lightPosition = vec3(lightRadius * Math.cos(angleInRadians), lightRadius * Math.sin(angleInRadians), lightZ);

}

let platformTexture;
let brickTexture;

async function setup() {

    initializeContext();
    
    // 1.
    createPlatformData();
    createBrickData();

    // 2. 
    createPlatformBuffers();
    createBrickBuffers();

    // 3. Load texture image
    platformTexture = gl.createTexture();
    let platformImage = new Image();
    platformImage.onload = function() { 
        handleTextureLoaded(platformImage, platformTexture); 
    }
    platformImage.src = "./textureImages/texture.png"; // platform texture image

    brickTexture = gl.createTexture();
    let brickImage = new Image();
    brickImage.onload = function() { 
        handleTextureLoaded(brickImage, brickTexture); 
    }
    brickImage.src = "./textureImages/block.png"; // brick texture image


    await loadShaders();
    compileShaders();

    // 4.
    createPlatformVertexArrayObjects();
    createBrickVertexArrayObjects();

    requestAnimationFrame(render);
}

window.onload = setup;

// Draws the vertex data.
function render(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog);

    // updateAngle(timestamp);
    updateLightAnimate();

    // 4. 
    setPlatformUniformVariables();
    gl.bindVertexArray(platformVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, platformTexture);
    gl.drawElements(gl.TRIANGLES, platformIndices.length, gl.UNSIGNED_SHORT, 0);

    setBrickUniformVariables();
    gl.bindVertexArray(brickVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.drawElements(gl.TRIANGLES, brickIndices.length, gl.UNSIGNED_SHORT, 0);

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
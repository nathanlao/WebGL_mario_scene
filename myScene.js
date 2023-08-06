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

let headData = {};
let headVertexBuffer, headNormalBuffer, headTexCoordsBuffer, headIndexBuffer;
let headVAO;

let bodyData = {};
let bodyVertexBuffer, bodyNormalBuffer, bodyTexCoordsBuffer, bodyIndexBuffer;
let bodyVAO;

let armData = {};
let armVertexBuffer, armNormalBuffer, armTexCoordsBuffer, armIndexBuffer;
let armVAO;

let lightAngle = 0.0;
let lightPosition = vec3(2.0, 2.0, 2.0);

let rotationX = 0.0;
let rotationY = 0.0;
let rotationZ = 0.0;

let headRotationAngleX = -50.0;
let headRotationAngleY = 100.0;
let headRotationAngleZ = 0.0;

let bodyRotationAngleX = 0.0;
let bodyRotationAngleY = 30.0;
let bodyRotationAngleZ = 0.0;

let leftArmRotationAngleX = 0.0;
let leftArmRotationAngleY = 0.0;
let leftArmRotationAngleZ = 0.0;

let rightArmRotationAngleX = 0.0;
let rightArmRotationAngleY = 0.0;
let rightArmRotationAngleZ = 0.0;

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
        vec2(1.0, 1.0),
        vec2(1.0, 0.0),
        vec2(0.0, 0.0),
        vec2(0.0, 1.0),

        // Right
        vec2(0.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),

        // Left
        vec2(1.0, 1.0),
        vec2(1.0, 0.0),
        vec2(0.0, 0.0),
        vec2(0.0, 1.0),

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

// Mario Head
function createHeadData() {
    headData = createSphereData(0.2); // radius of 0.2 for Mario's head
}

function createSphereData(radius) {
    var sphereData = {
        vertices: [],
        normals: [],
        texCoords: []
    };

    var latitudeBands = 30;
    var longitudeBands = 30;

    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            
            var u = (longNumber / longitudeBands);
            var v = (latNumber / latitudeBands);

            sphereData.normals.push(x, y, z);
            sphereData.texCoords.push(u, v);
            sphereData.vertices.push(radius * x, radius * y, radius * z);
        }
    }

    // Creating sphere's indices
    sphereData.indices = [];
    for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            sphereData.indices.push(first, second, first + 1);
            sphereData.indices.push(second, second + 1, first + 1);
        }
    }

    return sphereData;
}

// Mario body
function createBodyData() {
    bodyData = createCylinderData(0.15, 0.3);  // Radius of 0.15 and height of 0.3 for Mario's body
}

function createCylinderData(radius, height) {
    var cylinderData = {
        vertices: [],
        normals: [],
        texCoords: [],
        indices: []
    };

    var slices = 30;

    for (var i = 0; i <= slices; i++) {
        var theta = i * 2 * Math.PI / slices;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        var x = cosTheta;
        var z = sinTheta;
        var u = i / slices;

        // Top circle
        cylinderData.vertices.push(radius * x, height / 2, radius * z);
        cylinderData.normals.push(x, 0, z);
        cylinderData.texCoords.push(u, 0);

        // Bottom circle
        cylinderData.vertices.push(radius * x, -height / 2, radius * z);
        cylinderData.normals.push(x, 0, z);
        cylinderData.texCoords.push(u, 1);
    }

    // Creating the cylinder's indices
    for (i = 0; i < slices; i++) {
        var top1 = i * 2;
        var top2 = (i + 1) * 2;
        var bottom1 = (i * 2) + 1;
        var bottom2 = ((i + 1) * 2) + 1;

        // Two triangles for the quad
        cylinderData.indices.push(top1, bottom1, top2);
        cylinderData.indices.push(top2, bottom1, bottom2);
    }

    return cylinderData;
}

// Mario arms
function createArmsData() {
    armData = createCylinderData(0.04, 0.25);
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

function createHeadBuffers() {
    headVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headData.vertices), gl.STATIC_DRAW);
    
    headNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headData.normals), gl.STATIC_DRAW);

    headTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, headTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headData.texCoords), gl.STATIC_DRAW);

    headIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, headIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(headData.indices), gl.STATIC_DRAW);
}

function createBodyBuffers() {
    bodyVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bodyVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bodyData.vertices), gl.STATIC_DRAW);

    bodyNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bodyNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bodyData.normals), gl.STATIC_DRAW);

    bodyTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bodyTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bodyData.texCoords), gl.STATIC_DRAW);

    bodyIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bodyIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bodyData.indices), gl.STATIC_DRAW);
}

function createArmsBuffers() {
    armVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, armVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(armData.vertices), gl.STATIC_DRAW);

    armNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, armNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(armData.normals), gl.STATIC_DRAW);

    armTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, armTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(armData.texCoords), gl.STATIC_DRAW);

    armIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, armIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(armData.indices), gl.STATIC_DRAW);
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

function createHeadVAO() {
    headVAO = gl.createVertexArray();
    gl.bindVertexArray(headVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, headVertexBuffer);
    var vPosition = gl.getAttribLocation(prog, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, headNormalBuffer);
    var vNormal = gl.getAttribLocation(prog, "vNormal");
    gl.enableVertexAttribArray(vNormal);
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);

    // texturing for the head
    gl.bindBuffer(gl.ARRAY_BUFFER, headTexCoordsBuffer);
    var vTexCoord = gl.getAttribLocation(prog, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, headIndexBuffer);

    gl.bindVertexArray(null);
}

function createBodyVAO() {
    bodyVAO = gl.createVertexArray();
    gl.bindVertexArray(bodyVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, bodyVertexBuffer);
    let position = gl.getAttribLocation(prog, 'vPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, bodyNormalBuffer);
    let normal = gl.getAttribLocation(prog, 'vNormal');
    gl.enableVertexAttribArray(normal);
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, bodyTexCoordsBuffer);
    let texCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bodyIndexBuffer);

    gl.bindVertexArray(null);
}

function createArmsVAO() {
    armVAO = gl.createVertexArray();
    gl.bindVertexArray(armVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, armVertexBuffer);
    let position = gl.getAttribLocation(prog, 'vPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, armNormalBuffer);
    let normal = gl.getAttribLocation(prog, 'vNormal');
    gl.enableVertexAttribArray(normal);
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, armTexCoordsBuffer);
    let texCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, armIndexBuffer);

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

    // Set light and material properties for platform
    setLightingAndMaterialUniforms(
        vec4(0.6, 0.6, 0.1, 1.0), 
        vec4(1.0, 1.0, 0.2, 1.0), 
        vec4(0.5, 0.5, 0.1, 1.0), 
        10.0 
    );

    // uTexture
    let uTextureLocation = gl.getUniformLocation(prog, 'uTexture');
    gl.uniform1i(uTextureLocation, 0);
}

function setBrickUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Apply rotations
    model = mult(model, rotate(rotationX, [1, 0, 0]));
    model = mult(model, rotate(rotationY, [0, 1, 0]));
    model = mult(model, rotate(rotationZ, [0, 0, 1]));

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

    // Set light and material properties for brick
    setLightingAndMaterialUniforms(
        vec4(0.6, 0.6, 0.1, 1.0), 
        vec4(1.0, 1.0, 0.2, 1.0), 
        vec4(0.5, 0.5, 0.1, 1.0), 
        10.0 
    );
}

function setHeadUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    model = mult(translate(0.0, 0.5, 0.0), model);

    model = mult(model, rotate(headRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(headRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(headRotationAngleZ, [0, 0, 1]));

    var eye = vec3(2, 2, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);
    var modelView = mult(view, model); 

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, modelView);

    var normalMatrix = [
        vec3(modelView[0][0], modelView[0][1], modelView[0][2]),
        vec3(modelView[1][0], modelView[1][1], modelView[1][2]),
        vec3(modelView[2][0], modelView[2][1], modelView[2][2])
    ];

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    // Set light and material properties for the head
    setLightingAndMaterialUniforms(
        vec4(0.8, 0.6, 0.5, 1.0), 
        vec4(1.0, 0.8, 0.7, 1.0), 
        vec4(0.9, 0.7, 0.6, 1.0), 
        32.0 
    );
}

function setBodyUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Body's position
    model = mult(translate(0.0, 0.25, 0.0), model);

    // Body rotations
    model = mult(model, rotate(bodyRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(bodyRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(bodyRotationAngleZ, [0, 0, 1]));

    var eye = vec3(2, 2, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);
    var modelView = mult(view, model); 

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, modelView);

    var normalMatrix = [
        vec3(modelView[0][0], modelView[0][1], modelView[0][2]),
        vec3(modelView[1][0], modelView[1][1], modelView[1][2]),
        vec3(modelView[2][0], modelView[2][1], modelView[2][2])
    ];

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    setLightingAndMaterialUniforms(
        vec4(0.7, 0.5, 0.4, 1.0),
        vec4(0.9, 0.7, 0.6, 1.0),
        vec4(0.8, 0.6, 0.5, 1.0),
        30.0 
    );

}

function setLeftArmUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Arm's position 
    model = mult(translate(-0.15, 0.3, 0.0), model); 

    // Arm rotations
    model = mult(model, rotate(leftArmRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(leftArmRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(leftArmRotationAngleZ, [0, 0, 1]));

    var eye = vec3(2, 2, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);
    var modelView = mult(view, model); 

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, modelView);

    var normalMatrix = [
        vec3(modelView[0][0], modelView[0][1], modelView[0][2]),
        vec3(modelView[1][0], modelView[1][1], modelView[1][2]),
        vec3(modelView[2][0], modelView[2][1], modelView[2][2])
    ];

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    setLightingAndMaterialUniforms(
        vec4(0.6, 0.4, 0.3, 1.0),
        vec4(0.8, 0.6, 0.5, 1.0),
        vec4(0.7, 0.5, 0.4, 1.0),
        28.0 
    );
}

function setRightArmUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Arm's position 
    model = mult(translate(0.15, 0.3, 0.0), model); 

    // Arm rotations
    model = mult(model, rotate(rightArmRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(rightArmRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(rightArmRotationAngleZ, [0, 0, 1]));

    var eye = vec3(2, 2, 2);
    var target = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);

    var view = lookAt(eye, target, up);
    var modelView = mult(view, model); 

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, modelView);

    var normalMatrix = [
        vec3(modelView[0][0], modelView[0][1], modelView[0][2]),
        vec3(modelView[1][0], modelView[1][1], modelView[1][2]),
        vec3(modelView[2][0], modelView[2][1], modelView[2][2])
    ];

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    setLightingAndMaterialUniforms(
        vec4(0.6, 0.4, 0.3, 1.0),
        vec4(0.8, 0.6, 0.5, 1.0),
        vec4(0.7, 0.5, 0.4, 1.0),
        28.0 
    );
}


let platformTexture;
let brickTexture;
let headTexture;
let bodyTexture;
let armTexture;

async function setup() {

    initializeContext();

    setEventListeners(canvas);
    
    createPlatformData();
    createBrickData();
    // 1.
    createMarioData();

    createPlatformBuffers();
    createBrickBuffers();
    // 2. 
    createMarioBuffers();

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

    headTexture = gl.createTexture();
    let headImage = new Image();
    headImage.onload = function() { 
        handleTextureLoaded(headImage, headTexture); 
    }
    headImage.src = "./textureImages/head.png"; // mario head texture image

    bodyTexture = gl.createTexture();
    let bodyImage = new Image();
    bodyImage.onload = function() { 
        handleTextureLoaded(bodyImage, bodyTexture); 
    }
    bodyImage.src = "./textureImages/body.png"; // mario body texture image

    armTexture = gl.createTexture();
    let armImage = new Image();
    armImage.onload = function() { 
        handleTextureLoaded(armImage, armTexture); 
    }
    armImage.src = "./textureImages/arm.png"; // mario arm texture image


    await loadShaders();
    compileShaders();

    createPlatformVertexArrayObjects();
    createBrickVertexArrayObjects();
    // 4.
    createMarioVAOs();

    requestAnimationFrame(render);
}

window.onload = setup;

// Draws the vertex data.
function render(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog);

    // updateLightAnimate();

    // 4. 
    // Platform rendering
    setPlatformUniformVariables();
    gl.bindVertexArray(platformVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, platformTexture);
    gl.drawElements(gl.TRIANGLES, platformIndices.length, gl.UNSIGNED_SHORT, 0);

    // Brick rendering
    updateBrickRotation();

    setBrickUniformVariables();
    gl.bindVertexArray(brickVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, brickTexture);
    gl.drawElements(gl.TRIANGLES, brickIndices.length, gl.UNSIGNED_SHORT, 0);

    // Mario's head rendering
    setHeadUniformVariables(); 
    gl.bindVertexArray(headVAO);
    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, headTexture);
    gl.drawElements(gl.TRIANGLES, headData.indices.length, gl.UNSIGNED_SHORT, 0);

    // Mario's body rendering
    setBodyUniformVariables(); 
    gl.bindVertexArray(bodyVAO);
    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, bodyTexture);
    gl.drawElements(gl.TRIANGLES, bodyData.indices.length, gl.UNSIGNED_SHORT, 0);

    // Mario's left arm rendering
    setLeftArmUniformVariables();
    gl.bindVertexArray(armVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, armTexture); 
    gl.drawElements(gl.TRIANGLES, armData.indices.length, gl.UNSIGNED_SHORT, 0);
    leftArmRotationAngleX = 100.0;
    leftArmRotationAngleY = 0.0;
    leftArmRotationAngleZ = 80.0;

    // Mario's right arm rendering
    setRightArmUniformVariables();
    gl.bindVertexArray(armVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, armTexture); 
    gl.drawElements(gl.TRIANGLES, armData.indices.length, gl.UNSIGNED_SHORT, 0);
    rightArmRotationAngleX = 100.0;
    rightArmRotationAngleY = 170.0;
    rightArmRotationAngleZ = 80.0;

    updateHandWave(timestamp);

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

var lastTimeBrick = Date.now();

function updateBrickRotation() {
    var now = Date.now();
    var elapsed = now - lastTimeBrick;
    lastTimeBrick = now;

    // Rotation on Y every 10 secs
    var rotationSpeed = (360.0 / 10.0) * (elapsed / 1000.0);
    rotationY += rotationSpeed;
}

let waveDirection = 1; // 1 for waving up, -1 for waving down
let maxWaveAngle = 160; 
let minWaveAngle = -160; 
let waveSpeed = 2.0; 

function updateHandWave(timestamp) {
    let angleOffset = Math.sin(waveSpeed * timestamp / 1000) * maxWaveAngle;

    leftArmRotationAngleX = -angleOffset;
    rightArmRotationAngleX = angleOffset;

    if (leftArmRotationAngleX >= maxWaveAngle) {
        waveDirection = -1;
    } else if (leftArmRotationAngleX <= minWaveAngle) {
        waveDirection = 1;
    }

    leftArmRotationAngleX -= waveDirection * waveSpeed;
    rightArmRotationAngleX += waveDirection * waveSpeed;

    leftArmRotationAngleX = Math.max(minWaveAngle, Math.min(maxWaveAngle, leftArmRotationAngleX));
    rightArmRotationAngleX = Math.max(minWaveAngle, Math.min(maxWaveAngle, rightArmRotationAngleX));
}

function createMarioData() {
    createHeadData();
    createBodyData();
    createArmsData();
    // createLegsData();
    // createHatData();
}

function createMarioBuffers() {
    createHeadBuffers();
    createBodyBuffers();
    createArmsBuffers();
    // createLegsBuffers();
    // createHatBuffers();
}

function createMarioVAOs() {
    createHeadVAO();
    createBodyVAO();
    createArmsVAO();
    // createLegsVAO();
    // createHatVAO();
}

function setEventListeners(canvas) { 

    canvas.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
    
    canvas.addEventListener("mousedown", function (event) {
        // Left click 
        if (event.button === 0) { 
            var startX = event.clientX;
            var startY = event.clientY;

            function handleMouseMove(event) {
                var currentX = event.clientX;
                var currentY = event.clientY;

                // X, Y directions.
                var deltaX = currentX - startX;
                var deltaY = currentY - startY;

                // Update the rotation angles of head.
                headRotationAngleY += deltaX * 0.5;
                headRotationAngleX += deltaY * 0.5;

                // Reset
                startX = currentX;
                startY = currentY;
            }
        }
        function handleMouseUp() {
            // Button released
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Attach event listeners to handle mouse movement and release.
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
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

function setLightingAndMaterialUniforms(materialAmbient, materialDiffuse, materialSpecular, materialShininess) {
    // Lighting properties
    gl.uniform3fv(gl.getUniformLocation(prog, "uLightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightAmbient"), flatten(vec4(0.8, 0.8, 0.8, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightDiffuse"), flatten(vec4(0.6, 0.6, 0.6, 1.0)));
    gl.uniform4fv(gl.getUniformLocation(prog, "uLightSpecular"), flatten(vec4(1.0, 1.0, 1.0, 1.0)));

    // Material properties
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialAmbient"), flatten(materialAmbient));
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialDiffuse"), flatten(materialDiffuse));
    gl.uniform4fv(gl.getUniformLocation(prog, "uMaterialSpecular"), flatten(materialSpecular));
    gl.uniform1f(gl.getUniformLocation(prog, "uMaterialShininess"), materialShininess);
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


// function createLegsData() {
//     legData = createCylinderData(0.15, 0.7); // measurements for Mario's legs
// }

// function createHatData() {
//     hatData = createSphereData(0.55); // slightly bigger than the head with a flattened shape
// }
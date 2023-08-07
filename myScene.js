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

let legData = {};
let legVertexBuffer, legNormalBuffer, legTexCoordsBuffer, legIndexBuffer;
let legVAO;

let coinData = {};
let coinVertexBuffer, coinNormalBuffer, coinTexCoordsBuffer, coinIndexBuffer;
let coinVAO;

let pipeData = {};
let pipeVertexBuffer, pipeNormalBuffer, pipeTexCoordsBuffer, pipeIndexBuffer;
let pipeVAO;

let lightAngle = 0.0;
let lightPosition = vec3(2.0, 2.0, 2.0);

let rotationX = 0.0;
let rotationY = 0.0;
let rotationZ = 0.0;

let platformRotationX = 0.0;
let platformRotationY = 0.0;
let platformRotationZ = 0.0;

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

// Mario's legs
function createLegsData() {
    legData = createFrustumData(0.01, 0.075, 0.5); 
}

function createFrustumData(topRadius, bottomRadius, height, slices = 30) {
    var frustumData = {
        vertices: [],
        normals: [],
        texCoords: [],
        indices: []
    };

    for (var i = 0; i <= slices; i++) {
        var theta = i * 2 * Math.PI / slices;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        var x = cosTheta;
        var z = sinTheta;
        var u = i / slices;

        // Top circle
        frustumData.vertices.push(topRadius * x, height / 2, topRadius * z);
        frustumData.texCoords.push(u, 1);

        // Bottom circle
        frustumData.vertices.push(bottomRadius * x, -height / 2, bottomRadius * z);
        frustumData.texCoords.push(u, 0);
    }

    // Compute normals for a frustum (bit more complex than a cylinder)
    for (var i = 0; i <= slices; i++) {
        let slantHeight = Math.sqrt(Math.pow((bottomRadius - topRadius), 2) + Math.pow(height, 2));
        let angle = Math.atan2(height, (bottomRadius - topRadius));

        let xNormal = Math.cos(angle) * Math.cos(i * 2 * Math.PI / slices);
        let yNormal = Math.sin(angle);
        let zNormal = Math.cos(angle) * Math.sin(i * 2 * Math.PI / slices);

        frustumData.normals.push(xNormal, yNormal, zNormal);
        frustumData.normals.push(xNormal, yNormal, zNormal);
    }

    // Creating the frustum's indices
    for (i = 0; i < slices; i++) {
        var top1 = i * 2;
        var top2 = (i + 1) * 2;
        var bottom1 = (i * 2) + 1;
        var bottom2 = ((i + 1) * 2) + 1;

        // Two triangles for the quad
        frustumData.indices.push(top1, bottom1, top2);
        frustumData.indices.push(top2, bottom1, bottom2);
    }

    return frustumData;
}

// Coin
function createCylinderWithTopBottomData(radius, height) {
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

    // Creating the cylinder's indices for the side
    for (i = 0; i < slices; i++) {
        var top1 = i * 2;
        var top2 = (i + 1) * 2;
        var bottom1 = (i * 2) + 1;
        var bottom2 = ((i + 1) * 2) + 1;

        // Two triangles for the quad
        cylinderData.indices.push(top1, bottom1, top2);
        cylinderData.indices.push(top2, bottom1, bottom2);
    }

    // Top and bottom end caps
    cylinderData.vertices.push(0, height / 2, 0);
    cylinderData.normals.push(0, 1, 0);
    cylinderData.texCoords.push(0.5, 0.5);

    cylinderData.vertices.push(0, -height / 2, 0);
    cylinderData.normals.push(0, -1, 0);
    cylinderData.texCoords.push(0.5, 0.5);

    var topCenterIndex = slices * 2 + 2;
    var bottomCenterIndex = topCenterIndex + 1;

    for (i = 0; i < slices; i++) {
        var topIndex = i * 2;
        var nextTopIndex = (i + 1) * 2;

        cylinderData.indices.push(topCenterIndex, nextTopIndex, topIndex);

        var bottomIndex = (i * 2) + 1;
        var nextBottomIndex = ((i + 1) * 2) + 1;

        cylinderData.indices.push(bottomCenterIndex, bottomIndex, nextBottomIndex);
    }

    return cylinderData;
}

function createCoinData() {
    coinData = createCylinderWithTopBottomData(0.18, 0.05);
}

// Pipe
function createCylinderPipeData(bodyRadius, bodyHeight, flangeHeight) {
    const flangeRadius = bodyRadius * 1.3;

    // Main body of the pipe
    const mainCylinder = createCylinderWithTopBottomData(bodyRadius, bodyHeight - flangeHeight);

    // Flange
    const flangeCylinder = createCylinderWithTopBottomData(flangeRadius, flangeHeight);
    for (let i = 0; i < flangeCylinder.vertices.length; i+=3) {
        flangeCylinder.vertices[i + 1] += (bodyHeight - flangeHeight) / 2;
    }

    // Combine the two
    const pipeData = {
        vertices: mainCylinder.vertices.concat(flangeCylinder.vertices),
        normals: mainCylinder.normals.concat(flangeCylinder.normals),
        texCoords: mainCylinder.texCoords.concat(flangeCylinder.texCoords),
        indices: []
    };

    for (let i = 0; i < flangeCylinder.indices.length; i++) {
        pipeData.indices.push(flangeCylinder.indices[i] + mainCylinder.vertices.length / 3);
    }

    pipeData.indices = mainCylinder.indices.concat(pipeData.indices);

    return pipeData;
}

function createPipeData() { 
    pipeData = createCylinderPipeData(0.4, 1.35, 0.3)
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

function createLegsBuffers() {
    legVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, legVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(legData.vertices), gl.STATIC_DRAW);

    legNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, legNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(legData.normals), gl.STATIC_DRAW);

    legTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, legTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(legData.texCoords), gl.STATIC_DRAW);

    legIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, legIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(legData.indices), gl.STATIC_DRAW);
}

function createCoinBuffers() {
    coinVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coinVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coinData.vertices), gl.STATIC_DRAW);
    
    coinNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coinNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coinData.normals), gl.STATIC_DRAW);

    coinTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coinTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coinData.texCoords), gl.STATIC_DRAW);

    coinIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coinIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(coinData.indices), gl.STATIC_DRAW);
}

function createPipeBuffers() {
    pipeVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pipeVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pipeData.vertices), gl.STATIC_DRAW);
    
    pipeNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pipeNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pipeData.normals), gl.STATIC_DRAW);

    pipeTexCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pipeTexCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pipeData.texCoords), gl.STATIC_DRAW);

    pipeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pipeIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pipeData.indices), gl.STATIC_DRAW);
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

function createLegsVAO() {
    legVAO = gl.createVertexArray();
    gl.bindVertexArray(legVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, legVertexBuffer);
    let position = gl.getAttribLocation(prog, 'vPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, legNormalBuffer);
    let normal = gl.getAttribLocation(prog, 'vNormal');
    gl.enableVertexAttribArray(normal);
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, legTexCoordsBuffer);
    let texCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, legIndexBuffer);

    gl.bindVertexArray(null);
}

function createCoinVao() {
    coinVAO = gl.createVertexArray();
    gl.bindVertexArray(coinVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, coinVertexBuffer);
    let position = gl.getAttribLocation(prog, 'vPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, coinNormalBuffer);
    let normal = gl.getAttribLocation(prog, 'vNormal');
    gl.enableVertexAttribArray(normal);
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, coinTexCoordsBuffer);
    let texCoord = gl.getAttribLocation(prog, 'vTexCoord');
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coinIndexBuffer);

    gl.bindVertexArray(null);
}

function createPipeVao() {
    pipeVAO = gl.createVertexArray();
    gl.bindVertexArray(pipeVAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, pipeVertexBuffer);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    gl.bindBuffer(gl.ARRAY_BUFFER, pipeNormalBuffer);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(1);

    gl.bindBuffer(gl.ARRAY_BUFFER, pipeTexCoordsBuffer);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(2);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pipeIndexBuffer);

    gl.bindVertexArray(null);
}

function setPlatformUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;
    // Apply rotations
    model = mult(model, rotate(platformRotationX, [1, 0, 0]));
    model = mult(model, rotate(platformRotationY, [0, 1, 0]));
    model = mult(model, rotate(platformRotationZ, [0, 0, 1]));

    // Scale factors for x, y, and z
    var scaleX = 3.0;
    var scaleY = 0.1;
    var scaleZ = 2.0; 

    model = mult(scalem(scaleX, scaleY, scaleZ), model); // Scaling transformation

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let brickTranslationX = 0.0;
let brickTranslationY = -0.1;
let brickTranslationZ = 0.0;
let brickScaleX = 0.4;
let brickScaleY = 0.4;
let brickScaleZ = 0.4;

function setBrickUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Apply rotations
    model = mult(model, rotate(rotationX, [1, 0, 0]));
    model = mult(model, rotate(rotationY, [0, 1, 0]));
    model = mult(model, rotate(rotationZ, [0, 0, 1]));

    model = mult(scalem(brickScaleX, brickScaleY, brickScaleZ), model); // Scaling transformation
    model = mult(translate(brickTranslationX, brickTranslationY, brickTranslationZ), model); // Translation transformation

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let headTranslationX = 0.0;
let headTranslationY = 0.1;
let headTranslationZ = 0.0;

function setHeadUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    model = mult(translate(headTranslationX, headTranslationY, headTranslationZ), model);

    model = mult(model, rotate(headRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(headRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(headRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let bodyTranslationX = 0.0;
let bodyTranslationY = -0.18;
let bodyTranslationZ = 0.0;

function setBodyUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Body's position
    model = mult(translate(bodyTranslationX, bodyTranslationY, bodyTranslationZ), model);

    // Body rotations
    model = mult(model, rotate(bodyRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(bodyRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(bodyRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let leftArmTranslationX = -0.15;
let leftArmTranslationY = -0.1;
let leftArmTranslationZ = 0.0;

function setLeftArmUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Arm's position 
    model = mult(translate(leftArmTranslationX, leftArmTranslationY, leftArmTranslationZ), model); 

    // Arm rotations
    model = mult(model, rotate(leftArmRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(leftArmRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(leftArmRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let rightArmTranslationX = 0.15;
let rightArmTranslationY = -0.1;
let rightArmTranslationZ = 0.0;

function setRightArmUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Arm's position 
    model = mult(translate(rightArmTranslationX, rightArmTranslationY, rightArmTranslationZ), model); 

    // Arm rotations
    model = mult(model, rotate(rightArmRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(rightArmRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(rightArmRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let rightLegTranslationX = 0.09;
let rightLegTranslationY = -0.2;
let rightLegTranslationZ = 0.0;

function setRightLegUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Legs' position 
    model = mult(translate(rightLegTranslationX, rightLegTranslationY, rightLegTranslationZ), model);

    // model = mult(model, rotate(legRotationAngleX, [1, 0, 0]));
    // model = mult(model, rotate(legRotationAngleY, [0, 1, 0]));
    // model = mult(model, rotate(legRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let leftLegTranslationX = -0.09;
let leftLegTranslationY = -0.2;
let leftLegTranslationZ = 0.0;

function setLeftLegUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Legs' position 
    model = mult(translate(leftLegTranslationX, leftLegTranslationY, leftLegTranslationZ), model);

    // model = mult(model, rotate(legRotationAngleX, [1, 0, 0]));
    // model = mult(model, rotate(legRotationAngleY, [0, 1, 0]));
    // model = mult(model, rotate(legRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

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

let coinTranslationX = 0.0;
let coinTranslationY = 0.9;
let coinTranslationZ = 0.0;
let coinRotationAngleX = 0.0;
let coinRotationAngleY = 0.0;
let coinRotationAngleZ = 90.0;

function setCoinUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Coin's position
    model = mult(translate(coinTranslationX, coinTranslationY, coinTranslationZ), model);

    model = mult(model, rotate(coinRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(coinRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(coinRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    setLightingAndMaterialUniforms(
        vec4(0.9, 0.7, 0.1, 1.0),   
        vec4(1.0, 0.9, 0.2, 1.0), 
        vec4(1.0, 0.95, 0.3, 1.0),  
        50.0                        
    );
}

let pipeTranslationX = -0.9; 
let pipeTranslationY = 0; 
let pipeTranslationZ = 0; 
let pipeRotationAngleX = 0; 
let pipeRotationAngleY = 0; 
let pipeRotationAngleZ = 0; 

function setPipeUniformVariables() { 
    const identityMatrix = mat4();

    gl.useProgram(prog);
    var transform_loc = gl.getUniformLocation(prog, "transform");

    var model = identityMatrix;

    // Pipe's position
    model = mult(translate(pipeTranslationX, pipeTranslationY, pipeTranslationZ), model);

    model = mult(model, rotate(pipeRotationAngleX, [1, 0, 0]));
    model = mult(model, rotate(pipeRotationAngleY, [0, 1, 0]));
    model = mult(model, rotate(pipeRotationAngleZ, [0, 0, 1]));

    const { transform, modelView } = computeTransformations(model);
    var normalMatrix = computeNormalMatrix(modelView);

    gl.uniformMatrix4fv(transform_loc, false, flatten(transform));
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelView"), false, flatten(modelView));
    gl.uniformMatrix3fv(gl.getUniformLocation(prog, "normalMatrix"), false, flatten(normalMatrix));

    setLightingAndMaterialUniforms(
        vec4(0.2, 0.5, 0.2, 1.0), 
        vec4(0.3, 0.6, 0.3, 1.0), 
        vec4(0.4, 0.7, 0.4, 1.0), 
        50.0                        
    );
}


let platformTexture;
let brickTexture;
let headTexture;
let bodyTexture;
let armTexture;
let legTexture;
let coinTexture;
let pipeTexture;

async function setup() {

    initializeContext();

    setEventListeners(canvas);
    
    createPlatformData();
    createBrickData();
    createMarioData();
    createCoinData();
    createPipeData();

    createPlatformBuffers();
    createBrickBuffers();
    createMarioBuffers();
    createCoinBuffers();
    createPipeBuffers();

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

    legTexture = gl.createTexture();
    let legImage = new Image();
    legImage.onload = function() { 
        handleTextureLoaded(legImage, legTexture); 
    }
    legImage.src = "./textureImages/leg.png"; // mario leg texture image

    coinTexture = gl.createTexture();
    let coinImage = new Image();
    coinImage.onload = function() { 
        handleTextureLoaded(coinImage, coinTexture); 
    }
    coinImage.src = "./textureImages/coin.png"; // coin texture image

    pipeTexture = gl.createTexture();
    let pipeImage = new Image();
    pipeImage.onload = function() { 
        handleTextureLoaded(pipeImage, pipeTexture); 
    }
    pipeImage.src = "./textureImages/pipe.png"; // pipe texture image


    await loadShaders();
    compileShaders();

    createPlatformVertexArrayObjects();
    createBrickVertexArrayObjects();
    createMarioVAOs();
    createCoinVao();
    createPipeVao();

    requestAnimationFrame(render);
}

window.onload = setup;

// Draws the vertex data.
function render(timestamp) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(prog);

    // updateLightAnimate();

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

    // Mario's legs rendering
    setLeftLegUniformVariables();
    gl.bindVertexArray(legVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, legTexture);  
    gl.drawElements(gl.TRIANGLES, legData.indices.length, gl.UNSIGNED_SHORT, 0);

    setRightLegUniformVariables();
    gl.bindVertexArray(legVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, legTexture);  
    gl.drawElements(gl.TRIANGLES, legData.indices.length, gl.UNSIGNED_SHORT, 0);

    updateMarioJump();
    updateBlockHit();

    // Coin rendering
    setCoinUniformVariables(); 
    gl.bindVertexArray(coinVAO);
    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, coinTexture);
    gl.drawElements(gl.TRIANGLES, coinData.indices.length, gl.UNSIGNED_SHORT, 0);

    updateCoinReveal();

    // Pipe rendering
    setPipeUniformVariables(); 
    gl.bindVertexArray(pipeVAO);
    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, pipeTexture);
    gl.drawElements(gl.TRIANGLES, pipeData.indices.length, gl.UNSIGNED_SHORT, 0);
    
    requestAnimationFrame(render);
}

function resetTranslationY() {
    headTranslationY = 0.1;
    bodyTranslationY = -0.18;
    leftArmTranslationY = -0.1;
    rightArmTranslationY = -0.1;
    leftLegTranslationY = -0.2;
    rightLegTranslationY = -0.2;
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

    leftArmRotationAngleX = angleOffset;
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
    createLegsData();
}

function createMarioBuffers() {
    createHeadBuffers();
    createBodyBuffers();
    createArmsBuffers();
    createLegsBuffers();
}

function createMarioVAOs() {
    createHeadVAO();
    createBodyVAO();
    createArmsVAO();
    createLegsVAO();
}

let isDragging = false; 
let previousMousePosition = { x: 0, y: 0 }; 

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
    
    canvas.addEventListener('mousedown', (event) => {
        if (event.button !== 2) return;

        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });
    
    canvas.addEventListener('mouseup', (event) => {
        if (event.button !== 2) return;

        isDragging = false;
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        
        let deltaX = event.clientX - previousMousePosition.x;
        let deltaY = event.clientY - previousMousePosition.y;
        
        // Update angles based on mouse movement
        azimuthalAngle += deltaX * 0.005;
        polarAngle -= deltaY * 0.005;
        
        polarAngle = Math.min(Math.max(0.01, polarAngle), Math.PI - 0.01);
        
        previousMousePosition = { x: event.clientX, y: event.clientY };
        
    }); 

    window.addEventListener("keydown", function(event) {
        if (event.code === "ArrowUp") {
            jump();
        }
    });

    // Wheel to zoom in and out
    canvas.addEventListener("wheel", function (event) {
        const zoomSpeed = 0.1;  

        if (event.deltaY < 0) {
            // Wheel scroll up (in)
            orbitRadius *= (1 - zoomSpeed);
        } else if (event.deltaY > 0) {
            // Wheel scroll down (out)
            orbitRadius *= (1 + zoomSpeed);
        }

        // Make sure orbitRadius doesn't go below through the target
        orbitRadius = Math.max(orbitRadius, 1); 
    }, {passive : true});
}

var eye = vec3(4, 2, 2);
var target = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

let orbitRadius = length(subtract(eye, target));  
let polarAngle = Math.acos(eye[1] / orbitRadius); 
let azimuthalAngle = Math.atan2(eye[2], eye[0]); 

function computeTransformations(modelMatrix) {
    
    let x = orbitRadius * Math.sin(polarAngle) * Math.cos(azimuthalAngle);
    let y = orbitRadius * Math.cos(polarAngle);
    let z = orbitRadius * Math.sin(polarAngle) * Math.sin(azimuthalAngle);

    let newEye = vec3(x, y, z);
    // let target = vec3(0, 0, 0);
    // let up = vec3(0, 1, 0);

    var view = lookAt(newEye, target, up);
    var modelView = mult(view, modelMatrix);

    var aspect = canvas.width / canvas.height;
    var projection = perspective(45.0, aspect, 0.1, 1000.0);

    var transform = mult(projection, modelView);

    return {
        transform: transform,
        modelView: modelView
    };
}

function computeNormalMatrix(modelViewMatrix) {
    return [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
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

let isJumping = false;
const jumpVelocity = 0.1; 
const gravity = -0.01;      
let currentVelocity = 0;

function jump() {
    if (!isJumping) {
        isJumping = true;
        currentVelocity = jumpVelocity;
    }
}

let coinRevealStart = null;     // Coin begins its reveal animation
let coinRevealDuration = 1000;  // Duration of the coin's reveal animation
let coinInitialY = 0;           
let coinJumpHeight = 0.8;      
let coinRevealDelay = 300;  
let coinRevealScheduled = null;

function updateCoinReveal() {
    if (coinRevealScheduled !== null && performance.now() >= coinRevealScheduled) {
        if (coinRevealStart === null) {
            coinRevealStart = performance.now();
            coinInitialY = coinTranslationY;
        }

        let elapsedTime = performance.now() - coinRevealStart;

        if (elapsedTime < coinRevealDuration) {
            let progress = elapsedTime / coinRevealDuration;
            let parabola = 4 * progress * (1 - progress);

            coinTranslationY = coinInitialY + parabola * coinJumpHeight;

            coinRotationAngleX += 10;
            coinRotationAngleZ += 1;
            coinRotationAngleY += 5;
        } else {
            coinRevealStart = null;
            coinRevealScheduled = null;
            coinTranslationY = coinInitialY;

             // Reset rotation angle after the reveal
            coinRotationAngleX = 0;
            coinRotationAngleZ = 0;
            coinRotationAngleY = 0;
        }
    }
}

let initialBrickScale = { x: 0.4, y: 0.4, z: 0.4 };
let hitBrickScale = { x: 0.38, y: 0.35, z: 0.38 };

function updateMarioJump() {
    if (isJumping) {
        // Update Mario's Y translation
        headTranslationY += currentVelocity;
        bodyTranslationY += currentVelocity;
        leftArmTranslationY += currentVelocity;
        rightArmTranslationY += currentVelocity;
        leftLegTranslationY += currentVelocity;
        rightLegTranslationY += currentVelocity;

        // Apply gravity
        currentVelocity += gravity;

        // Reset if mario has landed
        if (headTranslationY <= 0) {
            resetTranslationY();
            isJumping = false;
        }

        // Collision with brick
        if (headTranslationY >= brickTranslationY) {
            brickVelocityY = 0.01;
            coinRevealScheduled = performance.now() + coinRevealDelay;
            coinInitialY = coinTranslationY;
            isHit = true;
        }
    }
}

let isHit = false;
let brickVelocityY = 0;

function updateBlockHit() {
    if (isHit) {
        // Apply gravity
        brickVelocityY -= 0.003;

        brickTranslationY += brickVelocityY;
        coinTranslationY += brickVelocityY;

        // Reset position and velocity if the brick goes below its initial position
        if (brickTranslationY < -0.1) {
            brickTranslationY = -0.1;
            brickVelocityY = 0;
        }  
        if (coinTranslationY < 0.9) { 
            coinTranslationY = 0.9;
            brickVelocityY = 0;
        }
    }
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
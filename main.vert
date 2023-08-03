#version 300 es
precision mediump float;

// Attributes
in vec4 vPosition;
in vec3 vNormal;

// Uniforms
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

// Varyings
out vec3 fNormal;
out vec3 fPosition;

void main() {
    // Transform the position and normal
    vec4 pos = modelViewMatrix * vPosition;
    fPosition = pos.xyz;
    fNormal = normalMatrix * vNormal;

    // Transform the vertex position
    gl_Position = projectionMatrix * pos;
}

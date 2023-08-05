#version 300 es

in vec4 vPosition;
in vec3 vNormal; // Normal for Phong model
in vec2 vTexCoord;

uniform mat4 transform;
uniform mat4 modelView; // Model-view matrix for Phong model
uniform mat3 normalMatrix; // Normal matrix for Phong model

out vec3 fNormal; // Normal to fragment shader
out vec4 fPosition; // Position to fragment shader
out vec2 fTexCoord;

void main() {
    gl_Position = transform * vPosition;
    fTexCoord = vTexCoord;
    fNormal = normalMatrix * vNormal; // Transform the normal to eye coordinates
    fPosition = modelView * vPosition; // Transform the position to eye coordinates
}

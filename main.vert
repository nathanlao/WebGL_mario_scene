#version 300 es

in vec4 vPosition;
in vec2 vTexCoord; // Texture coordinate attribute

uniform mat4 transform;

out vec2 fTexCoord; // Texture coordinate to fragment shader

void main() {
    gl_Position = transform * vPosition;
    fTexCoord = vTexCoord; // Pass the texture coordinate to the fragment shader
}

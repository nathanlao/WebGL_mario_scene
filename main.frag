#version 300 es
precision mediump float;

in vec2 fTexCoord; // Receiving the texture coordinate from the vertex shader

uniform sampler2D uTexture; // Sampler for the texture

out vec4 fragColor;

void main() {
    fragColor = texture(uTexture, fTexCoord); // Fetch the color from the texture
}

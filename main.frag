#version 300 es
precision mediump float;

// Input normal and position from the vertex shader
in vec3 fNormal;
in vec3 fPosition;

// Uniform variables for material and light properties
uniform vec4 ambientProduct;
uniform vec4 diffuseProduct;
uniform vec4 specularProduct;
uniform float shininess;
uniform vec4 lightPosition;

// Output color
out vec4 fragColor;

void main() {
    // Normalize inputs
    vec3 N = normalize(fNormal); 
    vec3 E = normalize(-fPosition);
    vec3 L = normalize(lightPosition.xyz - fPosition); // Direction towards the light source

    vec4 ambient = ambientProduct;

    // Diffuse term as the dot product of the normal and light direction
    float Kd = max(dot(L, N), 0.0);
    vec4 diffuse = Kd * diffuseProduct; 

    // Specular term
    vec3 H = normalize(L + E);  // half-way vector
    float Ks = pow(max(dot(N, H), 0.0), shininess);  
    vec4 specular = Ks * specularProduct;

    // no specularity if the surface faces away from the light
    if (dot(L, N) < 0.0) 
        specular = vec4(0.0, 0.0, 0.0, 1.0);

    fragColor = ambient + diffuse + specular;
    fragColor.a = 1.0;  // Alpha channel
}

#version 300 es
precision mediump float;

in vec3 fNormal;
in vec4 fPosition;
in vec2 fTexCoord;

uniform vec3 uLightPosition; // Light position for Phong model
uniform vec4 uLightAmbient; 
uniform vec4 uLightDiffuse; 
uniform vec4 uLightSpecular; 

uniform vec4 uMaterialAmbient; 
uniform vec4 uMaterialDiffuse; 
uniform vec4 uMaterialSpecular; 
uniform float uMaterialShininess; 

uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
    vec3 lightDirection = normalize(uLightPosition - fPosition.xyz);
    vec3 normal = normalize(fNormal);

    float diffuseFactor = max(dot(lightDirection, normal), 0.0);
    vec4 diffuse = uLightDiffuse * uMaterialDiffuse * diffuseFactor;

    vec3 reflectDirection = reflect(-lightDirection, normal);
    vec3 viewDirection = -normalize(fPosition.xyz);
    float specularFactor = pow(max(dot(reflectDirection, viewDirection), 0.0), uMaterialShininess);
    vec4 specular = uLightSpecular * uMaterialSpecular * specularFactor;

    vec4 ambient = uLightAmbient * uMaterialAmbient;

    vec4 textureColor = texture(uTexture, fTexCoord);

    fragColor = textureColor * (ambient + diffuse + specular);
}

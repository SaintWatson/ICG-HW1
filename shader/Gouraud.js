const gouraudVertex = `
attribute vec3 aVertexPosition;
attribute vec3 aFrontColor;
attribute vec3 aVertexNormal;

uniform vec3 lightColor1;
uniform vec3 lightColor2;
uniform vec3 lightColor3;
uniform vec4 lightPosition1;
uniform vec4 lightPosition2;
uniform vec4 lightPosition3;

uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform float Shininess;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 fragcolor;

void main(void) {

    vec3 mvVertex =  (uMVMatrix * vec4(aVertexPosition, 1.0)).xyz;
    vec3 mvNormal =  (mat3(uMVMatrix) * aVertexNormal);

    // (1) ambient
    vec3 ambient = aFrontColor * Ka;

    // (2) diffuse
    vec3 N = normalize(mvNormal);
    vec3 V = -normalize(mvVertex);

    vec3 L1 = normalize(vec3(lightPosition1) - mvVertex);
    vec3 L2 = normalize(vec3(lightPosition2) - mvVertex);
    vec3 L3 = normalize(vec3(lightPosition3) - mvVertex);

    vec3 H1 = normalize(L1+V);
    vec3 H2 = normalize(L2+V);
    vec3 H3 = normalize(L3+V);

    float cos1 = max(dot(L1,N), 0.0);
    float cos2 = max(dot(L2,N), 0.0);
    float cos3 = max(dot(L3,N), 0.0);

    vec3 diffuse1 = lightColor1 * Kd * cos1 * aFrontColor;
    vec3 diffuse2 = lightColor2 * Kd * cos2 * aFrontColor;
    vec3 diffuse3 = lightColor3 * Kd * cos3 * aFrontColor;
    vec3 diffuse = diffuse1 + diffuse2 + diffuse3;

    // specular
    float cosAlpha1 = max(dot(H1,N), 0.0);
    float cosAlpha2 = max(dot(H2,N), 0.0);
    float cosAlpha3 = max(dot(H3,N), 0.0);
    
    vec3 specular1 = lightColor1 * Ks * pow(cosAlpha1, Shininess); 
    vec3 specular2 = lightColor2 * Ks * pow(cosAlpha2, Shininess); 
    vec3 specular3 = lightColor3 * Ks * pow(cosAlpha3, Shininess); 
    vec3 specular = specular1 + specular2 + specular3;  

    vec3 color = ambient + diffuse + specular;

    fragcolor = vec4(color, 1.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`
const gouraudFragment = `
precision mediump float;
varying vec4 fragcolor;

void main(void) {
    gl_FragColor = fragcolor;
}
`
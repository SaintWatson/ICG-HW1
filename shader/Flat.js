// reference: https://developer.mozilla.org/zh-TW/docs/Web/API/WebGL_API/Tutorial
// reference: https://stackoverflow.com/questions/40101023/flat-shading-in-webgl

const flatVertex = `
    attribute vec3 aVertexPosition;
    attribute vec3 aFrontColor;

    uniform mat4 uMVMatrix; // model view
    uniform mat4 uPMatrix;  // projection

    varying vec4 fragcolor;
    varying vec3 mvVertex;

    void main(void) {
        mvVertex = (uMVMatrix * vec4(aVertexPosition,1.0)).xyz; 
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        fragcolor = vec4(aFrontColor.rgb, 1.0);
    }
`
const flatFragment = `

    // to use dFdx and dFdy
    
    #extension GL_OES_standard_derivatives : enable
    precision mediump float;

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

    varying vec4 fragcolor;
    varying vec3 mvVertex;

    void main(void) {

        // (1) ambient 
        vec3 ambient = lightColor1 * Ka * vec3(fragcolor);

        // (2) diffuse 

        vec3 dx = dFdx(mvVertex);
        vec3 dy = dFdy(mvVertex);
        
        vec3 N = normalize(cross(dx,dy));
        vec3 V = normalize(mvVertex) * -1.0;


        vec3 L1 = normalize(vec3(lightPosition1) - mvVertex);
        vec3 L2 = normalize(vec3(lightPosition2) - mvVertex);
        vec3 L3 = normalize(vec3(lightPosition3) - mvVertex);
    
        vec3 H1 = normalize(L1 + V);
        vec3 H2 = normalize(L2 + V);
        vec3 H3 = normalize(L3 + V);

        float cos1 = max(dot(L1,N), 0.0);
        float cos2 = max(dot(L2,N), 0.0);
        float cos3 = max(dot(L3,N), 0.0);

        vec3 diffuse1 = lightColor1 * Kd * vec3(fragcolor) * cos1;
        vec3 diffuse2 = lightColor2 * Kd * vec3(fragcolor) * cos2;
        vec3 diffuse3 = lightColor3 * Kd * vec3(fragcolor) * cos3;
        vec3 diffuse = diffuse1 + diffuse2 + diffuse3;


        /* specular */
        float cosAlpha1 = max(dot(H1,N), 0.0);
        float cosAlpha2 = max(dot(H2,N), 0.0);
        float cosAlpha3 = max(dot(H3,N), 0.0);
        
        vec3 specular1 = lightColor1 * Ks * pow(cosAlpha1, 16.0); 
        vec3 specular2 = lightColor2 * Ks * pow(cosAlpha2, 16.0); 
        vec3 specular3 = lightColor3 * Ks * pow(cosAlpha3, 16.0); 
        vec3 specular = specular1 + specular2 + specular3;  


        vec3 color = ambient + diffuse + specular;
        gl_FragColor = vec4(color, 1.0);
    }
`
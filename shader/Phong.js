const phongVertex = `
    attribute vec3 aVertexPosition;
    attribute vec3 aFrontColor;
    attribute vec3 aVertexNormal;

    uniform mat4 uMVMatrix; 
    uniform mat4 uPMatrix; 

    varying vec4 fragcolor;
    varying vec3 mvVertex;
    varying vec3 normal;

    void main(void) {
        mvVertex = (uMVMatrix * vec4(aVertexPosition,1.0)).xyz; 
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        fragcolor = vec4(aFrontColor.rgb, 1.0);
        normal = normalize(mat3(uMVMatrix) * aVertexNormal);
    }
`
const phongFragment = `
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
    varying vec3 normal;
    varying vec3 mvVertex;

    void main(void) {

        // (1) ambient 
        vec3  ambient = Ka * vec3(fragcolor);
        
        // (2) diffuse 
        vec3 L1 = normalize(vec3(lightPosition1) - mvVertex);
        vec3 L2 = normalize(vec3(lightPosition2) - mvVertex);
        vec3 L3 = normalize(vec3(lightPosition3) - mvVertex);
        
        float cos1 = max(dot(normal, L1), 0.0);
        float cos2 = max(dot(normal, L2), 0.0);
        float cos3 = max(dot(normal, L3), 0.0);
        
        vec3 diffuse1 = lightColor1 * Kd * cos1 * vec3(fragcolor);
        vec3 diffuse2 = lightColor2 * Kd * cos2 * vec3(fragcolor);
        vec3 diffuse3 = lightColor3 * Kd * cos3 * vec3(fragcolor);
        vec3 diffuse = diffuse1 + diffuse2 + diffuse3;

        
        /* specular */
        vec3 V = normalize(-mvVertex);

        vec3 R1 = reflect(-L1, normal);
        vec3 R2 = reflect(-L2, normal);
        vec3 R3 = reflect(-L3, normal);

        float Cos1 = max(dot(R1, V), 0.0);
        float Cos2 = max(dot(R2, V), 0.0);
        float Cos3 = max(dot(R3, V), 0.0);

        vec3 specular1 = lightColor1 * Ks * pow(Cos1, Shininess);
        vec3 specular2 = lightColor2 * Ks * pow(Cos2, Shininess);
        vec3 specular3 = lightColor3 * Ks * pow(Cos3, Shininess);

        vec3 specular = specular1 + specular2 + specular3;  

        vec3 color = ambient + diffuse + specular;
    
        gl_FragColor = vec4(color,1.0);
    }
`
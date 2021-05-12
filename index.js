function getTab(ID){

    let panels = document.getElementsByClassName("panel");
    let tabs = document.getElementsByClassName("tab");

    for(var i=0 ; i<panels.length ; i++){
        panels[i].style.display = "none";
        tabs[i].style.backgroundColor = "#eee";
    }

    panels[ID].style.display = "grid";
    tabs[ID].style.backgroundColor = "#ccc";

}
let lightPanel = [
    { 
        flashing: {
            status: false,
            bR: 0,
            bG: 0,
            bB: 0,
            dR:0,
            dG:0,
            dB:0,
            origin_color: [],
        }, 
        moving: {
            status: false,
            mX: 0,
            mY: 0,
            mZ: 0,
            origin_position: []
        }, 
        changing: {
            status: false,
            A: 0,
            B: 0,
            origin_color: []
        } 
    },
    { 
        flashing: {
            status: false,
            bR: 0,
            bG: 0,
            bB: 0,
            dR:0,
            dG:0,
            dB:0,
            origin_color: [],
        }, 
        moving: {
            status: false,
            mX: 0,
            mY: 0,
            mZ: 0,
            origin_position: []
        }, 
        changing: {
            status: false,
            A: 0,
            B: 0,
            origin_color: []
        } 
    },
    { 
        flashing: {
            status: false,
            bR: 0,
            bG: 0,
            bB: 0,
            dR:0,
            dG:0,
            dB:0,
            origin_color: [],
        }, 
        moving: {
            status: false,
            mX: 0,
            mY: 0,
            mZ: 0,
            origin_position: []
        }, 
        changing: {
            status: false,
            A: 0,
            B: 0,
            origin_color: []
        } 
    }
]
const AUTO = -1;
const coe = 2 * Math.PI * 0.001;

function getTimeArg(range, type){
    let time = new Date().getMilliseconds();
    

    if(type === "cos")
        return Math.cos(time * coe) * range;
        
    else if(type === "sin")
        return Math.sin(time * coe) * range;
}

// Item Interact Block 1

// shader
function updateShader(id, value){
    config.item[id].shader = value;
}
// model
function updateModel(id, value){
    config.item[id].newload = true;
    config.item[id].model = value;
    init();
}

// Item Interact Block 2
let dimToIndex = {
    "x": 0,
    "y": 1,
    "z": 2,
    "all": 3
};

// translation
function getLocation(id, dim){
    let index = dimToIndex[dim];
    return config.item[id].location[index];
}
function updateLocation(id, src, value=0){

    let VB = document.getElementById(`TL${id}-VB`);
    let SB = document.getElementById(`TL${id}-SB`);
    let RB = document.getElementById(`TL${id}-RB`);

    if(src === "SB"){
        VB.value = getLocation(id, SB.value);
        RB.value = getLocation(id, SB.value);
        return;
    }

    else if(src === "RB"){
        value = RB.value;
        VB.value = value;
    }

    else if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    let index = dimToIndex[SB.value];
    config.item[id].location[index] = value;
}

// rotation
function getRotation(id){
    let direction = config.item[id].rotation.direction;
    if(direction[0] != 0)
        return "x";
    else if(direction[1] != 0)
        return "y";
    else if(direction[2] != 0)
        return "z";
}
function updateRotation(id, src, value=0){

    let VB = document.getElementById(`RT${id}-VB`);
    let SB = document.getElementById(`RT${id}-SB`);
    let RB = document.getElementById(`RT${id}-RB`);

    if(src === "SB"){
        if(SB.value == "x")
            config.item[id].rotation.direction = [1.0, 0.0, 0.0];
        else if(SB.value == "y")
            config.item[id].rotation.direction = [0.0, 1.0, 0.0];
        else if(SB.value == "z")
            config.item[id].rotation.direction = [0.0, 0.0, 1.0];
        return;
    }

    else if(src === "RB"){
        value = RB.value;
        VB.value = value;
    }

    else if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    config.item[id].rotation.degree = value;
}

// scaling
function getScaleRatio(id, dim){

    if(dim === "all")   dim = "x";
    let index = dimToIndex[dim];
    return config.item[id].scaling.ratio[index];
}
function updateScaling(id, src, value=0){

    let VB = document.getElementById(`SC${id}-VB`);
    let SB = document.getElementById(`SC${id}-SB`);
    let RB = document.getElementById(`SC${id}-RB`);

    if(src === "SB"){
        VB.value = getScaleRatio(id, SB.value)
        RB.value = getScaleRatio(id, SB.value)
        return;
    }

    else if(src === "RB"){
        value = RB.value;
        VB.value = value;
    }
    else if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }

    let index = dimToIndex[SB.value];
    if(index == 3)
        config.item[id].scaling.ratio = [value, value, value];
    else
        config.item[id].scaling.ratio[index] = value;

    console.log(config.item[id].scaling);
}

// shearing
function updateShearing(id, src, value=0){

    let VB = document.getElementById(`SH${id}-VB`);
    let RB = document.getElementById(`SH${id}-RB`);

    if(src === "RB"){
        value = RB.value;
        VB.value = value;
    }
    else if (src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else{
        VB.value = value;
        RB.value = value;
    }

    config.item[id].shear = value;
}
    
// Item Interact Block 3
function updateKa(id, src, value=0){
    let VB = document.getElementById(`KA${id}-VB`);
    let RB = document.getElementById(`KA${id}-RB`);

    if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else if(src === "RB"){
        value = RB.value;
        VB.value = value
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    config.item[id].Ka = value;
}
function updateKd(id, src, value=0){
    let VB = document.getElementById(`KD${id}-VB`);
    let RB = document.getElementById(`KD${id}-RB`);

    if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else if(src === "RB"){
        value = RB.value;
        VB.value = value
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    config.item[id].Kd = value;
}
function updateKs(id, src, value=0){
    let VB = document.getElementById(`KS${id}-VB`);
    let RB = document.getElementById(`KS${id}-RB`);

    if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else if(src === "RB"){
        value = RB.value;
        VB.value = value
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    config.item[id].Ks = value;
}
function updateShininess(id, src, value=0){
    let VB = document.getElementById(`SN${id}-VB`);
    let RB = document.getElementById(`SN${id}-RB`);

    if(src === "VB"){
        value = VB.value;
        RB.value = value;
    }
    else if(src === "RB"){
        value = RB.value;
        VB.value = value
    }
    else{
        RB.value = value;
        VB.value = value;
    }

    config.item[id].Shininess = value;
}


// Light Interact Block 1
function updateColor(id, src, channel, value=0, type="cos"){
    let RVB = document.getElementById(`R${id}-VB`);
    let RRB = document.getElementById(`R${id}-RB`);
    let GVB = document.getElementById(`G${id}-VB`);
    let GRB = document.getElementById(`G${id}-RB`);
    let BVB = document.getElementById(`B${id}-VB`);
    let BRB = document.getElementById(`B${id}-RB`);
    let AVB = document.getElementById(`A${id}-VB`);
    let ARB = document.getElementById(`A${id}-RB`);

    if(value === AUTO)
        value = getTimeArg(16, type);

    if(channel === "R"){
        switch(src){
            case "VB":
                value = RVB.value;
                RRB.value = value;
                break;
            case "RB":
                value = RRB.value;
                RVB.value = value;
                break;
            default:
                RRB.value = value;
                RVB.value = value;
        }
        config.light[id].color[0] = value;
    }
    else if(channel === "G"){
        switch(src){
            case "VB":
                value = GVB.value;
                GRB.value = value;
                break;
            case "RB":
                value = GRB.value;
                GVB.value = value;
                break;
            default:
                GRB.value = value;
                GVB.value = value;
        }
        config.light[id].color[1] = value;
    }
    else if(channel === "B"){
        switch(src){
            case "VB":
                value = BVB.value;
                BRB.value = value;
                break;
            case "RB":
                value = BRB.value;
                BVB.value = value;
                break;
            default:
                BRB.value = value;
                BVB.value = value;
        }
        config.light[id].color[2] = value;
    }
    else{
        switch(src){
            case "VB":
                value = AVB.value;
                RVB.value = value;
                GVB.value = value;
                BVB.value = value;
                RRB.value = value;
                GRB.value = value;
                BRB.value = value;
                ARB.value = value;
                break;

            case "RB":
                value = ARB.value;
                RVB.value = value;
                GVB.value = value;
                BVB.value = value;
                RRB.value = value;
                GRB.value = value;
                BRB.value = value;
                AVB.value = value;
                break;

            default:
                AVB.value = value;
                RVB.value = value;
                GVB.value = value;
                BVB.value = value;

                ARB.value = value;
                RRB.value = value;
                GRB.value = value;
                BRB.value = value;
                break;
        }
        config.light[id].color = [value, value, value];
    }

    if(lightPanel[id].flashing.status && src !=="flash"){
        flashingSwitch(id);
        lightPanel[id].flashing.origin_color = config.light[id].color;
        flashingSwitch(id);
    }
}
// Light Interact Block 2
function updateLightPosition(id, src, dim, value=0, type="cos"){
    let RB = document.getElementById(`${dim.toUpperCase()}${id}-RB`);
    let VB = document.getElementById(`${dim.toUpperCase()}${id}-VB`);

    if(value === AUTO)
        value = getTimeArg(720, type);

    switch(src){
        case "RB":
            value = RB.value;
            VB.value = value;
            break;
        case "VB":
            value = VB.value;
            RB.value = value;
            break;
        default:
            VB.value = value;
            RB.value = value;
            break;
    }
    let index = dimToIndex[dim];
    config.light[id].position[index] = value;
}
// Light Interact Block 3
function updateByColorPad(id){
    let pad = document.getElementById(`CL${id}`);
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(pad.value);

    let ratio = 64;
    let R = parseInt(result[1], 16) / ratio;
    let G = parseInt(result[2], 16) / ratio;
    let B = parseInt(result[3], 16) / ratio;
    
    updateColor(id, "pad", "R", R);
    updateColor(id, "pad", "G", G);
    updateColor(id, "pad", "B", B);
}
function updateByColorButton(id, btn_id){

    let R = 4 - Math.floor(btn_id / 9) * 2;
    let G = 4 - Math.floor((btn_id % 9) / 3) * 2;
    let B = 4 - (btn_id % 3) * 2;

    updateColor(id, "btn", "R", R);
    updateColor(id, "btn", "G", G);
    updateColor(id, "btn", "B", B);
    
    let pad = document.getElementById(`CL${id}`);
    let tran = {
        0: "00",
        2: "80",
        4: "ff"
    };
    pad.value = `#${tran[R]}${tran[G]}${tran[B]}`;
}


// feature 1
function autoRotateSwitch(id){
    let btn = document.getElementById(`AR${id}`);

    if(config.item[id].autoRotate){
        config.item[id].autoRotate = false;
        btn.style.backgroundColor = '#FF0000'; // red
    }
    else{
        config.item[id].autoRotate = true;
        btn.style.backgroundColor = '#0000FF'; // blue
    }
} 
function crazyRotateSwitch(id){
    let btn = document.getElementById(`CR${id}`);

    if(config.item[id].crazy){
        config.item[id].crazy = false;
        btn.style.backgroundColor = '#FF0000';
    }
    else{
        config.item[id].crazy = true;
        btn.style.backgroundColor = '#0000FF';
    }
} 
function vibingSwitch(id){
    let btn = document.getElementById(`V${id}`);

    if(config.item[id].vibing){
        config.item[id].vibing = false;
        btn.style.backgroundColor = '#FF0000';
    }
    else{
        config.item[id].vibing = true;
        btn.style.backgroundColor = '#0000FF';
    }
} 


// feature 2
function flashingSwitch(id){

    let inteval = 100;
    let flash = lightPanel[id].flashing;

    if(!flash.status){

        flash.origin_color = config.light[id].color.slice();
        flash.status = true;
        
        
        flash.bR = setInterval(updateColor, inteval, id, 'flash' ,'R', flash.origin_color[0] * 3);
        flash.bG = setInterval(updateColor, inteval, id, 'flash' ,'G', flash.origin_color[1] * 3);
        flash.bB = setInterval(updateColor, inteval, id, 'flash' ,'B', flash.origin_color[2] * 3);
        
        flash.dR = setInterval(updateColor, inteval * 2, id, 'flash' ,'R', flash.origin_color[0]);
        flash.dG = setInterval(updateColor, inteval * 2, id, 'flash' ,'G', flash.origin_color[1]);
        flash.dB = setInterval(updateColor, inteval * 2, id, 'flash' ,'B', flash.origin_color[2]);
        
        document.getElementById(`FL${id}`).style.backgroundColor='#0000FF';
    }
    else{
        
        clearInterval(flash.bR);
        clearInterval(flash.bG);
        clearInterval(flash.bB);
        
        clearInterval(flash.dR);
        clearInterval(flash.dG);
        clearInterval(flash.dB);
        
        
        flash.status = false;
        document.getElementById(`FL${id}`).style.backgroundColor='#FF0000';
    }

}
function movingSwitch(id){

    let interval = 20;
    let move = lightPanel[id].moving;

    if(!move.status){

        move.mX = setInterval(updateLightPosition, interval, id, 'move', 'x', AUTO, "cos");
        move.mY = setInterval(updateLightPosition, interval, id, 'move', 'y', AUTO, "sin");
        move.mZ = setInterval(updateLightPosition, interval, id, 'move', 'z', AUTO, "sin");

        move.status = true;
        move.origin_position = config.light[id].position;
        document.getElementById(`MV${id}`).style.backgroundColor='#0000FF';
    }
    else{
        clearInterval(move.mX);
        clearInterval(move.mY);
        clearInterval(move.mZ);

        move.status = false;
        updateLightPosition(id, 'move', 'x', move.origin_position[0]);
        updateLightPosition(id, 'move', 'y', move.origin_position[1]);
        updateLightPosition(id, 'move', 'z', move.origin_position[2]);

        document.getElementById(`MV${id}`).style.backgroundColor='#FF0000';
    }
}
function changingSwitch(id){
    let inteval = 50;
    let change = lightPanel[id].changing;

    if(!change.status){

        change.origin_color = config.light[id].color.slice();
        change.status = true;
        
        change.A = setInterval(updateColor, inteval, id, 'change' ,'R', AUTO, "cos");
        change.B = setInterval(updateColor, inteval, id, 'change' ,'G', AUTO, "sin");
        
        document.getElementById(`CH${id}`).style.backgroundColor='#0000FF';
    }
    else{
        
        clearInterval(change.A);
        clearInterval(change.B);
        
        change.status = false;
        document.getElementById(`CH${id}`).style.backgroundColor='#FF0000';
    }
    return 0;
}

function init(){
    
    let get = document.getElementById.bind(document);
    let boolColor = {
        true: '#0000FF',
        false: '#FF0000'
    };

    for(let i=0 ; i<3 ; i++){

        get(`SD${i}`).value = config.item[i].shader;

        get(`TL${i}-RB`).value = getLocation(i,"x");
        get(`TL${i}-VB`).value = getLocation(i,"x");

        get(`RT${i}-RB`).value = config.item[i].rotation.degree;
        get(`RT${i}-VB`).value = config.item[i].rotation.degree;
        get(`RT${i}-SB`).value = getRotation(i);

        get(`SC${i}-RB`).value = getScaleRatio(i,"x");
        get(`SC${i}-VB`).value = getScaleRatio(i,"x");

        get(`SH${i}-RB`).value = config.item[i].shear;
        get(`SH${i}-VB`).value = config.item[i].shear;

        get(`KA${i}-RB`).value = config.item[i].Ka;
        get(`KA${i}-VB`).value = config.item[i].Ka;

        get(`KD${i}-RB`).value = config.item[i].Kd;
        get(`KD${i}-VB`).value = config.item[i].Kd;

        get(`KS${i}-RB`).value = config.item[i].Ks;
        get(`KS${i}-VB`).value = config.item[i].Ks;

        get(`SN${i}-RB`).value = config.item[i].Shininess;
        get(`SN${i}-VB`).value = config.item[i].Shininess;

        get(`R${i}-RB`).value = config.light[i].color[0];
        get(`R${i}-VB`).value = config.light[i].color[0];

        get(`G${i}-RB`).value = config.light[i].color[1];
        get(`G${i}-VB`).value = config.light[i].color[1];

        get(`B${i}-RB`).value = config.light[i].color[2];
        get(`B${i}-VB`).value = config.light[i].color[2];

        get(`A${i}-RB`).value = config.light[i].color[0];
        get(`A${i}-VB`).value = config.light[i].color[0];

        get(`X${i}-RB`).value = config.light[i].position[0];
        get(`X${i}-VB`).value = config.light[i].position[0];

        get(`Y${i}-RB`).value = config.light[i].position[1];
        get(`Y${i}-VB`).value = config.light[i].position[1];

        get(`Z${i}-RB`).value = config.light[i].position[2];
        get(`Z${i}-VB`).value = config.light[i].position[2];

        get(`AR${i}`).style.backgroundColor = boolColor[config.item[i].autoRotate];
        get(`CR${i}`).style.backgroundColor = boolColor[config.item[i].crazy];
        get(`V${i}`).style.backgroundColor = boolColor[config.item[i].vibing];

    }
    let initPanel = get("tab-6");
    initPanel.click()
}

init();
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

function init(){
    
    let get = document.getElementById.bind(document);

    for(let i=0 ; i<1 ; i++){

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
    }
    let initPanel = get("tab-3");
    initPanel.click()
}
init();
    
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
function updateColor(id, src, channel, value=0){
    let RVB = document.getElementById(`R${id}-VB`);
    let RRB = document.getElementById(`R${id}-RB`);
    let GVB = document.getElementById(`G${id}-VB`);
    let GRB = document.getElementById(`G${id}-RB`);
    let BVB = document.getElementById(`B${id}-VB`);
    let BRB = document.getElementById(`B${id}-RB`);
    let AVB = document.getElementById(`A${id}-VB`);
    let ARB = document.getElementById(`A${id}-RB`);

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
}

// option
function autoRotateSwitch(id){
    let btn = document.getElementById("AR"+(id+1).toString());
    config.item[id].autoRotate = !config.item[id].autoRotate;

    if(config.item[id].autoRotate)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 
function crazySwitch(id){
    let btn = document.getElementById("C"+(id+1).toString());
    config.item[id].crazy = !config.item[id].crazy;

    if(config.item[id].crazy)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 
function dancingSwitch(id){
    let btn = document.getElementById("D"+(id+1).toString());
    config.item[id].dancing = !config.item[id].dancing;

    if(config.item[id].dancing)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 

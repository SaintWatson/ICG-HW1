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

// Interact Block 1

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

// Interact Block 2
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
    }
}
init();
    
// Interact Block 3
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

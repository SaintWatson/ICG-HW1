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
    // init();
}

// Interact Block 2
let dimToIndex = {
    "x": 0,
    "y": 1,
    "z": 2,
    "all": 3
};

// translation
function getLocation(iid, dim){
    let index = dimToIndex[dim];
    return config.item[iid].location[index];
}

function updateLocation(iid, src){

    let TXT = document.getElementById("txt" + (iid+1).toString() + "-1");
    let SB = document.getElementById("sb" + (iid+1).toString() + "-1");
    let RB = document.getElementById("rb" + (iid+1).toString() + "-1")
    let value = 0;

    if(src === "sb"){
        TXT.value = getScaling(iid, SB.value);
        RB.value = getScaling(iid, SB.value);
        return;
    }

    if(src === "rb"){
        value = RB.value;
        TXT.value = value;
    }
    else{
        value = TXT.value;
        RB.value = value;
    }

    let index = dimToIndex[SB.value];
    config.item[iid].location[index] = value;
}

// rotation
function getRotation(iid){
    let direction = config.item[iid].rotation.direction;
    if(direction[0] != 0)
        return "x";
    else if(direction[1] != 0)
        return "y";
    else if(direction[2] != 0)
        return "z";
}
function updateRotation(iid, src){

    let TXT = document.getElementById("txt" + (iid+1).toString() + "-2");
    let SB = document.getElementById("sb" + (iid+1).toString() + "-2");
    let RB = document.getElementById("rb" + (iid+1).toString() + "-2")
    let value = TXT.value;

    if(src === "sb"){
        if(SB.value == "x")
            config.item[iid].rotation.direction = [1.0, 0.0, 0.0];
        else if(SB.value == "y")
            config.item[iid].rotation.direction = [0.0, 1.0, 0.0];
        else if(SB.value == "z")
            config.item[iid].rotation.direction = [0.0, 0.0, 1.0];
        return;
    }

    if(src === "rb"){
        value = RB.value;
        TXT.value = value;
    }
    else{
        value = TXT.value;
        RB.value = value;
    }

    config.item[iid].rotation.degree = value;
}

// scaling
function getScaling(iid, dim){
    if(dim === "all")
        dim = "x";
    let index = dimToIndex[dim];
    return config.item[iid].scale[index];
}
function updateScaling(iid, src){

    let TXT = document.getElementById("txt" + (iid+1).toString() + "-3");
    let SB = document.getElementById("sb" + (iid+1).toString() + "-3");
    let RB = document.getElementById("rb" + (iid+1).toString() + "-3");
    let value = 0;

    if(src === "sb"){
        TXT.value = getScaling(iid, SB.value)
        return;
    }

    if(src === "rb"){
        value = RB.value;
        TXT.value = value;
    }
    else{
        value = TXT.value;
        RB.value = value;
    }

    let index = dimToIndex[SB.value];
    if(index == 3)
        config.item[iid].scale = [value, value, value];
    else
        config.item[iid].scale[index] = value;
}

// shearing
function updateShearing(iid, src){

    let TXT = document.getElementById("txt" + (iid+1).toString() + "-4");
    let RB = document.getElementById("rb" + (iid+1).toString() + "-4");
    let value = TXT.value;

    if(src === "rb"){
        value = RB.value;
        TXT.value = value;
    }
    else{
        value = TXT.value;
        RB.value = value;
    }

    config.item[iid].shear = value;
}

function init(){
    for(let i=1 ; i<=3 ; i++){

        let SS = document.getElementById("SS" + i.toString());
        SS.value = config.item[i-1].shader;

        let TXT1 = document.getElementById("txt" + i.toString() + "-1");
        let RB1 = document.getElementById("rb" + i.toString() + "-1");
        TXT1.value = getLocation(i-1,"x");
        RB1.value = getLocation(i-1,"x");
        
        let TXT2 = document.getElementById("txt" + i.toString() + "-2");
        let RB2 = document.getElementById("rb" + i.toString() + "-2");
        let SB2 = document.getElementById("sb" + i.toString() + "-2");
        TXT2.value = config.item[i-1].rotation.degree;
        RB2.value = config.item[i-1].rotation.degree;
        SB2.value = getRotation(i-1);
        
        let TXT3 = document.getElementById("txt" + i.toString() + "-3");
        let RB3 = document.getElementById("rb" + i.toString() + "-3");
        TXT3.value = getScaling(i-1,"x");
        RB3.value = getScaling(i-1,"x");
        
        let TXT4 = document.getElementById("txt" + i.toString() + "-4");
        let RB4 = document.getElementById("rb" + i.toString() + "-4");
        TXT4.value = config.item[i-1].shear;
        RB4.value = config.item[i-1].shear;
    }
}
// init();
    
// Interact Block 3
function autoRotateSwitch(iid){
    let btn = document.getElementById("AR"+(iid+1).toString());
    config.item[iid].autoRotate = !config.item[iid].autoRotate;

    if(config.item[iid].autoRotate)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 
function crazySwitch(iid){
    let btn = document.getElementById("C"+(iid+1).toString());
    config.item[iid].crazy = !config.item[iid].crazy;

    if(config.item[iid].crazy)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 
function dancingSwitch(iid){
    let btn = document.getElementById("D"+(iid+1).toString());
    config.item[iid].dancing = !config.item[iid].dancing;

    if(config.item[iid].dancing)
        btn.style.backgroundColor = '#0000FF';
    else
        btn.style.backgroundColor = '#FF0000';
} 

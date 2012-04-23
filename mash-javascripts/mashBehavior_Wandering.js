// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Behaviors Package                                                                                                  //
// Wandering behavior                                                                                                 //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Jul 27, 2003                                                                                             //
// Modified:                                                                                                          //
// =====================================================================================================================





// =====================================================================================================================
// wandering behavior                                                                                 wandering behavior
// =====================================================================================================================


var BEHAVIOR_TYPE       = 0;
var WANDERING_INTERVAL  = 1;
var WANDERING_RANDOMIZE = 2;
var WANDERING_X         = 3;
var WANDERING_Y         = 4;
var WANDERING_ACTIVE    = 5;
//var behavior = new Array("wandering", 20, 5000, 1, 1, true);
                        
var WANDERING_BOX_LEFT_MARGIN   = 1;
var WANDERING_BOX_TOP_MARGIN    = 50;
var WANDERING_BOX_RIGHT_MARGIN  = 1200;
var WANDERING_BOX_BOTTOM_MARGIN = 1200;



// =====================================================================================================================
// MASH_Behavior_Wandering                                                                       MASH_Behavior_Wandering
// =====================================================================================================================
function MASH_Behavior_Wandering() {
                    
    this.base = MASH_Behavior;
    this.base("Wandering");
              
    this.interval  = (Math.random() * 90)   + 100;
    this.randomize = (Math.random() * 4000) + 1000;
    this.x         = (Math.random() * 9)    - 4;
    this.y         = (Math.random() * 9)    - 4;
    this.active    = false;
    //var behavior = new Array("wandering", 20, 5000, 1, 1, true);
                            
    this.WANDERING_BOX_LEFT_MARGIN   = 1;
    this.WANDERING_BOX_TOP_MARGIN    = 50;
    this.WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
    this.WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

}
//set inheritance
MASH_Behavior_Wandering.prototype             = new MASH_Behavior("Wandering");
MASH_Behavior_Wandering.prototype.constructor = MASH_Behavior_Wandering;
//MASH_Behavior_Wandering


// ---------------------------------------------------------------------------------------------------------------------
// Class Methods                                                                                           Class Methods
// ---------------------------------------------------------------------------------------------------------------------


// writeBehaviors                                                                                         writeBehaviors
// ---------------------------------------------------------------------------------------------------------------------
// * writes the behavior controls in the web page
MASH_Behavior_Wandering.writeControls = function(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Wandering:</span>");
    document.writeln("<a href=\"javascript:MASH_Behavior_Wandering.makeAllWandering();\"><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">All</span></a>");
    document.writeln("<a href=\"javascript:MASH_Behavior_Wandering.startWandering(0);\" ><span style=\"color:#0000bb; font-family:arial; font-size:8pt; font-weight:bold;\">One</span></a>");
    document.writeln("<a href=\"javascript:MASH_Behavior_Wandering.stopWandering(0);\"  ><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Stop</span></a>&nbsp;||&nbsp;");

}//writeBehaviors


// makeAllWandering                                                                                     makeAllWandering
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.makeAllWandering = function(){
    MASH_Behavior_Wandering.makeAllWanderingObjects(allMASHObjects);
}//makeAllWandering


// makeAllWanderingObjects                                                                       makeAllWanderingObjects
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.makeAllWanderingObjects = function(tmpObjectArray){

    if(!tmpObjectArray) { return; }

    for(var i=0; i<tmpObjectArray.length; i++) {

        //define new behavior
        var tmpBehaviorObject         = new MASH_Behavior_Wandering();
        
        //difine behavior for this object
        tmpBehaviorObject.interval    = (Math.random() * 90)   + 10;
        tmpBehaviorObject.randomize   = (Math.random() * 4000) + 1000;
        tmpBehaviorObject.x           = (Math.random() * 9)    - 4;
        tmpBehaviorObject.y           = (Math.random() * 9)    - 4;
        tmpBehaviorObject.active      = true;

        //redefine wandering box
        tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN   = 1;
        tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN    = 50;
        tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
        tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

        //add behavior to object
        addBehaviorObject(tmpObjectArray[i], tmpBehaviorObject);

        //start behavior
        MASH_Behavior_Wandering.randomizeDirectionObject(i);
        MASH_Behavior_Wandering.wanderingObject(i);

        //make components wander too

//        MASH_Behavior_Wandering.makeAllWanderingObjects(tmpObjectArray[i].components);

    }//for i

}//makeAllWanderingObjects



// makeSomeWandering                                                                                   makeSomeWandering
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.makeSomeWandering = function(wanderingObjects){

    if(!wanderingObjects) {
        wanderingObjects = new Array();
        for(var j=0; ((j<allMASHObjects) && (j<10)); j++){
            wanderingObjects[j] = allMASHObjects[j];
        }//for j
    }

    var total = wanderingObjects.length;                                          

    //some images
    for(var i=0; i<total; i++) {

        //difine behavior for this object
        var tmpBehaviorObject         = new MASH_Behavior_Wandering();
        
        tmpBehaviorObject.interval    = (Math.random() * 90)   + 10;
        tmpBehaviorObject.randomize   = (Math.random() * 4000) + 1000;
        tmpBehaviorObject.x           = (Math.random() * 2)    - 2;
        tmpBehaviorObject.y           = (Math.random() * 2)    - 2;
        tmpBehaviorObject.active      = true;

        //redefine wandering box
        tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN   = 9;
        tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN    = 9;
        tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN  = 800;
        tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN = 355;

        //add behavior to object
        addBehaviorObject(wanderingObjects[i], tmpBehaviorObject);

        //start behavior
        MASH_Behavior_Wandering.randomizeDirectionObjectByID(wanderingObjects[i].id);
        MASH_Behavior_Wandering.wanderingObjectByID(wanderingObjects[i].id);

    }
    
}//makeSomeWandering


// startWandering                                                                                         startWandering
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.startWandering = function(objIndex){

    //verify that the object exists
    if(!allMASHObjects[objIndex]) { return; }

    //difine behavior for this object
    var tmpBehaviorObject         = new MASH_Behavior_Wandering();
    
    tmpBehaviorObject.interval    = (Math.random() * 90)   + 10;
    tmpBehaviorObject.randomize   = (Math.random() * 4000) + 1000;
    tmpBehaviorObject.x           = (Math.random() * 9)    - 4;
    tmpBehaviorObject.y           = (Math.random() * 9)    - 4;
    tmpBehaviorObject.active      = true;


    //redefine wandering box
    tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN   = 1;
    tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN    = 50;
    tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
    tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

    //add behavior to object
    addBehaviorObject(allMASHObjects[objIndex], tmpBehaviorObject);

    //start behavior
    MASH_Behavior_Wandering.randomizeDirectionObject(objIndex);
    MASH_Behavior_Wandering.wanderingObject(objIndex);

}//startWandering


// stopWandering                                                                                           stopWandering
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.stopWandering = function(objIndex){

    for(var i=0; i<allMASHObjects.length;i++) { 
        var tmpBehaviorObject = getBehaviorObject(allMASHObjects[i], "Wandering");
        if(tmpBehaviorObject!=null) {
            tmpBehaviorObject.active = false; 
        }
    }
    
}//stopWandering



// randomizeDirectionObject                                                                     randomizeDirectionObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.randomizeDirectionObject = function(objIndex){

    var tmpBehaviorObject = getBehaviorObject(allMASHObjects[objIndex], "Wandering");

    if(!tmpBehaviorObject.active) { return; }
    
    if(tmpBehaviorObject.active) { 
        tmpBehaviorObject.x = (Math.random() * 9) - 4;
        tmpBehaviorObject.y = (Math.random() * 9) - 4;
        window.setTimeout("MASH_Behavior_Wandering.randomizeDirectionObject("+objIndex+")", tmpBehaviorObject.randomize); 
    }

}//randomizeDirectionObject


// wanderingObject                                                                                       wanderingObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.wanderingObject = function(objIndex){
    
    var tmpBehaviorObject = getBehaviorObject(allMASHObjects[objIndex], "Wandering");

    if(!tmpBehaviorObject.active) { return; }
    
    if(tmpBehaviorObject.active) {
    
        //move object
        var obj            = allMASHObjects[objIndex].reference;
        
        obj.style.left     = obj.offsetLeft + tmpBehaviorObject.x; 
        obj.style.top      = obj.offsetTop  + tmpBehaviorObject.y;
        
        //make sure that the object remains inside the wandering area
        if(obj.offsetLeft                     <= tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN)   { tmpBehaviorObject.x *= -1; }
        if((obj.offsetLeft + obj.offsetWidth) >= tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN)  { tmpBehaviorObject.x *= -1; }
        if(obj.offsetTop                      <= tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN)    { tmpBehaviorObject.y *= -1; }
        if((obj.offsetTop + obj.offsetHeight) >= tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN) { tmpBehaviorObject.y *= -1; }

        //reset timeout
        window.setTimeout("MASH_Behavior_Wandering.wanderingObject("+objIndex+")", tmpBehaviorObject.interval); 
    }

}//wanderingObject



// randomizeDirectionObjectByID                                                             randomizeDirectionObjectByID
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.randomizeDirectionObjectByID = function(objID){

    var obj = findObjectByID(objID);
    if(!obj) { return; }

    var tmpBehaviorObject = getBehaviorObject(obj, "Wandering");

    if(!tmpBehaviorObject.active) { return; }
    
    if(tmpBehaviorObject.active) { 
        tmpBehaviorObject.x = (Math.random() * 2) - 0.5;
//        if(Math.random() > 0.5) { tmpBehaviorObject.x *= -1; }
        tmpBehaviorObject.y = (Math.random() * 2) - 0.5;
//        if(Math.random() > 0.5) { tmpBehaviorObject.y *= -1; }
        window.setTimeout("MASH_Behavior_Wandering.randomizeDirectionObjectByID(\""+objID+"\")", tmpBehaviorObject.randomize); 
    }

}//randomizeDirectionObjectByID


// wanderingObjectByID                                                                               wanderingObjectByID
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.wanderingObjectByID = function(objID){
    
    var obj = findObjectByID(objID);
    if(!obj) { return; }

    var tmpBehaviorObject = getBehaviorObject(obj, "Wandering");

    if(!tmpBehaviorObject.active) { return; }
    
    if(tmpBehaviorObject.active) {
    
        //move object
        objScreen            = obj.reference;
        objScreen.style.left = objScreen.offsetLeft + tmpBehaviorObject.x; 
        objScreen.style.top  = objScreen.offsetTop  + tmpBehaviorObject.y;
        
        //make sure that the object remains inside the wandering area
        if(objScreen.offsetLeft <= 0) { objScreen.style.left = objScreen.offsetLeft * (-2); }
        if(objScreen.offsetTop  <= 0) { objScreen.style.top  = objScreen.offsetTop  * (-2); }

        if(objScreen.offsetLeft                            <= tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN)   { tmpBehaviorObject.x *= -1.0; objScreen.style.left = objScreen.offsetLeft + 12*tmpBehaviorObject.x; }
        if((objScreen.offsetLeft + objScreen.offsetWidth)  >= tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN)  { tmpBehaviorObject.x *= -1.0; objScreen.style.left = objScreen.offsetLeft + 12*tmpBehaviorObject.x; }
        if(objScreen.offsetTop                             <= tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN)    { tmpBehaviorObject.y *= -1.0; objScreen.style.top  = objScreen.offsetTop  + 12*tmpBehaviorObject.y; }
        if((objScreen.offsetTop  + objScreen.offsetHeight) >= tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN) { tmpBehaviorObject.y *= -1.0; objScreen.style.top  = objScreen.offsetTop  + 12*tmpBehaviorObject.y; }

        //reset timeout
        window.setTimeout("MASH_Behavior_Wandering.wanderingObjectByID(\""+objID+"\")", tmpBehaviorObject.interval); 
    }

}//wanderingObjectByID



// redefineWanderingBox                                                                             redefineWanderingBox
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_Wandering.redefineWanderingBox = function(left, top, right, bottom){

    //redifine wandering box
    tmpBehaviorObject.WANDERING_BOX_LEFT_MARGIN   = left;
    tmpBehaviorObject.WANDERING_BOX_TOP_MARGIN    = top;
    tmpBehaviorObject.WANDERING_BOX_RIGHT_MARGIN  = right;
    tmpBehaviorObject.WANDERING_BOX_BOTTOM_MARGIN = bottom
    
}//redefineWanderingBox



/*
// makeAllWandering                                                                                     makeAllWandering
// ---------------------------------------------------------------------------------------------------------------------
function makeAllWandering(){

    makeAllWanderingObjects(allMASHObjects);

}//makeAllWandering


// makeAllWanderingObjects                                                                       makeAllWanderingObjects
// ---------------------------------------------------------------------------------------------------------------------
function makeAllWanderingObjects(tmpObjectArray){

    if(!tmpObjectArray) { return; }

    //redifine wandering box
    WANDERING_BOX_LEFT_MARGIN   = 1;
    WANDERING_BOX_TOP_MARGIN    = 50;
    WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
    WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

    for(var i=0; i<tmpObjectArray.length; i++) {

        //add behavior to object
        var tmpBehaviorArray                    = new Array();
        
        tmpBehaviorArray[BEHAVIOR_TYPE]         = "wandering";
        tmpBehaviorArray[WANDERING_INTERVAL]    = (Math.random() * 90)   + 10;
        tmpBehaviorArray[WANDERING_RANDOMIZE]   = (Math.random() * 4000) + 1000;
        tmpBehaviorArray[WANDERING_X]           = (Math.random() * 9)    - 4;
        tmpBehaviorArray[WANDERING_Y]           = (Math.random() * 9)    - 4;
        tmpBehaviorArray[WANDERING_ACTIVE]      = true;

        addBehavior(tmpObjectArray[i], tmpBehaviorArray);

        //start behavior
        randomizeDirectionObject(i);
        wanderingObject(i);

        //make components wander too

//        makeAllWanderingObjects(tmpObjectArray[i].components);

    }//for i


}//makeAllWanderingObjects



// makeSomeWandering                                                                                   makeSomeWandering
// ---------------------------------------------------------------------------------------------------------------------
function makeSomeWandering(){

    //redifine wandering box
    WANDERING_BOX_LEFT_MARGIN   = 1;
    WANDERING_BOX_TOP_MARGIN    = 50;
    WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
    WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

    
    //some images
    for(var i=0; i<10; i++) {

        //add behavior to object
        var tmpBehaviorArray                    = new Array();
        
        tmpBehaviorArray[BEHAVIOR_TYPE]         = "wandering";
        tmpBehaviorArray[WANDERING_INTERVAL]    = (Math.random() * 90)   + 10;
        tmpBehaviorArray[WANDERING_RANDOMIZE]   = (Math.random() * 4000) + 1000;
        tmpBehaviorArray[WANDERING_X]           = (Math.random() * 9)    - 4;
        tmpBehaviorArray[WANDERING_Y]           = (Math.random() * 9)    - 4;
        tmpBehaviorArray[WANDERING_ACTIVE]      = true;

        addBehavior(allMASHObjects[i], tmpBehaviorArray);

        //start behavior
        randomizeDirectionObject(i);
        wanderingObject(i);

    }
    
}//makeSomeWandering


// startWandering                                                                                         startWandering
// ---------------------------------------------------------------------------------------------------------------------
function startWandering(objIndex){

    //redifine wandering box
    WANDERING_BOX_LEFT_MARGIN   = 1;
    WANDERING_BOX_TOP_MARGIN    = 50;
    WANDERING_BOX_RIGHT_MARGIN  = getWindowWidth()  - 10;
    WANDERING_BOX_BOTTOM_MARGIN = getWindowHeight() - 10;

    //verify that the object exists
    if(!allMASHObjects[objIndex]) { return; }

    
    //add behavior to object
    var tmpBehaviorArray                    = new Array();
    
    tmpBehaviorArray[BEHAVIOR_TYPE]         = "wandering";
    tmpBehaviorArray[WANDERING_INTERVAL]    = (Math.random() * 90)   + 10;
    tmpBehaviorArray[WANDERING_RANDOMIZE]   = (Math.random() * 4000) + 1000;
    tmpBehaviorArray[WANDERING_X]           = (Math.random() * 9)    - 4;
    tmpBehaviorArray[WANDERING_Y]           = (Math.random() * 9)    - 4;
    tmpBehaviorArray[WANDERING_ACTIVE]      = true;

    addBehavior(allMASHObjects[objIndex], tmpBehaviorArray);

    //start behavior
    randomizeDirectionObject(objIndex);
    wanderingObject(objIndex);

}//startWandering


// stopWandering                                                                                           stopWandering
// ---------------------------------------------------------------------------------------------------------------------
function stopWandering(objIndex){

    
    for(var i=0; i<allMASHObjects.length;i++) { 
        var tmpBehaviorArray = getBehavior(allMASHObjects[i], "wandering");
        if(tmpBehaviorArray!=null) {
            tmpBehaviorArray[WANDERING_ACTIVE] = false; 
        }
    }
    
}//stopWandering



// randomizeDirectionObject                                                                     randomizeDirectionObject
// ---------------------------------------------------------------------------------------------------------------------
function randomizeDirectionObject(objIndex){

    var tmpBehaviorArray = getBehavior(allMASHObjects[objIndex], "wandering");

    if(!tmpBehaviorArray[WANDERING_ACTIVE]) { return; }
    
    if(tmpBehaviorArray[WANDERING_ACTIVE]) { 
        tmpBehaviorArray[WANDERING_X] = (Math.random() * 9) - 4;
        tmpBehaviorArray[WANDERING_Y] = (Math.random() * 9) - 4;
        window.setTimeout("randomizeDirectionObject("+objIndex+")", tmpBehaviorArray[WANDERING_RANDOMIZE]); 
    }

}//randomizeDirectionObject


// wanderingObject                                                                                       wanderingObject
// ---------------------------------------------------------------------------------------------------------------------
function wanderingObject(objIndex){
    
    var tmpBehaviorArray = getBehavior(allMASHObjects[objIndex], "wandering");

    if(!tmpBehaviorArray[WANDERING_ACTIVE]) { return; }
    
    if(tmpBehaviorArray[WANDERING_ACTIVE]) {
    
        //move object
        var objWandering            = allMASHObjects[objIndex].reference;
        
        objWandering.style.left     = objWandering.offsetLeft + tmpBehaviorArray[WANDERING_X]; 
        objWandering.style.top      = objWandering.offsetTop  + tmpBehaviorArray[WANDERING_Y];
        
        //make sure that the object remains inside the wandering area
        if(objWandering.offsetLeft                            <= WANDERING_BOX_LEFT_MARGIN)   { tmpBehaviorArray[WANDERING_X] *= -1; }
        if((objWandering.offsetLeft+objWandering.offsetWidth) >= WANDERING_BOX_RIGHT_MARGIN)  { tmpBehaviorArray[WANDERING_X] *= -1; }
        if(objWandering.offsetTop                             <= WANDERING_BOX_TOP_MARGIN)    { tmpBehaviorArray[WANDERING_Y] *= -1; }
        if((objWandering.offsetTop+objWandering.offsetHeight) >= WANDERING_BOX_BOTTOM_MARGIN) { tmpBehaviorArray[WANDERING_Y] *= -1; }

        //reset timeout
        window.setTimeout("wanderingObject("+objIndex+")", tmpBehaviorArray[WANDERING_INTERVAL]); 
    }

}//wanderingObject


*/
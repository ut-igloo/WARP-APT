// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Behaviors Package                                                                                                  //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Sep 09, 2002                                                                                             //
// Modified: Jul 25, 2003                                                                                             //
// =====================================================================================================================




// =====================================================================================================================
// MASH_Behavior                                                                                           MASH_Behavior
// =====================================================================================================================
function MASH_Behavior(behaviorType) {

    //type
    this.type = behaviorType;

}//MASH_Behavior

//Class Constants
MASH_Behavior.COOKIE_NAME                 = "mash_behaviors";



// =====================================================================================================================
// BEHAVIOR OBJECTS                                                                                     BEHAVIOR OBJECTS
// =====================================================================================================================



// getBehaviorObject                                                                                   getBehaviorObject
// ---------------------------------------------------------------------------------------------------------------------
function getBehaviorObject(obj, behaviorType){

    //get the behavior array for this object
    if(!obj) { return null; }

    //get the behavior array for this object
    if(!obj.behaviors) { obj.behaviors = new Array(); }
    
    //find specified behavior
    for(var j=0; j<obj.behaviors.length; j++) {
        if(obj.behaviors[j].type == behaviorType) {
            return obj.behaviors[j];
        }
    }
    return null;

}//getBehaviorObject


// getBehaviorObjectIndex                                                                         getBehaviorObjectIndex
// ---------------------------------------------------------------------------------------------------------------------
function getBehaviorObjectIndex(obj, behaviorType){

    //get the behavior array for this object
    if(obj.behaviors == null) { obj.behaviors = new Array(); }
    
    //find specified behavior
    for(var j=0; j<obj.behaviors.length; j++) {
        if(obj.behaviors[j].type == behaviorType) {
            return j;
        }
    }
    return null;

}//getBehaviorObjectIndex


// addBehaviorObject                                                                                   addBehaviorObject
// ---------------------------------------------------------------------------------------------------------------------
function addBehaviorObject(obj, behaviorObject){

     if(!obj) { alert("obj = "+obj); }

    //add behavior to object
    if(obj.behaviors == null) { obj.behaviors = new Array(); }

    //find specified behavior
//    var tmpBehavior = null;
    var tmpIndex    = -1;
    for(var j=0; j<obj.behaviors.length; j++) {
        if(obj.behaviors[j].type == behaviorObject.type) {
//            tmpBehavior = obj.behaviors[j];
            tmpIndex    = j;
            break;
        }
    }
    
    //if the behavior DOES NOT exist, then add the behavior at the end
    if(tmpIndex == -1) { tmpIndex = obj.behaviors.length; }
    //set the behavior
    obj.behaviors[tmpIndex] = behaviorObject;

/*
    if(tmpBehavior == null) {
        //add the behavior
        var nextElement            = obj.behaviors.length; 
        obj.behaviors[nextElement] = behaviorObject;
    }
    //if the behavior DOES exist
    else {
        //replace the behavior parameters
        obj.behaviors[tmpIndex] = behaviorObject;
    }
*/    
    
}//addBehaviorObject



// =====================================================================================================================
// BEHAVIORS                                                                                                   BEHAVIORS
// =====================================================================================================================



// getBehavior                                                                                               getBehavior
// ---------------------------------------------------------------------------------------------------------------------
function getBehavior(tmpObj, tmpBehaviorType){

    //get the behavior array for this object
    if(!tmpObj) { return null; }

    //get the behavior array for this object
    if(!tmpObj.behaviors) { tmpObj.behaviors = new Array(); }
    
    //find specified behavior
    for(var j=0; j<tmpObj.behaviors.length; j++) {
        if(tmpObj.behaviors[j][BEHAVIOR_TYPE] == tmpBehaviorType) {
            return tmpObj.behaviors[j];
        }
    }
    return null;

}//getBehavior


// getBehaviorIndex                                                                                     getBehaviorIndex
// ---------------------------------------------------------------------------------------------------------------------
function getBehaviorIndex(tmpObj, tmpBehaviorType){

    //get the behavior array for this object
    if(tmpObj.behaviors == null) { tmpObj.behaviors = new Array(); }
    
    //find specified behavior
    for(var j=0; j<tmpObj.behaviors.length; j++) {
        if(tmpObj.behaviors[j][BEHAVIOR_TYPE] == tmpBehaviorType) {
            return j;
        }
    }
    return null;

}//getBehaviorIndex


// addBehavior                                                                                               addBehavior
// ---------------------------------------------------------------------------------------------------------------------
function addBehavior(tmpObj, tmpBehaviorParms){

     if(!tmpObj) { alert("tmpObj = "+tmpObj); }

    //add behavior to object
    if(tmpObj.behaviors == null) { tmpObj.behaviors = new Array(); }

    //find specified behavior
    var tmpBehavior = null;
    var tmpIndex    = 0;
    for(var j=0; j<tmpObj.behaviors.length; j++) {
        if(tmpObj.behaviors[j][BEHAVIOR_TYPE] == tmpBehaviorParms[BEHAVIOR_TYPE]) {
            tmpBehavior = tmpObj.behaviors[j];
            tmpIndex    = j;
            break;
        }
    }
    
    //if the behavior DOES NOT exist
    if(tmpBehavior == null) {
        //add the behavior
        var nextElement               = tmpObj.behaviors.length; 
        tmpObj.behaviors[nextElement] = tmpBehaviorParms;
    }
    
    //if the behavior DOES exist
    else {
        //replace the behavior parameters
        tmpObj.behaviors[tmpIndex] = tmpBehaviorParms;
    }
    
}//addBehavior




/*
// =====================================================================================================================
// Replace Image Behavior                                                                         Replace Image Behavior
// =====================================================================================================================

var picture      = new Array();

var BEHAVIOR_TYPE       = 0;
var REPLACE_SRC         = 1;
var REPLACE_WIDTH       = 2;
var REPLACE_HEIGHT      = 3;
var REPLACE_TITLE       = 4;
var REPLACE_Z_INDEX     = 5;
var REPLACE_CHANGED     = 6;

var REPLACE_IS_NOT_INITIALIZED = true;

// initReplaceBehavior                                                                               initReplaceBehavior
// ---------------------------------------------------------------------------------------------------------------------
function initReplaceBehavior(){

    //add behavior to images
    for(var i=0; i<imageObjects.length;i++) {
       
        var tmpReplaceArray                 = new Array();
        
        tmpReplaceArray[BEHAVIOR_TYPE]      = "replace";
        tmpReplaceArray[REPLACE_SRC]        = picture[i].src;
        tmpReplaceArray[REPLACE_WIDTH]      = picture[i].width;
        tmpReplaceArray[REPLACE_HEIGHT]     = picture[i].height;
        tmpReplaceArray[REPLACE_TITLE]      = picture[i].text;
        tmpReplaceArray[REPLACE_Z_INDEX]    = 0;
        tmpReplaceArray[REPLACE_CHANGED]    = false;

        addBehavior(imageObjects[i], tmpReplaceArray);
    }
    
    REPLACE_IS_NOT_INITIALIZED = false;

}//initReplaceBehavior
    

// repaceImg                                                                                                   repaceImg
// ---------------------------------------------------------------------------------------------------------------------
//function repaceImg(i){
function repaceImg(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    tmpEvent = validateEventObject(tmpEvent);

    if(wasDragged) { return }

    //get the object that called this function
    var wrapperObj      = getCurrentTarget(tmpEvent);

    var objIndex        = wrapperObj.objectIndex;
    
    var tmpObjID        = MASH_Image.ID_PREFIX       + objIndex;
    var tmpObjInnerID   = MASH_Image.INNER_ID_PREFIX + objIndex;

    if(wrapperObj.id == tmpObjID) {
        var childrenObj = wrapperObj.childNodes;
        var innerObj    = wrapperObj.childNodes[0];
    }
    else if(wrapperObj.id == tmpObjInnerID) {
        innerObj        = wrapperObj;
        wrapperObj      = document.getElementById(tmpObjID);
    }

    objIndex            = wrapperObj.objectIndex;
    var innerWindow     = innerObj.contentWindow;
    

//    innerObj    = document.getElementById(MASH_Image.INNER_ID_PREFIX + objIndex);
//    wrapperObj  = document.getElementById(MASH_Image.ID_PREFIX       + objIndex);

    if(innerObj == null) { return }
    
    if(REPLACE_IS_NOT_INITIALIZED) { initReplaceBehavior(); }
    
    var tmpReplaceArray                 = getBehavior(imageObjects[objIndex], "replace");
    
    //change current parameters with the stored parameters
    var tmpSrc                          = innerObj.src;
    var tmpWidth                        = getObjectCurrentWidth(wrapperObj);
    var tmpHeight                       = getObjectCurrentHeight(wrapperObj);
    var tmpTitle                        = innerObj.title;
    var tmpZIndex                       = wrapperObj.style.zIndex;

    innerObj.src                        = tmpReplaceArray[REPLACE_SRC]; 
    innerObj.style.width                = tmpReplaceArray[REPLACE_WIDTH];
    innerObj.style.height               = tmpReplaceArray[REPLACE_HEIGHT];
    innerObj.title                      = tmpReplaceArray[REPLACE_TITLE];
    wrapperObj.style.width              = tmpReplaceArray[REPLACE_WIDTH];
    wrapperObj.style.height             = tmpReplaceArray[REPLACE_HEIGHT];
    wrapperObj.style.zIndex             = ++topZ;

    tmpReplaceArray[BEHAVIOR_TYPE]      = "replace";
    tmpReplaceArray[REPLACE_SRC]        = tmpSrc;
    tmpReplaceArray[REPLACE_WIDTH]      = tmpWidth;
    tmpReplaceArray[REPLACE_HEIGHT]     = tmpHeight;
    tmpReplaceArray[REPLACE_TITLE]      = tmpTitle;
    tmpReplaceArray[REPLACE_Z_INDEX]    = tmpZIndex;

    //scroll to the object
    var windowLeft = wrapperObj.offsetLeft;
    var tmpWidth   = getObjectCurrentWidth(wrapperObj);

    if(tmpWidth < getWindowWidth()) { windowLeft = windowLeft - ((getWindowWidth()-tmpWidth)/2);    }
    if(windowLeft<0)                { windowLeft = 0;                                               }
    
    var windowTop  = wrapperObj.offsetTop;
    var tmpHeight  = getObjectCurrentHeight(wrapperObj);

    if(tmpHeight < getWindowHeight()) { windowTop = windowTop - ((getWindowHeight()-tmpHeight)/2);  }
    if(windowTop<0)                   { windowTop = 0;                                              }

//    window.scrollTo(windowLeft, windowTop);

}//repaceImg






// =====================================================================================================================
// presentation behavior                                                                           presentation behavior
// =====================================================================================================================


//Global variables
var presentation = -1;

                            
// runPresentation                                                                                       runPresentation
// ---------------------------------------------------------------------------------------------------------------------
function runPresentation(startPresentation){

    presentation = startPresentation;
    if(presentation >= 0) {
        if(presentation>picture.length) { 
            presentation = 0; 
        }
        selectImg();
    }
    else { 
        presentation=-2; 
    }

}//runPresentation


// selectImg                                                                                                   selectImg
// ---------------------------------------------------------------------------------------------------------------------
function selectImg(){

    if(presentation > picture.length) { 
        presentation = 0; 
    }
    if(presentation >= 0)             { 
        repaceImg(presentation);
        window.setTimeout("deselectImg()", 5000); 
    }

}//selectImg


// deselectImg                                                                                               deselectImg
// ---------------------------------------------------------------------------------------------------------------------
function deselectImg(){

    repaceImg(presentation);
    presentation++;

    if(presentation >= 0) { window.setTimeout("selectImg()", 500); }

}//deselectImg


// changeImg                                                                                                   changeImg
// ---------------------------------------------------------------------------------------------------------------------
function changeImg(newSrc, newWidth, newHeight){

    document.getElementById("mainImage").width  = newWidth;
    document.getElementById("mainImage").height = newHeight;
    document.getElementById("mainImage").src    = newSrc;

}//changeImg






// =====================================================================================================================
// wandering behavior                                                                                 wandering behavior
// =====================================================================================================================

var runAnimation        = false;

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



                        
// makeAllWandering                                                                                     makeAllWandering
// ---------------------------------------------------------------------------------------------------------------------
function makeAllWandering(){

    runAnimation = true;
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

    runAnimation = true;
    
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

    runAnimation = true;
    
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

    runAnimation = false;
    
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
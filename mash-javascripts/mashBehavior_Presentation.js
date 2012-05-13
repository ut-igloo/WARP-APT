// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Behaviors Package                                                                                                  //
// Presentation behavior                                                                                              //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Jul 27, 2003                                                                                             //
// Modified: Nov 23, 2009 (fixed some minor errors)                                                                   //
// =====================================================================================================================
// This behaivor allows defining a set of MASH_Objects that will wander around a predefined area.



// =====================================================================================================================
// MASH_Behavior_AutoPresentation                                                         MASH_Behavior_AutoPresentation
// =====================================================================================================================
function MASH_Behavior_AutoPresentation() {

    this.base = MASH_Behavior;
    this.base("AutoPresentation");

    this.src     = 1;
    this.width   = 2;
    this.height  = 3;
    this.title   = 4;
    this.zIndex  = 5;
    this.changed = 6;

}
//set inheritance
MASH_Behavior_AutoPresentation.prototype             = new MASH_Behavior("AutoPresentation");
MASH_Behavior_AutoPresentation.prototype.constructor = MASH_Behavior_AutoPresentation;
//MASH_Behavior_AutoPresentation



// ---------------------------------------------------------------------------------------------------------------------
// Class Properties                                                                                     Class Properties
// ---------------------------------------------------------------------------------------------------------------------

MASH_Behavior_AutoPresentation.notInitialized = true;
MASH_Behavior_AutoPresentation.presentation   = -1;
MASH_Behavior_AutoPresentation.picture        = new Array();


// ---------------------------------------------------------------------------------------------------------------------
// Class Methods                                                                                           Class Methods
// ---------------------------------------------------------------------------------------------------------------------


// initReplaceBehavior                                                                               initReplaceBehavior
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_AutoPresentation.initReplaceBehavior = function(){

    MASH_Behavior_AutoPresentation.picture        = new Array();

    //add behavior to images
    var i = 0;
    var j = 0;
    for(i=0; i<imageObjects.length;i++) {

        var tmpBehaviorObject     = new MASH_Behavior_AutoPresentation();

        if(MASH_Behavior_AutoPresentation.picture[i]){
            tmpBehaviorObject.src     = MASH_Behavior_AutoPresentation.picture[i].src;
            tmpBehaviorObject.width   = MASH_Behavior_AutoPresentation.picture[i].width;
            tmpBehaviorObject.height  = MASH_Behavior_AutoPresentation.picture[i].height;
            tmpBehaviorObject.title   = MASH_Behavior_AutoPresentation.picture[i].text;
            tmpBehaviorObject.zIndex  = 1;
            tmpBehaviorObject.changed = false;

            addBehaviorObject(imageObjects[i], tmpBehaviorObject);
        }
    }

    //add behavior to images and DigitizedRecords
    for(j=i; j<(digitizedRecordObjects.length+i); j++) {

        var tmpBehaviorObject     = new MASH_Behavior_AutoPresentation();

        if(MASH_Behavior_AutoPresentation.picture[j]){
            tmpBehaviorObject.src     = MASH_Behavior_AutoPresentation.picture[j].src;
            tmpBehaviorObject.width   = MASH_Behavior_AutoPresentation.picture[j].width;
            tmpBehaviorObject.height  = MASH_Behavior_AutoPresentation.picture[j].height;
            tmpBehaviorObject.title   = MASH_Behavior_AutoPresentation.picture[j].text;
            tmpBehaviorObject.zIndex  = 1;
            tmpBehaviorObject.changed = false;

            addBehaviorObject(digitizedRecordObjects[j], tmpBehaviorObject);
        }
    }

    MASH_Behavior_AutoPresentation.notInitialized = false;

}//initReplaceBehavior


// repaceImg                                                                                                   repaceImg
// ---------------------------------------------------------------------------------------------------------------------
// * this function uses general MASH functions (found in mash.js)
MASH_Behavior_AutoPresentation.repaceImg = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    tmpEvent = validateEventObject(tmpEvent);

    if(wasDragged) { return }

    //get the object that called this function
    var wrapperObj      = getCurrentTarget(tmpEvent);

    var objIndex        = wrapperObj.objectIndex;

    var tmpObjID        = MASH_Image.ID_PREFIX       + objIndex;
    var tmpObjInnerID   = MASH_Image.INNER_ID_PREFIX + objIndex;

    var innerObj        = wrapperObj.MASHparameters.innerObj;


    if(wrapperObj.id == tmpObjID) {
        var childrenObj = wrapperObj.childNodes;
        innerObj        = wrapperObj.childNodes[0];
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

    if(MASH_Behavior_AutoPresentation.notInitialized) { MASH_Behavior_AutoPresentation.initReplaceBehavior(); }


    var tmpObjectArray       = imageObjects;
    if(wrapperObj.MASHparameters.MASHobjectType == MASH_Object.DIGITIZED_RECORD) {
        tmpObjectArray       = digitizedRecordObjects;
    }
    var tmpBehaviorObject    = getBehaviorObject(tmpObjectArray[objIndex], "AutoPresentation");
//    var tmpBehaviorObject    = getBehaviorObject(imageObjects[objIndex], "AutoPresentation");

    if(!tmpBehaviorObject) { return; }

    //change current parameters with the stored parameters
    var tmpSrc               = innerObj.src;
    var tmpWidth             = getObjectCurrentWidth(wrapperObj);
    var tmpHeight            = getObjectCurrentHeight(wrapperObj);
    var tmpTitle             = innerObj.title;
    var tmpZIndex            = wrapperObj.style.zIndex;

    innerObj.src             = tmpBehaviorObject.src;
    innerObj.style.width     = tmpBehaviorObject.width;
    innerObj.style.height    = tmpBehaviorObject.height;
    innerObj.title           = tmpBehaviorObject.title;
    wrapperObj.style.width   = tmpBehaviorObject.width;
    wrapperObj.style.height  = tmpBehaviorObject.height;
    wrapperObj.style.zIndex  = ++topZ;

    tmpBehaviorObject.type   = "AutoPresentation";
    tmpBehaviorObject.src    = tmpSrc;
    tmpBehaviorObject.width  = tmpWidth;
    tmpBehaviorObject.height = tmpHeight;
    tmpBehaviorObject.title  = tmpTitle;
    tmpBehaviorObject.zIndex = tmpZIndex;

    //scroll to the object
    var windowLeft           = wrapperObj.offsetLeft;
    var tmpWidth             = getObjectCurrentWidth(wrapperObj);

    if(tmpWidth < getWindowWidth()) { windowLeft = windowLeft - ((getWindowWidth()-tmpWidth)/2);    }
    if(windowLeft<0)                { windowLeft = 0;                                               }

    var windowTop            = wrapperObj.offsetTop;
    var tmpHeight            = getObjectCurrentHeight(wrapperObj);

    if(tmpHeight < getWindowHeight()) { windowTop = windowTop - ((getWindowHeight()-tmpHeight)/2);  }
    if(windowTop<0)                   { windowTop = 0;                                              }

//    window.scrollTo(windowLeft, windowTop);

}//repaceImg





// writeBehaviors                                                                                         writeBehaviors
// ---------------------------------------------------------------------------------------------------------------------
// * writes the behavior controls in the web page
MASH_Behavior_AutoPresentation.writeControls = function(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Auto Presentation:</span>");
    document.writeln("<a href=\"javascript:MASH_Behavior_AutoPresentation.runPresentation(0);\" ><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">Run</span></a>");
    document.writeln("<a href=\"javascript:MASH_Behavior_AutoPresentation.runPresentation(-2);\"><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Stop</span></a>&nbsp;||&nbsp;");

}//writeBehaviors



//Global variables
var presentation = -1;


// runPresentation                                                                                       runPresentation
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_AutoPresentation.runPresentation = function(startPresentation){

    MASH_Behavior_AutoPresentation.presentation = startPresentation;
    if(MASH_Behavior_AutoPresentation.presentation >= 0) {
//        if(MASH_Behavior_AutoPresentation.presentation > picture.length) {
        if(MASH_Behavior_AutoPresentation.presentation > MASH_Behavior_AutoPresentation.picture.length) {
            MASH_Behavior_AutoPresentation.presentation = 0;
        }
        MASH_Behavior_AutoPresentation.selectImg();
    }
    else {
        MASH_Behavior_AutoPresentation.presentation=-2;
    }

}//runPresentation


// selectImg                                                                                                   selectImg
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_AutoPresentation.selectImg = function(){

//    if(MASH_Behavior_AutoPresentation.presentation > picture.length) {
    if(MASH_Behavior_AutoPresentation.presentation > MASH_Behavior_AutoPresentation.picture.length) {
        MASH_Behavior_AutoPresentation.presentation = 0;
    }
    if(MASH_Behavior_AutoPresentation.presentation >= 0)             {
        MASH_Behavior_AutoPresentation.repaceImg(presentation);
        window.setTimeout("MASH_Behavior_AutoPresentation.deselectImg()", 5000);
    }

}//selectImg


// deselectImg                                                                                               deselectImg
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_AutoPresentation.deselectImg = function(){

    MASH_Behavior_AutoPresentation.repaceImg(presentation);
    MASH_Behavior_AutoPresentation.presentation++;

    if(MASH_Behavior_AutoPresentation.presentation >= 0) { window.setTimeout("MASH_Behavior_AutoPresentation.selectImg()", 500); }

}//deselectImg


// changeImg                                                                                                   changeImg
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_AutoPresentation.changeImg = function(newSrc, newWidth, newHeight){

    document.getElementById("mainImage").width  = newWidth;
    document.getElementById("mainImage").height = newHeight;
    document.getElementById("mainImage").src    = newSrc;

}//changeImg






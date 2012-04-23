// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Behaviors Package                                                                                                  //
// Image Toggle behavior                                                                                              //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Jul 27, 2003                                                                                             //
// Modified:                                                                                                          //
// =====================================================================================================================





// =====================================================================================================================
// Image Toggle Behavior                                                                           Image Toggle Behavior
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







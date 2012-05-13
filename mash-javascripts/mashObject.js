// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Nov 12, 2002                                                                                              //
// =====================================================================================================================


// =====================================================================================================================
// MASH_Object                                                                                               MASH_Object
// =====================================================================================================================
function MASH_Object(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle) {

    //id
    if((tmpID) && (tmpID!="")) { this.id = tmpID;                     }
    else                       { this.id = MASH_Object.getUniqueID(); }

    //keep track of the highest z index
    if(tmpZIndex > topZ) { topZ  = tmpZIndex; }


    //set the coordinates
    this.left                   = tmpLeft   || 0;
    this.top                    = tmpTop    || 0;
    this.width                  = tmpWidth  || 100;
    this.height                 = tmpHeight || 100;
    this.zIndex                 = tmpZIndex || 1;
    this.style                  = tmpStyle  || "";


    //set the default style values
    this.align                  = "center";
    this.verticalAlign          = "middle";

    this.color                  = "#000000";
    this.fontFamily             = "arial";
    this.fontSize               = "10pt";
    this.fontWeight             = "normal";

    this.backgroundColor        = "#ffffff";
    this.backgroundImage        = "none";
    this.backgroundRepeat       = "no-repeat";
    this.backgroundPosition     = "center center";

    this.borderStyle            = "solid";
    this.borderWidth            = 1;
    this.borderColor            = "#000000";

    //overide the default style values
    MASH_Object.setStyle(this, this.style);


    this.reference              = null;
    this.behaviors              = new Array();
    this.collection             = null;

    this.MASHobjectType         = MASH_Object.OBJECT;

    //import/export support
    this.imported               = false;
    this.originalID             = "";
    this.originalIndex          = null;
    this.originalDocName        = "";

    //clickable
    this.clickable              = true;

    //context menu
    this.contextMenuString      = "";

    //adaptations: basicImage()
    this.basicImageString       = "";
    this.basicImageMirror       = 0;
    this.basicImageInvert       = 0;
    this.basicImageRotation     = 0;
    this.basicImageGrayScale    = 0;
    this.basicImageXRay         = 0;
    this.basicImageOpacity      = 1.0;

    //filters
    this.filterBasicImage       = false;
    this.filterBlurActive       = false;
    this.filterShadowActive     = false;
    this.filterEmbossActive     = false;
    this.filterEngraveActive    = false;
    this.filterGlowActive       = false;
    this.filterGradientActive   = false;

    this.filterGlowStrength     = 0;

    //conflict resolution methods
    this.objectConflictResolution        = MASH_Object.DEFAULT_OBJECT_CONFLICT_RESOLUTION;
    this.objectConflictResolutionSetFlag = false; //when = true it means that the object setObjectConflictResoluiton() has been used

    //Metadata
    this.metadataArray                   = new Array();

    //parent composites (implicit structure)
    this.parentComposites                = new Array();

    //XML
    this.xmlObjectTag                    = MASH_Object.XML_TAG_OBJECT;

    // controls' image files
//    this.CONTROLS_IMG_DIR                = "../mash-images/";
    this.CTRL_CORNER_RESIZE_IMG          = CONTROLS_IMG_DIR + "mashObjectCornerResize.png";
    this.FIXED_DIMENSIONAL_RATIO         = 0.0;


}//MASH_Object

//Copyright
MASH_Object.COPYRIGHT = "MASH \n\n"                                       +
                        "  Copyright (c) 2002 Luis Francisco-Revilla.\n"  +
                        "  All rights reserved.\n\n"                      ;

//Class Constants
MASH_Object.COOKIE_NAME                             = "mash_objects";
MASH_Object.ID_PREFIX                               = "div_";

MASH_Object.IMPORTED_INNER_ID_PREFIX                = "importedObj_";
MASH_Object.IMPORTED_ID_PREFIX                      = MASH_Object.ID_PREFIX + MASH_Object.IMPORTED_INNER_ID_PREFIX;

MASH_Object.OBJECT                                  = "MASH_Object";
MASH_Object.COLLECTION                              = "MASH_Collection";
MASH_Object.TEXT                                    = "MASH_Text";
MASH_Object.IMAGE                                   = "MASH_Image";
MASH_Object.FRAME                                   = "MASH_Frame";
MASH_Object.FORM                                    = "MASH_Form";
MASH_Object.INPUT                                   = "MASH_Input";

MASH_Object.USER_ANNOTATION                         = "MASH_UserAnnotation";
MASH_Object.IMPLICIT_COMPOSITE                      = "MASH_ImplicitComposite";
MASH_Object.EXPORTED                                = "MASH_Exported";
MASH_Object.CONTEXTUAL_MENU                         = "MASH_ContextualMenu";
MASH_Object.RESIZE_CONTROL                          = "MASH_ResizeControl";
MASH_Object.CONTROL_MENU                            = "MASH_ControlMenus";

MASH_Object.VIDEO                                   = "MASH_Video";
MASH_Object.VIDEO_INDEX                             = "MASH_VideoIndex";

MASH_Object.USER_READING                            = "MASH_UserReading";

MASH_Object.DIGITIZED_RECORD                        = "MASH_DigitizedRecord";


//conflict resolution methods
MASH_Object.RESOLVE_USING_AVERAGE                   = "average";
MASH_Object.RESOLVE_USING_MAX_STRENGTH              = "maximum strength";
MASH_Object.RESOLVE_USING_MIN_STRENGTH              = "minimum strength";
MASH_Object.RESOLVE_USING_MAX_SUGGESTION_CONFIDENCE = "maximum suggestion confidence";
MASH_Object.RESOLVE_USING_MAX_MODEL_CONFIDENCE      = "maximum model confidence";

MASH_Object.DEFAULT_OBJECT_CONFLICT_RESOLUTION      = MASH_Object.RESOLVE_USING_AVERAGE;

//Class Members
MASH_Object.uniqueIDCount = 0;



// MASH_Object.getUniqueID                                                                       MASH_Object.getUniqueID
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.getUniqueID = function() {

//    var newID = "MASHObject[" + MASH_Object.uniqueIDCount + "]";
    var newID = "MASHObject_" + MASH_Object.uniqueIDCount;
    MASH_Object.uniqueIDCount++;
    return newID;

}//MASH_Object.getUniqueID



// MASH_Object.clone                                                                                   MASH_Object.clone
// ---------------------------------------------------------------------------------------------------------------------
// * this method is here just because it is a convenient way to classify it
// * it actually just checks the type of object and ca4lls the propper clone Class Method
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Object.clone = function(originalObj) {

    var cloneObj;

    if     (originalObj.MASHobjectType == MASH_Object.TEXT)             { cloneObj = MASH_Text.clone(originalObj);            }
    else if(originalObj.MASHobjectType == MASH_Object.IMAGE)            { cloneObj = MASH_Image.clone(originalObj);           }
    else if(originalObj.MASHobjectType == MASH_Object.FRAME)            { cloneObj = MASH_Frame.clone(originalObj);           }
    else if(originalObj.MASHobjectType == MASH_Object.COLLECTION)       { cloneObj = MASH_Collection.clone(originalObj);      }
    else if(originalObj.MASHobjectType == MASH_Object.VIDEO)            { cloneObj = MASH_Video.clone(originalObj);           }

    else if(originalObj.MASHobjectType == MASH_Object.DIGITIZED_RECORD) { cloneObj = MASH_DigitizedRecord.clone(originalObj); }

    return cloneObj;

}//MASH_Object.clone



// MASH_Object.getArray                                                                             MASH_Object.getArray
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.getArray = function(tmpObj){

    var tmpObjectArray  = null;

    if     (tmpObj.MASHobjectType == MASH_Object.OBJECT)            { tmpObjectArray = textObjects;            }

    else if(tmpObj.MASHobjectType == MASH_Object.TEXT)              { tmpObjectArray = textObjects;            }
    else if(tmpObj.MASHobjectType == MASH_Object.IMAGE)             { tmpObjectArray = imageObjects;           }
    else if(tmpObj.MASHobjectType == MASH_Object.FRAME)             { tmpObjectArray = frameObjects;           }
    else if(tmpObj.MASHobjectType == MASH_Object.COLLECTION)        { tmpObjectArray = collectionObjects;      }
    else if(tmpObj.MASHobjectType == MASH_Object.FORM)              { tmpObjectArray = formObjects;            }
    else if(tmpObj.MASHobjectType == MASH_Object.INPUT)             { tmpObjectArray = inputObjects;           }

    else if(tmpObj.MASHobjectType == MASH_Object.VIDEO)             { tmpObjectArray = videoObjects;           }
    else if(tmpObj.MASHobjectType == MASH_Object.VIDEO_INDEX)       { tmpObjectArray = videoIndiexObjects;     }

    else if(tmpObj.MASHobjectType == MASH_Object.CONTEXTUAL_MENU)   { tmpObjectArray = otherObjects;           }
    else if(tmpObj.MASHobjectType == MASH_Object.CONTROL_MENU)      { tmpObjectArray = otherObjects;           }

    else if(tmpObj.MASHobjectType == MASH_Object.USER_ANNOTATION)   { tmpObjectArray = annotationObjects;      }

    else if(tmpObj.MASHobjectType == MASH_Object.DIGITIZED_RECORD)  { tmpObjectArray = digitizedRecordObjects; }

    return tmpObjectArray;

}//MASH_Object.getArray



// MASH_Object.createObject                                                                     MASH_Object.createObject
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a MASH_Object and stores it in the propper array of objects according to its type
// * if arrayIndex != nulls then it is stored at that possition in the end of the array
// * if arrayIndex == nulls then it is push at the end of the array
MASH_Object.createObject = function(objParameters, arrayIndex){

    //identify collection
    var tmpCollection = MASH_Object.getArray(objParameters);

    //validate array index
//    var test=true;
    if(!arrayIndex) {
        arrayIndex = tmpCollection.length;
    }

    //create object, appended it to the body and push it in the proper collection
    var tmpObj;
    tmpObj                           = objParameters.createScreenObject(arrayIndex);
    tmpObj                           = document.body.appendChild(tmpObj);

    tmpObj.MASHparameters.collection = null;
    tmpCollection[arrayIndex]        = objParameters;

    return tmpObj;

}//MASH_Object.createObject



// MASH_Object.writeObjects                                                                     MASH_Object.writeObjects
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.writeObjects = function(){

    for(var i=0; i<allMASHObjects.length; i++){
        var tmpObj = MASH_Object.createObject(allMASHObjects[i], null);
    }

}//MASH_Object.writeObjects



// MASH_Object.deleteMASHObjects                                                           MASH_Object.deleteMASHObjects
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.deleteMASHObjects = function(){

    //remove objects from screen
    for(var i=0; i<allMASHObjects.length; i++) {
        var tmpObj = allMASHObjects[i].reference;
        if( (tmpObj) && (tmpObj.parentNode) ) {
            tmpObj.parentNode.removeChild(tmpObj);
        }
    }

    //remove implicit objects from screen
    for(var i=0; i<implicitComposites.length; i++) {
        var tmpObj = implicitComposites[i].reference;
        if( (tmpObj) && (tmpObj.parentNode) ) {
            tmpObj.parentNode.removeChild(tmpObj);
        }
    }

    //remove annotation objects from screen
    for(var i=0; i<annotationObjects.length; i++) {
        var tmpObj = annotationObjects[i].reference;
        if( (tmpObj) && (tmpObj.parentNode) ) {
            tmpObj.parentNode.removeChild(tmpObj);
        }
    }

    //reset all object arrays
    allMASHObjects      = new Array();

    implicitComposites  = new Array();
    collectionObjects   = new Array();
    formObjects         = new Array();
    inputObjects        = new Array();
    frameObjects        = new Array();
    textObjects         = new Array();
    imageObjects        = new Array();
    importedObjects     = new Array();
    exportedObjects     = new Array();

    videoObjects        = new Array();
    videoIndiexObjects  = new Array();

    // Spatial Parser
    implicitComposites  = new Array();

    //other objects
    otherObjects        = new Array();

    //user's annotation objects
    annotationObjects   = new Array();

    //video index objects
    videoIndexObjects   = new Array();

    //APT objects
    digitizedRecordObjects = new Array();

}//MASH_Object.deleteMASHObjects



// MASH_Object.setStyle                                                                             MASH_Object.setStyle
// ---------------------------------------------------------------------------------------------------------------------
// supports style for:
// * color
// * align
// * vertical-align
// * font-family
// * font-size
// * font-weight
// * font-variant
// * border-style
// * border-width
// * border-color
MASH_Object.setStyle = function(tmpObj, tmpStyle){

    //validate parameters
    if((!tmpStyle) || (!tmpObj) || (tmpStyle=="") ) { return new Array(); }

    //parse style into attribute-value pairs
    var attValuePairs = tmpStyle.match(/(\s*[\w\-]*\s*)\:(\s*[\\\/\w\-\#\.\(\)\s]*\s*)\;?/g);
    if(!attValuePairs) { return; }

    //apply the attribute:value to the proper style property
    for(var i=0; i<attValuePairs.length; i++){
        var attValue = attValuePairs[i].match(/\s*([\w\-]*)\s*\:\s*([\\\/\w\-\.\#\(\)\s]*)\s*/);

        //alignment
        if     (attValue[1] == "align")               { tmpObj.align              = attValue[2]; }
        else if(attValue[1] == "vertical-align")      { tmpObj.verticalAlign      = attValue[2]; }
        //font
        else if(attValue[1] == "color")               { tmpObj.color              = attValue[2]; }
        else if(attValue[1] == "font-family")         { tmpObj.fontFamily         = attValue[2]; }
        else if(attValue[1] == "font-size")           { tmpObj.fontSize           = attValue[2]; }
        else if(attValue[1] == "font-weight")         { tmpObj.fontWeight         = attValue[2]; }
        else if(attValue[1] == "font-variant")        { tmpObj.fontVariant        = attValue[2]; }
        //background
        else if(attValue[1] == "background-color")    { tmpObj.backgroundColor    = attValue[2]; }
        else if(attValue[1] == "background-image")    { tmpObj.backgroundImage    = attValue[2]; }
        else if(attValue[1] == "background-repeat")   { tmpObj.backgroundRepeat   = attValue[2]; }
        else if(attValue[1] == "background-position") { tmpObj.backgroundPosition = attValue[2]; }
        //border
        else if(attValue[1] == "border-style")        { tmpObj.borderStyle        = attValue[2]; }
        else if(attValue[1] == "border-width")        { tmpObj.borderWidth        = attValue[2]; }
        else if(attValue[1] == "border-color")        { tmpObj.borderColor        = attValue[2]; }
    }


}//MASH_Object.setStyle



// MASH_Object.prototype.createWrapperObject                                   MASH_Object.prototype.createWrapperObject
// ---------------------------------------------------------------------------------------------------------------------
// * this is the generic MASH wrapper object
// * it provides drag-and-drop functionality
// * in addition it provides style definition for the wrapper object
MASH_Object.prototype.createWrapperObject = function(tmpObjID, i){

    //compute dimensions
    var adjustedWidth                        = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight                       = adjustSize(this.height, this.borderWidth);

    //wrapper
    this.wrapperObj                          = document.createElement("div");

    this.wrapperObj.id                       = tmpObjID;
    this.wrapperObj.objectIndex              = i;
    this.wrapperObj.zoomFactor               = 1.0;

    this.wrapperObj.style.position           = "absolute";
    this.wrapperObj.style.left               = this.left;
    this.wrapperObj.style.top                = this.top;
    this.wrapperObj.style.width              = adjustedWidth;
    this.wrapperObj.style.height             = adjustedHeight;
    this.wrapperObj.style.zIndex             = this.zIndex;

    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

    this.wrapperObj.style.overflow           = "hidden";

    //attach events
    if(this.clickable == true) {
        addEventListener(this.wrapperObj, "mousedown", divMouseDown, false);
    }

    //attach resize control
    if(this.clickable == true) {

        if( (this.type != MASH_UserAnnotation.FINGER_MARKER        ) &&
            (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_TOP   ) &&
            (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT ) &&
            (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM) &&
            (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT  ) ){

            this.resizeButton                        = document.createElement("img");
            this.resizeButton.wrapperObj             = this.wrapperObj;
            this.resizeButton.title                  = "resize";
            this.resizeButton.src                    = this.CTRL_CORNER_RESIZE_IMG;
            this.resizeButton.style.position         = "absolute";
            this.resizeButton.style.left             = adjustedWidth  - 36;
            this.resizeButton.style.top              = adjustedHeight - 36;
            this.resizeButton.style.width            = 36;
            this.resizeButton.style.height           = 36;
            this.resizeButton.style.zIndex           = 1;

            addEventListener(this.resizeButton,  "mousedown", resizeBottomRightMouseDown,  false);
            this.wrapperObj.appendChild(this.resizeButton);
        }// if not FINGER_MARKER

    }

    //contextual layer
    this.createContextLayer();

    return this.wrapperObj;

}//MASH_Object.prototype.createWrapperObject



// MASH_Object.prototype.createContextLayer                                     MASH_Object.prototype.createContextLayer
// ---------------------------------------------------------------------------------------------------------------------
// * creates a layer that allows to manipulate the object
MASH_Object.prototype.createContextLayer = function(){


    //compute dimensions
    var adjustedWidth   = this.getContextLayerInitialWidth();
    var adjustedHeight  = this.getContextLayerInitialHeight();

    //context Layer
    this.contextLayer                              = document.createElement("div");
    this.contextLayer.wrapperObj                   = this.wrapperObj;

    this.contextLayer.style.position               = "absolute";
    this.contextLayer.style.left                   = 0;
    this.contextLayer.style.top                    = 0;
    this.contextLayer.style.width                  = adjustedWidth;
    this.contextLayer.style.height                 = adjustedHeight;

    this.contextLayer.style.zIndex                 = 6;
    this.contextLayer.style.backgroundColor        = "transparent";
    this.contextLayer.style.borderStyle            = "dashed";
    this.contextLayer.style.borderWidth            = 1;
    this.contextLayer.style.borderColor            = "#000000";
    this.contextLayer.style.overflow               = "hidden";

    this.contextLayer.style.visibility             = "hidden";

    // top left control
//    this.controlTopLeft                            = document.createElement("div");
//    this.controlTopLeft.wrapperObj                 = this.wrapperObj;
//    this.controlTopLeft.id                         = MASH_Object.RESIZE_CONTROL + RESIZE_TOP_LEFT;
//
//    this.controlTopLeft.style.position             = "absolute";
//    this.controlTopLeft.style.left                 = 0;
//    this.controlTopLeft.style.top                  = 0;
//    this.controlTopLeft.style.width                = 10;
//    this.controlTopLeft.style.height               = 10;
//    this.controlTopLeft.style.zIndex               = 0;
//    this.controlTopLeft.style.overflow             = "hidden";
//    this.controlTopLeft.style.backgroundColor      = "#000000";

    // top center control
//    this.controlTopCenter                          = document.createElement("div");
//    this.controlTopCenter.wrapperObj               = this.wrapperObj;
//
//    this.controlTopCenter.style.position           = "absolute";
//    this.controlTopCenter.style.left               = (adjustedWidth/2) - 5;
//    this.controlTopCenter.style.top                = 0;
//    this.controlTopCenter.style.width              = 10;
//    this.controlTopCenter.style.height             = 10;
//    this.controlTopCenter.style.overflow           = "hidden";
//    this.controlTopCenter.style.zIndex             = 0;
//    this.controlTopCenter.style.backgroundColor    = "#000000";

    // top right control
//    this.controlTopRight                           = document.createElement("div");
//    this.controlTopRight.wrapperObj                = this.wrapperObj;
//
//    this.controlTopRight.style.position            = "absolute";
//    this.controlTopRight.style.left                = adjustedWidth - 12;
//    this.controlTopRight.style.top                 = 0;
//    this.controlTopRight.style.width               = 10;
//    this.controlTopRight.style.height              = 10;
//    this.controlTopRight.style.overflow            = "hidden";
//    this.controlTopRight.style.zIndex              = 0;
//    this.controlTopRight.style.backgroundColor     = "#000000";

    // middle left control
//    this.controlMiddleLeft                         = document.createElement("div");
//    this.controlMiddleLeft.wrapperObj              = this.wrapperObj;
//
//    this.controlMiddleLeft.style.position          = "absolute";
//    this.controlMiddleLeft.style.left              = 0;
//    this.controlMiddleLeft.style.top               = (adjustedHeight/2) - 5;
//    this.controlMiddleLeft.style.width             = 10;
//    this.controlMiddleLeft.style.height            = 10;
//    this.controlMiddleLeft.style.zIndex            = 0;
//    this.controlMiddleLeft.style.overflow          = "hidden";
//    this.controlMiddleLeft.style.backgroundColor   = "#000000";

    // middle right control
//    this.controlMiddleRight                        = document.createElement("div");
//    this.controlMiddleRight.wrapperObj             = this.wrapperObj;
//
//    this.controlMiddleRight.style.position         = "absolute";
//    this.controlMiddleRight.style.left             = adjustedWidth - 12;
//    this.controlMiddleRight.style.top              = (adjustedHeight/2) - 5;
//    this.controlMiddleRight.style.width            = 10;
//    this.controlMiddleRight.style.height           = 10;
//    this.controlMiddleRight.style.zIndex           = 0;
//    this.controlMiddleRight.style.overflow         = "hidden";
//    this.controlMiddleRight.style.backgroundColor  = "#000000";

    // bottom left control
//    this.controlBottomLeft                         = document.createElement("div");
//    this.controlBottomLeft.wrapperObj              = this.wrapperObj;
//
//    this.controlBottomLeft.style.position          = "absolute";
//    this.controlBottomLeft.style.left              = 0;
//    this.controlBottomLeft.style.top               = adjustedHeight - 12;
//    this.controlBottomLeft.style.width             = 10;
//    this.controlBottomLeft.style.height            = 10;
//    this.controlBottomLeft.style.overflow          = "hidden";
//    this.controlBottomLeft.style.zIndex            = 0;
//    this.controlBottomLeft.style.backgroundColor   = "#000000";

    // bottom center control
//    this.controlBottomCenter                       = document.createElement("div");
//    this.controlBottomCenter.wrapperObj            = this.wrapperObj;
//
//    this.controlBottomCenter.style.position        = "absolute";
//    this.controlBottomCenter.style.left            = (adjustedWidth/2) - 5;
//    this.controlBottomCenter.style.top             = adjustedHeight - 12;
//    this.controlBottomCenter.style.width           = 10;
//    this.controlBottomCenter.style.height          = 10;
//    this.controlBottomCenter.style.overflow        = "hidden";
//    this.controlBottomCenter.style.zIndex          = 0;
//    this.controlBottomCenter.style.backgroundColor = "#000000";

    // bottom right control
//    this.controlBottomRight                        = document.createElement("div");
//    this.controlBottomRight.wrapperObj             = this.wrapperObj;
//
//    this.controlBottomRight.style.position         = "absolute";
//    this.controlBottomRight.style.left             = adjustedWidth  - 12;
//    this.controlBottomRight.style.top              = adjustedHeight - 12;
//    this.controlBottomRight.style.width            = 10;
//    this.controlBottomRight.style.height           = 10;
//    this.controlBottomRight.style.overflow         = "hidden";
//    this.controlBottomRight.style.zIndex           = 0;
//    this.controlBottomRight.style.backgroundColor  = "#000000";

    //attach events
//    if(this.clickable == true) {
//        addEventListener(this.controlTopLeft,      "mousedown", resizeTopLeftMouseDown,   false);
//        addEventListener(this.controlTopCenter,    "mousedown", resizeTopCenterMouseDown, false);
//        addEventListener(this.controlTopRight,     "mousedown", resizeTopRightMouseDown,  false);
//
//        addEventListener(this.controlMiddleLeft,   "mousedown", resizeMiddleLeftMouseDown,  false);
//        addEventListener(this.controlMiddleRight,  "mousedown", resizeMiddleRightMouseDown, false);
//
//        addEventListener(this.controlBottomLeft,   "mousedown", resizeBottomLeftMouseDown,   false);
//        addEventListener(this.controlBottomCenter, "mousedown", resizeBottomCenterMouseDown, false);
//        addEventListener(this.controlBottomRight,  "mousedown", resizeBottomRightMouseDown,  false);
//    }

    //append inner object
//    this.controlTopLeft      = this.contextLayer.appendChild(this.controlTopLeft);
//    this.controlTopCenter    = this.contextLayer.appendChild(this.controlTopCenter);
//    this.controlTopRight     = this.contextLayer.appendChild(this.controlTopRight);
//
//    this.controlMiddleLeft   = this.contextLayer.appendChild(this.controlMiddleLeft);
//    this.controlMiddleRight  = this.contextLayer.appendChild(this.controlMiddleRight);
//
//    this.controlBottomLeft   = this.contextLayer.appendChild(this.controlBottomLeft);
//    this.controlBottomCenter = this.contextLayer.appendChild(this.controlBottomCenter);
//    this.controlBottomRight  = this.contextLayer.appendChild(this.controlBottomRight);

    this.contextLayer        = this.wrapperObj.appendChild(this.contextLayer);

    //the following line is a simple workaround to deal with the differences in even propagation between IE and Netscape
    this.wrapperObj.wrapperObj = this.wrapperObj;

    return this.contextLayer;

}//MASH_Object.prototype.createContextLayer



// MASH_Object.prototype.emphasizeResizeButton                               MASH_Object.prototype.emphasizeResizeButton
// ---------------------------------------------------------------------------------------------------------------------
// * creates a layer that allows to manipulate the object
MASH_Object.prototype.emphasizeResizeButton = function(){

//    this.resizeButton.style.backgroundColor = "#ff0000";

    var oldWidth                   = parseInt(this.resizeButton.style.width );
    var oldHeight                  = parseInt(this.resizeButton.style.height);
    this.resizeButton.style.left   = parseInt(this.resizeButton.style.left) - oldWidth;
    this.resizeButton.style.top    = parseInt(this.resizeButton.style.top ) - oldHeight;
    this.resizeButton.style.width  = oldWidth  * 2;
    this.resizeButton.style.height = oldHeight * 2;

    window.status = "RESIZING " + this.id;

}//emphasizeResizeButton



// MASH_Object.prototype.demphasizeResizeButton                             MASH_Object.prototype.demphasizeResizeButton
// ---------------------------------------------------------------------------------------------------------------------
// * creates a layer that allows to manipulate the object
MASH_Object.prototype.demphasizeResizeButton = function(){

//    this.resizeButton.style.backgroundColor = "transparent";

    var oldWidth                   = parseInt(this.resizeButton.style.width );
    var oldHeight                  = parseInt(this.resizeButton.style.height);
    this.resizeButton.style.width  = parseInt(oldWidth  / 2);
    this.resizeButton.style.height = parseInt(oldHeight / 2);

    var newWidth                   = parseInt(this.resizeButton.style.width );
    var newHeight                  = parseInt(this.resizeButton.style.height);
    this.resizeButton.style.left   = parseInt(this.resizeButton.style.left) + newWidth;
    this.resizeButton.style.top    = parseInt(this.resizeButton.style.top ) + newHeight;

}//demphasizeResizeButton



// MASH_Object.prototype.resizeContextLayer                                     MASH_Object.prototype.resizeContextLayer
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.resizeContextLayer = function(newWidth, newHeight) {

    window.status = "newWidth = " + newWidth + " newHeight = " + newHeight;

    //adjust the width and height
    var adjustedWidth  = this.getContextLayerNewWidth(newWidth);
    var adjustedHeight = this.getContextLayerNewHeight(newHeight);

//    this.wrapperObj.style.width  = newWidth;
//    this.wrapperObj.style.height = newHeight;
    this.wrapperObj.style.width    = adjustedWidth;
    this.wrapperObj.style.height   = adjustedHeight;

    //resize context layer
    this.contextLayer.style.width  = adjustedWidth;
    this.contextLayer.style.height = adjustedHeight;

    this.resizeButton.style.left   = adjustedWidth  - parseInt(this.resizeButton.style.width ) - parseInt(this.wrapperObj.style.borderWidth);
    this.resizeButton.style.top    = adjustedHeight - parseInt(this.resizeButton.style.height) - parseInt(this.wrapperObj.style.borderWidth);


//relocate the context layer controls
//    this.controlTopLeft.style.left      = 0;
//    this.controlTopLeft.style.top       = 0;
//
//    this.controlTopCenter.style.left    = (adjustedWidth/2)  -  3;
//    this.controlTopCenter.style.top     = 0;
//
//    this.controlTopRight.style.left     = adjustedWidth      - 12;
//    this.controlTopRight.style.top      = 0;
//
//    this.controlMiddleLeft.style.left   = 0;
//    this.controlMiddleLeft.style.top    = (adjustedHeight/2) -  3;
//
//    this.controlMiddleRight.style.left  =  adjustedWidth     - 12;
//    this.controlMiddleRight.style.top   = (adjustedHeight/2) -  3;
//
//    this.controlBottomLeft.style.left   = 0;
//    this.controlBottomLeft.style.top    = adjustedHeight     - 12;
//
//    this.controlBottomCenter.style.left = (adjustedWidth/2)  -  3;
//    this.controlBottomCenter.style.top  = adjustedHeight     - 12;
//
//    this.controlBottomRight.style.left  = adjustedWidth      - 12;
//    this.controlBottomRight.style.top   = adjustedHeight     - 12;

}//MASH_Object.prototype.resizeContextLayer



// MASH_Object.setVisibility                                                                   MASH_Object.setVisibility
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.setVisibility = function(obj, visible) {

    if(visible == true) { obj.reference.style.visibility = "visible"; }
    else                { obj.reference.style.visibility = "hidden";  }

}//MASH_Object.setVisibility



// MASH_Object.prototype.select                                                             MASH_Object.prototype.select
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.select = function(visible) {

    if(visible == true) { this.contextLayer.style.visibility = "visible"; }
    else                { this.contextLayer.style.visibility = "hidden";  }

}//MASH_Object.prototype.setVisibility



// MASH_Object.prototype.setVisibility                                               MASH_Object.prototype.setVisibility
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.setVisibility = function(visible) {

    if(visible == true) { this.reference.style.visibility = "visible"; }
    else                { this.reference.style.visibility = "hidden";  }

}//MASH_Object.prototype.setVisibility



// MASH_Object.prototype.moveBackward                                                 MASH_Object.prototype.moveBackward
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveBackward = function() {
    if(this.reference.style.zIndex>1) {
        this.reference.style.zIndex--;
    }
}//MASH_Object.prototype.moveBackward



// MASH_Object.prototype.moveForward                                                   MASH_Object.prototype.moveForward
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveForward = function() {
    this.reference.style.zIndex++;
}//MASH_Object.prototype.moveForward



// MASH_Object.prototype.sendToBack                                                     MASH_Object.prototype.sendToBack
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.sendToBack = function() {
    this.reference.style.zIndex = 1;
}//MASH_Object.prototype.sendToBack



// MASH_Object.prototype.sendToFront                                                   MASH_Object.prototype.sendToFront
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.sendToFront = function() {
    topZ++;
    this.reference.style.zIndex = topZ++;
    if(otherObjects.length>0) {
        for(var i=0; i<otherObjects.length; i++) {
            otherObjects[i].reference.style.zIndex = ++topZ;
        }
    }
}//MASH_Object.prototype.sendToFront



// MASH_Object.prototype.moveBy                                                             MASH_Object.prototype.moveBy
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveBy = function(x, y) {

    this.reference.style.left = parseInt(this.reference.style.left) + x;
    this.reference.style.top  = parseInt(this.reference.style.top)  + y;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.reference, MASH_EVENT.OBJECT_MOVE); }

}//MASH_Object.prototype.moveBy



// MASH_Object.prototype.moveTo                                                             MASH_Object.prototype.moveTo
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveTo = function(x, y) {

    this.reference.style.left = x;
    this.reference.style.top  = y;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.reference, MASH_EVENT.OBJECT_MOVE); }

}//MASH_Object.prototype.moveTo



// MASH_Object.prototype.moveToAnimated                                             MASH_Object.prototype.moveToAnimated
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveToAnimated = function(x, y) {

    //compute the current position
    var currX = parseInt(this.reference.style.left);
    var currY = parseInt(this.reference.style.top);

    //set the animation step size
    var stepX = 10;
    var stepY = 10;
    if(x<currX) { stepX = -10; }
    if(y<currY) { stepY = -10; }

    //animate wait for next step
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.moveToAnimation(" + x      + "," +
                                                                                                             y      + "," +
                                                                                                             stepX  + "," +
                                                                                                             stepY  + ")", 10);
}//MASH_Object.prototype.moveToAnimated



// MASH_Object.prototype.moveToAnimation                                           MASH_Object.prototype.moveToAnimation
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.moveToAnimation = function(x, y, stepX, stepY) {


    //compute the current position
    var currX = parseInt(this.reference.style.left);
    var currY = parseInt(this.reference.style.top);

    //check if the object has arrived on X
    if(Math.abs(x-currX) <= Math.abs(stepX)) {
        this.reference.style.left = x;
        currX = x;
        stepX = 0;
    }
    //check if the object has arrived on Y
    if(Math.abs(y-currY) <= Math.abs(stepY)) {
        this.reference.style.top = y;
        currY = y;
        stepY = 0;
    }
    //check if the object has arrived on both, X and Y
    if( (stepX == 0) &&
        (stepY == 0) ){
        this.reference.style.left = x;
        this.reference.style.top  = y;
        return;
    }

    //relocate object
    this.reference.style.left = currX + stepX;
    this.reference.style.top  = currY + stepY;

    //animate wait for next step
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.moveToAnimation(" + x      + "," +
                                                                                                             y      + "," +
                                                                                                             stepX  + "," +
                                                                                                             stepY  + ")", 10);

}//MASH_Object.prototype.moveToAnimation



// MASH_Object.prototype.startImportAnimation                                 MASH_Object.prototype.startImportAnimation
// ---------------------------------------------------------------------------------------------------------------------
// * animates the navigation 'into' or 'out of' this COLLECTION object
MASH_Object.prototype.startImportAnimation = function(animationInterval){

    //size animation
    var sizeIncrease = 1.1;
    var oldWidth     = parseInt(this.wrapperObj.style.width);
    var oldHeight    = parseInt(this.wrapperObj.style.height);
    var newWidth     = parseInt(oldWidth  * sizeIncrease);
    var newHeight    = parseInt(oldHeight * sizeIncrease);

    this.resize(newWidth, newHeight);

    //background and border animation (reverse colors)
    var oldBackgroundColorString = this.backgroundColor.toLowerCase();
    var oldBorderColorString     = this.borderColor.toLowerCase();

    if(oldBackgroundColorString == "transparent") { oldBackgroundColorString = "#ffffff"; }
    if(oldBorderColorString     == "transparent") { oldBorderColorString     = "#ffffff"; }

    var reverseBackgroundColorString = oldBackgroundColorString.replace(/#/, "");
    var reverseBorderColorString     = oldBorderColorString.replace(/#/, "");

    var rgbBackground = reverseBackgroundColorString.match(/[\da-f]{2}/g);
    var rgbBorder     = reverseBorderColorString.match(/[\da-f]{2}/g);
    for(var i=0; i<3; i++) {
        rgbBackground[i] = (255 - parseInt(rgbBackground[i], 16)).toString(16);
        if(parseInt(rgbBackground[i], 16) < 0x10) { rgbBackground[i] = "0" + rgbBackground[i]; }

        rgbBorder[i] = (255 - parseInt(rgbBorder[i], 16)).toString(16);
        if(parseInt(rgbBorder[i], 16) < 0x10) { rgbBorder[i] = "0" + rgbBorder[i]; }
    }
    reverseBackgroundColorString = "#" + rgbBackground[0] + rgbBackground[1] + rgbBackground[2];
    reverseBorderColorString     = "#" + rgbBorder[0]     + rgbBorder[1]     + rgbBorder[2];

    this.innerObj.style.backgroundColor = reverseBackgroundColorString;
    this.wrapperObj.style.borderColor   = reverseBorderColorString;

    //set timeout
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.stopImportAnimation(\"" + oldWidth             + "\", \""
                                                                                                                 + oldHeight            + "\", \""
                                                                                                                 + this.backgroundColor + "\", \""
                                                                                                                 + this.borderColor     + "\")", animationInterval);

}//MASH_Object.prototype.startImportAnimation



// MASH_Object.prototype.stopImportAnimation                                   MASH_Object.prototype.stopImportAnimation
// ---------------------------------------------------------------------------------------------------------------------
// * animates the navigation 'into' or 'out of' this COLLECTION object
MASH_Object.prototype.stopImportAnimation = function(oldWidth, oldHeight, tmpBackgroundColor, tmpBorderColor){

    //reset size
    this.resize(oldWidth, oldHeight);

    //reset background and border animation (restore colors)
    this.innerObj.style.backgroundColor = tmpBackgroundColor;
    this.wrapperObj.style.borderColor   = tmpBorderColor;

}//MASH_Object.prototype.stopImportAnimation



// MASH_Object.prototype.setEmphasis                                                   MASH_Object.prototype.setEmphasis
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.setEmphasis  = function(value){

    //validate the new emphasis value
    if(!value)  { return; }

    //validate coefficient
    if(!this.emphasisCoefficient) { this.emphasisCoefficient = value; }

    //update coefficient
    if(this.emphasisCoefficient >  100) { this.emphasisCoefficient =  100; }
    if(this.emphasisCoefficient < -100) { this.emphasisCoefficient = -100; }

    this.translateEmphasisToVisualCues();

}//MASH_Object.prototype.setEmphasis



// MASH_Object.prototype.translateEmphasisToVisualCues               MASH_Object.prototype.translateEmphasisToVisualCues
// ---------------------------------------------------------------------------------------------------------------------
// * modifies the visual prominence of the object in order to reflect the degree of emphasis
// * the specific adaptations depend on the magnitude of the emphasis coefficient
//   from alpha-blurring and reducing the size
//   to glowing, increasing the size, font and border
MASH_Object.prototype.translateEmphasisToVisualCues  = function(){

    //if the emphasis coefficient is very close to zero, then just kill the filters and return
    if((this.emphasisCoefficient > -1) && (this.emphasisCoefficient <  1) ){
        this.resetVisualCues();
        return;
    }

    //object is de-emphasized
    if(this.emphasisCoefficient < 1) {

        //font adaptations
        var fontIncrease = parseInt(this.emphasisCoefficient/10);
        var newFontSize  = parseInt(this.fontSize) + fontIncrease;
        if(newFontSize < 4) { newFontSize  = 4; }
        this.innerObj.style.fontSize = newFontSize+"pt";

        //border adaptations
        var borderIncrease = parseInt(this.emphasisCoefficient/10);
        var newBorderWidth = parseInt(this.reference.style.borderWidth) + borderIncrease;
        if(newBorderWidth < 0) { newBorderWidth = 0; }
        this.wrapperObj.style.borderWidth = newBorderWidth;

        //size adaptations
        var sizeIncrease           = 1 + (this.emphasisCoefficient/100);
        var newWidth               = parseInt(adjustSize(this.width,  this.borderWidth) * sizeIncrease);
        var newHeight              = parseInt(adjustSize(this.height, this.borderWidth) * sizeIncrease);
        //move object to make it appear as it is resizing from it's center
        this.wrapperObj.style.left = parseInt(this.wrapperObj.style.left) - parseInt((newWidth  - parseInt(this.wrapperObj.style.width))  / 2);
        this.wrapperObj.style.top  = parseInt(this.wrapperObj.style.top)  - parseInt((newHeight - parseInt(this.wrapperObj.style.height)) / 2);
        //resize object
        this.resize(newWidth, newHeight);


        //adjust filters
        var alphaValue     = 100 + 2*this.emphasisCoefficient;
        if(alphaValue>100) { alphaValue = 100; }
        if(alphaValue<10)  { alphaValue = 10;  }

        this.normal();
        this.alpha(alphaValue);
    }

    //object is emphasized
    if(this.emphasisCoefficient >= 1) {

        //font adaptation
        var fontIncrease            = parseInt(this.emphasisCoefficient/10);
        this.innerObj.style.fontSize = (parseInt(this.fontSize) + fontIncrease)+"pt";

        //border adaptation
        var borderIncrease                = parseInt(this.emphasisCoefficient/10);
        this.wrapperObj.style.borderWidth = parseInt(this.borderWidth) + borderIncrease;

        //size adaptation
        var sizeIncrease            = 1 + (this.emphasisCoefficient/100);
        var newWidth                = parseInt(adjustSize(this.width,  this.borderWidth) * sizeIncrease);
        var newHeight               = parseInt(adjustSize(this.height, this.borderWidth) * sizeIncrease);
        //move object to make it appear as it is resizing from it's center
        this.wrapperObj.style.left  = parseInt(this.wrapperObj.style.left) - parseInt((newWidth  + 10 - parseInt(this.wrapperObj.style.width))  / 2);
        this.wrapperObj.style.top   = parseInt(this.wrapperObj.style.top)  - parseInt((newHeight + 10 - parseInt(this.wrapperObj.style.height)) / 2);
        //resize object
        this.resize( newWidth, newHeight );

        //bring the objet to the front
        this.sendToFront();

        //adjust filters
        var glowStrength = parseInt(this.emphasisCoefficient/10);
        this.normal();
        this.glow(glowStrength);

    }//if ephasized

}//MASH_Object.prototype.translateEmphasisToVisualCues



// MASH_Object.prototype.getParentCompositeTree                             MASH_Object.prototype.getParentCompositeTree
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getParentCompositeTree = function(indentation) {

    if(!indentation) { indentation = ""; }

    var message = indentation + this.id + "\n";
//alert("getParentCompositeTree("+indentation+")\n"+message+"\nparentComposites.length = "+this.parentComposites.length);

    for(var i=0; i<this.parentComposites.length; i++) {
        var parentObj = this.parentComposites[i];
//        message += indentation + "--" + parentObj.id + "\n";
        message += parentObj.getParentCompositeTree(indentation + "    ");
    }

    return message;

}//MASH_Object.prototype.getParentCompositeTree



// MASH_Object.prototype.resetParentComposites                               MASH_Object.prototype.resetParentComposites
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.resetParentComposites = function() {

    this.parentComposites = new Array();

}//MASH_Object.prototype.resetParentComposites



// MASH_Object.clearAllParentComposites                                             MASH_Object.clearAllParentComposites
// ---------------------------------------------------------------------------------------------------------------------
// * clears all the parent composites from all objects
MASH_Object.clearAllParentComposites = function(){

    for(var i=0; i<allMASHObjects.length; i++) {
        allMASHObjects[i].resetParentComposites();
    }

}//MASH_Object.clearAllParentComposites


// MASH_Object.addParentComposite                                                         MASH_Object.addParentComposite
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.addParentComposite = function(objID, parentID) {

//alert("addParentComposite("+objID+","+parentID+")");

    var obj       = findObjectByID(objID);
    var parentObj = findObjectByID(parentID);

    if( (parentObj) && (parentObj!=null) ) {
        obj.parentComposites.push(parentObj);
    }
    else {
//        alert("object("+parentID+") = "+parentObj);
    }

}//MASH_Object.addParentComposite



// MASH_Object.prototype.destroy                                                           MASH_Object.prototype.destroy
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.destroy = function() {

    //remove from allMASHObjects array
    for(var i=0; i<allMASHObjects.length; i++) {
        if(allMASHObjects[i] == this) {
            allMASHObjects.splice(i,1);
            break;
        }
    }

    //remove from specifict type arrays

    //identify array
    var tmpArray = MASH_Object.getArray(this);

    //search for this object in its array
    for(var i=0; i<tmpArray.length; i++) {
        //remove object from array
        if(tmpArray[i] == this) {
            tmpArray.splice(i,1);
            break;
        }
    }

    //destroy sub components
    if(this.components) {
        for(var i=0; i<this.components.length; i++) {
            this.components[i].destroy();
        }
    }

    //remove screen object
    this.reference.parentNode.removeChild(this.reference);

}//MASH_Object.prototype.destroy



// MASH_Object.prototype.toString                                                         MASH_Object.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.toString = function() {

    var mashObjectToString = "";
    var type = "" + this.constructor;
    type = type.substring(type.indexOf(" ")+1, type.indexOf("("))
    mashObjectToString += "MASH Type = " + type + "\n";
    for(var tmpMashObjectProperty in this) {
        if((tmpMashObjectProperty != "base"   ) &&
           (tmpMashObjectProperty != "options") ){
            mashObjectToString += tmpMashObjectProperty + " = " + this[tmpMashObjectProperty] + "\n";
        }
    }
    return mashObjectToString;

}//MASH_Object.prototype.toString



// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_Object.prototype.getContextLayerNewWidth                           MASH_Object.prototype.getContextLayerNewWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getContextLayerNewWidth = function(newWidth) {


    if(isIE)       { newWidth = (newWidth  - 2*parseInt(this.wrapperObj.style.borderWidth)); }
    if(isNetscape) { newWidth = (newWidth  - 2);                                             }

    if(newWidth <1) { newWidth = 1; }

    return  newWidth;

}//MASH_Object.prototype.getContextLayerNewWidth



// MASH_Object.prototype.getContextLayerNewHeight                         MASH_Object.prototype.getContextLayerNewHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getContextLayerNewHeight = function(newHeight) {

    if(isIE)       { newHeight = (newHeight  - 2*parseInt(this.wrapperObj.style.borderWidth)); }
    if(isNetscape) { newHeight = (newHeight  - 2);                                             }

    if(newHeight <1) { newHeight = 1; }

    return  newHeight;

}//MASH_Object.prototype.getContextLayerNewHeight


// MASH_Object.prototype.getContextLayerInitialWidth                   MASH_Object.prototype.getContextLayerInitialWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getContextLayerInitialWidth = function() {

    if(isIE)       { return (this.width - 2*this.borderWidth);     }
    if(isNetscape) { return (this.width - 2*this.borderWidth - 2); }

    return  (this.width - 2*this.borderWidth);

}//MASH_Object.prototype.getContextLayerInitialWidth



// MASH_Object.prototype.getContextLayerInitialHeight                 MASH_Object.prototype.getContextLayerInitialHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getContextLayerInitialHeight = function() {

    if(isIE)       { return (this.height - 2*this.borderWidth);     }
    if(isNetscape) { return (this.height - 2*this.borderWidth - 2); }

    return  (this.height - 2*this.borderWidth);

}//MASH_Object.prototype.getContextLayerInitialHeight



// =====================================================================================================================
// BROWSER SPECIFIC: Filters                                                                   BROWSER SPECIFIC: Filters
// =====================================================================================================================



// MASH_Object.prototype.normal                                                             MASH_Object.prototype.normal
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.normal = function() {

    if(isIE) {
        //this "try" is because it seems that there can be some race conditions in IE
        // if it's not catched it gives an error and quites executing
        try {
            this.reference.style.filter = "";

            this.basicImageString       = "";
            this.basicImageMirror       = 0;
            this.basicImageInvert       = 0;
            this.basicImageRotation     = 0;
            this.basicImageGrayScale    = 0;
            this.basicImageXRay         = 0;
            this.basicImageOpacity      = 1.0;

            //reset filters
            this.filterBasicImage       = false;
            this.filterBlurActive       = false;
            this.filterShadowActive     = false;
            this.filterEmbossActive     = false;
            this.filterEngraveActive    = false;
            this.filterGlowActive       = false;
            this.filterGradientActive   = false;

            this.filterGlowStrength     = 0;
        }
        catch (e){
              //ignore
        }
    }
    else if(isNetscape) {
         this.reference.style.MozOpacity   = "1.0";
         this.reference.style.MozTransform = "rotate(0deg) skew(0deg, 0deg)";
         this.basicImageRotation           = 0;

    }

}//MASH_Object.prototype.normal



// MASH_Object.prototype.basicImage                                                     MASH_Object.prototype.basicImage
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.basicImage = function() {

    if(isIE) {
        this.reference.style.filter += "progid:DXImageTransform.Microsoft.BasicImage() ";

        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").Opacity   = this.basicImageOpacity;
        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").Invert    = this.basicImageInvert;
        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").Mirror    = this.basicImageMirror;
        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").GrayScale = this.basicImageGrayScale;
        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").XRay      = this.basicImageXRay;
        this.reference.filters.item("DXImageTransform.Microsoft.BasicImage").Rotation  = this.basicImageRotation;
    }

}//MASH_Object.prototype.basicImage



// MASH_Object.prototype.alpha                                                               MASH_Object.prototype.alpha
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.alpha = function(value) {

    if(isIE) {
        var alphaValue = 0.50;
        if(value) { alphaValue = value/100; }

        this.basicImageOpacity = alphaValue;
        this.basicImage();
        this.updateFilters();
    }
    else if(isNetscape) {
         this.reference.style.MozOpacity = "0.5";
         this.reference.style.MozSmiley  = "s6";
    }

}//MASH_Object.prototype.alpha



// MASH_Object.prototype.grayScale                                                       MASH_Object.prototype.grayScale
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.grayScale = function(value) {

    if( (isIE) && (value) ) {
        this.basicImageGrayScale = value;
        this.basicImage();
        this.updateFilters();
    }

}//MASH_Object.prototype.grayScale



// MASH_Object.prototype.invert                                                             MASH_Object.prototype.invert
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.invert = function(value) {

    if( (isIE) && (value) ) {
        this.basicImageInvert = value;
        this.basicImage();
        this.updateFilters();
    }

}//MASH_Object.prototype.invert



// MASH_Object.prototype.mirror                                                             MASH_Object.prototype.mirror
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.mirror = function(value) {

    if( (isIE) && (value) ) {
        this.basicImageMirror = value;
        this.basicImage();
        this.updateFilters();
    }

}//MASH_Object.prototype.mirror



// MASH_Object.prototype.rotate                                                             MASH_Object.prototype.rotate
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.rotate = function(value) {

    if( (isIE) && (value) ) {
        this.basicImageRotation = this.basicImageRotation + value;
        if(this.basicImageRotation>3) { this.basicImageRotation = this.basicImageRotation % 4; }
        this.basicImage();
        this.updateFilters();
    }
    else if( (isNetscape) && (value) ) {
        this.basicImageRotation = parseInt(this.basicImageRotation) + value;
        if(this.basicImageRotation>3) { this.basicImageRotation = this.basicImageRotation % 4; }
//        this.reference.style.MozTransform = "rotate(" + (this.basicImageRotation*90) + "deg)  skew(10deg, 10deg)";
        this.reference.style.MozTransform = "rotate(" + (this.basicImageRotation*90) + "deg)";
    }

}//MASH_Object.prototype.rotate



// MASH_Object.prototype.rotateDegrees                                               MASH_Object.prototype.rotateDegrees
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.rotateDegrees = function() {

    if( isNetscape) {
        //get degrees from user and validate input
        var value = parseInt( prompt("Enter degrees to be rotated clockwise") );
        if(value>=360) { value = value % 360; }
        this.rotateClockwise(value);
    }

}//MASH_Object.prototype.rotateDegrees



// MASH_Object.prototype.rotateClockwise                                           MASH_Object.prototype.rotateClockwise
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.rotateClockwise = function(value) {

    if(isNetscape) {

        this.basicImageRotation = parseInt(this.basicImageRotation) + parseInt(value);
        if( parseInt(this.basicImageRotation)>=360 ) { this.basicImageRotation = parseInt(this.basicImageRotation) % 360; }

//        this.reference.style.MozTransform = "rotate(" + this.basicImageRotation + "deg)  skew(10deg, 10deg)";
        this.reference.style.MozTransform = "rotate(" + this.basicImageRotation + "deg)";
    }

}//MASH_Object.prototype.rotateClockwise



// MASH_Object.prototype.xRay                                                                 MASH_Object.prototype.xRay
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.xRay = function(value) {

    if( (isIE) && (value) ) {
        this.basicImageXRay = value;
        this.basicImage();
        this.updateFilters();
    }

}//MASH_Object.prototype.xRay



// MASH_Object.prototype.updateFilters                                               MASH_Object.prototype.updateFilters
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.updateFilters = function() {

    if(isIE) {
        //reset filters
        this.reference.style.filter = "";
        this.basicImage();

        //re-activate filters
        if(this.filterBlurActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Blur() ";
            this.reference.filters.item("DXImageTransform.Microsoft.Blur").pixelRadius = 4;
        }
        if(this.filterShadowActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.DropShadow() ";
        }
        if(this.filterEmbossActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Emboss() ";
        }
        if(this.filterEngraveActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Emboss() ";
        }
        if(this.filterGlowActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Engrave() ";
        }
        if(this.filterGradientActive == true) {
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Glow(strength="+this.filterGlowStrength+") ";
        }
        if(this.filterGradientActive == true) {
            var tmpColor1   = this.backgroundColor.match(/[\w]+/g);
            var tmpColor2   = "444444";
            if(tmpColor1 == "transparent") { tmpColor1 = "DDDDDD" };
            this.reference.style.filter += "progid:DXImageTransform.Microsoft.Gradient() ";
            this.reference.filters.item("DXImageTransform.Microsoft.Gradient").StartColorStr = "#FF"+tmpColor1;
            this.reference.filters.item("DXImageTransform.Microsoft.Gradient").EndColorStr   = "#FF"+tmpColor2;
        }
    }


}//MASH_Object.prototype.updateFilters



// MASH_Object.prototype.blur                                                                 MASH_Object.prototype.blur
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.blur = function() {

    if(isIE) {
        if     (this.filterBlurActive == false) { this.filterBlurActive = true;  }
        else if(this.filterBlurActive == true)  { this.filterBlurActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.blur



// MASH_Object.prototype.dropShadow                                                     MASH_Object.prototype.dropShadow
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.dropShadow = function() {

    if(isIE) {
        if     (this.filterShadowActive == false) { this.filterShadowActive = true;  }
        else if(this.filterShadowActive == true)  { this.filterShadowActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.dropShadow



// MASH_Object.prototype.emboss                                                             MASH_Object.prototype.emboss
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.emboss = function() {

    if(isIE) {
        if     (this.filterEmbossActive == false) { this.filterEmbossActive = true;  }
        else if(this.filterEmbossActive == true)  { this.filterEmbossActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.emboss



// MASH_Object.prototype.engrave                                                           MASH_Object.prototype.engrave
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.engrave = function() {

    if(isIE) {
        if     (this.filterEngraveActive == false) { this.filterEngraveActive = true;  }
        else if(this.filterEngraveActive == true)  { this.filterEngraveActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.engrave



// MASH_Object.prototype.glow                                                                 MASH_Object.prototype.glow
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.glow = function(value) {

    if(isIE) {
        var glowValue = 5;
        if(value) { glowValue = value; }
        this.filterGlowStrength = value;

        if     (this.filterGlowActive == false) { this.filterGlowActive = true;  }
        else if(this.filterGlowActive == true)  { this.filterGlowActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.glow



// MASH_Object.prototype.gradient                                                         MASH_Object.prototype.gradient
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.gradient = function() {

    if(isIE) {
        if     (this.filterGradientActive == false) { this.filterGradientActive = true;  }
        else if(this.filterGradientActive == true)  { this.filterGradientActive = false; }
        this.updateFilters();
    }

}//MASH_Object.prototype.gradient



// =====================================================================================================================
// DEFAULT ADAPTATIONS                                                                               DEFAULT ADAPTATIONS
// =====================================================================================================================



// MASH_Object.prototype.adaptRelevance                                             MASH_Object.prototype.adaptRelevance
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.adaptRelevance = function(strength) {


    this.setEmphasis(parseInt(strength*100));
/*
    if(strength >  0.0) { this.emphasize(strength);   }
    if(strength <  0.0) { this.deemphasize(strength); }
*/

}//MASH_Object.prototype.adaptRelevance



// MASH_Object.prototype.adaptExplanations                                       MASH_Object.prototype.adaptExplanations
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.adaptExplanations = function(strength) {

}//MASH_Object.prototype.adaptExplanations



// MASH_Object.prototype.addMetadata                                                   MASH_Object.prototype.addMetadata
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.addMetadata = function(metadata) {

    this.metadataArray.push(metadata);

}//MASH_Object.prototype.addMetadata



// MASH_Object.prototype.removeMetadata                                             MASH_Object.prototype.removeMetadata
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.removeMetadata = function(metadata) {

    var meta = null;
    for(var i=0; i<this.metadataArray.length; i++) {
        if(this.metadataArray[i].name == name) {
            this.metadataArray,splice(i,1);
            break;
        }
    }

}//MASH_Object.prototype.removeMetadata



// MASH_Object.prototype.clearMetadata                                               MASH_Object.prototype.clearMetadata
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.clearMetadata = function() {

    this.metadataArray = new Array();

}//MASH_Object.prototype.clearMetadata



// MASH_Object.prototype.getMetadata                                                   MASH_Object.prototype.getMetadata
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getMetadata = function(name) {

    var meta = null;
    for(var i=0; i<this.metadataArray.length; i++) {
        if(this.metadataArray[i].name == name) {
            meta = this.metadataArray[i];
            break;
        }
    }

    return meta;

}//MASH_Object.prototype.getMetadata



// =====================================================================================================================
// Metadata                                                                                                     Metadata
// =====================================================================================================================
function Metadata(name, value) {

    this.name  = name;
    this.value = value;

}//Metadata



// =====================================================================================================================
// Conflict Resolution Methods                                                               Conflict Resolution Methods
// =====================================================================================================================



// MASH_Object.prototype.isSet_ObjectConflictResolution             MASH_Object.prototype.isSet_ObjectConflictResolution
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.isSet_ObjectConflictResolution = function() {
    return this.objectConflictResolutionSetFlag;
}//MASH_Object.prototype.isSet_ObjectConflictResolution



// MASH_Object.prototype.setObjectConflictResolutionMethod       MASH_Object.prototype.setObjectConflictResolutionMethod
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.setObjectConflictResolutionMethod = function(resolutionMethodName) {
    this.objectConflictResolution = resolutionMethodName;
    this.objectConflictResolutionSetFlag = true;
}//MASH_Object.prototype.setObjectConflictResolutionMethod



// MASH_Object.prototype.getObjectConflictResolutionMethod       MASH_Object.prototype.getObjectConflictResolutionMethod
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.prototype.getObjectConflictResolutionMethod = function() {
    return this.objectConflictResolution;
}//MASH_Object.prototype.getObjectConflictResolutionMethod





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



MASH_Object.XML_TAG_INDENT                          = "  ";


//XML tags
MASH_Object.XML_TAG_NETSCAPE_DEFAULT_ROOT_NODE      = "#document";

MASH_Object.XML_TAG_DOCUMENT                        = "MASH_Document";

MASH_Object.XML_TAG_DOCUMENT_PROPERTIES             = "MASH_Properties";
MASH_Object.XML_TAG_DOCUMENT_OBJECTS                = "MASH_Objects";
MASH_Object.XML_TAG_DOCUMENT_RELATIONSHIPS          = "MASH_Relationships";

//XML tags: MASH Properties
MASH_Object.XML_TAG_DOCUMENT_NAME                   = "MASH_DocumentName";
MASH_Object.XML_TAG_TOP_Z_INDEX                     = "MASH_TopZIndex";

//XML tags: MASH Objects
MASH_Object.XML_TAG_OBJECT                          = "object";

MASH_Object.XML_TAG_ID                              = "id";
MASH_Object.XML_TAG_LEFT                            = "left";
MASH_Object.XML_TAG_TOP                             = "top";
MASH_Object.XML_TAG_WIDTH                           = "width";
MASH_Object.XML_TAG_HEIGHT                          = "height";
MASH_Object.XML_TAG_Z_INDEX                         = "zIndex";

MASH_Object.XML_TAG_STYLE                           = "style";

MASH_Object.XML_TAG_HORIZONTAL_ALIGN                = "horizontalAlign";
MASH_Object.XML_TAG_VERTICAL_ALIGN                  = "verticalAlign";

MASH_Object.XML_TAG_FONT_COLOR                      = "fontColor";
MASH_Object.XML_TAG_FONT_SIZE                       = "fontSize";
MASH_Object.XML_TAG_FONT_FAMILY                     = "fontFamily";
MASH_Object.XML_TAG_FONT_WEIGHT                     = "fontWeight";

MASH_Object.XML_TAG_BACKGROUND_COLOR                = "backgroundColor";
MASH_Object.XML_TAG_BACKGROUND_IMAGE                = "backgroundImage";
MASH_Object.XML_TAG_BACKGROUND_REPEAT               = "backgroundRepeat";
MASH_Object.XML_TAG_BACKGROUND_POSITION             = "backgroundPosition";

MASH_Object.XML_TAG_BORDER_COLOR                     = "borderColor";
MASH_Object.XML_TAG_BORDER_STYLE                     = "borderStyle";
MASH_Object.XML_TAG_BORDER_WIDTH                     = "borderWidth";

//XML tags: MASH Relationships



// MASH_Object.xmlCreateMASHDocument                                                   MASH_Object.xmlCreateMASHDocument
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlCreateMASHDocument = function(xmlString){

    //validate parameters
    if( (!xmlString) && (xmlString.length<=0) ) { return null; }

    //get document element and parse it
    var documentNode   = MASH_Object.xmlGetDocumentElement(xmlString);
    var parsedDocument = MASH_Object.xmlParseDocumentNode(documentNode);


    //write all document properties
    documentName = parsedDocument.properties.documentName;
    topZ         = parsedDocument.properties.topZ;

    //remove all previous objects
    // - this clears the global object arrays4
    MASH_Object.deleteMASHObjects();

    //write all objects
    for(var i=0; i<parsedDocument.objects.length; i++){
        //create the object and push it in the proper array
        var tmpObj = MASH_Object.createObject(parsedDocument.objects[i], null);
        //push object in the general object array
        allMASHObjects.push(parsedDocument.objects[i]);
    }

    //write all relationships
    // ***** TO BE IMPLEMENTED *****


}//MASH_Object.xmlCreateMASHDocument



// MASH_Object.xmlGetDocumentElement                                                   MASH_Object.xmlGetDocumentElement
// ---------------------------------------------------------------------------------------------------------------------
// * Browser specific
// * returns an instance of the browser specific xml parser with the document's XML loaded
// * returns null if the parser cannot be instantiated or the document fails to be loaded
MASH_Object.xmlGetDocumentElement = function(xmlString){

//    alert("MASH_FileManager.xmlGetDocumentElement()");

    //validate parameters
    if( (!xmlString) && (xmlString.length<=0) ) { return null; }

    var xmlParser    = null;
    var documentNode = null;
    //IE
    if(isIE) {

        //instantiate xml parser and load document
        xmlParser = new ActiveXObject("Microsoft.XMLDOM");
        xmlParser.async = "false";
        xmlParser.loadXML(xmlString);

        //Check for errors
        if(xmlParser.parseError.errorCode!=0) {
            var errorMessages = "Errors parsing the XML file\n==========\n";
            errorMessages    += "Error code: "   + xmlParser.parseError.errorCode + "\n";
            errorMessages    += "Error reason: " + xmlParser.parseError.reason + "\n";
            errorMessages    += "Error line: "   + xmlParser.parseError.line + "\n";
            alert(errorMessages);
        }
        else {
            documentNode = xmlParser.documentElement;
        }
    }
    //Netscape
    if(isNetscape) {

        //instantiate xml parser and load document
        xmlParser = new DOMParser();
        var dom   = xmlParser.parseFromString(xmlString,"text/xml");

        //Check for errors
        if(dom.documentElement.nodeName == "parsererror") {
            alert("Error while parsing\n=========================\n" + dom.documentElement.childNodes[0].nodeValue + "\n" );
        }
        else {
            documentNode = dom.documentElement;
        }
    }

    return documentNode;

}//MASH_Object.xmlGetDocumentElement



// MASH_Object.prototype.getCurrentStateGenericXML                       MASH_Object.prototype.getCurrentStateGenericXML
// ---------------------------------------------------------------------------------------------------------------------
// * Returns a string with the XML for the general characteristics of this object
// * The string does NOT include the enclosing object tags, as these are supposed to be placed by the calling function
MASH_Object.prototype.getCurrentStateGenericXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //get the generic fetures of the object
    var objID                 = this.id;
    var objLeft               = parseInt(this.reference.style.left);
    var objTop                = parseInt(this.reference.style.top);
    var objWidth              = parseInt(this.reference.style.width);
    var objHeight             = parseInt(this.reference.style.height);
    var objZIndex             = parseInt(this.reference.style.zIndex);

    var objStyle              = this.getCurrentStyleXML(indent)

    var objHorizontalAlign    = this.align;
    var objVerticalAlign      = this.verticalAlign;

    var objFontColor          = this.color;
    var objFontFamily         = this.fontFamily;
    var objFontSize           = this.fontSize;
    var objFontWeight         = this.fontWeight;

    var objBackgroundColor    = this.backgroundColor;
    var objBackgroundImage    = this.backgroundImage;
    var objBackgroundRepeat   = this.backgroundRepeat;
    var objBackgroundPosition = this.backgroundPosition;

    var objBorderColor        = this.borderColor;
    var objBorderStyle        = this.borderStyle;
    var objBorderWidth        = parseInt(this.borderWidth);


    //compensate the different ways the IE and Netscape handle the width of the border
    var objWidth              = MASH_Object.xmlGetUnadjustedSize(objWidth,  objBorderWidth);
    var objHeight             = MASH_Object.xmlGetUnadjustedSize(objHeight, objBorderWidth);


    //compose XML string
    var objectXML = "";

    //general properties
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_ID,      objID,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_LEFT,    objLeft,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_TOP,     objTop,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_WIDTH,   objWidth,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_HEIGHT,  objHeight, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_Z_INDEX, objZIndex, true,  indent);
    objectXML += MASH_Object.xmlMakeTagMultiLine( MASH_Object.XML_TAG_STYLE,   objStyle,  false, indent);

    //return xml segment
    return objectXML;

}//MASH_Object.prototype.getCurrentStateGenericXML



// MASH_Object.xmlGetUnadjustedSize                                                     MASH_Object.xmlGetUnadjustedSize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlGetUnadjustedSize = function(objSize, objBorderWidth) {

    if(isNetscape)  { return (objSize + (objBorderWidth * 2) ); }
    else if(isIE)   { return objSize;                           }

}//MASH_Object.xmlGetUnadjustedSize



// MASH_Object.prototype.getCurrentStyleXML                                     MASH_Object.prototype.getCurrentStyleXML
// ---------------------------------------------------------------------------------------------------------------------
// * Returns a string with the XML for the general characteristics of this object
// * The string does NOT include the enclosing object tags, as these are supposed to be placed by the calling function
MASH_Object.prototype.getCurrentStyleXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //get style properties
    var objHorizontalAlign    = this.align;
    var objVerticalAlign      = this.verticalAlign;

    var objFontColor          = this.color;
    var objFontFamily         = this.fontFamily;
    var objFontSize           = this.fontSize;
    var objFontWeight         = this.fontWeight;

    var objBackgroundColor    = this.backgroundColor;
    var objBackgroundImage    = this.backgroundImage;
    var objBackgroundRepeat   = this.backgroundRepeat;
    var objBackgroundPosition = this.backgroundPosition;

    var objBorderColor        = this.borderColor;
    var objBorderStyle        = this.borderStyle;
    var objBorderWidth        = this.borderWidth;


    //compose XML string
    var objectXML = "";

    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_HORIZONTAL_ALIGN,    objHorizontalAlign,    true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_VERTICAL_ALIGN,      objVerticalAlign,      true, indent);

    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_FONT_COLOR,          objFontColor,          true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_FONT_SIZE,           objFontSize,           true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_FONT_FAMILY,         objFontFamily,         true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_FONT_WEIGHT,         objFontWeight,         true, indent);

    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BACKGROUND_COLOR,    objBackgroundColor,    true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BACKGROUND_IMAGE,    objBackgroundImage,    true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BACKGROUND_REPEAT,   objBackgroundRepeat,   true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BACKGROUND_POSITION, objBackgroundPosition, true, indent);

    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BORDER_COLOR,        objBorderColor,        true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BORDER_STYLE,        objBorderStyle,        true, indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_BORDER_WIDTH,        objBorderWidth,        true, indent);

    //return xml segment
    return objectXML;

}//MASH_Object.prototype.getCurrentStyleXML



// MASH_Object.xmlMakeTagSingleLine                                                     MASH_Object.xmlMakeTagSingleLine
// ---------------------------------------------------------------------------------------------------------------------
// * Creates the String representation of an XML tag
//      <tagName>tagText</tagName>
// * encode determines whether the text should be inside a <![CDATA[     ]]> section
// * indent provides the spaces to indent the tag
MASH_Object.xmlMakeTagSingleLine = function(tagName, tagText, encode, indent) {

    //validate parameters
    if(encode)  { tagText = MASH_Object.xmlEncode(tagText); }

    //create tag
    var xmlTag = indent                +
                 "<" + tagName  + ">"  +
                 tagText               +
                 "</" + tagName + ">\n";

    return xmlTag;

}//MASH_Object.xmlMakeTagSingleLine



// MASH_Object.xmlMakeTagMultiLine                                                       MASH_Object.xmlMakeTagMultiLine
// ---------------------------------------------------------------------------------------------------------------------
// * Creates the String representation of an XML tag
//      <tagName>
//          tagText
//      </tagName>
// * encode determines whether the text should be inside a <![CDATA[     ]]> section
// * indent provides the spaces to indent the tag
MASH_Object.xmlMakeTagMultiLine = function(tagName, tagText, encode, indent) {

    //validate parameters
    if(encode)  { tagText = MASH_Object.xmlEncode(tagText); }

    var lineSeparator = "\n";

    //create tag
    var xmlTag = indent                +
                 "<" + tagName  + ">"  +
                 lineSeparator         +
                 tagText               +
                 lineSeparator         +
                 indent                +
                 "</" + tagName + ">\n";

    return xmlTag;

}//MASH_Object.xmlMakeTagMultiLine



// MASH_Object.prototype.toXML                                                               MASH_Object.prototype.toXML
// ---------------------------------------------------------------------------------------------------------------------
// * Returns a string with the XML object of this object
// * The string includes the generic object properites only
MASH_Object.prototype.toXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //make XML tag
    var objectXML = this.getCurrentStateGenericXML(indent);  //set the generic fetures of the object
    objectXML    += this.getTypeSpecificXML(indent);         //set the specific features of this particular kind of object

    objectXML     = MASH_Object.xmlMakeTagMultiLine(this.xmlObjectTag, objectXML, false,  indent);

    return objectXML;

}//MASH_Object.prototype.toXML



// MASH_Object.prototype.getTypeSpecificXML                                     MASH_Object.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
// * This function is used by MASH_Object.prototype.toXML()
// * subclasses of MASH_Object need to override this function depending on their constructor parameters
MASH_Object.prototype.getTypeSpecificXML = function(indent) {
    return "";
}//MASH_Object.prototype.getTypeSpecificXML



// MASH_Object.xmlMakeDocumentNode                                                       MASH_Object.xmlMakeDocumentNode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlMakeDocumentNode = function(docName, topZIndex, objArray, relationshipsArray) {

//    var mashXML = "<?xml version=\"1.0\"?>\n";
    var mashXML = "";


    //document properties
    var propertiesXML = "";
    propertiesXML    += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_DOCUMENT_NAME, docName,   false, "");
    propertiesXML    += MASH_Object.xmlMakeTagSingleLine(MASH_Object.XML_TAG_TOP_Z_INDEX,   topZIndex, false, "");

    mashXML          += MASH_Object.xmlMakeTagMultiLine(MASH_Object.XML_TAG_DOCUMENT_PROPERTIES, propertiesXML, false, "");

    //objects
    var objectsXML = "";
    for(var i=0; i<objArray.length; i++) {
        objectsXML += objArray[i].toXML();
    }
    mashXML += MASH_Object.xmlMakeTagMultiLine(MASH_Object.XML_TAG_DOCUMENT_OBJECTS, objectsXML, false, "");


    //relationships
    // ***** TO BE IMPLEMENTED *****
    var relationshipsXML = "";
    for(var i=0; i<relationshipsArray.length; i++) {
        //relationshipsXML += relationshipsArray[i].toXML();
    }
    mashXML += MASH_Object.xmlMakeTagMultiLine(MASH_Object.XML_TAG_DOCUMENT_RELATIONSHIPS, relationshipsXML, false, "");


    //create document node
    mashXML = MASH_Object.xmlMakeTagMultiLine(MASH_Object.XML_TAG_DOCUMENT, mashXML, false, "");

    return mashXML;

}//MASH_Object.xmlMakeDocumentNode



// MASH_Object.xmlEncode                                                                           MASH_Object.xmlEncode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlEncode = function(text){

    //make sure that text is a string
    text = String(text);

    //first escape de already escaped characters: these need to be restore as escaped entities
    var escapedLessThan      = /&lt;/g;
    var escapedGreaterThan   = /&gt;/g;

    text = text.replace(escapedLessThan,    "$$lltt;");
    text = text.replace(escapedGreaterThan, "$$ggtt;");

    //second escape the < and > so the xml parser does not make arrors of html tags
    var lessThan      = /</g;
    var greaterThan   = />/g;

    text = text.replace(lessThan,    "&lt;");
    text = text.replace(greaterThan, "&gt;");

    //place in a CDATA section
    var startCDATA = "<![CDATA[";
    var endCDATA   = "]]>";
    text = startCDATA + text + endCDATA;

    return text;

}//MASH_Object.xmlEncode




// MASH_Object.xmlDecode                                                                           MASH_Object.xmlDecode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlDecode = function(text){

    //extract from CDATA section
    var startCDATA = /\[CDATA\[/g;
    var endCDATA   = /\]\]/g;

    text = text.replace(startCDATA, "");
    text = text.replace(endCDATA,   "");


    //restore the < and >
    var lessThan      = /&lt;/g;
    var greaterThan   = /&gt;/g;

    text = text.replace(lessThan,    "<");
    text = text.replace(greaterThan, ">");

    //restore the escaped entities
    var escapedLessThan      = /$lltt;/g;
    var escapedGreaterThan   = /$ggtt;/g;

    text = text.replace(escapedLessThan,    "&lt;");
    text = text.replace(escapedGreaterThan, "&gt;");

    return text;

}//MASH_Object.xmlDecode



// MASH_Object.xmlParseDocumentNode                                                     MASH_Object.xmlParseDocumentNode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseDocumentNode = function(node){

//    alert("MASH_Object.xmlParseDocumentNode\n======================\n" +
//          "nodeName = ["    + node.nodeName                 + "]\n" +
//          "childNodes = ["  + node.childNodes.length        + "]\n");

    //make sure that the parse starts at the MASH_DOCUMENT node
    if(node.nodeName == MASH_Object.XML_TAG_NETSCAPE_DEFAULT_ROOT_NODE) {
        return MASH_Object.xmlParseDocumentNode(node.childNodes[0]);
    }

    //initialize variables
    var results = new Object();
    results.properties    = new Array();
    results.objects       = new Array();
    results.relationships = new Array();

    //analyze XML
    for(var i=0; i<node.childNodes.length; i++) {

        var child     = node.childNodes[i];
        var childName = child.nodeName;

        //parse document components
        if     (childName == MASH_Object.XML_TAG_DOCUMENT_PROPERTIES)     { results.properties    = MASH_Object.xmlParseMASH_Properties(child);    }
        else if(childName == MASH_Object.XML_TAG_DOCUMENT_OBJECTS)        { results.objects       = MASH_Object.xmlParseMASH_Objects(child);       }
        else if(childName == MASH_Object.XML_TAG_DOCUMENT_RELATIONSHIPS)  { results.relationships = MASH_Object.xmlParseMASH_Relationships(child); }
    }

    return results;

}//MASH_Object.xmlParseDocumentNode



// MASH_Object.xmlParseMASH_Properties                                               MASH_Object.xmlParseMASH_Properties
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseMASH_Properties = function(node){

//    alert("MASH_Object.xmlParseMASH_Properties\n===============================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" +
//          "childNodes = ["  + node.childNodes.length + "]\n");

    //initialize temporary variables
    var properties = new Object();
    properties.documentName = "";
    properties.topZ         = 1;

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;

        //parse inner objects
        if     (childName == MASH_Object.XML_TAG_DOCUMENT_NAME) { properties.documentName = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_TOP_Z_INDEX)   { properties.topZ         = MASH_Object.xmlParseNodeText(child);  }
    }

    return properties;

}//MASH_Object.xmlParseMASH_Properties



// MASH_Object.xmlParseMASH_Objects                                                     MASH_Object.xmlParseMASH_Objects
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseMASH_Objects = function(node){

//    alert("MASH_Object.xmlParseMASH_Objects\n=======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" +
//          "childNodes = ["  + node.childNodes.length + "]\n");

    //initialize temporary variables
    var objArray = new Array();
    var objCount = 0;

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;

        //parse inner objects
        if(childName == MASH_Object.XML_TAG_OBJECT)            { objArray[objCount++] = MASH_Object.xmlParseObjectNode(child);              }
        if(childName == MASH_Collection.XML_TAG_OBJECT)        { objArray[objCount++] = MASH_Collection.xmlParseObjectNode(child);          }
        if(childName == MASH_Form.XML_TAG_OBJECT)              { objArray[objCount++] = MASH_Form.xmlParseObjectNode(child);                }
        if(childName == MASH_Frame.XML_TAG_OBJECT)             { objArray[objCount++] = MASH_Frame.xmlParseObjectNode(child);               }
        if(childName == MASH_Image.XML_TAG_OBJECT)             { objArray[objCount++] = MASH_Image.xmlParseObjectNode(child);               }
        if(childName == MASH_ImplicitComposite.XML_TAG_OBJECT) { objArray[objCount++] = MASH_ImplicitComposite.xmlParseObjectNode(child);   }
        if(childName == MASH_Input.XML_TAG_OBJECT)             { objArray[objCount++] = MASH_Input.xmlParseObjectNode(child);               }
        if(childName == MASH_Text.XML_TAG_OBJECT)              { objArray[objCount++] = MASH_Text.xmlParseObjectNode(child);                }
        if(childName == MASH_UserAnnotation.XML_TAG_OBJECT)    { objArray[objCount++] = MASH_UserAnnotation.xmlParseObjectNode(child);      }
        if(childName == MASH_Video.XML_TAG_OBJECT)             { objArray[objCount++] = MASH_Video.xmlParseObjectNode(child);               }
        if(childName == MASH_VideoIndex.XML_TAG_OBJECT)        { objArray[objCount++] = MASH_VideoIndex.xmlParseObjectNode(child);          }
    }

    return objArray;

}//MASH_Object.xmlParseMASH_Objects



// MASH_Object.xmlParseMASH_Relationships                                         MASH_Object.xmlParseMASH_Relationships
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseMASH_Relationships = function(node){

//    alert("MASH_Object.xmlParseMASH_Relationships\n===============================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" +
//          "childNodes = ["  + node.childNodes.length + "]\n");

    //temporary return
    return new Array();

}//MASH_Object.xmlParseMASH_Relationships



// MASH_Object.xmlParseObjectNode                                                         MASH_Object.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseObjectNode = function(node){

//    alert("MASH_Object.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.OBJECT;

    //id
    var objID                 = MASH_Object.getUniqueID();

    //set the coordinates
    var objID                 = "";
    var objLeft               = 0;
    var objTop                = 0;
    var objWidth              = 100;
    var objHeight             = 100;
    var objZIndex             = 1;
    var objStyle              = "";

    //objects
    var objArray = new Array();
    var objCount = 0;

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;
        var childValue = child.nodeValue;

        //ignore #text nodes
        var xmlTextField = new RegExp(/\s*#text/);
        if( (!childName) || (childName.match(xmlTextField)) ) { continue; }

        //parse inner objects
        if(childName == MASH_Object.XML_TAG_OBJECT)       { objArray[objCount++] = MASH_Object.xmlParseObjectNode(child); }

        //parse object parameters
        else if(childName == MASH_Object.XML_TAG_ID)      { objID     = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_LEFT)    { objLeft   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_TOP)     { objTop    = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_WIDTH)   { objWidth  = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_HEIGHT)  { objHeight = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_Z_INDEX) { objZIndex = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_STYLE)   { objStyle  = MASH_Object.xmlParseStyleNode(child); }

    }

    //declare objects
    var obj = new MASH_Object(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle);
    if(objCount>0) { obj.composites = objArray; }

    return obj;

}//MASH_Object.xmlParseObjectNode



// MASH_Object.xmlParseNodeText                                                             MASH_Object.xmlParseNodeText
// ---------------------------------------------------------------------------------------------------------------------
MASH_Object.xmlParseNodeText = function(node){

    var text = "";

    //get the #text from inside node
    for(var i=0; i<node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if     (child.nodeName == "#text")          { text += child.nodeValue;                        }
        else if(child.nodeName == "#cdata-section") { text += child.nodeValue;                        }
    }

    text = MASH_Object.xmlDecode(text);

    return text;

}//MASH_Object.xmlParseNodeText



// MASH_Object.xmlParseStyleNode                                                           MASH_Object.xmlParseStyleNode
// ---------------------------------------------------------------------------------------------------------------------
// * Composes a MASH-CSS string using the xml node
MASH_Object.xmlParseStyleNode = function(node){

    var styleString           = "position:relative; ";

    //set the default style values
    var objAlign              = "center";
    var objVerticalAlign      = "middle";

    var objColor              = "#000000";
    var objFontFamily         = "arial";
    var objFontSize           = "10pt";
    var objFontWeight         = "normal";

    var objBackgroundColor    = "#ffffff";
    var objBackgroundImage    = "none";
    var objBackgroundRepeat   = "no-repeat";
    var objBackgroundPosition = "center center";

    var objBorderStyle        = "solid";
    var objBorderWidth        = 1;
    var objBorderColor        = "#000000";

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;

        //alignment
        if     (childName == MASH_Object.XML_TAG_HORIZONTAL_ALIGN)      { objAlign         = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_VERTICAL_ALIGN)        { objVerticalAlign = MASH_Object.xmlParseNodeText(child); }
        //font
        else if(childName == MASH_Object.XML_TAG_FONT_COLOR)            { objColor      = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_FONT_SIZE)             { objFontSize   = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_FONT_FAMILY)           { objFontFamily = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_FONT_WEIGHT)           { objFontWeight = MASH_Object.xmlParseNodeText(child); }
        //background
        else if(childName == MASH_Object.XML_TAG_BACKGROUND_COLOR)      { objBackgroundColor    = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_BACKGROUND_IMAGE)      { objBackgroundImage    = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_BACKGROUND_REPEAT)     { objBackgroundRepeat   = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_BACKGROUND_POSITION)   { objBackgroundPosition = MASH_Object.xmlParseNodeText(child); }
        //border
        else if(childName == MASH_Object.XML_TAG_BORDER_COLOR)          { objBorderColor = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_BORDER_STYLE)          { objBorderStyle = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Object.XML_TAG_BORDER_WIDTH)          { objBorderWidth = MASH_Object.xmlParseNodeText(child); }

    }

    //compose style string
    styleString += "align:"                 + objAlign               +"; " +
                   "vertical-align:"        + objVerticalAlign       +"; " +
                   "color:"                 + objColor               +"; " +
                   "font-size:"             + objFontSize            +"; " +
                   "font-family:"           + objFontFamily          +"; " +
                   "font-weight:"           + objFontWeight          +"; " +
                   "background-color:"      + objBackgroundColor     +"; " +
                   "background-image:"      + objBackgroundImage     +"; " +
                   "background-repeat:"     + objBackgroundRepeat    +"; " +
                   "background-position:"   + objBackgroundPosition  +"; " +
                   "border-color:"          + objBorderColor         +"; " +
                   "border-style:"          + objBorderStyle         +"; " +
                   "border-width:"          + objBorderWidth         +"; " ;


    return styleString;

}//MASH_Object.xmlParseStyleNode




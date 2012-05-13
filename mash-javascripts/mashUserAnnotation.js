// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Oct 10, 2003                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_UserAnnotation                                                                               MASH_UserAnnotation
// =====================================================================================================================
function MASH_UserAnnotation(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex,
                             tmpText, tmpType) {

    this.type = tmpType;

    if     (tmpType == MASH_UserAnnotation.BLUE_CIRCLE)      {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#000088; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.BLUE_CIRCLE_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.GREEN_CIRCLE)     {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#008800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.GREEN_CIRCLE_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.RED_CIRCLE)       {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#880000; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.RED_CIRCLE_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.YELLOW_CIRCLE)    {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
//        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.TOUCH_IMAGE_FILE, tmpText );
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.YELLOW_CIRCLE_IMAGE_FILE, tmpText );
    }

    else if(tmpType == MASH_UserAnnotation.BLUE_RECTANGLE)   {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:#eeeeff; border-width:4; border-color:#0000ff; border-style:solid; color:#000088; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Text;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.GREEN_RECTANGLE)  {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:#eeffee; border-width:4; border-color:#00ff00; border-style:solid; color:#008800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Text;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.RED_RECTANGLE)    {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:#ffeeee; border-width:4; border-color:#ff0000; border-style:solid; color:#880000; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Text;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.YELLOW_RECTANGLE) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:#ffffee; border-width:4; border-color:#ffff00; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Text;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText );
    }

    else if(tmpType == MASH_UserAnnotation.FINGER_MARKER) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:#ffff88; border-width:4; border-color:#ffff88; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:8pt; ";
        this.base    = MASH_Text;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.TOUCH_FEEDBACK_TOP) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.TOUCH_TOP_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.TOUCH_RIGHT_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.TOUCH_BOTTOM_IMAGE_FILE, tmpText );
    }
    else if(tmpType == MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT) {
        var tmpStyle = "align:center; vertical-align:middle; background-image:none; background-color:transparent; border-width:0; border-color:#0000ff; border-style:solid; color:#888800; font-family:Arial; font-weight:bold; font-size:10pt; ";
        this.base    = MASH_Image;
        this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, MASH_UserAnnotation.TOUCH_LEFT_IMAGE_FILE, tmpText );
    }

    this.text               = tmpText;
    this.MASHobjectType     = MASH_Object.USER_ANNOTATION;

    //context menu
    this.contextMenuString  = "<hr>\n"                                                                                                                                                  +
                              "<span onclick=\"otherObjects[0].targetObj.editText(); otherObjects[0].close();\" style=\"color:550000; text-decoration:none;\">Edit Text</span><br>\n" +
                              "<span onclick=\"otherObjects[0].targetObj.destroy();  otherObjects[0].close();\" style=\"color:550000; text-decoration:none;\">Destroy</span><br>\n"   ;

    //XML
    this.xmlObjectTag       = MASH_UserAnnotation.XML_TAG_OBJECT;

}
//set inheritance
MASH_UserAnnotation.prototype                = new MASH_Object("MASH_UserAnnotation",0,0,1,1,0,"");
MASH_UserAnnotation.prototype.constructor    = MASH_UserAnnotation;
//MASH_UserAnnotation


//Constants
MASH_UserAnnotation.COOKIE_NAME              = "mash_user_annotation";
MASH_UserAnnotation.INNER_ID_PREFIX          = "userAnnotationObj";
MASH_UserAnnotation.ID_PREFIX                = MASH_Object.ID_PREFIX + MASH_UserAnnotation.INNER_ID_PREFIX;

//type of user annotations
MASH_UserAnnotation.ALL_ANNOTATIONS          = 01;

MASH_UserAnnotation.GREEN_CIRCLE             = 12;
MASH_UserAnnotation.RED_CIRCLE               = 13;
MASH_UserAnnotation.YELLOW_CIRCLE            = 14;

MASH_UserAnnotation.BLUE_RECTANGLE           = 25;
MASH_UserAnnotation.GREEN_RECTANGLE          = 26;
MASH_UserAnnotation.RED_RECTANGLE            = 27;
MASH_UserAnnotation.YELLOW_RECTANGLE         = 28;

MASH_UserAnnotation.TOUCH_FEEDBACK_TOP       = 91;
MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT     = 92;
MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM    = 93;
MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT      = 94;
MASH_UserAnnotation.FINGER_MARKER            = 99;

MASH_UserAnnotation.BLUE_CIRCLE_IMAGE_FILE   = "mash_images/annotation-blue.png";
MASH_UserAnnotation.GREEN_CIRCLE_IMAGE_FILE  = "mash_images/annotation-green.png";
MASH_UserAnnotation.RED_CIRCLE_IMAGE_FILE    = "mash_images/annotation-red.png";
MASH_UserAnnotation.YELLOW_CIRCLE_IMAGE_FILE = "mash_images/annotation-yellow.png";

MASH_UserAnnotation.TOUCH_IMAGE_FILE         = "mash_images/touch-feedback.png";

MASH_UserAnnotation.TOUCH_TOP_IMAGE_FILE     = "mash_images/TouchFeedbackTop.png";
MASH_UserAnnotation.TOUCH_RIGHT_IMAGE_FILE   = "mash_images/TouchFeedbackRight.png";
MASH_UserAnnotation.TOUCH_BOTTOM_IMAGE_FILE  = "mash_images/TouchFeedbackBottom.png";
MASH_UserAnnotation.TOUCH_LEFT_IMAGE_FILE    = "mash_images/TouchFeedbackLeft.png";

// MASH_UserAnnotation.clone                                                                   MASH_UserAnnotation.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_UserAnnotation.clone = function(originalObj) {

    var cloneObj = new MASH_Text(originalObj.id,
                                 originalObj.left,
                                 originalObj.top,
                                 originalObj.width,
                                 originalObj.height,
                                 originalObj.zIndex,
                                 originalObj.text,
                                 originalObj.type
                                );
    return cloneObj;
}//MASH_UserAnnotation.clone



// MASH_UserAnnotation.prototype.clone                                               MASH_UserAnnotation.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.clone = function() {
    return MASH_UserAnnotation.clone(this);
}//MASH_UserAnnotation.prototype.clone



// MASH_UserAnnotation.prototype.createScreenObject                     MASH_UserAnnotation.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.createScreenObject  = function(i){

    if(     (this.type == MASH_UserAnnotation.BLUE_CIRCLE)      ||
            (this.type == MASH_UserAnnotation.GREEN_CIRCLE)     ||
            (this.type == MASH_UserAnnotation.RED_CIRCLE)       ||
            (this.type == MASH_UserAnnotation.YELLOW_CIRCLE)    ){
        return this.createScreenObjectMASH_Image(i);
    }

    else if((this.type == MASH_UserAnnotation.BLUE_RECTANGLE)   ||
            (this.type == MASH_UserAnnotation.GREEN_RECTANGLE)  ||
            (this.type == MASH_UserAnnotation.RED_RECTANGLE)    ||
            (this.type == MASH_UserAnnotation.YELLOW_RECTANGLE) ){
        return this.createScreenObjectMASH_Text(i);
    }
    else if((this.type == MASH_UserAnnotation.FINGER_MARKER)    ){
        var tmpObj = this.createScreenObjectMASH_Text(i);
        tmpObj.MASHparameters.alpha(0.20);
        return tmpObj;
    }
    else if((this.type == MASH_UserAnnotation.TOUCH_FEEDBACK_TOP)    ){
        var tmpObj = this.createScreenObjectMASH_Image(i);
        tmpObj.MASHparameters.alpha(0.20);
        return tmpObj;
    }
    else if((this.type == MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT)  ){
        var tmpObj = this.createScreenObjectMASH_Image(i);
        tmpObj.MASHparameters.alpha(0.20);
        return tmpObj;
    }
    else if((this.type == MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM) ){
        var tmpObj = this.createScreenObjectMASH_Image(i);
        tmpObj.MASHparameters.alpha(0.20);
        return tmpObj;
    }
    else if((this.type == MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT)   ){
        var tmpObj = this.createScreenObjectMASH_Image(i);
        tmpObj.MASHparameters.alpha(0.20);
        return tmpObj;
    }


}//createScreenObject



// MASH_UserAnnotation.prototype.createScreenObjectMASH_Image MASH_UserAnnotation.prototype.createScreenObjectMASH_Image
// ---------------------------------------------------------------------------------------------------------------------
// * Function copied from MASH_Image.prototype.createScreenObject
MASH_UserAnnotation.prototype.createScreenObjectMASH_Image  = function(i){


    //make object and sub object's id
    var tmpObjID                            = MASH_Image.ID_PREFIX       + i;
    var tmpObjInnerID                        = MASH_Image.INNER_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj                          = this.createWrapperObject(tmpObjID, i);

    if( (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_TOP   ) &&
        (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT ) &&
        (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM) &&
        (this.type != MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT  ) ){

        //round corners
        this.wrapperObj.style.borderRadius       = '10px'; // standard
        this.wrapperObj.style.MozBorderRadius    = '10px'; // Mozilla
        this.wrapperObj.style.WebkitBorderRadius = '10px'; // WebKit
        this.wrapperObj.style.boxShadow          = '15px 15px 15px #558';

        this.wrapperObj.style.borderTopWidth     = '0';
        this.wrapperObj.style.borderRightWidth   = '0';
        this.wrapperObj.style.borderBottomWidth  = '2';
        this.wrapperObj.style.borderLeftWidth    = '0';
        this.wrapperObj.style.overflowY          = 'hidden';
    }

    addEventListener(this.wrapperObj, "dblclick",  MASH_Behavior_AutoPresentation.repaceImg,    false);


    //compute dimensions
    var adjustedWidth            = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight           = adjustSize(this.height, this.borderWidth);

    //inner object
    this.innerObj                = document.createElement("img");

    this.innerObj.id             = tmpObjInnerID;
    this.innerObj.src            = this.src;
    this.innerObj.title          = this.text;
    this.innerObj.style.width    = adjustedWidth;
    this.innerObj.style.height   = adjustedHeight;



    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
    addEventListener(this.innerObj, "dragstart", divDrag, false);
    addEventListener(this.innerObj, "drag",      divDrag, false);
    addEventListener(this.innerObj, "dragstop",  divDrag, false);


    //append objects
    this.innerObj    = this.wrapperObj.appendChild(this.innerObj);

    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.reference                   = this.wrapperObj;


    return this.wrapperObj;

}//MASH_Image.prototype.createScreenObjectMASH_Image



// MASH_UserAnnotation.prototype.createScreenObjectMASH_Text   MASH_UserAnnotation.prototype.createScreenObjectMASH_Text
// ---------------------------------------------------------------------------------------------------------------------
// * Function copied from MASH_Text.prototype.createScreenObject
MASH_UserAnnotation.prototype.createScreenObjectMASH_Text  = function(i){

    //make object and sub object's id
    var tmpObjID                       = MASH_Text.ID_PREFIX       + i;
    var tmpObjInnerID                  = MASH_Text.INNER_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj                    = this.createWrapperObject(tmpObjID, i);
    this.wrapperObj.style.overflow     = "hidden";

    if(this.type != MASH_UserAnnotation.FINGER_MARKER){

        //round corners
        this.wrapperObj.style.borderRadius       = '10px'; // standard
        this.wrapperObj.style.MozBorderRadius    = '10px'; // Mozilla
        this.wrapperObj.style.WebkitBorderRadius = '10px'; // WebKit
        this.wrapperObj.style.boxShadow          = '15px 15px 15px #558';

        this.wrapperObj.style.borderTopWidth     = '1';
        this.wrapperObj.style.borderRightWidth   = '3';
        this.wrapperObj.style.borderBottomWidth  = '3';
        this.wrapperObj.style.borderLeftWidth    = '1';
        this.wrapperObj.style.overflowY          = 'hidden';
    }


    //compute dimensions
    var adjustedWidth                  = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight                 = adjustSize(this.height, this.borderWidth);

    //inner object
    this.innerTableObj                 = document.createElement("table");
    this.innerTBodyObj                 = document.createElement("tbody");
    this.innerTRObj                    = document.createElement("tr");
    this.innerObj                      = document.createElement("td");

    this.innerObj.id                   = tmpObjInnerID;
    this.innerObj.style.width          = adjustedWidth;
    this.innerObj.style.height         = adjustedHeight;

    //set the style
    this.innerObj.style.fontFamily     = this.fontFamily;
    this.innerObj.style.fontSize       = this.fontSize;
    this.innerObj.style.fontWeight     = this.fontWeight;

    this.innerObj.style.color          = this.color;
    this.innerObj.align                = this.align;
    this.innerObj.style.verticalAlign  = this.verticalAlign;

    this.innerObj.innerHTML            = this.text;


    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
    addEventListener(this.innerObj, "dragstart", divDrag, false);
    addEventListener(this.innerObj, "drag",      divDrag, false);
    addEventListener(this.innerObj, "dragstop",  divDrag, false);

    //this is to allow draging inside collections
    addEventListener(this.innerObj, "mousedown", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mousemove", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mouseup",   divPropagateNoDefault, false);

    //append inner object
    this.innerObj                    = this.innerTRObj.appendChild(this.innerObj);
    this.innerTRObj                  = this.innerTBodyObj.appendChild(this.innerTRObj);
    this.innerTBodyObj               = this.innerTableObj.appendChild(this.innerTBodyObj);
    this.innerTableObj               = this.wrapperObj.appendChild(this.innerTableObj);

    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.innerObj.MASHparameters     = this;
    this.reference                   = this.wrapperObj;

    return this.wrapperObj;

}//MASH_UserAnnotation.prototype.createScreenObjectMASH_Text



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_UserAnnotation.prototype.emphasize                                       MASH_UserAnnotation.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.emphasize  = function(){

    this.sendToFront();

    this.fontSize    = (parseInt(this.innerObj.style.fontSize)    + 1)+"pt";
    this.borderWidth = parseInt(this.reference.style.borderWidth) + 1;


    //set the style
    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

    this.innerObj.style.color                = this.color;
    this.innerObj.style.fontFamily           = this.fontFamily;
    this.innerObj.style.fontSize             = this.fontSize;
    this.innerObj.style.fontWeight           = this.fontWeight;

    this.innerObj.align                      = this.align;
    this.innerObj.style.verticalAlign        = this.verticalAlign;

    this.wrapperObj.style.filter             = "progid:DXImageTransform.Microsoft.Glow()"
//    this.wrapperObj.filters.item("DXImageTransform.Microsoft.Glow").Color="#FF0000";

//    this.wrapperObj.style.filter             = "progid:DXImageTransform.Microsoft.Blur(pixelRadius=2)"
//    this.wrapperObj.filters.item("DXImageTransform.Microsoft.Blur").pixelRadius=0;

}//MASH_UserAnnotation.prototype.emphasize



// MASH_UserAnnotation.prototype.deemphasize                                   MASH_UserAnnotation.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.deemphasize  = function(){

    this.sendToFront();

    if(parseInt(this.fontSize)    > 2) { this.fontSize    = (parseInt(this.innerObj.style.fontSize) - 1)+"pt"; }
    if(parseInt(this.borderWidth) > 0) { this.borderWidth = parseInt(this.reference.style.borderWidth) - 1;    }

    //set the style
    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

    this.innerObj.style.color                = this.color;
    this.innerObj.style.fontFamily           = this.fontFamily;
    this.innerObj.style.fontSize             = this.fontSize;
    this.innerObj.style.fontWeight           = this.fontWeight;

    this.innerObj.align                      = this.align;
    this.innerObj.style.verticalAlign        = this.verticalAlign;

    this.wrapperObj.style.filter             = "progid:DXImageTransform.Microsoft.Blur(pixelRadius=3)"

}//MASH_UserAnnotation.prototype.deemphasize



// MASH_UserAnnotation.prototype.resize                                             MASH_UserAnnotation.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions
    var adjustedWidth           = adjustSize(newWidth,  this.borderWidth);
    var adjustedHeight          = adjustSize(newHeight, this.borderWidth);
    this.innerObj.style.width   = adjustedWidth;
    this.innerObj.style.height  = adjustedHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_UserAnnotation.prototype.resize



// MASH_UserAnnotation.prototype.destroy                                           MASH_UserAnnotation.prototype.destroy
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.destroy = function() {

    //search for this annotation in the annotationObjects array
    for(var i=0; i<annotationObjects.length; i++) {
        //remove annotation from array
        if(annotationObjects[i] == this) {
            annotationObjects.splice(i,1);
            break;
        }
    }

    //remove screen object
    this.reference.parentNode.removeChild(this.reference);

}//MASH_UserAnnotation.prototype.destroy



// MASH_UserAnnotation.destroyTouchFeedback                                     MASH_UserAnnotation.destroyTouchFeedback
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.destroyTouchFeedback = function() {

    //search for this annotation in the annotationObjects array
    for(var i=0; i<annotationObjects.length; i++) {

        if( (annotationObjects[i].type == MASH_UserAnnotation.TOUCH_FEEDBACK_TOP   ) ||
            (annotationObjects[i].type == MASH_UserAnnotation.TOUCH_FEEDBACK_RIGHT ) ||
            (annotationObjects[i].type == MASH_UserAnnotation.TOUCH_FEEDBACK_BOTTOM) ||
            (annotationObjects[i].type == MASH_UserAnnotation.TOUCH_FEEDBACK_LEFT  ) ){

            //remove screen object
            annotationObjects[i].reference.parentNode.removeChild(annotationObjects[i].reference);
            //remove annotation from array
            annotationObjects.splice(i--,1);
        }
    }


}//MASH_UserAnnotation.destroyTouchFeedback



// MASH_UserAnnotation.destroyFingerMarkers                                     MASH_UserAnnotation.destroyFingerMarkers
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.destroyFingerMarkers = function() {

    //search for this annotation in the annotationObjects array
    for(var i=0; i<annotationObjects.length; i++) {

        if(annotationObjects[i].type == MASH_UserAnnotation.FINGER_MARKER) {
            //remove screen object
            annotationObjects[i].reference.parentNode.removeChild(annotationObjects[i].reference);
            //remove annotation from array
            annotationObjects.splice(i--,1);
        }
    }


}//MASH_UserAnnotation.destroyFingerMarkers



// MASH_UserAnnotation.prototype.editText                                         MASH_UserAnnotation.prototype.editText
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.editText = function() {

    var annotationText = prompt("Please enter the annotation text", this.text);
    this.text          = annotationText;

    if(     (this.type == MASH_UserAnnotation.BLUE_CIRCLE)      ||
            (this.type == MASH_UserAnnotation.GREEN_CIRCLE)     ||
            (this.type == MASH_UserAnnotation.RED_CIRCLE)       ||
            (this.type == MASH_UserAnnotation.YELLOW_CIRCLE)    ){

        this.innerObj.title = this.text;
    }

    else if((this.type == MASH_UserAnnotation.BLUE_RECTANGLE)   ||
            (this.type == MASH_UserAnnotation.GREEN_RECTANGLE)  ||
            (this.type == MASH_UserAnnotation.RED_RECTANGLE)    ||
            (this.type == MASH_UserAnnotation.YELLOW_RECTANGLE) ){

        this.innerObj.innerHTML = this.text;
    }


}//MASH_UserAnnotation.prototype.editText



// MASH_UserAnnotation.prototype.toString                                         MASH_UserAnnotation.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "text\t\t= "               + this.text                  + "\n";
    returnString += "type\t\t= "               + this.type                  + "\n";
    returnString += "\n";
    returnString += "style\n";
    returnString += "\talign\t\t= "            + this.align                 + "\n";
    returnString += "\tverticalAlign\t= "      + this.verticalAlign         + "\n";
    returnString += "\n";
    returnString += "\tcolor\t\t= "            + this.color                 + "\n";
    returnString += "\tfontFamily\t= "         + this.fontFamily            + "\n";
    returnString += "\tfontSize\t\t= "         + this.fontSize              + "\n";
    returnString += "\tfontWeight\t= "         + this.fontWeight            + "\n";
    returnString += "\n";
    returnString += "\tbackgroundColor\t= "    + this.backgroundColor       + "\n";
    returnString += "\tbackgroundImage\t= "    + this.backgroundImage       + "\n";
    returnString += "\tbackgroundRepeat\t= "   + this.backgroundRepeat      + "\n";
    returnString += "\tbackgroundPosition\t= " + this.backgroundPosition    + "\n";
    returnString += "\n";
    returnString += "\tborderColor\t= "        + this.borderColor           + "\n";
    returnString += "\tborderWidth\t= "        + this.borderWidth           + "\n";
    returnString += "\tborderStyle\t= "        + this.borderStyle           + "\n";
    returnString += "\n";

    returnString += "behaviors\n";
    for(var i=0; i<this.behaviors.length; i++) {
        returnString += "\t" + this.behaviors[i].type + "\n";
    }

    returnString += "\n---------------------------------------------------------------------------\n";

    return returnString;

}//MASH_UserAnnotation.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_UserAnnotation.XML_TAG_OBJECT = MASH_Object.USER_ANNOTATION;
MASH_UserAnnotation.XML_TAG_TEXT = "text";
MASH_UserAnnotation.XML_TAG_TYPE = "anotationType";


// MASH_UserAnnotation.prototype.getTypeSpecificXML                     MASH_UserAnnotation.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_UserAnnotation.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_UserAnnotation.XML_TAG_TEXT,  this.text,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_UserAnnotation.XML_TAG_TYPE,  this.type,  true,  indent);

    return objectXML;

}//MASH_UserAnnotation.prototype.getTypeSpecificXML



// MASH_UserAnnotation.xmlParseObjectNode                                         MASH_UserAnnotation.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_UserAnnotation.xmlParseObjectNode = function(node){

//    alert("MASH_UserAnnotation.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.USER_ANNOTATION;

    //id
    var objID                 = MASH_Object.getUniqueID();

    //set default generic properties
    var objID                 = "";
    var objLeft               = 0;
    var objTop                = 0;
    var objWidth              = 100;
    var objHeight             = 100;
    var objZIndex             = 1;
    var objStyle              = "";

    //set default specific properties
    var objText               = "";
    var objAnnotationType     = "";

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;
        var childValue = child.nodeValue;

        //ignore #text nodes
        var xmlTextField = new RegExp(/\s*#text/);
        if( (!childName) || (childName.match(xmlTextField)) ) { continue; }

        //parse generic object parameters
        else if(childName == MASH_Object.XML_TAG_TYPE)    { objType   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_ID)      { objID     = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_LEFT)    { objLeft   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_TOP)     { objTop    = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_WIDTH)   { objWidth  = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_HEIGHT)  { objHeight = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_Z_INDEX) { objZIndex = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_STYLE)   { objStyle  = MASH_Object.xmlParseStyleNode(child); }

        //parse paremers specific to this kind of object
        else if(childName == MASH_UserAnnotation.XML_TAG_TEXT) { objText           = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_UserAnnotation.XML_TAG_TYPE) { objAnnotationType = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_UserAnnotation(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                                      objText, objAnnotationType);

    return obj;

}//MASH_UserAnnotation.xmlParseObjectNode




// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Nov 12, 2002                                                                                              //
// Modified: Sep 28, 2007: Modified CONTROLS_IMG_DIR to point to WARP Server                                          //
//                                                                                                                    //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Frame                                                                                                 MASH_Frame
// =====================================================================================================================
function MASH_Frame(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpSrc, tmpText, tmpScale) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle);

    this.src        = tmpSrc   || "";
    this.text       = tmpText  || "";
    this.scale      = tmpScale || 1.0;
    this.maximize   = false;

    this.MASHobjectType = MASH_Object.FRAME;

    //screen objects
    this.controlObj        = null;
    this.spanObj           = null;
    this.innerObj          = null;

    //context menu
    this.contextMenuString  = "<hr>\n" +
                              "<span onclick=\"otherObjects[0].targetObj.changeLocation();\" style=\"color:550000; text-decoration:none;\">Change location</span><br>\n";

    //XML
    this.xmlObjectTag = MASH_Frame.XML_TAG_OBJECT;

}
//set inheritance
MASH_Frame.prototype                = new MASH_Object("MASH_Frame",0,0,1,1,0,"");
MASH_Frame.prototype.constructor    = MASH_Frame;
//MASH_Frame

//Constants
MASH_Frame.COOKIE_NAME              = "mash_frames";
MASH_Frame.INNER_ID_PREFIX          = "frameObj";
MASH_Frame.ID_PREFIX                = MASH_Object.ID_PREFIX      + MASH_Frame.INNER_ID_PREFIX;
MASH_Frame.CONTROLS_ID_PREFIX       = MASH_Frame.INNER_ID_PREFIX + "Controls";

MASH_Frame.TITLEBAR_ID_PREFIX       = MASH_Frame.INNER_ID_PREFIX + "TitleBar";
MASH_Frame.TITLE_HEIGHT             = 20; //pixel height of the title bar of a frame object

MASH_Frame.INNER_FRAME_BORDER_WIDTH = 1;
MASH_Frame.CONTROLS_MAXIMIZE_IMG_ID = "imgMaximizeFrame"

//MASH_Frame.CONTROLS_IMG_DIR              = "mash_images/";
MASH_Frame.CONTROLS_IMG_DIR              = "http://denali.ischool.utexas.edu/~revilla/WARP/mash_images/";


MASH_Frame.CONTROLS_MAXIMIZE_IMG_FILE    = MASH_Frame.CONTROLS_IMG_DIR + "maximize.png";
MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH   = 16;
MASH_Frame.CONTROLS_MAXIMIZE_IMG_HEIGHT  = 16;
MASH_Frame.CONTROLS_NORMALIZE_IMG_FILE   = MASH_Frame.CONTROLS_IMG_DIR + "normalize.png";
MASH_Frame.CONTROLS_ZOOM_OUT_IMG_FILE    = MASH_Frame.CONTROLS_IMG_DIR + "zoomOutPage.png";
MASH_Frame.CONTROLS_ZOOM_IN_IMG_FILE     = MASH_Frame.CONTROLS_IMG_DIR + "zoomInPage.png";

MASH_Frame.SERVER_PROXY = "http://kilimanjaro.csdl.tamu.edu:8080/mash/domainwrapper?pageAddress=";


// MASH_Frame.clone                                                                                     MASH_Frame.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Frame.clone = function(originalObj) {

    var cloneObj = new MASH_Frame(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                  originalObj.style,
                                  originalObj.src, originalObj.text, originalObj.scale);
    return cloneObj;

}//MASH_Frame.clone



// MASH_Frame.prototype.clone                                                                 MASH_Frame.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.clone = function() {
    return MASH_Frame.clone(this);
}//MASH_Frame.prototype.clone



// MASH_Frame.prototype.createScreenObject                                       MASH_Frame.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_Frame.ID_PREFIX          + i;
    var tmpObjInnerID   = MASH_Frame.INNER_ID_PREFIX    + i;
    var controlsObjID   = MASH_Frame.CONTROLS_ID_PREFIX + i;
    var tmpSpanObjID    = MASH_Frame.TITLEBAR_ID_PREFIX + i;

    //wrapper object
//    var wrapperObj      = this.createWrapperObject(tmpObjID, i);
    this.createWrapperObject(tmpObjID, i);


    //compute dimensions
    var adjustedWidth       = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight      = adjustSize(this.height, this.borderWidth);

    var adjustedInnerWidth  = this.width  - (this.borderWidth*2) - (MASH_Frame.INNER_FRAME_BORDER_WIDTH * 2) - 1;
    var adjustedInnerHeight = this.height - (this.borderWidth*2) - (MASH_Frame.INNER_FRAME_BORDER_WIDTH * 2) - MASH_Frame.TITLE_HEIGHT;

    //validate adjusted dimensions
    // - if dimensions are 0 or negative, IE stops the scripts, and Netscape ignores the assignments
    if(adjustedInnerWidth  <= 0) { adjustedInnerWidth  = 1; }
    if(adjustedInnerHeight <= 0) { adjustedInnerHeight = 1; }


    //title bar
    this.spanObj                     = document.createElement("span");
    this.spanObj.id                  = tmpSpanObjID;

    this.spanObj.style.position      = "absolute";
    this.spanObj.style.left          = 0;
    this.spanObj.style.top           = 0;
    this.spanObj.style.width         = adjustedInnerWidth - MASH_Frame.getControlsWidth();
    this.spanObj.style.width         = "100%";


    this.spanObj.style.height        = MASH_Frame.TITLE_HEIGHT;

    this.spanObj.style.color         = this.color;

    this.spanObj.style.fontFamily    = this.fontFamily;
    this.spanObj.style.fontSize      = this.fontSize;
    this.spanObj.style.fontWeight    = this.fontWeight;

    this.spanObj.innerHTML           = this.text;

    //controls
    this.controlObj                  = document.createElement("div");

    this.controlObj.id               = controlsObjID;

    this.controlObj.style.position   = "absolute";
    this.controlObj.style.left       = adjustedInnerWidth - MASH_Frame.getControlsWidth();
    this.controlObj.style.top        = 1;

    this.controlObj.innerHTML        = MASH_Frame.getControlsHTMLString(i);


    //inner object
    this.innerObj                    = document.createElement("iframe");

    this.innerObj.id                 = tmpObjInnerID;
    this.innerObj.objectIndex        = i;

    this.innerObj.src                = this.src;
    this.innerObj.scrolling          = "yes";
    this.innerObj.frameborder        = MASH_Frame.INNER_FRAME_BORDER_WIDTH;
    this.innerObj.width              = adjustedInnerWidth;
    this.innerObj.height             = adjustedInnerHeight;

    this.innerObj.style.position     = "absolute";
    this.innerObj.style.left         = 0;
    this.innerObj.style.top          = MASH_Frame.TITLE_HEIGHT;
    this.innerObj.style.width        = adjustedInnerWidth;
    this.innerObj.style.height       = adjustedInnerHeight;
    this.innerObj.style.overflow     = "auto";

    //initialize Frame object (this will cause it to zoom by the specified factor)
    addEventListener(this.innerObj, "load", MASH_Frame.initFrameObject, false);
    addEventListener(this.spanObj, "dblclick", MASH_Frame.navigateFrameEvent, false);
//    addEventListener(this.wrapperObj, "dblclick", MASH_Frame.navigateFrameEvent, false);

    //append objects
    this.spanObj     = this.wrapperObj.appendChild(this.spanObj);
    this.controlObj  = this.wrapperObj.appendChild(this.controlObj);
    this.innerObj    = this.wrapperObj.appendChild(this.innerObj);

    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.reference                   = this.wrapperObj;

    return this.wrapperObj;

}//MASH_Frame.prototype.createScreenObject



// MASH_Frame.navigateFrameEvent                                                           MASH_Frame.navigateFrameEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to navigate 'into' a FRAME object
// * it is a wrapper over the function navigateFrame in order to be able to call it as an event handler
MASH_Frame.navigateFrameEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent    = validateEventObject(tmpEvent);
    var wrapperObj  = getCurrentTarget(tmpEvent);
    var objIndex    = wrapperObj.objectIndex;

    //navigate
    MASH_Frame.navigateFrame(objIndex);

}//MASH_Frame.navigateFrameEvent



// MASH_Frame.initFrameObject                                                                 MASH_Frame.initFrameObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.initFrameObject = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    tmpEvent = validateEventObject(tmpEvent);

    //get the object that called this function
    var eventObj        = getCurrentTarget(tmpEvent);

    var objIndex        = eventObj.objectIndex;

    var tmpObjID        = MASH_Frame.ID_PREFIX       + objIndex;
    var tmpObjInnerID   = MASH_Frame.INNER_ID_PREFIX + objIndex;
    var tmpObjImportID  = MASH_Object.ID_PREFIX + MASH_Object.IMPORTED_INNER_ID_PREFIX + tmpObjID;

    //check to see if it was the source of the event is the wrapper div
    if( (eventObj.id == tmpObjID)       ||
        (eventObj.id == tmpObjImportID) ){

        var childrenObj = eventObj.childNodes;
        var frameObj    = eventObj.MASHparameters.innerObj;
    }
    //check if it's the frame itself (this happens in Netscape)
    else if(eventObj.id == tmpObjInnerID) {

        frameObj        = eventObj;
        eventObj        = document.getElementById(tmpObjID);
    }

//    objIndex            = eventObj.objectIndex;
    var factor          = eventObj.zoomFactor;

    // this patch compensates for Netscape 6, because it does not support the contentWindow attribute
    // this works in Netscape, Mozilla and other engines with Gecko 1.0.1
    if(!frameObj.contentWindow) { frameObj.contentWindow = frameObj.contentDocument.defaultView; }

    var innerWindow     = frameObj.contentWindow;

    //zoom on frame
    MASH_Frame.zoomFrameObject(objIndex, factor);



    //init MASH variables


    //check if this is a mash document
    if(frameObj.contentWindow.MASH_DOCUMENT_NAME  === undefined) {
        frameObj.contentWindow.MASH_DOCUMENT_NAME  = NON_MASH_DOCUMENT;
    }


    //initialize the position of object using the parents coordinate system
    innerWindow.MASHparentWrapper       = eventObj;
    eventObj.MASHframeContentWindow     = innerWindow;


}//MASH_Frame.initFrameObject



// MASH_Frame.getParentX                                                                           MASH_Frame.getParentX
// ---------------------------------------------------------------------------------------------------------------------
// * this coordinate is used to propely position the object when exporting it to the parent window
MASH_Frame.getParentX = function(wrapperObj){

    if(wrapperObj) {
        var wrapperLeft         = parseInt(wrapperObj.style.left);
        var wrapperBorderWidth  = parseInt(wrapperObj.style.borderWidth);

        return (wrapperLeft + wrapperBorderWidth);
    }
    return 0;

}//MASH_Frame.getParentX


// MASH_Frame.getParentY                                                                           MASH_Frame.getParentY
// ---------------------------------------------------------------------------------------------------------------------
// * this coordinate is used to propely position the object when exporting it to the parent window
MASH_Frame.getParentY = function(wrapperObj){

    if(wrapperObj) {
        var wrapperTop          = parseInt(wrapperObj.style.top);
        var wrapperBorderWidth  = parseInt(wrapperObj.style.borderWidth);

        return (wrapperTop  + wrapperBorderWidth + MASH_Frame.TITLE_HEIGHT);
    }
    return 0;

}//MASH_Frame.getParentY


// MASH_Frame.getContentWindowLeft                                                       MASH_Frame.getContentWindowLeft
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getContentWindowLeft = function(wrapperObj, innerObj){

    //initialize the position of object using the parents coordinate system
    var wrapperLeft         = parseInt(wrapperObj.style.left);
    var wrapperBorderWidth  = parseInt(wrapperObj.style.borderWidth);
    var innerLeft           = parseInt(innerObj.style.left);

    return (wrapperLeft + wrapperBorderWidth + innerLeft);

}//MASH_Frame.getContentWindowLeft


// MASH_Frame.getContentWindowTop                                                         MASH_Frame.getContentWindowTop
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getContentWindowTop = function(wrapperObj, innerObj){

    //initialize the position of object using the parents coordinate system
    var wrapperTop         = parseInt(wrapperObj.style.top);
    var wrapperBorderWidth = parseInt(wrapperObj.style.borderWidth);
    var innerTop           = parseInt(innerObj.style.top);

    return (wrapperTop + wrapperBorderWidth + innerTop);

}//MASH_Frame.getContentWindowTop


// MASH_Frame.getContentWindowWidth                                                     MASH_Frame.getContentWindowWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getContentWindowWidth = function(wrapperObj, innerObj){

    //initialize the position of object using the parents coordinate system
    var wrapperWidth        = parseInt(wrapperObj.style.width);
    var wrapperBorderWidth  = parseInt(wrapperObj.style.borderWidth);

    return (wrapperWidth  - (2*wrapperBorderWidth));

}//MASH_Frame.getContentWindowWidth


// MASH_Frame.getContentWindowHeight                                                   MASH_Frame.getContentWindowHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getContentWindowHeight = function(wrapperObj, innerObj){

    //initialize the position of object using the parents coordinate system
    var wrapperHeight       = parseInt(wrapperObj.style.height);
    var wrapperBorderWidth  = parseInt(wrapperObj.style.borderWidth);
    var innerTop            = parseInt(innerObj.style.top);

    return (wrapperHeight - (2*wrapperBorderWidth) - innerTop);

}//MASH_Frame.getContentWindowHeight


// MASH_Frame.prototype.getInternalMouseCoords                               MASH_Frame.prototype.getInternalMouseCoords
// ---------------------------------------------------------------------------------------------------------------------
// objDrag                = object being dragged
// tmpSourceX, tmpSourceY = position of the click
// tmpOffX, tmpOffY       = position of this collection relative to the parent coordinate system
MASH_Frame.prototype.getInternalMouseCoords = function(objDrag, tmpSourceX, tmpSourceY, tmpOffX, tmpOffY) {

    var i;

    //init the results array
    var results = new Array(3);
    results[0] = null; // reference to destination Frame
    results[1] = 0;    // left
    results[2] = 0;    // top

    //avoid trying to transfer a frame into itself!!
    if(this.reference == objDrag) { return results; }

    //determine the coordinates of the rectangular area of the frame
    var tmpWinLeft      = MASH_Frame.getContentWindowLeft(  this.reference, this.innerObj);
    var tmpWinTop       = MASH_Frame.getContentWindowTop(   this.reference, this.innerObj);
    var tmpWinWidth     = MASH_Frame.getContentWindowWidth( this.reference, this.innerObj);
    var tmpWinHeight    = MASH_Frame.getContentWindowHeight(this.reference, this.innerObj);

    //if it's over this frame, then transfer the object to this frame
    if( (tmpSourceX >= tmpWinLeft) && (tmpSourceX <= (tmpWinLeft + tmpWinWidth)  ) &&
        (tmpSourceY >= tmpWinTop ) && (tmpSourceY <= (tmpWinTop  + tmpWinHeight) ) ){

        //translate the coordinates of the event
        var tmpTarget   = this.reference.MASHframeContentWindow;

        //the 2 pixels (at the end) are used to visualy note a small movement that signals the transfer of the object
        newX = tmpSourceX - tmpWinLeft + getScrollOffsetX(tmpTarget) - 2;
        newY = tmpSourceY - tmpWinTop  + getScrollOffsetY(tmpTarget) - 2;

        //set results
        results[0] = this;          // reference to destination object
        results[1] = tmpWinLeft;    // left
        results[2] = tmpWinTop;     // top

    }//if it's over this frame

    return results;

}// MASH_Frame.prototype.getInternalMouseCoords



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_Frame.prototype.changeLocation                                               MASH_Frame.prototype.changeLocation
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.changeLocation  = function(){

    var newURL = prompt("Please type the new URL:", "");
    if(!newURL)      { return; }
    if(newURL == "") { return; }
    if(newURL.toLowerCase().indexOf("http://")!=0) { newURL = "http://" + newURL};

    //this is a workaround:
    //  the real function should have a variable that points to the source of the mash document
    // (as opposed to actually having hardcoded "http://kilimanjaro.cs..."
//    newURL = "http://kilimanjaro.csdl.tamu.edu:8080/mash/domainwrapper?pageAddress=" + newURL;
    newURL = MASH_Frame.SERVER_PROXY + newURL;

    this.innerObj.src = newURL;

}//MASH_Frame.prototype.changeLocation



// MASH_Frame.prototype.emphasize                                                         MASH_Frame.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.emphasize  = function(){

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

}//MASH_Frame.prototype.emphasize



// MASH_Frame.prototype.deemphasize                                                     MASH_Frame.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.deemphasize  = function(){

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

}//MASH_Frame.prototype.deemphasize



// MASH_Frame.prototype.resize                                                               MASH_Frame.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions
    var adjustedInnerWidth     = this.getContextLayerNewWidth(newWidth);
    var adjustedInnerHeight    = this.getContextLayerNewHeight(newHeight) - MASH_Frame.TITLE_HEIGHT;

    //validate adjusted dimensions
    // - if dimensions are 0 or negative, IE stops the scripts, and Netscape ignores the assignments
    if(adjustedInnerWidth  <= 0) { adjustedInnerWidth  = 1; }
    if(adjustedInnerHeight <= 0) { adjustedInnerHeight = 1; }


    this.spanObj.style.width   = adjustedInnerWidth - MASH_Frame.getControlsWidth();

    this.controlObj.style.left = adjustedInnerWidth - MASH_Frame.getControlsWidth();

    this.innerObj.width        = adjustedInnerWidth;
    this.innerObj.height       = adjustedInnerHeight;

    this.innerObj.style.width  = adjustedInnerWidth;
    this.innerObj.style.height = adjustedInnerHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_Frame.prototype.resize



// MASH_Frame.prototype.toString                                                           MASH_Frame.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "src\t\t= "                + this.src                   + "\n";
    returnString += "text\t\t= "               + this.text                  + "\n";
    returnString += "scale\t\t= "              + this.scale                 + "\n";
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

}//MASH_Frame.prototype.toString



// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_Frame.navigateFrame                                                                     MASH_Frame.navigateFrame
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to navigate 'into' a FRAME object
MASH_Frame.navigateFrame = function(i){

    if(wasDragged) { return; }

    var objParameters       = frameObjects[i];

    var wrapperObj          = objParameters.wrapperObj;
    var innerObj            = objParameters.innerObj;

    var tmpFrameTitlebar    = objParameters.spanObj;
    var tmpFrameControls    = objParameters.controlObj;
    var tmpMaximizeFrame    = document.getElementById(MASH_Frame.CONTROLS_MAXIMIZE_IMG_ID + i);


    if(wrapperObj == null) { return; }

    var adjustedWidth, adjustedHeight, adjustedInnerWidth, adjustedInnerHeight;

    //Netscape                                                                                              Netscape
    if(isNetscape) {

        try {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserWrite');
        }
        catch (e) {
            //alert("PROBLEM: Cannot obtain special permission for hidding the scrollbars");
        }
        window.scrollbars.visible.set = true;

        //MINIMIZE object
        if(objParameters.maximize) {
            adjustedWidth   = objParameters.width  - (2*objParameters.borderWidth);
            adjustedHeight  = objParameters.height - (2*objParameters.borderWidth);

            freezeAllObjects();

            tmpMaximizeFrame.src        = MASH_Frame.CONTROLS_MAXIMIZE_IMG_FILE;
            objParameters.maximize      = false;

            window.scrollbars.visible   = true;
        }
        //MAXIMIZE object
        else {
            adjustedWidth   = getWindowWidth()  - (2*objParameters.borderWidth) - 3;
            adjustedHeight  = getWindowHeight() - (2*objParameters.borderWidth) - 3;

            freezeAllObjects();

            tmpMaximizeFrame.src        = MASH_Frame.CONTROLS_NORMALIZE_IMG_FILE;
            objParameters.maximize      = true;

            window.scrollbars.visible   = false;
        }

        adjustedInnerWidth  = adjustedWidth  - (MASH_Frame.INNER_FRAME_BORDER_WIDTH * 2);
        adjustedInnerHeight = adjustedHeight - (MASH_Frame.INNER_FRAME_BORDER_WIDTH * 2) - MASH_Frame.TITLE_HEIGHT;

    }//if isNetscape

    //IE                                                                                                          IE
    else if(isIE)  {

        //MINIMIZE object
        if(objParameters.maximize) {
            adjustedWidth   = objParameters.width;
            adjustedHeight  = objParameters.height;

            freezeAllObjects();

            tmpMaximizeFrame.src    = MASH_Frame.CONTROLS_MAXIMIZE_IMG_FILE;
            objParameters.maximize  = false;

            document.body.scroll = "auto";
        }
        //MAXIMIZE object
        else {
            adjustedWidth   = getWindowWidth();
            adjustedHeight  = getWindowHeight();

            freezeAllObjects();

            tmpMaximizeFrame.src    = MASH_Frame.CONTROLS_NORMALIZE_IMG_FILE;
            objParameters.maximize  = true;

            document.body.scroll    = "no";
        }

        adjustedInnerWidth  = adjustedWidth  - (2*objParameters.borderWidth) - (2*MASH_Frame.INNER_FRAME_BORDER_WIDTH);
        adjustedInnerHeight = adjustedHeight - (2*objParameters.borderWidth) - (2*MASH_Frame.INNER_FRAME_BORDER_WIDTH) - MASH_Frame.TITLE_HEIGHT;
    }//if isIE

/*
//  this section is commented in order to support the animated opening of the frames
    //resize
    wrapperObj.style.width      = adjustedWidth;
    wrapperObj.style.height     = adjustedHeight;
    wrapperObj.style.zIndex     = ++topZ;

    tmpFrameTitlebar.style.width = adjustedInnerWidth - MASH_Frame.getControlsWidth();

    innerObj.style.width        = adjustedInnerWidth;
    innerObj.style.height       = adjustedInnerHeight;

    tmpFrameControls.style.left = adjustedInnerWidth - MASH_Frame.getControlsWidth();

    //scroll to the object
    var windowLeft  = parseInt(wrapperObj.style.left);
    var windowTop   = parseInt(wrapperObj.style.top);

    window.scrollTo(windowLeft, windowTop);
*/
    //resize
    wrapperObj.style.zIndex     = ++topZ;

    //if it's maximizing, then adjust the innerObj in order to have a better display of the information inside
    var maximize   = objParameters.maximize;
    if(maximize) {
        innerObj.style.width    = adjustedInnerWidth;
        innerObj.style.height   = adjustedInnerHeight;
    }

    tmpFrameControls.style.left  = adjustedInnerWidth - MASH_Frame.getControlsWidth();
    tmpFrameTitlebar.style.width = adjustedInnerWidth - MASH_Frame.getControlsWidth();


    //compute the current dimensions and the required steps
    var currWidth  = parseInt(wrapperObj.style.width);
    var currHeight = parseInt(wrapperObj.style.height);

    var steps      = 10;
    var stepWidth  = parseInt((adjustedWidth  - currWidth)  / steps);
    var stepHeight = parseInt((adjustedHeight - currHeight) / steps);

    //for scrolling
    var windowLeft = parseInt(wrapperObj.style.left);
    var windowTop  = parseInt(wrapperObj.style.top);

    //scroll to the object
    window.scrollTo(windowLeft, windowTop);

    window.setTimeout("document.getElementById('"+ wrapperObj.id+"').MASHparameters.resizeAnimation(" + maximize            + "," +
                                                                                                        currWidth           + "," +
                                                                                                        currHeight          + "," +
                                                                                                        stepWidth           + "," +
                                                                                                        stepHeight          + "," +
                                                                                                        adjustedWidth       + "," +
                                                                                                        adjustedHeight      + "," +
                                                                                                        adjustedInnerWidth  + "," +
                                                                                                        adjustedInnerHeight + "," +
                                                                                                        windowLeft          + "," +
                                                                                                        windowTop           + ")", 100);

}//MASH_Frame.navigateFrame



// MASH_Frame.prototype.resizeAnimation                                             MASH_Frame.prototype.resizeAnimation
// ---------------------------------------------------------------------------------------------------------------------
// * animates the navigation 'into' or 'out of' this MASH_Frame object
MASH_Frame.prototype.resizeAnimation = function(increase,
                                                currWidth,          currHeight,
                                                stepWidth,          stepHeight,
                                                adjustedWidth,      adjustedHeight,
                                                adjustedInnerWidth, adjustedInnerHeight,
                                                tmpScrollLeft,      tmpScrollTop){

    var newWidth  = currWidth  + stepWidth;
    var newHeight = currHeight + stepHeight;

    //resize
    if(((increase == true)  && ((newWidth >= adjustedWidth) || (newHeight >= adjustedHeight))) ||
       ((increase == false) && ((newWidth <= adjustedWidth) || (newHeight <= adjustedHeight))) ){

        this.wrapperObj.style.width  = adjustedWidth;
        this.wrapperObj.style.height = adjustedHeight;

        this.innerObj.style.width    = adjustedInnerWidth;
        this.innerObj.style.height   = adjustedInnerHeight;

        //scroll to the object
        var windowLeft  = parseInt(this.wrapperObj.style.left);
        var windowTop   = parseInt(this.wrapperObj.style.top);
        window.scrollTo(windowLeft, windowTop);

        return;
    }

    //the next section is to prevent Firefox to flicker when scrolling.
    // - it's not perfect but it's better than the annoying flicker.
    // - the flcker seems to be caused by Firefox. It seems that when it scrollsTo(X,Y) it restarts the scrolling from (0,0) everytime
    if(isIE) {
        //scroll to the object
        var windowLeft  = parseInt(this.wrapperObj.style.left);
        var windowTop   = parseInt(this.wrapperObj.style.top);
        window.scrollTo(windowLeft, windowTop);
    }

    this.wrapperObj.style.width  = newWidth;
    this.wrapperObj.style.height = newHeight;

    //reset timeout
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.resizeAnimation(" + increase            + "," +
                                                                                                             newWidth            + "," +
                                                                                                             newHeight           + "," +
                                                                                                             stepWidth           + "," +
                                                                                                             stepHeight          + "," +
                                                                                                             adjustedWidth       + "," +
                                                                                                             adjustedHeight      + "," +
                                                                                                             adjustedInnerWidth  + "," +
                                                                                                             adjustedInnerHeight + "," +
                                                                                                             tmpScrollLeft       + "," +
                                                                                                             tmpScrollTop        + ")", 100);

}//MASH_Frame.prototype.resizeAnimation



// MASH_Frame.getControlsHTMLString                                                     MASH_Frame.getControlsHTMLString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getControlsHTMLString = function(i){

    var tmpString = "";

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        tmpString = "<span onclick=\"MASH_Frame.navigateFrame("+i+");\"><img id=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_ID+i+"\" src=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_FILE+"\" align=\"top\" title=\"Navigate\" border=\"0\"></span>"    + "\n" ;
    }
    //IE                                                                                                          IE
    else if(isIE) {
        tmpString = "<span onclick=\"MASH_Frame.zoomFrameObject("+i+",3/4);\"><img id=\"imgZoomOutFrame"+i +                    "\" src=\""+MASH_Frame.CONTROLS_ZOOM_OUT_IMG_FILE+"\" width=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH+"\" align=\"top\" title=\"Zoom Out\" border=\"0\"></span>"    +
                    "<span onclick=\"MASH_Frame.zoomFrameObject("+i+",4/3);\"><img id=\"imgZoomInFrame" +i +                    "\" src=\""+MASH_Frame.CONTROLS_ZOOM_IN_IMG_FILE +"\" width=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH+"\" align=\"top\" title=\"Zoom In\"  border=\"0\"></span>"    +
                    "<span onclick=\"MASH_Frame.navigateFrame("+i+");\"      ><img id=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_ID+i+"\" src=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_FILE+"\" width=\""+MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH+"\" align=\"top\" title=\"Navigate\" border=\"0\"></span>"    ;
    }
    return tmpString;

}//MASH_Frame.getControlsHTMLString



// MASH_Frame.getControlsWidth                                                               MASH_Frame.getControlsWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.getControlsWidth = function(){

    if(isNetscape) { return MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH+1;     }
    else if(isIE)  { return ((MASH_Frame.CONTROLS_MAXIMIZE_IMG_WIDTH)*3); }

}//MASH_Frame.getControlsWidth



// MASH_Frame.zoomFrameObject                                                                 MASH_Frame.zoomFrameObject
// ---------------------------------------------------------------------------------------------------------------------
// *** THIS ONLY WORKS IN IE ***
MASH_Frame.zoomFrameObject = function(objID, factor){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        return;
    }

    //IE                                                                                                          IE
    else if(isIE)  {
        //pre-validate scale factor
        if(!frameObjects[objID].scale) { frameObjects[objID].scale = 1.0; }

        //update zoom factor for the specific frame
        frameObjects[objID].scale = frameObjects[objID].scale * factor;

        //the reload event must rezoom for the iframe
        var objTemp                      = frames[objID]; //frames is an array created by the browser
        objTemp.document.body.style.zoom = frameObjects[objID].scale;
    }

}//MASH_Frame.zoomFrameObject





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_Frame.XML_TAG_OBJECT = MASH_Object.FRAME
MASH_Frame.XML_TAG_SRC    = "src";
MASH_Frame.XML_TAG_TEXT   = "text";
MASH_Frame.XML_TAG_SCALE  = "scale";



// MASH_Frame.prototype.getTypeSpecificXML                                       MASH_Frame.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Frame.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Frame.XML_TAG_SRC,   this.src,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Frame.XML_TAG_TEXT,  this.text,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Frame.XML_TAG_SCALE, this.scale, true,  indent);

    return objectXML;

}//MASH_Frame.prototype.getTypeSpecificXML



// MASH_Frame.xmlParseObjectNode                                                           MASH_Frame.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Frame.xmlParseObjectNode = function(node){

//    alert("MASH_Frame.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.FRAME;

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
    var objSrc                = "";
    var objText               = "";
    var objScale              = "";

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
        else if(childName == MASH_Frame.XML_TAG_SRC)      { objSrc    = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Frame.XML_TAG_TEXT)     { objText   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Frame.XML_TAG_SCALE)    { objScale  = MASH_Object.xmlParseNodeText(child);  }
    }

    //declare object
    var obj = new MASH_Frame(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                             objSrc, objText, objScale);

    return obj;

}//MASH_Frame.xmlParseObjectNode




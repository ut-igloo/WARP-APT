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
// MASH_ContextualMenu                                                                               MASH_ContextualMenu
// =====================================================================================================================
function MASH_ContextualMenu(tmpLeft, tmpTop, tmpObj) {

    var tmpStyle = "align:left; vertical-align:top; background-color:#e4e4e4; border-color:#000000; border-width:1; border-style:solid; color:#000000; font-family:arial; font-size:9pt; font-weight:normal;";

    this.base = MASH_Object;
    this.base("", tmpLeft, tmpTop, 200, MASH_ContextualMenu.getInitialHeight(), topZ+1, tmpStyle );

    this.targetObj = tmpObj;

    this.innerStyle = tmpStyle;

    this.MASHobjectType = MASH_Object.CONTEXTUAL_MENU;

    //context menu
    this.contextMenuString  = "";
}
//set inheritance
MASH_ContextualMenu.prototype                = new MASH_Object("MASH_ContextualMenu",0,0,1,1,0,"");
MASH_ContextualMenu.prototype.constructor    = MASH_ContextualMenu;
//MASH_Text

//Copyright
MASH_ContextualMenu.COPYRIGHT = "MASH \n\n"                                       +
                                "  Copyright (c) 2002 Luis Francisco-Revilla.\n"  +
                                "  All rights reserved.\n\n"                      ;

//Constants
MASH_ContextualMenu.COOKIE_NAME      = "mash_contextMenus";
MASH_ContextualMenu.INNER_ID_PREFIX  = "contextMenuObj";
MASH_ContextualMenu.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_ContextualMenu.INNER_ID_PREFIX;

//images
MASH_ContextualMenu.CLOSE_BUTTON_IMG_ID     = "mashControlMenuCloseButton";
MASH_ContextualMenu.CLOSE_BUTTON_IMG_FILE   = CONTROLS_IMG_DIR + "close-button.png";
MASH_ContextualMenu.CLOSE_BUTTON_IMG_WIDTH  = "16";
MASH_ContextualMenu.CLOSE_BUTTON_IMG_HEIGHT = "16";


// MASH_ContextualMenu.prototype.createScreenObject                     MASH_ContextualMenu.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_ContextualMenu.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_ContextualMenu.INNER_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj     = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    //close button for the Control Menu
    this.closeButton                = document.createElement("span");
    this.closeButton.style.position = "absolute";
    this.closeButton.style.top      = "1px";
    this.closeButton.style.left     = "" + (this.width - (this.borderWidth*2) - MASH_ContextualMenu.CLOSE_BUTTON_IMG_WIDTH - 2) +"px";
    var closeButtonHTML             = "<img id=\"" + MASH_ContextualMenu.CLOSE_BUTTON_IMG_ID     +"\" " +
                                      "src=\""     + MASH_ContextualMenu.CLOSE_BUTTON_IMG_FILE   +"\" " +
                                      "width=\""   + MASH_ContextualMenu.CLOSE_BUTTON_IMG_WIDTH  +"\" " +
                                      "height=\""  + MASH_ContextualMenu.CLOSE_BUTTON_IMG_HEIGHT +"\" " +
                                      "onclick=\"otherObjects[0].close();\" "                           +
                                      "style=\"border:0;\">";
    this.closeButton.innerHTML      = closeButtonHTML;


    //inner object
    this.innerTableObj  = document.createElement("table");
    this.innerTBodyObj  = document.createElement("tbody");
    this.innerTRObj     = document.createElement("tr");
    this.innerObj       = document.createElement("td");

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

    var contextMenuInnerHTMLString = "";
    contextMenuInnerHTMLString     = "<b>"+this.targetObj.id + "</b><br>\n"                                                                                                  +
                                     this.targetObj.MASHobjectType + "<br>\n"                                                                                                +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].showPropertiesObj();\"       style=\"color:000044; text-decoration:none;\">Properties</span><br>\n"    +
                                     "<span onclick=\"otherObjects[0].showCompositeParentTree();\" style=\"color:000044; text-decoration:none;\">Parent Tree</span><br>\n"   +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].setVisibilityObj(true);\"    style=\"color:000044; text-decoration:none;\">Show</span><br>\n"          +
                                     "<span onclick=\"otherObjects[0].setVisibilityObj(false);\"   style=\"color:000044; text-decoration:none;\">Hide</span><br>\n"          +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].resizeObj(10, 10);\"         style=\"color:000044; text-decoration:none;\">Increase size</span><br>\n" +
                                     "<span onclick=\"otherObjects[0].resizeObj(-10, -10);\"       style=\"color:000044; text-decoration:none;\">Reduce size</span><br>\n"   +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].sendToBackObj();\"           style=\"color:000044; text-decoration:none;\">Send to back</span><br>\n"  +
                                     "<span onclick=\"otherObjects[0].moveBackwardObj();\"         style=\"color:000044; text-decoration:none;\">Move backward</span><br>\n" +
                                     "<span onclick=\"otherObjects[0].moveForwardObj();\"          style=\"color:000044; text-decoration:none;\">Move forward</span><br>\n"  +
                                     "<span onclick=\"otherObjects[0].sendToFrontObj();\"          style=\"color:000044; text-decoration:none;\">Send to Front</span><br>\n" +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].emphasizeObj();\"            style=\"color:000044; text-decoration:none;\">Emphasize</span><br>\n"     +
                                     "<span onclick=\"otherObjects[0].deemphasizeObj();\"          style=\"color:000044; text-decoration:none;\">De-emphasize</span><br>\n"  +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].destroy();\"                 style=\"color:000044; text-decoration:none;\">Destroy</span><br>\n"       +
                                     "<hr>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].targetObj.normal();\"        style=\"color:550000; text-decoration:none;\">Normal</span><br>\n"        +
                                     "<br>\n"                                                                                                                                +
                                     "<span onclick=\"otherObjects[0].targetObj.alpha(50);\"       style=\"color:550000; text-decoration:none;\">Alpha</span><br>\n"         ;
    if(isNetscape) {
        contextMenuInnerHTMLString += "<span onclick=\"otherObjects[0].targetObj.rotate(1);\"     style=\"color:550000; text-decoration:none;\">Rotate 90</span><br>\n"      +
                                      "<span onclick=\"otherObjects[0].targetObj.rotate(2);\"     style=\"color:550000; text-decoration:none;\">Rotate 180</span><br>\n"     +
                                      "<span onclick=\"otherObjects[0].targetObj.rotate(3);\"     style=\"color:550000; text-decoration:none;\">Rotate 270</span><br>\n"     +
                                      "<span onclick=\"otherObjects[0].targetObj.rotateDegrees();\" style=\"color:550000; text-decoration:none;\">Rotate Free</span><br>\n"     +
                                      "<br>\n"                                                                                                                               ;
    }
    if(isIE) {
        contextMenuInnerHTMLString += "<span onclick=\"otherObjects[0].targetObj.grayScale(1);\"  style=\"color:550000; text-decoration:none;\">Gray Scale</span><br>\n"     +
                                      "<span onclick=\"otherObjects[0].targetObj.invert(1);\"     style=\"color:550000; text-decoration:none;\">Invert</span><br>\n"         +
                                      "<span onclick=\"otherObjects[0].targetObj.mirror(1);\"     style=\"color:550000; text-decoration:none;\">Mirror</span><br>\n"         +
                                      "<span onclick=\"otherObjects[0].targetObj.xRay(1);\"       style=\"color:550000; text-decoration:none;\">X Ray</span><br>\n"          +
                                      "<span onclick=\"otherObjects[0].targetObj.rotate(1);\"     style=\"color:550000; text-decoration:none;\">Rotate 90</span><br>\n"      +
                                      "<span onclick=\"otherObjects[0].targetObj.rotate(2);\"     style=\"color:550000; text-decoration:none;\">Rotate 180</span><br>\n"     +
                                      "<span onclick=\"otherObjects[0].targetObj.rotate(3);\"     style=\"color:550000; text-decoration:none;\">Rotate 270</span><br>\n"     +
                                      "<br>\n"                                                                                                                               +
                                      "<span onclick=\"otherObjects[0].targetObj.blur();\"        style=\"color:550000; text-decoration:none;\">Blur</span><br>\n"           +
                                      "<span onclick=\"otherObjects[0].targetObj.dropShadow();\"  style=\"color:550000; text-decoration:none;\">Drop shadow</span><br>\n"    +
                                      "<span onclick=\"otherObjects[0].targetObj.emboss();\"      style=\"color:550000; text-decoration:none;\">Emboss</span><br>\n"         +
                                      "<span onclick=\"otherObjects[0].targetObj.engrave();\"     style=\"color:550000; text-decoration:none;\">Engrave</span><br>\n"        +
                                      "<span onclick=\"otherObjects[0].targetObj.glow();\"        style=\"color:550000; text-decoration:none;\">Glow</span><br>\n"           +
                                      "<span onclick=\"otherObjects[0].targetObj.gradient();\"    style=\"color:550000; text-decoration:none;\">Gradient</span><br>\n"       +
                                      "\n"                                                                                                                                   ;
    }
    contextMenuInnerHTMLString += this.targetObj.contextMenuString;
    contextMenuInnerHTMLString += "<hr>\n" +
                                  "<br><center><span onclick=\"otherObjects[0].close();\" style=\"align:center; border-style:outset; border-width:2; background-color:#c0c0c0; color:#000000; text-decoration:none; font-weight:normal; font-family:Arial; font-size:9pt;\">&nbsp;Close&nbsp;</span></center><br>\n";

    this.innerObj.innerHTML     = contextMenuInnerHTMLString;

    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
    addEventListener(this.innerObj, "dragstart", divDrag, false);
    addEventListener(this.innerObj, "drag",      divDrag, false);
    addEventListener(this.innerObj, "dragstop",  divDrag, false);

    //this is to allow dragin inside collections
    addEventListener(this.innerObj, "mousedown", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mousemove", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mouseup",   divPropagateNoDefault, false);


    //append inner object
    this.closeButton   = this.innerObj.appendChild(this.closeButton);
    this.innerObj      = this.innerTRObj.appendChild(this.innerObj);
    this.innerTRObj    = this.innerTBodyObj.appendChild(this.innerTRObj);
    this.innerTBodyObj = this.innerTableObj.appendChild(this.innerTBodyObj);
    this.innerTableObj = this.wrapperObj.appendChild(this.innerTableObj);


    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.reference                   = this.wrapperObj;


    return this.wrapperObj;

}//MASH_ContextualMenu.prototype.createScreenObject



// MASH_ContextualMenu.prototype.showPropertiesObj                       MASH_ContextualMenu.prototype.showPropertiesObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.showPropertiesObj = function() {
    alert("" + this.targetObj.id + "\n" + this.targetObj);
}//MASH_ContextualMenu.prototype.showPropertiesObj



// MASH_ContextualMenu.prototype.showCompositeParentTree           MASH_ContextualMenu.prototype.showCompositeParentTree
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.showCompositeParentTree = function() {
    alert("showCompositeParentTree\n============================\n" + this.targetObj.getParentCompositeTree() + "\n" );
}//MASH_ContextualMenu.prototype.showCompositeParentTree



// MASH_ContextualMenu.prototype.close                                               MASH_ContextualMenu.prototype.close
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.close = function() {

    //remove object from array and from the document
    otherObjects.shift();
    document.body.removeChild(this.reference);
    //remove the context layer
    this.targetObj.select(false);

}//MASH_ContextualMenu.prototype.close



// MASH_ContextualMenu.prototype.resizeObj                                       MASH_ContextualMenu.prototype.resizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.resizeObj = function(newWidth, newHeight) {
    this.targetObj.resize(parseInt(this.targetObj.wrapperObj.style.width) + newWidth, parseInt(this.targetObj.wrapperObj.style.height) + newHeight);
}//MASH_ContextualMenu.prototype.resizeObj



// MASH_ContextualMenu.prototype.setVisibilityObj                         MASH_ContextualMenu.prototype.setVisibilityObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.setVisibilityObj = function(visible) {
    this.targetObj.setVisibility(visible);
}//MASH_ContextualMenu.prototype.setVisibilityObj



// MASH_ContextualMenu.prototype.moveBackwardObj                           MASH_ContextualMenu.prototype.moveBackwardObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.moveBackwardObj = function() {
    this.targetObj.moveBackward();
}//MASH_ContextualMenu.prototype.moveBackwardObj



// MASH_ContextualMenu.prototype.moveForwardObj                             MASH_ContextualMenu.prototype.moveForwardObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.moveForwardObj = function() {
    this.targetObj.moveForward();
}//MASH_ContextualMenu.prototype.moveForwardObj



// MASH_ContextualMenu.prototype.sendToBackObj                               MASH_ContextualMenu.prototype.sendToBackObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.sendToBackObj = function() {
    this.targetObj.sendToBack();
}//MASH_ContextualMenu.prototype.sendToBackObj



// MASH_ContextualMenu.prototype.sendToFrontObj                             MASH_ContextualMenu.prototype.sendToFrontObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.sendToFrontObj = function() {
    this.targetObj.sendToFront();
}//MASH_ContextualMenu.prototype.sendToFrontObj



// MASH_ContextualMenu.prototype.emphasizeObj                                 MASH_ContextualMenu.prototype.emphasizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.emphasizeObj = function() {
    this.targetObj.emphasize();
}//MASH_ContextualMenu.prototype.emphasizeObj



// MASH_ContextualMenu.prototype.deemphasizeObj                             MASH_ContextualMenu.prototype.deemphasizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.deemphasizeObj = function() {
    this.targetObj.deemphasize();
}//MASH_ContextualMenu.prototype.deemphasizeObj



// MASH_ContextualMenu.prototype.destroy                                           MASH_ContextualMenu.prototype.destroy
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.destroy = function() {
    this.targetObj.destroy();
    this.close();
}//MASH_ContextualMenu.prototype.destroy



// MASH_ContextualMenu.prototype.toString                                         MASH_ContextualMenu.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "text\t\t= "               + this.text                  + "\n";
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

}//MASH_ContextualMenu.prototype.toString



// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_ContextualMenu.getInitialHeight                                             MASH_ContextualMenu.getInitialHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_ContextualMenu.getInitialHeight = function() {

    if(isIE)       { return 840; }
    if(isNetscape) { return 600; }

    return  600;

}//MASH_ContextualMenu.prototype.getInitialHeight




// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Nov 12, 2002                                                                                             //
// Modified: Jul 04, 2011                                                                                             //
// =====================================================================================================================



// =====================================================================================================================
// MASH_MetadataMenu                                                                                   MASH_MetadataMenu
// =====================================================================================================================
function MASH_MetadataMenu(tmpLeft, tmpTop, tmpObj) {

//    var tmpStyle = "align:left; vertical-align:top; background-color:#e4e4e4; border-color:#000000; border-width:1; border-style:solid; color:#000000; font-family:arial; font-size:9pt; font-weight:normal;";
    var tmpStyle = "align:left; vertical-align:top; background-color:#e8e8ea; border-color:#047AAC; border-width:1; border-style:solid; color:#000000; font-family:arial; font-size:9pt; font-weight:normal;";

    var intialWidth  = 430;
    var intialHeight = MASH_MetadataMenu.getInitialHeight();
    if(tmpObj.MASHobjectType == MASH_Object.USER_ANNOTATION ){
        intialWidth  = 280;
        intialHeight = 170;
    }
    if(tmpObj.MASHobjectType == MASH_Object.COLLECTION ){
        intialHeight = 400;
    }

    this.base    = MASH_Object;
    this.base("", tmpLeft, tmpTop, intialWidth, intialHeight, topZ+1, tmpStyle );
//    this.base("", tmpLeft, tmpTop, 400, MASH_MetadataMenu.getInitialHeight(), topZ+1, tmpStyle );

    this.targetObj                                 = tmpObj;
    this.innerStyle                                = tmpStyle;
    this.MASHobjectType                            = MASH_Object.CONTEXTUAL_MENU;

    //context menu
    this.contextMenuString                         = "";
}
//set inheritance
MASH_MetadataMenu.prototype                      = new MASH_Object("MASH_MetadataMenu",0,0,1,1,topZ+1,"");
MASH_MetadataMenu.prototype.constructor          = MASH_MetadataMenu;

//MASH_Text

//Copyright
MASH_MetadataMenu.COPYRIGHT                      = "MASH \n\n"                                       +
                                                     "  Copyright (c) 2002 Luis Francisco-Revilla.\n"  +
                                                     "  All rights reserved.\n\n"                      ;

//Constants
MASH_MetadataMenu.COOKIE_NAME                    = "mash_contextMenus";
MASH_MetadataMenu.INNER_ID_PREFIX                = "contextMenuObj";
MASH_MetadataMenu.ID_PREFIX                      = MASH_Object.ID_PREFIX + MASH_MetadataMenu.INNER_ID_PREFIX;

//images
MASH_MetadataMenu.CLOSE_BUTTON_IMG_ID            = "mashControlMenuCloseButton";
MASH_MetadataMenu.CLOSE_BUTTON_IMG_FILE          = CONTROLS_IMG_DIR + "close-button.png";
MASH_MetadataMenu.CLOSE_BUTTON_IMG_FILE_REVERSE  = CONTROLS_IMG_DIR + "close-button-reverse.png";
MASH_MetadataMenu.CLOSE_BUTTON_IMG_WIDTH         = "36";
MASH_MetadataMenu.CLOSE_BUTTON_IMG_HEIGHT        = "36";

MASH_MetadataMenu.BUTTON_STYLE                   = "cursor:pointer; position:relative; width:100px; height:36px; background-image:-moz-linear-gradient(90deg, #34AADC, #047AAC, #34AADC); border-color:#82a3f0; border-width:1; border-style:solid; color:#ffffff; font-family:arial; font-size:14pt; font-weight:normal; padding:2 5 2 5; margin:5 5 5 5; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt; ";


// MASH_MetadataMenu.prototype.createScreenObject                         MASH_MetadataMenu.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID                             = MASH_MetadataMenu.ID_PREFIX       + i;
    var tmpObjInnerID                        = MASH_MetadataMenu.INNER_ID_PREFIX + i;

    //wrapper object
    this.clickable                           = false; //Breadcrumbs: overall the object is not clickable,
                                                      //             HOWEVER, some elements (such as the top bar) are set to be clickable a few lines later

    this.wrapperObj                          = this.createWrapperObject(tmpObjID, i);

    //round corners
    this.wrapperObj.style.borderRadius       = '10px'; // standard
    this.wrapperObj.style.MozBorderRadius    = '10px'; // Mozilla
    this.wrapperObj.style.WebkitBorderRadius = '10px'; // WebKit
    this.wrapperObj.style.boxShadow          = '15px 15px 15px #558';

    this.wrapperObj.style.borderTopWidth     = '0';
    this.wrapperObj.style.borderRightWidth   = '0';
    this.wrapperObj.style.borderBottomWidth  = '2';
    this.wrapperObj.style.borderLeftWidth    = '0';
    this.wrapperObj.style.overflowY          = 'auto';


    //compute dimensions
    var adjustedWidth                        = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight                       = adjustSize(this.height, this.borderWidth);

    //close button for the Context Menu
    this.closeButton                         = document.createElement("span");
    this.closeButton.style.position          = "absolute";
    this.closeButton.style.top               = "1px";
    this.closeButton.style.width             = "99%";
    this.closeButton.style.textAlign         = "right";
    this.closeButton.style.cursor            = "pointer";
    this.closeButton.innerHTML               = "<img id=\""                            + MASH_MetadataMenu.CLOSE_BUTTON_IMG_ID           + "\" "    +
                                               "src=\""                                + MASH_MetadataMenu.CLOSE_BUTTON_IMG_FILE         + "\" "    +
                                               "width=\""                              + MASH_MetadataMenu.CLOSE_BUTTON_IMG_WIDTH        + "\" "    +
                                               "height=\""                             + MASH_MetadataMenu.CLOSE_BUTTON_IMG_HEIGHT       + "\" "    +
                                               "onclick=\"otherObjects[0].close();\" " +
                                               "onmouseover=\"this.src='"              + MASH_MetadataMenu.CLOSE_BUTTON_IMG_FILE_REVERSE + "';\" "  +
                                               "onmouseout=\"this.src ='"              + MASH_MetadataMenu.CLOSE_BUTTON_IMG_FILE         + "';\" "  +
                                               "style=\"border:0;\">"                                                                    ;



    //inner object
    this.innerTableObj                       = document.createElement("table");
    this.innerTBodyObj                       = document.createElement("tbody");
    this.innerTRObj                          = document.createElement("tr");
    this.innerObj                            = document.createElement("td");

    this.innerTableObj.style.width           = '100%';

    this.innerObj.id                         = tmpObjInnerID;
//    this.innerObj.style.width                = adjustedWidth;
//    this.innerObj.style.height               = adjustedHeight;

    //set the style
    this.innerObj.style.fontFamily           = this.fontFamily;
    this.innerObj.style.fontSize             = this.fontSize;
    this.innerObj.style.fontWeight           = this.fontWeight;

    this.innerObj.style.color                = this.color;
    this.innerObj.align                      = this.align;
    this.innerObj.style.verticalAlign        = this.verticalAlign;


    //Breadcrumbs
    this.innerObj.style.overflow             = 'auto';
    this.innerObj.style.resize               = 'both';

    this.topDiv                              = document.createElement("div");
    this.topDiv.style.width                  = '96%';
    this.topDiv.style.height                 = '30px';
    this.topDiv.style.marginTop              = '3px';
    this.topDiv.style.marginRight            = '15px';
    this.topDiv.style.marginBottom           = '3px';
    this.topDiv.style.marginLeft             = '3px';
    this.topDiv.style.backgroundColor        = '#047AAC';
    this.topDiv.style.borderWidth            = '1px';
    this.topDiv.style.borderStyle            = 'solid';
    this.topDiv.style.borderColor            = '#047AAC';
    this.topDiv.style.borderRadius           = '5pt';
    this.topDiv.style.MozBorderRadius        = '5pt';
    this.topDiv.style.WebkitBorderRadius     = '5pt';


    this.controlDiv                          = document.createElement("div");
    this.controlDiv.style.position           = 'relative';
    this.controlDiv.style.textAlign          = 'right';
    this.controlDiv.style.height             = '35px';
    this.controlDiv.style.paddingTop         = '20px';
    this.controlDiv.style.marginTop          = '5px';
    this.controlDiv.style.marginRight        = '5px';
    this.controlDiv.style.marginBottom       = '5px';
    this.controlDiv.style.marginLeft         = '5px';
    this.controlDiv.style.borderWidth        = '0px';
    this.controlDiv.style.borderTopWidth     = '1px';
    this.controlDiv.style.borderTopStyle     = 'solid';
    this.controlDiv.style.borderTopColor     = '#047AAC';
    this.controlDiv.innerHTML                = "<span onclick=\"otherObjects[0].saveTarget();\" style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Save</span> ";
    this.controlDiv.innerHTML               += "<span onclick=\"otherObjects[0].close();\"      style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Cancel</span>";
//    this.controlDiv.innerHTML                = "<span onmousedown=\"otherObjects[0].saveTarget();\" style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Save</span> ";
//    this.controlDiv.innerHTML               += "<span onmousedown=\"otherObjects[0].close();\"      style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Cancel</span>";

    var contextMenuInnerHTMLString           = "";

// Breadcrumbs: All the filters and object modifiers are commented in Breadcrumbs

//    contextMenuInnerHTMLString               = "<b>"+this.targetObj.id + "</b><br>\n"                                                                                                  +
//                                               this.targetObj.MASHobjectType + "<br>\n"                                                                                                +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].showPropertiesObj();\"       style=\"color:000044; text-decoration:none;\">Properties</span><br>\n"    +
//                                               "<span onclick=\"otherObjects[0].showCompositeParentTree();\" style=\"color:000044; text-decoration:none;\">Parent Tree</span><br>\n"   +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].setVisibilityObj(true);\"    style=\"color:000044; text-decoration:none;\">Show</span><br>\n"          +
//                                               "<span onclick=\"otherObjects[0].setVisibilityObj(false);\"   style=\"color:000044; text-decoration:none;\">Hide</span><br>\n"          +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].resizeObj(10, 10);\"         style=\"color:000044; text-decoration:none;\">Increase size</span><br>\n" +
//                                               "<span onclick=\"otherObjects[0].resizeObj(-10, -10);\"       style=\"color:000044; text-decoration:none;\">Reduce size</span><br>\n"   +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].sendToBackObj();\"           style=\"color:000044; text-decoration:none;\">Send to back</span><br>\n"  +
//                                               "<span onclick=\"otherObjects[0].moveBackwardObj();\"         style=\"color:000044; text-decoration:none;\">Move backward</span><br>\n" +
//                                               "<span onclick=\"otherObjects[0].moveForwardObj();\"          style=\"color:000044; text-decoration:none;\">Move forward</span><br>\n"  +
//                                               "<span onclick=\"otherObjects[0].sendToFrontObj();\"          style=\"color:000044; text-decoration:none;\">Send to Front</span><br>\n" +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].emphasizeObj();\"            style=\"color:000044; text-decoration:none;\">Emphasize</span><br>\n"     +
//                                               "<span onclick=\"otherObjects[0].deemphasizeObj();\"          style=\"color:000044; text-decoration:none;\">De-emphasize</span><br>\n"  +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].destroy();\"                 style=\"color:000044; text-decoration:none;\">Destroy</span><br>\n"       +
//                                               "<br/>\n"                                                                                                                               +
//                                               "<hr>\n"                                                                                                                                +
//                                               "<span onclick=\"otherObjects[0].targetObj.normal();\"        style=\"color:550000; text-decoration:none;\">Normal</span><br>\n"        +
//                                               "<span onclick=\"otherObjects[0].targetObj.alpha(50);\"       style=\"color:550000; text-decoration:none;\">Alpha</span><br>\n"         ;
//    if(isNetscape) {
//    }
//    if(isIE) {
//        contextMenuInnerHTMLString          += "<span onclick=\"otherObjects[0].targetObj.grayScale(1);\"  style=\"color:550000; text-decoration:none;\">Gray Scale</span><br>\n"     +
//                                               "<span onclick=\"otherObjects[0].targetObj.invert(1);\"     style=\"color:550000; text-decoration:none;\">Invert</span><br>\n"         +
//                                               "<span onclick=\"otherObjects[0].targetObj.mirror(1);\"     style=\"color:550000; text-decoration:none;\">Mirror</span><br>\n"         +
//                                               "<span onclick=\"otherObjects[0].targetObj.xRay(1);\"       style=\"color:550000; text-decoration:none;\">X Ray</span><br>\n"          +
//                                               "<span onclick=\"otherObjects[0].targetObj.rotate(1);\"     style=\"color:550000; text-decoration:none;\">Rotate 90</span><br>\n"      +
//                                               "<span onclick=\"otherObjects[0].targetObj.rotate(2);\"     style=\"color:550000; text-decoration:none;\">Rotate 180</span><br>\n"     +
//                                               "<span onclick=\"otherObjects[0].targetObj.rotate(3);\"     style=\"color:550000; text-decoration:none;\">Rotate 270</span><br>\n"     +
//                                               "<br>\n"                                                                                                                               +
//                                               "<span onclick=\"otherObjects[0].targetObj.blur();\"        style=\"color:550000; text-decoration:none;\">Blur</span><br>\n"           +
//                                               "<span onclick=\"otherObjects[0].targetObj.dropShadow();\"  style=\"color:550000; text-decoration:none;\">Drop shadow</span><br>\n"    +
//                                               "<span onclick=\"otherObjects[0].targetObj.emboss();\"      style=\"color:550000; text-decoration:none;\">Emboss</span><br>\n"         +
//                                               "<span onclick=\"otherObjects[0].targetObj.engrave();\"     style=\"color:550000; text-decoration:none;\">Engrave</span><br>\n"        +
//                                               "<span onclick=\"otherObjects[0].targetObj.glow();\"        style=\"color:550000; text-decoration:none;\">Glow</span><br>\n"           +
//                                               "<span onclick=\"otherObjects[0].targetObj.gradient();\"    style=\"color:550000; text-decoration:none;\">Gradient</span><br>\n"       +
//                                               "\n"                                                                                                                                   ;
//    }

    contextMenuInnerHTMLString              += this.targetObj.contextMenuString;

    this.innerObj.innerHTML                  = contextMenuInnerHTMLString;

    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
//    addEventListener(this.innerObj, "dragstart", divDrag, false);
//    addEventListener(this.innerObj, "drag",      divDrag, false);
//    addEventListener(this.innerObj, "dragstop",  divDrag, false);

    //this is to allow dragin inside collections
//    addEventListener(this.innerObj, "mousedown", divPropagateNoDefault, false);
//    addEventListener(this.innerObj, "mousemove", divPropagateNoDefault, false);
//    addEventListener(this.innerObj, "mouseup",   divPropagateNoDefault, false);

    //append events to elements that support dragging
    addEventListener(this.closeButton, "mousedown", divMouseDown, true);
    addEventListener(this.topDiv,      "mousedown", divMouseDown, true);
    addEventListener(this.controlDiv,  "mousedown", divMouseDown, true);


    //append all elements
    this.topDiv                      = this.wrapperObj.appendChild(this.topDiv);

    this.closeButton                 = this.innerObj.appendChild(this.closeButton);
    this.innerObj                    = this.innerTRObj.appendChild(this.innerObj);
    this.innerTRObj                  = this.innerTBodyObj.appendChild(this.innerTRObj);
    this.innerTBodyObj               = this.innerTableObj.appendChild(this.innerTBodyObj);
    this.innerTableObj               = this.wrapperObj.appendChild(this.innerTableObj);

    this.controlDiv                  = this.wrapperObj.appendChild(this.controlDiv);


    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.reference                   = this.wrapperObj;


    return this.wrapperObj;

}//MASH_MetadataMenu.prototype.createScreenObject



// MASH_MetadataMenu.prototype.saveTarget                                         MASH_MetadataMenu.prototype.saveTarget
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.saveTarget = function() {
//    alert("saveTarget " + this.targetObj.id + "\n" + this.targetObj);
    this.targetObj.save();
    this.close();
}//MASH_MetadataMenu.prototype.saveTarget



// MASH_MetadataMenu.prototype.cloneTarget                                       MASH_MetadataMenu.prototype.cloneTarget
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.cloneTarget = function() {
//    alert("cloneTarget " + this.targetObj.id + "\n" );
    this.targetObj.cloneClip();
    this.close();
}//MASH_MetadataMenu.prototype.cloneTarget



// MASH_MetadataMenu.prototype.suggestLocation                               MASH_MetadataMenu.prototype.suggestLocation
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.suggestLocation = function() {
//    alert("suggestLocation " + this.targetObj.id + "\n" );
    this.targetObj.suggestLocation();
    this.close();
}//MASH_MetadataMenu.prototype.suggestLocation



// MASH_MetadataMenu.prototype.suggestRelatedClips                       MASH_MetadataMenu.prototype.suggestRelatedClips
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.suggestRelatedClips = function() {
//    alert("suggestRelatedClips to " + this.targetObj.id + "\n" );
    this.targetObj.suggestRelatedClips();
    this.close();

}//MASH_MetadataMenu.prototype.suggestRelatedClips



// MASH_MetadataMenu.prototype.showPropertiesObj                           MASH_MetadataMenu.prototype.showPropertiesObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.showPropertiesObj = function() {
    alert("" + this.targetObj.id + "\n" + this.targetObj);
}//MASH_MetadataMenu.prototype.showPropertiesObj



// MASH_MetadataMenu.prototype.showCompositeParentTree               MASH_MetadataMenu.prototype.showCompositeParentTree
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.showCompositeParentTree = function() {
    alert("showCompositeParentTree\n============================\n" + this.targetObj.getParentCompositeTree() + "\n" );
}//MASH_MetadataMenu.prototype.showCompositeParentTree



// MASH_MetadataMenu.prototype.close                                                   MASH_MetadataMenu.prototype.close
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.close = function() {

    //remove object from array and from the document
    otherObjects.shift();
    document.body.removeChild(this.reference);
    //remove the context layer
    this.targetObj.select(false);

}//MASH_MetadataMenu.prototype.close



// MASH_MetadataMenu.prototype.resizeObj                                           MASH_MetadataMenu.prototype.resizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.resizeObj = function(newWidth, newHeight) {
    this.targetObj.resize(parseInt(this.targetObj.wrapperObj.style.width) + newWidth, parseInt(this.targetObj.wrapperObj.style.height) + newHeight);
}//MASH_MetadataMenu.prototype.resizeObj



// MASH_MetadataMenu.prototype.setVisibilityObj                             MASH_MetadataMenu.prototype.setVisibilityObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.setVisibilityObj = function(visible) {
    this.targetObj.setVisibility(visible);
}//MASH_MetadataMenu.prototype.setVisibilityObj



// MASH_MetadataMenu.prototype.moveBackwardObj                               MASH_MetadataMenu.prototype.moveBackwardObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.moveBackwardObj = function() {
    this.targetObj.moveBackward();
}//MASH_MetadataMenu.prototype.moveBackwardObj



// MASH_MetadataMenu.prototype.moveForwardObj                                 MASH_MetadataMenu.prototype.moveForwardObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.moveForwardObj = function() {
    this.targetObj.moveForward();
}//MASH_MetadataMenu.prototype.moveForwardObj



// MASH_MetadataMenu.prototype.sendToBackObj                                   MASH_MetadataMenu.prototype.sendToBackObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.sendToBackObj = function() {
    this.targetObj.sendToBack();
}//MASH_MetadataMenu.prototype.sendToBackObj



// MASH_MetadataMenu.prototype.sendToFrontObj                                 MASH_MetadataMenu.prototype.sendToFrontObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.sendToFrontObj = function() {
    this.targetObj.sendToFront();
}//MASH_MetadataMenu.prototype.sendToFrontObj



// MASH_MetadataMenu.prototype.emphasizeObj                                     MASH_MetadataMenu.prototype.emphasizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.emphasizeObj = function() {
    this.targetObj.emphasize();
}//MASH_MetadataMenu.prototype.emphasizeObj



// MASH_MetadataMenu.prototype.deemphasizeObj                                 MASH_MetadataMenu.prototype.deemphasizeObj
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.deemphasizeObj = function() {
    this.targetObj.deemphasize();
}//MASH_MetadataMenu.prototype.deemphasizeObj



// MASH_MetadataMenu.prototype.destroy                                               MASH_MetadataMenu.prototype.destroy
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.destroy = function() {
    this.targetObj.destroy();
    this.close();
}//MASH_MetadataMenu.prototype.destroy



// MASH_MetadataMenu.prototype.toString                                         MASH_MetadataMenu.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.prototype.toString = function() {

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

}//MASH_MetadataMenu.prototype.toString



// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_MetadataMenu.getInitialHeight                                                 MASH_MetadataMenu.getInitialHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_MetadataMenu.getInitialHeight = function() {

//    if(isIE)       { return 840; }
//    if(isNetscape) { return 600; }
//    return  600;


    return  440;

}//MASH_MetadataMenu.prototype.getInitialHeight




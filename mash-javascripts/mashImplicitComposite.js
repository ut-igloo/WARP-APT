// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Implicit Composite Objects                                                                                         //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: June 19, 2003                                                                                             //
// =====================================================================================================================



// =====================================================================================================================
// MASH_ImplicitComposite                                                                         MASH_ImplicitComposite
// =====================================================================================================================
function MASH_ImplicitComposite(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                                tmpText
                               ) {


    //default composite size
    // - extra space is added to facilitate its visualization
    var modLeft   = tmpLeft   - 2;
    var modWidth  = tmpWidth  + 4;
    var modTop    = tmpTop    - 2;
    var modHeight = tmpHeight + 4;

    //verbose-mode composite size
    // - more space is added to display the text identifying the object
    if(MASH_ImplicitComposite.verboseMode == true) {
        modLeft   = tmpLeft   - 2;
        modWidth  = tmpWidth  + 4;
        modTop    = tmpTop    - 20;
        modHeight = tmpHeight + 22;
    }

    //default appearance for composite objects
    var modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; border-width:2; border-style:dashed; border-color:#0000ff; color:#0000ff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";

    //modify style depending on the type of composite
    if(tmpID.indexOf(MASH_ImplicitComposite.PREFIX_HORIZONTAL_LIST)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#ffff00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#888800; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#888800; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#ffff00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#888800; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_VERTICAL_LIST)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#0000ff; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#0000ff; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_PILE)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#ff0000; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#aa0000; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#aa0000; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#ff0000; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#aa0000; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_HEAP)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#0000ff; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#0000ff; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#0000aa; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_1_TO_1)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#00ff00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#00aa00; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#00aa00; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#00ff00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#00aa00; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_1_TO_M)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#00AA00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#004400; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#004400; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#00AA00; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#004400; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
    else if (tmpID.indexOf(MASH_ImplicitComposite.PREFIX_M_TO_M)==0) {
        if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
            modStyle  = "background-color:#004400; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#002200; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
            modStyle  = "background-color:transparent; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#002200; " + 
                        "color:#000000; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
        else {
            modStyle  = "background-color:#004400; background-image:none; background-repeat:no-repeat; background-position:center center; " + 
                        "border-width:2; border-style:dashed; border-color:#002200; " + 
                        "color:#ffffff; font-family:arial; font-size:7pt; font-weight:bold; vertical-align:top; align:left;";
        }
    }
   
                  
    this.base = MASH_Object;
    this.base(tmpID, modLeft, modTop, modWidth, modHeight, tmpZIndex, modStyle );
    this.text = tmpText;

    if((tmpStyle) && (tmpStyle!=null)){ this.innerStyle = tmpStyle; }
    else                              { this.innerStyle = "";       }
    
    this.MASHobjectType = MASH_Object.IMPLICIT_COMPOSITE;

    //context menu
    this.contextMenuString  = "";

    //XML
    this.xmlObjectTag = MASH_ImplicitComposite.XML_TAG_OBJECT;

}
//set inheritance
MASH_ImplicitComposite.prototype                = new MASH_Object("MASH_ImplicitComposite",0,0,1,1,0,"");
MASH_ImplicitComposite.prototype.constructor    = MASH_ImplicitComposite;
//MASH_ImplicitComposite

//Class Variables
MASH_ImplicitComposite.verboseMode      = false;

//Copyright
MASH_ImplicitComposite.COPYRIGHT = "MASH \n\n"                                       +
                                   "  Copyright (c) 2005 Luis Francisco-Revilla.\n"  +
                                   "  All rights reserved.\n\n"                      ;

//Constants
MASH_ImplicitComposite.COOKIE_NAME      = "mash_texts";
MASH_ImplicitComposite.INNER_ID_PREFIX  = "textObj";
MASH_ImplicitComposite.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_ImplicitComposite.INNER_ID_PREFIX;

//display modes
MASH_ImplicitComposite.SHADOW_MODE      = "shadow";
MASH_ImplicitComposite.LINE_MODE        = "line";
//defaul display mode
MASH_ImplicitComposite.DISPLAY_MODE     = MASH_ImplicitComposite.SHADOW_MODE;
//Labels used for naming the type of composites
MASH_ImplicitComposite.PREFIX_HORIZONTAL_LIST = "Lh";
MASH_ImplicitComposite.PREFIX_VERTICAL_LIST   = "Lv";
MASH_ImplicitComposite.PREFIX_PILE            = "P";
MASH_ImplicitComposite.PREFIX_HEAP            = "H";
MASH_ImplicitComposite.PREFIX_1_TO_1          = "1-1";
MASH_ImplicitComposite.PREFIX_1_TO_M          = "1-M";
MASH_ImplicitComposite.PREFIX_M_TO_M          = "M-M";


// MASH_ImplicitComposite.clone                                                             MASH_ImplicitComposite.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_ImplicitComposite.clone = function(originalObj) {
                   
    var cloneObj = new MASH_ImplicitComposite(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                              originalObj.style,
                                              originalObj.text
                                             );
    return cloneObj;                         
}//MASH_ImplicitComposite.clone



// MASH_ImplicitComposite.prototype.clone                                         MASH_ImplicitComposite.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.prototype.clone = function() {
    return MASH_ImplicitComposite.clone(this);
}//MASH_ImplicitComposite.prototype.clone



// MASH_ImplicitComposite.prototype.createScreenObject               MASH_ImplicitComposite.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.prototype.createScreenObject  = function(i){


    //make object and sub object's id
    var tmpObjID        = MASH_ImplicitComposite.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_ImplicitComposite.INNER_ID_PREFIX + i;
    
    //wrapper object
    this.clickable      = false;
    var wrapperObj      = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);
    
    //inner object
    var innerTableObj             = document.createElement("table");
    var innerTBodyObj             = document.createElement("tbody");
    var innerTRObj                = document.createElement("tr");
    var innerObj                  = document.createElement("td");

    innerObj.id                   = tmpObjInnerID;
    innerObj.style.width          = adjustedWidth;
    innerObj.style.height         = adjustedHeight;

    //set the style
    innerObj.style.fontFamily     = this.fontFamily;
    innerObj.style.fontSize       = this.fontSize;
    innerObj.style.fontWeight     = this.fontWeight;

    innerObj.style.color          = this.color;
    innerObj.align                = this.align;
    innerObj.style.verticalAlign  = this.verticalAlign;


    //verbose-mode - display the text identifying the object
    if(MASH_ImplicitComposite.verboseMode == true) { innerObj.innerHTML        = this.text; } 
    else                                           { innerObj.innerHTML        = "";        }



    //the drag events are only relevant for IE, however they do not affect operation on Netscape 
    //   so we can add them without concerns
    addEventListener(innerObj, "dragstart", divDrag, false);
    addEventListener(innerObj, "drag",      divDrag, false);
    addEventListener(innerObj, "dragstop",  divDrag, false);

    //this is to allow dragin inside collections
    addEventListener(innerObj, "mousedown", divPropagateNoDefault, false);
    addEventListener(innerObj, "mousemove", divPropagateNoDefault, false);
    addEventListener(innerObj, "mouseup",   divPropagateNoDefault, false);

    
    //append inner object
    innerObj      = innerTRObj.appendChild(innerObj);
    innerTRObj    = innerTBodyObj.appendChild(innerTRObj);
    innerTBodyObj = innerTableObj.appendChild(innerTBodyObj);
    innerTableObj = wrapperObj.appendChild(innerTableObj);


    //cross reference the parameters with the screen object
    wrapperObj.MASHparameters   = this;
    this.reference              = wrapperObj;

    return wrapperObj;

}//MASH_ImplicitComposite.prototype.createScreenObject



// MASH_ImplicitComposite.setVerboseMode                                           MASH_ImplicitComposite.setVerboseMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.setVerboseMode = function(newValue) {
    MASH_ImplicitComposite.verboseMode = newValue;
}//MASH_ImplicitComposite.setVerboseMode



// MASH_ImplicitComposite.getVerboseMode                                           MASH_ImplicitComposite.getVerboseMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.getVerboseMode = function() {
    return MASH_ImplicitComposite.verboseMode;
}//MASH_ImplicitComposite.getVerboseMode



// MASH_ImplicitComposite.prototype.toString                                   MASH_ImplicitComposite.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.prototype.toString = function() {

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

}//MASH_ImplicitComposite.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_ImplicitComposite.XML_TAG_OBJECT = MASH_Object.IMPLICIT_COMPOSITE;
MASH_ImplicitComposite.XML_TAG_TEXT  = "text";



// MASH_ImplicitComposite.prototype.getTypeSpecificXML               MASH_ImplicitComposite.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImplicitComposite.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_ImplicitComposite.XML_TAG_TEXT,  this.text,  true,  indent);

    return objectXML;
            
}//MASH_ImplicitComposite.prototype.getTypeSpecificXML



// MASH_ImplicitComposite.xmlParseObjectNode                                   MASH_ImplicitComposite.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_ImplicitComposite.xmlParseObjectNode = function(node){

//    alert("MASH_ImplicitComposite.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.IMPLICIT_COMPOSITE;

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
        else if(childName == MASH_ImplicitComposite.XML_TAG_TEXT) { objText = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_ImplicitComposite(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                                         objText);

    return obj;

}//MASH_ImplicitComposite.xmlParseObjectNode


  

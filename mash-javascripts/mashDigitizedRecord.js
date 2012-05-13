// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Apr 26, 2012                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_DigitizedRecord                                                                             MASH_DigitizedRecord
// =====================================================================================================================
function MASH_DigitizedRecord(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpSrc, tmpText) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle);

    this.src                      = tmpSrc;
    this.text                     = tmpText;
    this.MASHobjectType           = MASH_Object.DIGITIZED_RECORD;

    //Metadata variables (APT)
    this.metadataTitle            = "";
    this.metadataDescription      = "";


    //context menu
    this.contextMenuString        = "<div style='line-height:3em; border-style:solid; border-width: 0 0 1 0; border-color:#047AAC;' >\n";
    this.contextMenuString       += "    <span onclick=\"otherObjects[0].targetObj.staple();\"     style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Staple</span>";
//    this.contextMenuString       += "    <span onmousedown=\"otherObjects[0].targetObj.staple();\"     style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Staple</span>";
    this.contextMenuString       += "</div><br/>\n";

    this.contextMenuString       += "    <table style='position:relative; width:100%; font-size:12pt; font-weight:bold;' border='0'>\n";
    this.contextMenuString       += "        <tr><td colspan='2'>File</td></tr>";
    this.contextMenuString       += "        <tr><td colspan='1'><textarea name='metadataFilename'        id='" + MASH_DigitizedRecord.ID_TEXTAREA_FILENAME    + "' style='position:relative; overflow:auto; resize:vertical; width:100%; height:40px;  background-color:#eeeeee; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' readonly='readonhly' >" + this.src       + "</textarea></td> <td colspan='1' style='width:40px;'><a href=\"" + this.src + "\" target=\"_new\" style='" + MASH_MetadataMenu.BUTTON_STYLE + " text-decoration:none;'>Show</span></td></tr>";
    this.contextMenuString       += "        <tr><td colspan='2'>Title</td></tr>";
    this.contextMenuString       += "        <tr><td colspan='2'><textarea name='metadataTitle'           id='" + MASH_DigitizedRecord.ID_TEXTAREA_TITLE       + "' style='position:relative; overflow:auto; resize:vertical; width:100%; height:25px;  background-color:#ffffff; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' >" + this.metadataTitle       + "</textarea></td></tr>\n";
    this.contextMenuString       += "        <tr><td colspan='2'>Description</td></tr>";
    this.contextMenuString       += "        <tr><td colspan='2'><textarea name='metadataDescription'     id='" + MASH_DigitizedRecord.ID_TEXTAREA_DESCRIPTION + "' style='position:relative; overflow:auto; resize:vertical; width:100%; height:100px; background-color:#ffffff; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' >" + this.metadataDescription + "</textarea></td></tr>\n";
    this.contextMenuString       += "    </table>\n";

    //XML
    this.xmlObjectTag            = MASH_DigitizedRecord.XML_TAG_OBJECT;

    this.FIXED_DIMENSIONAL_RATIO = tmpWidth / tmpHeight;
}
//set inheritance
MASH_DigitizedRecord.prototype                = new MASH_Object("MASH_DigitizedRecord",0,0,10,10,0,"");
MASH_DigitizedRecord.prototype.constructor    = MASH_DigitizedRecord;
//MASH_DigitizedRecord

//Constants
MASH_DigitizedRecord.COOKIE_NAME              = "mash_digitized_record";
MASH_DigitizedRecord.INNER_ID_PREFIX          = "digitizedRecordObj";
MASH_DigitizedRecord.ID_PREFIX                = MASH_Object.ID_PREFIX + MASH_DigitizedRecord.INNER_ID_PREFIX;

MASH_DigitizedRecord.ID_TEXTAREA_FILENAME     = "textAreaMetadataFilename";
MASH_DigitizedRecord.ID_TEXTAREA_TITLE        = "textAreaMetadataTitle";
MASH_DigitizedRecord.ID_TEXTAREA_DESCRIPTION  = "textAreaMetadataDescription";
MASH_DigitizedRecord.ID_SELECT_GROUP_TYPE     = "selectMetadataGroupType";



// MASH_DigitizedRecord.clone                                                                 MASH_DigitizedRecord.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_DigitizedRecord.clone = function(originalObj) {

    var cloneObj = new MASH_DigitizedRecord(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                  originalObj.style,
                                  originalObj.src, originalObj.text);
    return cloneObj;
}//MASH_DigitizedRecord.clone



// MASH_DigitizedRecord.prototype.clone                                             MASH_DigitizedRecord.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.clone = function() {
    return MASH_DigitizedRecord.clone(this);
}//MASH_DigitizedRecord.prototype.clone



// MASH_DigitizedRecord.prototype.createScreenObject                                       MASH_DigitizedRecord.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.createScreenObject  = function(i){


    //make object and sub object's id
    var tmpObjID        = MASH_DigitizedRecord.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_DigitizedRecord.INNER_ID_PREFIX + i;


    //wrapper object
    this.wrapperObj      = this.createWrapperObject(tmpObjID, i);

    addEventListener(this.wrapperObj, "dblclick",  MASH_Behavior_AutoPresentation.repaceImg,    false);
//    addEventListener(wrapperObj, "dblclick",  repaceImg,    false);


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

}//MASH_DigitizedRecord.prototype.createScreenObject



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_DigitizedRecord.prototype.emphasize                                     MASH_DigitizedRecord.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.emphasize  = function(){

    this.sendToFront();

    this.borderWidth = parseInt(this.reference.style.borderWidth) + 1;

    //set the style
    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

}//MASH_Collection.prototype.emphasize



// MASH_DigitizedRecord.prototype.deemphasize                                 MASH_DigitizedRecord.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.deemphasize  = function(){

    this.sendToFront();

    if(parseInt(this.borderWidth) > 0) { this.borderWidth = parseInt(this.reference.style.borderWidth) - 1;       }

    //set the style
    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

}//MASH_DigitizedRecord.prototype.deemphasize



// MASH_DigitizedRecord.prototype.resize                                           MASH_DigitizedRecord.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute inner dmensions
    var adjustedWidth   = adjustSize(parseInt(this.wrapperObj.style.width),  this.borderWidth);
    var adjustedHeight  = adjustSize(parseInt(this.wrapperObj.style.height), this.borderWidth);

    if(adjustedWidth  <= 0) { adjustedWidth  = 1; }
    if(adjustedHeight <= 0) { adjustedHeight = 1; }

    this.innerObj.style.width   = adjustedWidth;
    this.innerObj.style.height  = adjustedHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_DigitizedRecord.prototype.resize



// MASH_DigitizedRecord.prototype.staple                                           MASH_DigitizedRecord.prototype.staple
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.staple = function(newWidth, newHeight) {

   alert("stapling!");

}//MASH_DigitizedRecord.prototype.staple



// MASH_DigitizedRecord.prototype.toString                                       MASH_DigitizedRecord.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "src\t\t= "                + this.src                   + "\n";
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

}//MASH_DigitizedRecord.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_DigitizedRecord.XML_TAG_OBJECT = MASH_Object.DIGITIZED_RECORD;
MASH_DigitizedRecord.XML_TAG_SRC    = "src";
MASH_DigitizedRecord.XML_TAG_TEXT   = "text";



// MASH_DigitizedRecord.prototype.getTypeSpecificXML                   MASH_DigitizedRecord.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_DigitizedRecord.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_DigitizedRecord.XML_TAG_SRC,   this.src,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_DigitizedRecord.XML_TAG_TEXT,  this.text,  true,  indent);

    return objectXML;

}//MASH_DigitizedRecord.prototype.getTypeSpecificXML



// MASH_DigitizedRecord.xmlParseObjectNode                                       MASH_DigitizedRecord.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_DigitizedRecord.xmlParseObjectNode = function(node){

//    alert("MASH_DigitizedRecord.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    var objType               = MASH_Object.IMAGE;
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

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child        = node.childNodes[i];
        var childName    = child.nodeName;
        var childValue   = child.nodeValue;

        //ignore #text nodes
        var xmlTextField = new RegExp(/\s*#text/);
        if( (!childName) || (childName.match(xmlTextField)) ) { continue; }

        //parse generic object parameters
        else if(childName == MASH_Object.XML_TAG_TYPE)          { objType   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_ID)            { objID     = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_LEFT)          { objLeft   = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_TOP)           { objTop    = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_WIDTH)         { objWidth  = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_HEIGHT)        { objHeight = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_Z_INDEX)       { objZIndex = MASH_Object.xmlParseNodeText(child);  }
        else if(childName == MASH_Object.XML_TAG_STYLE)         { objStyle  = MASH_Object.xmlParseStyleNode(child); }
        //parse paremers specific to this kind of object
        else if(childName == MASH_DigitizedRecord.XML_TAG_SRC)  { objSrc  = MASH_Object.xmlParseNodeText(child);    }
        else if(childName == MASH_DigitizedRecord.XML_TAG_TEXT) { objText = MASH_Object.xmlParseNodeText(child);    }
    }

    //declare object
    var obj = new MASH_DigitizedRecord(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                             objSrc, objText);

    return obj;

}//MASH_DigitizedRecord.xmlParseObjectNode




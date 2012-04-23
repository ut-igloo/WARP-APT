// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Nov 12, 2002                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Image                                                                                                 MASH_Image
// =====================================================================================================================
function MASH_Image(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpSrc, tmpText) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle);
              
    this.src  = tmpSrc;
    this.text = tmpText;

    this.MASHobjectType = MASH_Object.IMAGE;

    //context menu
    this.contextMenuString  = "";

    //XML
    this.xmlObjectTag = MASH_Image.XML_TAG_OBJECT;

}
//set inheritance
MASH_Image.prototype                = new MASH_Object("MASH_Image",0,0,1,1,0,"");
MASH_Image.prototype.constructor    = MASH_Image;
//MASH_Image

//Constants
MASH_Image.COOKIE_NAME      = "mash_images";
MASH_Image.INNER_ID_PREFIX  = "imageObj";
MASH_Image.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_Image.INNER_ID_PREFIX;



// MASH_Image.clone                                                                                     MASH_Image.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Image.clone = function(originalObj) {
                   
    var cloneObj = new MASH_Image(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                  originalObj.style,
                                  originalObj.src, originalObj.text);
    return cloneObj;                         
}//MASH_Image.clone



// MASH_Image.prototype.clone                                                                 MASH_Image.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.clone = function() {
    return MASH_Image.clone(this);
}//MASH_Image.prototype.clone



// MASH_Image.prototype.createScreenObject                                       MASH_Image.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.createScreenObject  = function(i){


    //make object and sub object's id
    var tmpObjID        = MASH_Image.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_Image.INNER_ID_PREFIX + i;


    //wrapper object
    this.wrapperObj      = this.createWrapperObject(tmpObjID, i);
    
    addEventListener(this.wrapperObj, "dblclick",  MASH_Behavior_AutoPresentation.repaceImg,    false);
//    addEventListener(wrapperObj, "dblclick",  repaceImg,    false);


    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    //inner object
    this.innerObj       = document.createElement("img");

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
    
}//MASH_Image.prototype.createScreenObject



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_Image.prototype.emphasize                                                         MASH_Image.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.emphasize  = function(){

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



// MASH_Image.prototype.deemphasize                                                     MASH_Image.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.deemphasize  = function(){

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

}//MASH_Image.prototype.deemphasize



// MASH_Image.prototype.resize                                                               MASH_Image.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.resize = function(newWidth, newHeight) {

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

}//MASH_Image.prototype.resize



// MASH_Image.prototype.toString                                                           MASH_Image.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.toString = function() {

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

}//MASH_Image.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_Image.XML_TAG_OBJECT = MASH_Object.IMAGE;
MASH_Image.XML_TAG_SRC    = "src";
MASH_Image.XML_TAG_TEXT   = "text";



// MASH_Image.prototype.getTypeSpecificXML                                       MASH_Image.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Image.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Image.XML_TAG_SRC,   this.src,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Image.XML_TAG_TEXT,  this.text,  true,  indent);

    return objectXML;
            
}//MASH_Image.prototype.getTypeSpecificXML



// MASH_Image.xmlParseObjectNode                                                         MASH_Image.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Image.xmlParseObjectNode = function(node){

//    alert("MASH_Image.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.IMAGE;

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
        else if(childName == MASH_Image.XML_TAG_SRC)  { objSrc  = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Image.XML_TAG_TEXT) { objText = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_Image(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                             objSrc, objText);

    return obj;

}//MASH_Image.xmlParseObjectNode


  

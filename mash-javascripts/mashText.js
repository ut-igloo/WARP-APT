// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created:  Nov 12, 2002                                                                                             //
// Modified: Nov 10, 2003                                                                                             //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Text                                                                                                   MASH_Text
// =====================================================================================================================
function MASH_Text(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                   tmpText
                  ) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle );
    this.text = tmpText;

    if((tmpStyle) && (tmpStyle!=null)){ this.innerStyle = tmpStyle; }
    else                              { this.innerStyle = "";       }

    this.MASHobjectType = MASH_Object.TEXT;

    //context menu
    this.contextMenuString  = "";

    //XML
    this.xmlObjectTag = MASH_Text.XML_TAG_OBJECT;

}
//set inheritance
MASH_Text.prototype                = new MASH_Object("MASH_Text",0,0,1,1,0,"");
MASH_Text.prototype.constructor    = MASH_Text;
//MASH_Text

//Constants
MASH_Text.COOKIE_NAME      = "mash_texts";
MASH_Text.INNER_ID_PREFIX  = "textObj";
MASH_Text.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_Text.INNER_ID_PREFIX;



// MASH_Text.clone                                                                                       MASH_Text.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Text.clone = function(originalObj) {

    var cloneObj = new MASH_Text(originalObj.id,
                                 originalObj.left,
                                 originalObj.top,
                                 originalObj.width,
                                 originalObj.height,
                                 originalObj.zIndex,
                                 originalObj.style,
                                 originalObj.text
                                );
    return cloneObj;
}//MASH_Text.clone



// MASH_Text.prototype.clone                                                                   MASH_Text.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.clone = function() {
    return MASH_Text.clone(this);
}//MASH_Text.prototype.clone



// MASH_Text.prototype.createScreenObject                                         MASH_Text.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_Text.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_Text.INNER_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj     = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    //inner object
    this.innerDivObj    = document.createElement("div");   // this object is used to support automatic scrollbars
    this.innerTableObj  = document.createElement("table"); // the table allows to use the vertical-align
    this.innerTBodyObj  = document.createElement("tbody"); //  (for some reason the span did not work as the documentation says
    this.innerTRObj     = document.createElement("tr");
    this.innerObj       = document.createElement("td");


    //innerDivObj
    this.innerDivObj.align             = this.align;
    this.innerDivObj.style.borderWidth = 0;
//    this.innerDivObj.style.borderWidth = 1;
//    this.innerDivObj.style.borderStyle = "solid";
//    this.innerDivObj.style.borderColor = "#000000";
//    this.innerDivObj.style.width       = this.width  - (2 * this.borderWidth);
//    this.innerDivObj.style.height      = this.height - (2 * this.borderWidth) - 0;
    this.innerDivObj.style.width       = "100%";
    this.innerDivObj.style.height      = "100%";

    //innerTableObj
    this.innerTableObj.position          = "absolute";
    this.innerTableObj.left              = 0;
    this.innerTableObj.top               = 0;
    this.innerTableObj.style.borderWidth = 0;
    this.innerTableObj.style.width       = "100%";
    this.innerTableObj.style.height      = "100%";

    //innerObj
    this.innerObj.id                   = tmpObjInnerID;
//    this.innerObj.style.width          = this.width  - (2 * this.borderWidth);
//    this.innerObj.style.height         = this.height - (2 * this.borderWidth) - 4;
    this.innerObj.style.width          = "100%";
    this.innerObj.style.height         = "100%";


    //set the style
    this.innerObj.style.fontFamily     = this.fontFamily;
    this.innerObj.style.fontSize       = this.fontSize;
    this.innerObj.style.fontWeight     = this.fontWeight;

    this.innerObj.style.color          = this.color;
    this.innerObj.align                = this.align;
    this.innerObj.style.verticalAlign  = this.verticalAlign;
    this.innerObj.innerHTML            = this.text;


    // Mozilla 1.4+, Netscape 7.1 and Firebird 0.6 have serious issues (BUGS) when executing the following line!!!!!!
    // - In Gecko 1.4 style.overflow is a read-only property! (so much for following the standards!!!)
    // Mozilla 1.3.1 an  below work fine
//    if(isIE) { this.innerDivObj.style.overflow = "auto"; }
    this.innerDivObj.style.overflow = "auto";

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
    this.innerObj      = this.innerTRObj.appendChild(this.innerObj);
    this.innerTRObj    = this.innerTBodyObj.appendChild(this.innerTRObj);
    this.innerTBodyObj = this.innerTableObj.appendChild(this.innerTBodyObj);
    this.innerTableObj = this.innerDivObj.appendChild(this.innerTableObj);
    this.innerDivObj   = this.wrapperObj.appendChild(this.innerDivObj);


                                                                   //Added for scroll bar option
    addEventListener(this.innerDivObj, "scroll", divScroll, false);//this event listener is needed in order to avoid "sticky" scrollbars

    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.innerObj.MASHparameters     = this;
    this.reference                   = this.wrapperObj;

    return this.wrapperObj;

}//MASH_Text.prototype.createScreenObject



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_Text.prototype.emphasize                                                           MASH_Text.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.emphasize  = function(){

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

}//MASH_Text.prototype.emphasize



// MASH_Text.prototype.deemphasize                                                       MASH_Text.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.deemphasize  = function(){

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

    //adjust filters
    this.normal();
    this.alpha(50);

}//MASH_Text.prototype.deemphasize



// MASH_Text.prototype.resize                                                                 MASH_Text.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions
    var heightAdjustment = 0;
    if(isIE) { heightAdjustment = 4; } // these 4 pixels are necessary because IE adds some extra pixels before and after the TD
                                       //    without the 4, the browser always shows a vertical scrollbar

    var adjustedWidth  = newWidth  - (2 * this.borderWidth);
    var adjustedHeight = newHeight - (2 * this.borderWidth);

    if(adjustedWidth  <= 0) { adjustedWidth  = 1; }
    if(adjustedHeight <= 0) { adjustedHeight = 1; }


    //reset the elements dimmensions
    this.innerDivObj.style.width  = adjustedWidth;
    this.innerDivObj.style.height = adjustedHeight;

    this.innerObj.style.width  = adjustedWidth;
    this.innerObj.style.height = adjustedHeight - heightAdjustment;


    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_Text.prototype.resize



// MASH_Text.prototype.toString                                                             MASH_Text.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.toString = function() {

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

}//MASH_Text.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_Text.XML_TAG_OBJECT = MASH_Object.TEXT;
MASH_Text.XML_TAG_TEXT   = "text";



// MASH_Text.prototype.getTypeSpecificXML                                         MASH_Text.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Text.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    var objectXML = MASH_Object.xmlMakeTagMultiLine(MASH_Text.XML_TAG_TEXT, this.text, true,  indent);

    return objectXML;

}//MASH_Text.prototype.getTypeSpecificXML



// MASH_Text.xmlParseObjectNode                                                             MASH_Text.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Text.xmlParseObjectNode = function(node){

//    alert("MASH_Text.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.TEXT;

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
        else if(childName == MASH_Text.XML_TAG_TEXT) { objText = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_Text(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                            objText);

    return obj;

}//MASH_Text.xmlParseObjectNode




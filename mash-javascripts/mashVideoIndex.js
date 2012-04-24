// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: May 19, 2005                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_VideoIndex                                                                                       MASH_VideoIndex
// =====================================================================================================================
// * parentVideo and videoPosition can be Arrays
function MASH_VideoIndex(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, 
                         tmpText, tmpVideoPosition, tmpParentVideo
                        ) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle );

    this.style = tmpStyle;

    this.videoPosition  = tmpVideoPosition;
    this.text           = tmpText;
    this.parentVideo    = tmpParentVideo;

    if((this.parentVideo   instanceof Array) &&
       (this.videoPosition instanceof Array) ){

        this.indexLink      = "<span id=\"" + this.id + "_IndexSpan\" onclick=\"MASH_VideoIndex.gotoIndexPosition('"+tmpID+"'); \">";
        for(var i=0; i<this.parentVideo.length; i++){
            this.indexLink += "Video ["+i+"]: " + this.parentVideo[i].text + "<br>";
            this.indexLink += "Position: "      + this.videoPosition[i] + "<br>";
        }
        this.indexLink     += "<hr></span>";
    }
    else {
        this.indexLink      = "<span id=\"" + this.id + "_IndexSpan\" onclick=\"findObjectByID('" + this.parentVideo.id + "').currentPosition("+this.videoPosition+"); \">" + 
                              "Video: "     + this.parentVideo.text + "<br>" +
                              "Position: "  + this.videoPosition    + "<br>" +
                              "<hr></span>";
    }
    this.MASHobjectType = MASH_Object.VIDEO_INDEX;

    //context menu
    this.contextMenuString  = "<hr>\n"                                                                                                                                                  +
                              "<span onclick=\"otherObjects[0].targetObj.editText(); otherObjects[0].close();\" style=\"color:550000; text-decoration:none;\">Edit Text</span><br>\n";

    //XML
    this.xmlObjectTag = MASH_VideoIndex.XML_TAG_OBJECT;

}
//set inheritance
MASH_VideoIndex.prototype                = new MASH_Object("MASH_VideoIndex",0,0,1,1,0,"");
MASH_VideoIndex.prototype.constructor    = MASH_VideoIndex;
//MASH_VideoIndex


//Constants
MASH_VideoIndex.COOKIE_NAME      = "mash_video_index";
MASH_VideoIndex.INNER_ID_PREFIX  = "videoIndexObj";
MASH_VideoIndex.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_VideoIndex.INNER_ID_PREFIX;



// MASH_VideoIndex.clone                                                                           MASH_VideoIndex.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_VideoIndex.clone = function(originalObj) {
                   
    var cloneObj = new MASH_Text(originalObj.id, 
                                 originalObj.left, 
                                 originalObj.top, 
                                 originalObj.width, 
                                 originalObj.height, 
                                 originalObj.zIndex,
                                 originalObj.style,
                                 originalObj.text,
                                 originalObj.videoPosition,
                                 originalObj.parentVideo
                                );
    return cloneObj;                         
}//MASH_VideoIndex.clone



// MASH_VideoIndex.prototype.clone                                                       MASH_VideoIndex.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.clone = function() {
    return MASH_VideoIndex.clone(this);
}//MASH_VideoIndex.prototype.clone



// MASH_VideoIndex.prototype.createScreenObject                             MASH_VideoIndex.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_Text.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_Text.INNER_ID_PREFIX + i;
    
    //wrapper object
    this.wrapperObj     = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);
    
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

    this.innerObj.innerHTML            = this.indexLink + this.text;


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
    this.innerTableObj = this.wrapperObj.appendChild(this.innerTableObj);


    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.innerObj.MASHparameters     = this;
    this.reference                   = this.wrapperObj;

    return this.wrapperObj;

}//MASH_VideoIndex.prototype.createScreenObject



// MASH_VideoIndex.gotoIndexPosition                                                   MASH_VideoIndex.gotoIndexPosition
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.gotoIndexPosition  = function(videoindexID){

    var tmpIndex = findObjectByID(videoindexID);

    if((tmpIndex.parentVideo instanceof Array) && (tmpIndex.videoPosition instanceof Array) ){

        for(var i=0; i<tmpIndex.parentVideo.length; i++) {

            var videoObj = findObjectByID(tmpIndex.parentVideo[i].id);
            var position = parseInt(tmpIndex.videoPosition[i]);

            videoObj.currentPosition(position);
        }
    }
    else {
        var videoObj = findObjectByID(tmpIndex.parentVideo.id);
        var position = parseInt(tmpIndex.videoPosition);

        videoObj.currentPosition(position);
    }

}//MASH_VideoIndex.gotoIndexPosition



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_VideoIndex.prototype.emphasize                                               MASH_VideoIndex.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.emphasize  = function(){

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

}//MASH_VideoIndex.prototype.emphasize



// MASH_VideoIndex.prototype.deemphasize                                           MASH_VideoIndex.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.deemphasize  = function(){

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

}//MASH_VideoIndex.prototype.deemphasize



// MASH_VideoIndex.prototype.resize                                                     MASH_VideoIndex.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions
    var adjustedWidth   = adjustSize(newWidth,  this.borderWidth);
    var adjustedHeight  = adjustSize(newHeight, this.borderWidth);

    this.innerObj.style.width   = adjustedWidth;
    this.innerObj.style.height  = adjustedHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_VideoIndex.prototype.resize



// MASH_VideoIndex.prototype.destroy                                                   MASH_VideoIndex.prototype.destroy
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.destroy = function() {

    //remove screen object
    this.reference.parentNode.removeChild(this.reference);

    //remove object from arrays
    if(this.parentVideo instanceof Array) {
        for(var i=0; i<this.parentVideo.length; i++) {
            this.parentVideo[i].removeVideoIndex(this);
        }
    }
    else if(this.parentVideo instanceof MASH_Video) {
        this.parentVideo.removeVideoIndex(this);
    }
    else{
        return;
    }

}//MASH_VideoIndex.prototype.destroy



// MASH_VideoIndex.prototype.editText                                                 MASH_VideoIndex.prototype.editText
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.editText = function() {
            
    var promptAnswer = prompt("Please enter the new text", this.text);
    this.text        = promptAnswer;

    this.innerObj.innerHTML = this.indexLink + this.text;

}//MASH_VideoIndex.prototype.editText



// MASH_VideoIndex.prototype.toString                                                 MASH_VideoIndex.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.toString = function() {

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

}//MASH_VideoIndex.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_VideoIndex.XML_TAG_OBJECT         = MASH_Object.VIDEO_INDEX;
MASH_VideoIndex.XML_TAG_TEXT           = "text";
MASH_VideoIndex.XML_TAG_VIDEO_POSITION = "videoPosition";
MASH_VideoIndex.XML_TAG_PARENT_VIDEO   = "parentVideo";


// MASH_VideoIndex.prototype.getTypeSpecificXML                             MASH_VideoIndex.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_VideoIndex.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_VideoIndex.XML_TAG_TEXT,           this.text,          true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_VideoIndex.XML_TAG_VIDEO_POSITION, this.videoPosition, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_VideoIndex.XML_TAG_PARENT_VIDEO,   this.parentVideo,   true,  indent);

    return objectXML;
            
}//MASH_VideoIndex.prototype.getTypeSpecificXML



// MASH_VideoIndex.xmlParseObjectNode                                                 MASH_VideoIndex.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_VideoIndex.xmlParseObjectNode = function(node){

//    alert("MASH_VideoIndex.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.VIDEO_INDEX;

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
    var objVideoposition      = "";
    var objParentVideo        = "";

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
        else if(childName == MASH_Video.XML_TAG_TEXT)           { objText          = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Video.XML_TAG_VIDEO_POSITION) { objVideoposition = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Video.XML_TAG_PARENT_VIDEO)   { objParentVideo   = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_VideoIndex(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                                  objText, objVideoposition, objParentVideo);

    return obj;

}//MASH_VideoIndex.xmlParseObjectNode


  

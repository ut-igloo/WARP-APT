// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Nov 12, 2002                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Input                                                                                                 MASH_Input
// =====================================================================================================================
function MASH_Input(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpType, tmpName, tmpValue
                   ) {
                    
    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle);
              
    this.type       = tmpType;
    this.name       = tmpName;
    this.value      = tmpValue;
    
    this.MASHobjectType = MASH_Object.INPUT;

    //context menu
    this.contextMenuString  = "";

    //XML
    this.xmlObjectTag = MASH_Input.XML_TAG_OBJECT;

}
//set inheritance
MASH_Input.prototype                = new MASH_Object("MASH_Input",0,0,1,1,0,"");
MASH_Input.prototype.constructor    = MASH_Input;
//MASH_Input

//Constants
MASH_Input.INNER_ID_PREFIX  = "inputObj";
MASH_Input.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_Input.INNER_ID_PREFIX;

MASH_Input.TYPE_BUTTON      = "button";
MASH_Input.TYPE_CHECKBUTTON = "checkbox";
MASH_Input.TYPE_FILE        = "file";
MASH_Input.TYPE_HIDDEN      = "hidden";
MASH_Input.TYPE_IMAGE       = "image";
MASH_Input.TYPE_PASSWORD    = "password";
MASH_Input.TYPE_RADIO       = "radio";
MASH_Input.TYPE_RESET       = "reset";
MASH_Input.TYPE_SUBMIT      = "submit";
MASH_Input.TYPE_TEXT        = "text";
MASH_Input.TYPE_SELECT      = "select";
MASH_Input.TYPE_OPTION      = "option";
MASH_Input.TYPE_TEXTAREA    = "textarea";


// MASH_Input.prototype.createScreenObject                                       MASH_Input.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
// * takes care of all kind of INPUTS in a FORM
// * TEXTAREA and SELECT are also included here
MASH_Input.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_Input.ID_PREFIX        + i;
    var tmpObjInnerID   = MASH_Input.INNER_ID_PREFIX  + i;

    //HIDDEN and FILE form elements do not need any visual representation
    //  thus they are a special case that does not need to be wrapped in a div
    if((this.type == MASH_Input.TYPE_HIDDEN) ||
       (this.type == MASH_Input.TYPE_FILE)   ){

        var wrapperObj          = document.createElement("input");
    
        wrapperObj.id           = tmpObjID;
        wrapperObj.objectIndex  = i;
        wrapperObj.zoomFactor   = 1.0;
        
        wrapperObj.type         = this.type;
        wrapperObj.name         = this.name;
        wrapperObj.value        = this.value;

        //append screen object to this document
        wrapperObj                  = document.body.appendChild(wrapperObj);
        
        //cross reference the parameters with the screen object
        wrapperObj.MASHparameters   = this;
        this.reference              = wrapperObj;

        return wrapperObj;
    }
    
    //wrapper object
    var wrapperObj  = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = this.width  - (2*this.borderWidth);
    var adjustedHeight  = this.height - (2*this.borderWidth);
    
    
    switch(this.type) {
    
    //textarea
    case MASH_Input.TYPE_TEXTAREA:
                            this.innerObj                    = document.createElement("textarea");
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.name               = this.name;
                            this.innerObj.rows               = this.rows;
                            this.innerObj.cols               = this.cols;
                            
                            this.innerObj.style.width        = adjustedWidth;
                            this.innerObj.style.height       = adjustedHeight;
                            this.innerObj.style.fontFamily   = this.fontFamily;
                            this.innerObj.style.fontSize     = this.fontSize;
                            this.innerObj.style.fontWeight   = this.fontWeight;
                        
                            this.innerObj.innerHTML          = this.value;
                        
                            break;
                            
    //select
    case MASH_Input.TYPE_SELECT: 
                            this.innerObj                    = document.createElement("select");
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.name               = this.name;
                            this.innerObj.size               = this.size;
                            this.innerObj.multiple           = this.multiple;

                            this.innerObj.style.width        = adjustedWidth;
                            this.innerObj.style.height       = adjustedHeight;

                            //add options
                            this.innerObj                    = MASH_Select.writeOptions(this.innerObj, this.options);

                            break;
                            
    //image
    case MASH_Input.TYPE_IMAGE:
                            this.innerObj                    = document.createElement("input");
                            this.innerObj.type               = this.type;
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.src                = this.src;
                            this.innerObj.name               = this.name;
                            this.innerObj.value              = this.value;
                            
                            this.innerObj.style.width        = adjustedWidth;
                            this.innerObj.style.height       = adjustedHeight;
                        
                            break;
                            
    //checkbutton, radiobutton
    case MASH_Input.TYPE_CHECKBUTTON:
    case MASH_Input.TYPE_RADIO:
                            this.innerObj                    = document.createElement("input");
                            this.innerObj.type               = this.type;
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.name               = this.name;
                            this.innerObj.value              = this.value;
                            this.innerObj.checked            = this.checked;
                            
                            this.spanObj                     = document.createElement("span");
                        
                            this.spanObj.style.position      = "absolute";
                            this.spanObj.style.left          = 20;
                            this.spanObj.style.top           = 1;
                            
                            this.spanObj.style.width         = adjustedWidth;
                            this.spanObj.style.height        = adjustedHeight;
                            this.spanObj.style.fontFamily    = this.fontFamily;
                            this.spanObj.style.fontSize      = this.fontSize;
                            this.spanObj.style.fontWeight    = this.fontWeight;
                        
                            this.spanObj.innerHTML           = this.text;
                            
                            break;
                            
    //reset, submit
    case MASH_Input.TYPE_RESET:
    case MASH_Input.TYPE_SUBMIT:
                            this.innerObj                    = document.createElement("input");
                            this.innerObj.type               = this.type;
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.value              = this.value;
                            
                            this.innerObj.style.width        = adjustedWidth;
                            this.innerObj.style.height       = adjustedHeight;
                            this.innerObj.style.fontFamily   = this.fontFamily;
                            this.innerObj.style.fontSize     = this.fontSize;
                            this.innerObj.style.fontWeight   = this.fontWeight;
                        
                            break;
                            
    //button, password, textbox
    case MASH_Input.TYPE_BUTTON:
    case MASH_Input.TYPE_PASSWORD:
    case MASH_Input.TYPE_TEXT:
                            this.innerObj                    = document.createElement("input");
                            this.innerObj.type               = this.type;
                        
                            this.innerObj.id                 = tmpObjInnerID;
                            this.innerObj.name               = this.name;
                            this.innerObj.value              = this.value;
                            
                            this.innerObj.style.width        = adjustedWidth;
                            this.innerObj.style.height       = adjustedHeight;
                            this.innerObj.style.fontFamily   = this.fontFamily;
                            this.innerObj.style.fontSize     = this.fontSize;
                            this.innerObj.style.fontWeight   = this.fontWeight;
                        
                            break;
    }

    // inputs with a visual representation need to be appended to the document
    this.innerObj    = wrapperObj.appendChild(this.innerObj);
    if(this.spanObj) {
        this.spanObj = wrapperObj.appendChild(this.spanObj);
        addEventListener(this.spanObj, "click",  divPropagateNoDefault, false);
    }
    
    //cross reference the parameters with the screen object
    wrapperObj.MASHparameters   = this;
    this.reference              = wrapperObj;

    return wrapperObj;
    
}//MASH_Input.prototype.createScreenObject



// MASH_Input.prototype.resize                                                               MASH_Input.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Input.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    this.innerObj.style.width   = adjustedWidth;
    this.innerObj.style.height  = adjustedHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_Input.prototype.resize



// MASH_Input.prototype.toString                                                           MASH_Input.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Input.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
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

}//MASH_Input.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_Input)                                                                XML Functions (MASH_Input)
// =====================================================================================================================



//XML tags
MASH_Input.XML_TAG_OBJECT = MASH_Object.INPUT;
MASH_Input.XML_TAG_TYPE   = "inputType";
MASH_Input.XML_TAG_NAME   = "name";
MASH_Input.XML_TAG_VALUE  = "value";



// MASH_Input.prototype.getTypeSpecificXML                                       MASH_Input.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Input.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Input.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Input.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Input.XML_TAG_VALUE, this.value, true,  indent);

    return objectXML;
            
}//MASH_Input.prototype.getTypeSpecificXML



// MASH_Input.xmlParseObjectNode                                                           MASH_Input.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Input.xmlParseObjectNode = function(node){

//    alert("MASH_Input.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.INPUT;

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
    var objInputType          = "";
    var objName               = "";
    var objValue              = "";

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
        else if(childName == MASH_Input.XML_TAG_TYPE)     { objInputType = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Input.XML_TAG_NAME)     { objName      = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Input.XML_TAG_VALUE)    { objValue     = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_Input(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                             objInputType, objName, objValue);

    return obj;

}//MASH_Input.xmlParseObjectNode


  


// =====================================================================================================================
// MASH_Textbox                                                                                             MASH_Textbox
// =====================================================================================================================
function MASH_Textbox(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                      tmpName, tmpValue
                     ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_TEXT, tmpName, tmpValue
             );
              
}
//set inheritance
MASH_Textbox.prototype                = new MASH_Input("MASH_Textbox",0,0,1,1,0,"", MASH_Input.TYPE_TEXT, "", "");
MASH_Textbox.prototype.constructor    = MASH_Textbox;
//MASH_Textbox



// =====================================================================================================================
// XML Functions  (MASH_Textbox)                                                            XML Functions (MASH_Textbox)
// =====================================================================================================================



//XML tags
MASH_Textbox.XML_TAG_TYPE  = "inputType";
MASH_Textbox.XML_TAG_NAME  = "name";
MASH_Textbox.XML_TAG_VALUE = "value";



// MASH_Textbox.prototype.getTypeSpecificXML                                   MASH_Textbox.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Textbox.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textbox.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textbox.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textbox.XML_TAG_VALUE, this.value, true,  indent);

    return objectXML;
            
}//MASH_Textbox.prototype.getTypeSpecificXML







// =====================================================================================================================
// MASH_Reset                                                                                                 MASH_Reset
// =====================================================================================================================
function MASH_Reset(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpName, tmpValue
                     ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_RESET,    tmpName,        tmpValue
             );
              
}
//set inheritance
MASH_Reset.prototype                = new MASH_Input("MASH_Reset",0,0,1,1,0,"", MASH_Input.TYPE_RESET, "", "");
MASH_Reset.prototype.constructor    = MASH_Reset;
//MASH_Reset



// =====================================================================================================================
// XML Functions  (MASH_Reset)                                                                XML Functions (MASH_Reset)
// =====================================================================================================================



//XML tags
MASH_Reset.XML_TAG_TYPE  = "inputType";
MASH_Reset.XML_TAG_NAME  = "name";
MASH_Reset.XML_TAG_VALUE = "value";



// MASH_Reset.prototype.getTypeSpecificXML                                       MASH_Reset.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Reset.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Reset.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Reset.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Reset.XML_TAG_VALUE, this.value, true,  indent);

    return objectXML;
            
}//MASH_Reset.prototype.getTypeSpecificXML





// =====================================================================================================================
// MASH_Submit                                                                                               MASH_Submit
// =====================================================================================================================
function MASH_Submit(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                     tmpName, tmpValue
                    ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_SUBMIT,   tmpName,        tmpValue
             );
              
}
//set inheritance
MASH_Submit.prototype                = new MASH_Input("MASH_Submit",0,0,1,1,0,"", MASH_Input.TYPE_SUBMIT, "", "");
MASH_Submit.prototype.constructor    = MASH_Submit;
//MASH_Submit



// =====================================================================================================================
// XML Functions  (MASH_Submit)                                                              XML Functions (MASH_Submit)
// =====================================================================================================================



//XML tags
MASH_Submit.XML_TAG_TYPE  = "inputType";
MASH_Submit.XML_TAG_NAME  = "name";
MASH_Submit.XML_TAG_VALUE = "value";



// MASH_Submit.prototype.getTypeSpecificXML                                     MASH_Submit.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Submit.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Submit.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Submit.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Submit.XML_TAG_VALUE, this.value, true,  indent);

    return objectXML;
            
}//MASH_Submit.prototype.getTypeSpecificXML





// =====================================================================================================================
// MASH_Checkbox                                                                                           MASH_Checkbox
// =====================================================================================================================
function MASH_Checkbox(tmpID,   tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                       tmpName, tmpValue,
                       tmpChecked, tmpText
                      ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_CHECKBUTTON,  tmpName,        tmpValue
             );
              
    this.checked    = tmpChecked;
    this.text       = tmpText;
    
}
//set inheritance
MASH_Checkbox.prototype                = new MASH_Input("MASH_Checkbox",0,0,1,1,0,"", MASH_Input.TYPE_CHECKBUTTON, "", "");
MASH_Checkbox.prototype.constructor    = MASH_Checkbox;
//MASH_Checkbox



// MASH_Checkbox.prototype.toString                                                     MASH_Checkbox.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Checkbox.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
    returnString += "checked\t\t= "            + this.checked               + "\n";
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

}//MASH_Checkbox.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_Checkbox)                                                          XML Functions (MASH_Checkbox)
// =====================================================================================================================



//XML tags
MASH_Checkbox.XML_TAG_TYPE    = "inputType";
MASH_Checkbox.XML_TAG_NAME    = "name";
MASH_Checkbox.XML_TAG_VALUE   = "value";
MASH_Checkbox.XML_TAG_CHECKED = "checked";
MASH_Checkbox.XML_TAG_TEXT    = "text";



// MASH_Checkbox.prototype.getTypeSpecificXML                                   MASH_Checkbox.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Checkbox.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Checkbox.XML_TAG_TYPE,    this.type,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Checkbox.XML_TAG_NAME,    this.name,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Checkbox.XML_TAG_VALUE,   this.value,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Checkbox.XML_TAG_CHECKED, this.checked, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Checkbox.XML_TAG_TEXT,    this.text,    true,  indent);

    return objectXML;
            
}//MASH_Checkbox.prototype.getTypeSpecificXML






// =====================================================================================================================
// MASH_RadioButton                                                                                     MASH_RadioButton
// =====================================================================================================================
function MASH_RadioButton(tmpID,      tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                          tmpName,    tmpValue,
                          tmpChecked, tmpText
                         ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_RADIO,    tmpName,        tmpValue
             );
              
    this.checked    = tmpChecked;
    this.text       = tmpText;
    
}
//set inheritance
MASH_RadioButton.prototype                = new MASH_Input("MASH_RadioButton",0,0,1,1,0,"", MASH_Input.TYPE_RADIO, "", "");
MASH_RadioButton.prototype.constructor    = MASH_RadioButton;
//MASH_RadioButton



// MASH_RadioButton.prototype.toString                                               MASH_RadioButton.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_RadioButton.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
    returnString += "checked\t\t= "            + this.checked               + "\n";
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

}//MASH_RadioButton.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_RadioButton)                                                    XML Functions (MASH_RadioButton)
// =====================================================================================================================



//XML tags
MASH_RadioButton.XML_TAG_TYPE    = "inputType";
MASH_RadioButton.XML_TAG_NAME    = "name";
MASH_RadioButton.XML_TAG_VALUE   = "value";
MASH_RadioButton.XML_TAG_CHECKED = "checked";
MASH_RadioButton.XML_TAG_TEXT    = "text";



// MASH_RadioButton.prototype.getTypeSpecificXML                           MASH_RadioButton.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_RadioButton.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_RadioButton.XML_TAG_TYPE,    this.type,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_RadioButton.XML_TAG_NAME,    this.name,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_RadioButton.XML_TAG_VALUE,   this.value,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_RadioButton.XML_TAG_CHECKED, this.checked, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_RadioButton.XML_TAG_TEXT,    this.text,    true,  indent);

    return objectXML;
            
}//MASH_RadioButton.prototype.getTypeSpecificXML





// =====================================================================================================================
// MASH_ImageButton                                                                                     MASH_ImageButton
// =====================================================================================================================
function MASH_ImageButton(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                          tmpName,          tmpValue,
                          tmpSrc
                         ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_IMAGE,    tmpName,        tmpValue
             );
              
    this.src = tmpSrc;
    
}
//set inheritance
MASH_ImageButton.prototype                = new MASH_Input("MASH_ImageButton",0,0,1,1,0,"", MASH_Input.TYPE_IMAGE, "", "");
MASH_ImageButton.prototype.constructor    = MASH_ImageButton;
//MASH_ImageButton



// MASH_ImageButton.prototype.toString                                               MASH_ImageButton.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImageButton.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
    returnString += "src\t\t= "                + this.src                   + "\n";
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

}//MASH_ImageButton.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_ImageButton)                                                    XML Functions (MASH_ImageButton)
// =====================================================================================================================



//XML tags
MASH_ImageButton.XML_TAG_TYPE  = "inputType";
MASH_ImageButton.XML_TAG_NAME  = "name";
MASH_ImageButton.XML_TAG_VALUE = "value";
MASH_ImageButton.XML_TAG_SRC   = "src";



// MASH_ImageButton.prototype.getTypeSpecificXML                           MASH_ImageButton.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_ImageButton.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_ImageButton.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_ImageButton.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_ImageButton.XML_TAG_VALUE, this.value, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_ImageButton.XML_TAG_SRC,   this.src,   true,  indent);

    return objectXML;
            
}//MASH_ImageButton.prototype.getTypeSpecificXML





// =====================================================================================================================
// MASH_Select                                                                                               MASH_Select
// =====================================================================================================================
function MASH_Select(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                     tmpName, tmpValue,
                     tmpSize, tmpMultiple, tmpOptions
                    ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_SELECT,   tmpName,        tmpValue
             );
              
    this.size       = tmpSize;
    this.multiple   = tmpMultiple;
    this.options    = tmpOptions;
    
}
//set inheritance
MASH_Select.prototype                = new MASH_Input("MASH_Select",0,0,1,1,0,"", MASH_Input.TYPE_SELECT, "", "");
MASH_Select.prototype.constructor    = MASH_Select;
//MASH_Select



// MASH_Select.writeOptions                                                                     MASH_Select.writeOptions
// ---------------------------------------------------------------------------------------------------------------------
MASH_Select.writeOptions = function(selectionObj, selectOptions){

    for(var j=0;j<selectOptions.length;j++){
        var optionObj    = selectOptions[j].createOption();
        selectOptions[j] = selectionObj.appendChild(optionObj);
    }
    return selectionObj;
    
}//MASH_Select.writeOptions



// MASH_Select.prototype.toString                                                         MASH_Select.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Select.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
    returnString += "sizet\t= "                + this.size                  + "\n";
    returnString += "multiple\t= "             + this.multiple              + "\n";
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

}//MASH_Select.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_Select)                                                              XML Functions (MASH_Select)
// =====================================================================================================================



//XML tags
MASH_Select.XML_TAG_TYPE     = "inputType";
MASH_Select.XML_TAG_NAME     = "name";
MASH_Select.XML_TAG_VALUE    = "value";
MASH_Select.XML_TAG_SIZE     = "size";
MASH_Select.XML_TAG_MULTIPLE = "multiple";
MASH_Select.XML_TAG_OPTIONS  = "options";



// MASH_Select.prototype.getTypeSpecificXML                                     MASH_Select.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Select.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //get the tags for the options inside this select
    var optionsXML = "";
    for(var j=0;j<this.options.length;j++){
        optionsXML += this.options[i].toXML();
    }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Select.XML_TAG_TYPE,     this.type,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Select.XML_TAG_NAME,     this.name,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Select.XML_TAG_VALUE,    this.value,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Select.XML_TAG_SELECTED, this.selected, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Select.XML_TAG_TEXT,     this.text,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagMultiLine( MASH_Select.XML_TAG_OPTIONS,  optionsXML,    false, indent);

    return objectXML;
            
}//MASH_Select.prototype.getTypeSpecificXML


    



// =====================================================================================================================
// MASH_Option                                                                                               MASH_Option
// =====================================================================================================================
function MASH_Option(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                     tmpName, tmpValue,
                     tmpSelected, tmpText
                    ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_OPTION,   tmpName,        tmpValue
             );
              
    this.selected   = tmpSelected;
    this.text       = tmpText;
    
}
//set inheritance
MASH_Option.prototype                = new MASH_Input("MASH_Option",0,0,1,1,0,"", MASH_Input.TYPE_OPTION, "", "");
MASH_Option.prototype.constructor    = MASH_Option;
//MASH_Option


// MASH_Option.prototype.createOption                                                 MASH_Option.prototype.createOption
// ---------------------------------------------------------------------------------------------------------------------
// OPTION elements are inner objects that DO NOT need a wrapper div
MASH_Option.prototype.createOption = function(){

    var tmpOptionObj                = document.createElement("option");
    
    tmpOptionObj.value              = this.value;
    tmpOptionObj.selected           = this.selected;
    
    tmpOptionObj.style.fontFamily   = this.fontFamily;
    tmpOptionObj.style.fontSize     = this.fontSize;
    tmpOptionObj.style.fontWeight   = this.fontWeight;

    //option text
    tmpOptionObj.innerHTML          = this.text;

    return tmpOptionObj;
    
}//MASH_Option.prototype.createOption



// =====================================================================================================================
// XML Functions  (MASH_Option)                                                              XML Functions (MASH_Option)
// =====================================================================================================================



//XML tags
MASH_Option.XML_TAG_TYPE     = "inputType";
MASH_Option.XML_TAG_NAME     = "name";
MASH_Option.XML_TAG_VALUE    = "value";
MASH_Option.XML_TAG_SELECTED = "selected";
MASH_Option.XML_TAG_TEXT     = "text";



// MASH_Option.prototype.getTypeSpecificXML                                     MASH_Option.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Option.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Option.XML_TAG_TYPE,     this.type,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Option.XML_TAG_NAME,     this.name,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Option.XML_TAG_VALUE,    this.value,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Option.XML_TAG_SELECTED, this.selected, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Option.XML_TAG_TEXT,     this.text,     true,  indent);

    return objectXML;
            
}//MASH_Option.prototype.getTypeSpecificXML


    


// =====================================================================================================================
// MASH_Textarea                                                                                           MASH_Textarea
// =====================================================================================================================
function MASH_Textarea(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                       tmpName, tmpValue,
                       tmpRows, tmpCols
                      ) {
                    
    this.base = MASH_Input;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
              MASH_Input.TYPE_TEXTAREA, tmpName,        tmpValue
             );
              
    this.rows   = tmpRows;
    this.cols   = tmpCols;
    
}
//set inheritance
MASH_Textarea.prototype                = new MASH_Input("MASH_Textarea",0,0,1,1,0,"", MASH_Input.TYPE_TEXTAREA, "", "");
MASH_Textarea.prototype.constructor    = MASH_Textarea;
//MASH_Textarea



// MASH_Textarea.prototype.toString                                                     MASH_Textarea.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Textarea.prototype.toString = function() {

    var returnString = "\n---------------------------------------------------------------------------\n";
    returnString += "id\t\t= "                 + this.id                    + "\n";
    returnString += "reference\t\t= "          + this.reference.id          + "\n";
    returnString += "MASHobjectType\t= "       + this.MASHobjectType        + "\n";
    returnString += "originalID\t\t= "         + this.originalID            + "\n";
    returnString += "originalDocName\t= "      + this.originalDocName       + "\n";
    returnString += "name\t\t= "               + this.name                  + "\n";
    returnString += "value\t\t= "              + this.value                 + "\n";
    returnString += "rows\t\t= "               + this.rows                  + "\n";
    returnString += "cols\t\t= "               + this.cols                  + "\n";
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

}//MASH_Textarea.prototype.toString



// =====================================================================================================================
// XML Functions  (MASH_Textarea)                                                          XML Functions (MASH_Textarea)
// =====================================================================================================================



//XML tags
MASH_Textarea.XML_TAG_TYPE  = "inputType";
MASH_Textarea.XML_TAG_NAME  = "name";
MASH_Textarea.XML_TAG_VALUE = "value";
MASH_Textarea.XML_TAG_ROWS  = "rows";
MASH_Textarea.XML_TAG_COLS  = "cols";



// MASH_Textarea.prototype.getTypeSpecificXML                                 MASH_Textarea.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Textarea.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textarea.XML_TAG_TYPE,  this.type,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textarea.XML_TAG_NAME,  this.name,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textarea.XML_TAG_VALUE, this.value, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textarea.XML_TAG_ROWS,  this.rows,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Textarea.XML_TAG_COLS,  this.cols,  true,  indent);

    return objectXML;
            
}//MASH_Textarea.prototype.getTypeSpecificXML







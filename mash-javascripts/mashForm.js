// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Nov 12, 2002                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Form                                                                                                   MASH_Form
// =====================================================================================================================
function MASH_Form(tmpID, tmpName, tmpMethod, tmpEnctype, tmpAction, tmpOnreset, tmpOnsubmit, tmpTarget, tmpInputs) {
                    
    this.id             = tmpID;
    this.name           = tmpName;
    this.method         = tmpMethod;
    this.enctype        = tmpEnctype;
    this.action         = tmpAction;
    this.onreset        = tmpOnreset;
    this.onsubmit       = tmpOnsubmit;
    this.target         = tmpTarget;
    this.inputs         = tmpInputs;

    this.MASHobjectType = MASH_Object.FORM;

    //XML
    this.xmlObjectTag = MASH_Form.XML_TAG_OBJECT;

}
//MASH_Form

//Constants
MASH_Form.COOKIE_NAME       = "mash_forms";
MASH_Form.INNER_ID_PREFIX   = "formObj";
MASH_Form.ID_PREFIX         = MASH_Object.ID_PREFIX + MASH_Form.INNER_ID_PREFIX;

MASH_Form.GET_METHOD        = "GET";
MASH_Form.POST_METHOD       = "POST";
MASH_Form.ENC_FORM_URL      = "application/x-www-form-urlencoded";
MASH_Form.ENC_FORM_DATA     = "multipart/form-data";




// MASH_Form.prototype.createScreenObject                                         MASH_Form.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Form.prototype.createScreenObject  = function(i){


    //make object and sub object's id
    var formObjID               = MASH_Form.ID_PREFIX      + i;
    

    //wrapper
    var wrapperObj              = document.createElement("form");

    wrapperObj.id               = formObjID;
    wrapperObj.objectIndex      = i;
    wrapperObj.zoomFactor       = 1.0;
    

    wrapperObj.name             = this.name;
    wrapperObj.method           = this.method;
    wrapperObj.enctype          = this.enctype;
    wrapperObj.action           = this.action;
    wrapperObj.onreset          = this.onreset;
    wrapperObj.onsubmit         = this.onsubmit;
    wrapperObj.target           = this.target;

    wrapperObj.style.position   = "absolute";
    wrapperObj.style.left       = 0;
    wrapperObj.style.top        = 0;
    wrapperObj.style.zIndex     = 2;                                                              


    //create all the form components
    wrapperObj  = MASH_Form.writeFormInputs(wrapperObj, this.inputs);

    //cross reference the parameters with the screen object
    wrapperObj.MASHparameters   = this;
    this.reference              = wrapperObj;

    return wrapperObj;
    
}//MASH_Form.prototype.createScreenObject



// MASH_Form.writeFormInputs                                                                   MASH_Form.writeFormInputs
// ---------------------------------------------------------------------------------------------------------------------
MASH_Form.writeFormInputs = function(wrapperObj, formInputs){

    for(var i=0; i<formInputs.length; i++){
        var tmpObj              = formInputs[i].createScreenObject(i);
        formInputs[i].reference = wrapperObj.appendChild(tmpObj);
        inputObjects.push(tmpObj);
    }
    
    return wrapperObj;
    
}//MASH_Form.writeFormInputs


// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================


//XML tags
MASH_Form.XML_TAG_FORM           = MASH_Object.FORM;
MASH_Form.XML_TAG_FORM_ID        = "formID";
MASH_Form.XML_TAG_FORM_NAME      = "formName";
MASH_Form.XML_TAG_FORM_METHOD    = "formMethod";
MASH_Form.XML_TAG_FORM_ENCTYPE   = "formEncType";
MASH_Form.XML_TAG_FORM_ACTION    = "formAction";
MASH_Form.XML_TAG_FORM_ON_RESET  = "formOnReset";
MASH_Form.XML_TAG_FORM_ON_SUBMIT = "formOnSubmit";
MASH_Form.XML_TAG_FORM_TARGET    = "formTarget";
MASH_Form.XML_TAG_FORM_INPUTS    = "formInputs";



// MASH_Form.prototype.toXML                                                                   MASH_Form.prototype.toXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Form.prototype.toXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }
    
    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_ID,        this.id,       true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_NAME,      this.name,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_METHOD,    this.method,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_ENCTYPE,   this.enctype,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_ACTION,    this.action,   true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_ON_RESET,  this.onreset,  true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_ON_SUBMIT, this.onsubmit, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Form.XML_TAG_FORM_TARGET,    this.target,   true,  indent);

    //get the tags for the inputs inside this form
    var inputsXML = "";
    for(var i=0; i<this.inputs.length; i++) {
        inputsXML += this.inputs[i].toXML();
    }
    objectXML += MASH_Object.xmlMakeTagMultiLine(MASH_Form.XML_TAG_FORM_INPUTS, inputsXML, false, indent);

    //make <form>
    objectXML  = MASH_Object.xmlMakeTagMultiLine(MASH_Form.XML_TAG_FORM, objectXML, false, indent);

    return objectXML;
            
}//MASH_Form.prototype.toXML



// MASH_Form.xmlParseObjectNode                                                             MASH_Form.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Form.xmlParseObjectNode = function(node){

//    alert("MASH_Form.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.FORM;

    //id
    var objID                 = MASH_Object.getUniqueID(); 

    //set the coordinates
    var objID                 = "";
    var objName               = "";
    var objMethod             = "";
    var objEncType            = "";
    var objAction             = "";
    var objOnReset            = "";                                                              
    var objOnSubmit           = "";
    var objTarget             = "";
    var objInputs             = new Array();

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;
        var childValue = child.nodeValue;

        //ignore #text nodes
        var xmlTextField = new RegExp(/\s*#text/);
        if( (!childName) || (childName.match(xmlTextField)) ) { continue; }

        //parse object parameters
        else if(childName == MASH_Form.XML_TAG_FORM_ID)        { objID       = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_NAME)      { objName     = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_METHOD)    { objMethod   = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_ENCTYPE)   { objEncType  = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_ACTION)    { objAction   = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_ON_RESET)  { objOnReset  = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_ON_SUBMIT) { objOnSubmit = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_TARGET)    { objTarget   = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Form.XML_TAG_FORM_INPUTS)    { objInputs   = MASH_Object.xmlParseMASH_Objects(child); }
    }

    //declare object
    var obj = new MASH_Form(objID, objName, objMethod, objEncType, objAction, objOnReset, objOnSubmit, objTarget, objInputs);

    return obj;

}//MASH_Form.xmlParseObjectNode


  

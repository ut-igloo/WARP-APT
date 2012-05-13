// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Nov 12, 2002                                                                                             //
// Modified: Nov 18, 2003                                                                                             //
// Modified: Sep 28, 2007: Modified CONTROLS_IMG_DIR to point to WARP Server                                          //
//                                                                                                                    //
// =====================================================================================================================



// =====================================================================================================================
// MASH_ArchivalGroup                                                                                 MASH_ArchivalGroup
// =====================================================================================================================
function MASH_ArchivalGroup(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                         tmpText, tmpComponents,
                         tmpGroupType, tmpDescription) {

    this.base = MASH_Collection;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, tmpText, tmpComponents);

    //validate components
    if(typeof(tmpGroupType)   == "undefined") { tmpGroupType   = MASH_ArchivalGroup.TYPE_UNDETERMITED; }
    if(typeof(tmpDescription) == "undefined") { tmpDescription = ""                                    }

    //Metadata variables (APT)
    this.metadataGroupType         = tmpGroupType;
    this.metadataTitle             = tmpText;
    this.metadataDescription       = "";


    //context menu
    this.defaultContextMenuString  = "<div style='line-height:3em; border-style:solid; border-width: 0 0 1 0; border-color:#047AAC;' >\n";
    this.defaultContextMenuString += "    <span onclick=\"otherObjects[0].targetObj.explode(); otherObjects[0].close();\"     style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Ungroup</span>";
    this.defaultContextMenuString += "    <span onclick=\"otherObjects[0].targetObj.editText();\"                             style='" + MASH_MetadataMenu.BUTTON_STYLE + "'>Edit Text</span>";
    this.defaultContextMenuString += "</div><br/>\n";

    this.defaultContextMenuString += "<div style='font-size:12pt; font-weight:bold;' >\n";
    this.defaultContextMenuString += "    Title       <br/>    <textarea name='metadataTitle'           id='" + MASH_DigitizedRecord.ID_TEXTAREA_TITLE       + "' style='position:relative; overflow:auto; resize:vertical; width:100%; height:25px;  background-color:#ffffff; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' >" + this.metadataTitle       + "</textarea> <br/>\n";
    this.defaultContextMenuString += "    Description <br/>    <textarea name='metadataDescription'     id='" + MASH_DigitizedRecord.ID_TEXTAREA_DESCRIPTION + "' style='position:relative; overflow:auto; resize:vertical; width:100%; height:100px; background-color:#ffffff; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' >" + this.metadataDescription + "</textarea> <br/>\n";
    this.defaultContextMenuString += "    <br/><br/>Group Type <select   name='metadataGroupType'       id='" + MASH_DigitizedRecord.ID_SELECT_GROUP_TYPE    + "' style='position:relative;                                             height:25px;  background-color:#ffffff; border-width:1px; border-style:solid; border-color:#047AAC; -border-radius:3pt; -moz-border-radius:3pt; -webkit-border-radius:3pt;' >";
    this.defaultContextMenuString += "    <option value=\"MASH_ArchivalGroup.TYPE_SUBGROUP\" >Sub-Group </option>\n";
    this.defaultContextMenuString += "    <option value=\"MASH_ArchivalGroup.TYPE_SERIES\"   >Series    </option>\n";
    this.defaultContextMenuString += "    <option value=\"MASH_ArchivalGroup.TYPE_SUBSERIES\">Sub-Series</option>\n";
    this.defaultContextMenuString += "    <option value=\"MASH_ArchivalGroup.TYPE_FILE\"     >File      </option>\n";
    this.defaultContextMenuString += "    </select> <br/>\n";
    this.defaultContextMenuString += "</div>\n";

    this.contextMenuString         = this.defaultContextMenuString;

}
//set inheritance
MASH_ArchivalGroup.prototype                     = new MASH_Collection("MASH_ArchivalGroup",0,0,1,1,0,"", new Array());
MASH_ArchivalGroup.prototype.constructor         = MASH_ArchivalGroup;
//MASH_ArchivalGroup


//Constants
MASH_ArchivalGroup.COOKIE_NAME                   = "mash_collections";
MASH_ArchivalGroup.INNER_ID_PREFIX               = "collectionObj";
MASH_ArchivalGroup.ID_PREFIX                     = MASH_Object.ID_PREFIX + MASH_ArchivalGroup.INNER_ID_PREFIX;
MASH_ArchivalGroup.CONTROLS_ID_PREFIX            = MASH_ArchivalGroup.INNER_ID_PREFIX + "Controls";

MASH_ArchivalGroup.TITLE_HEIGHT                  = 20; //pixel height of the title bar of a frame object
MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_ID      = "imgMaximizeCollection"
MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_ID      = "imgMinimizeCollection"
MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_ID       = "imgZoomInCollection";
MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_ID      = "imgZoomOutCollection";

MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_TITLE   = "Maximize"
MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_TITLE   = "Minimize"
MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_TITLE    = "Zoom In";
MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_TITLE   = "Zoom Out";

MASH_ArchivalGroup.CONTROLS_IMG_DIR              = MASH_APPLET_CODEBASE             + "mash_images/";

MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_FILE    = MASH_ArchivalGroup.CONTROLS_IMG_DIR + "maximize.png";
MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH   = 16;
MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_HEIGHT  = 16;
MASH_ArchivalGroup.CONTROLS_NORMALIZE_IMG_FILE   = MASH_ArchivalGroup.CONTROLS_IMG_DIR + "normalize.png";
MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_FILE    = MASH_ArchivalGroup.CONTROLS_IMG_DIR + "minimize.png";
MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_FILE    = MASH_ArchivalGroup.CONTROLS_IMG_DIR + "zoomOutPage.png";
MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_FILE     = MASH_ArchivalGroup.CONTROLS_IMG_DIR + "zoomInPage.png";


//XML tags
MASH_ArchivalGroup.XML_TAG_OBJECT                = MASH_Object.COLLECTION;
MASH_ArchivalGroup.XML_TAG_TEXT                  = "text";
MASH_ArchivalGroup.XML_TAG_COMPONENTS            = "components";


//Default values for User Readings open in collections
MASH_ArchivalGroup.USER_READING_LEFT             = 10;
MASH_ArchivalGroup.USER_READING_TOP              = 100;
MASH_ArchivalGroup.USER_READING_WIDTH            = 600;
MASH_ArchivalGroup.USER_READING_HEIGHT           = 400;
MASH_ArchivalGroup.USER_READING_STYLE            = "align:left; vertical-align:top; background-color:#ffffff; border-width:2; border-color:#222222; border-style:solid; background-image:none; color:#ffffff; font-family:Arial; font-size:13pt; font-weight:bold; ";


//APT
MASH_ArchivalGroup.TYPE_UNDETERMITED             = "UNDETERMINDED";
MASH_ArchivalGroup.TYPE_SUBGROUP                 = "SUB-GROUP";
MASH_ArchivalGroup.TYPE_SERIES                   = "SERIES";
MASH_ArchivalGroup.TYPE_SUBSERIES                = "SUB-SERIES";
MASH_ArchivalGroup.TYPE_FILE                     = "FILE";




// MASH_ArchivalGroup.clone                                                                           MASH_ArchivalGroup.clone
// ---------------------------------------------------------------------------------------------------------------------
// * This needs to clone the compnents as well
//   - by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_ArchivalGroup.clone = function(originalObj) {

    //clone all components
    var clonedComponents = new Array();
    for(var i=0; i<originalObj.components.length; i++) {
        clonedComponents[i] = MASH_Object.clone(originalObj.components[i]);
    }

    //clone container
    var cloneObj = new MASH_ArchivalGroup(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                       originalObj.style,
                                       originalObj.text, clonedComponents,
                                       originalObj.metadataGroupType, originalObj.metadataDescription);
    return cloneObj;
}//MASH_ArchivalGroup.clone





// MASH_ArchivalGroup.prototype.createScreenObject                             MASH_ArchivalGroup.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID                = MASH_ArchivalGroup.ID_PREFIX          + i;
    var tmpObjInnerID           = MASH_ArchivalGroup.INNER_ID_PREFIX    + i;
    var controlsObjID           = MASH_ArchivalGroup.CONTROLS_ID_PREFIX + i;


    //wrapper object
    this.wrapperObj              = this.createWrapperObject(tmpObjID, i);
    this.wrapperObj.align        = this.align;

    //round corners
    this.wrapperObj.style.borderRadius       = '10px'; // standard
    this.wrapperObj.style.MozBorderRadius    = '10px'; // Mozilla
    this.wrapperObj.style.WebkitBorderRadius = '10px'; // WebKit
    this.wrapperObj.style.boxShadow          = '5px 5px 5px #ccc';
    this.wrapperObj.style.padding            = '0 2 2 0';


    //compute dimensions
    var adjustedWidth            = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight           = adjustSize(this.height, this.borderWidth);

    var adjustedInnerWidth       = this.width  - (this.borderWidth*2) - 0;
    var adjustedInnerHeight      = this.height - (this.borderWidth*2) - MASH_ArchivalGroup.TITLE_HEIGHT;

    //validate adjusted dimensions
    // - if dimensions are 0 or negative, IE stops the scripts, and Netscape ignores the assignments
    if(adjustedInnerWidth  <= 0) { adjustedInnerWidth  = 1; }
    if(adjustedInnerHeight <= 0) { adjustedInnerHeight = 1; }


    //controls
    this.controlObj                      = document.createElement("div");

    this.controlObj.id                   = controlsObjID;

    this.controlObj.style.position       = "absolute";
    this.controlObj.style.left           = adjustedInnerWidth - MASH_ArchivalGroup.getControlsWidth();
    this.controlObj.style.top            = 0;
    this.controlObj.style.width          = 0 + MASH_ArchivalGroup.getControlsWidth();
    this.controlObj.style.height         = MASH_ArchivalGroup.TITLE_HEIGHT;
    this.controlObj.style.zIndex         = 1;

    this.controlObj.style.backgroundColor= this.borderColor;

    this.controlObj.style.overflow       = "hidden";

    //zoom out control
    this.zoomOutObj                     = document.createElement("img");
    this.zoomOutObj.id                  = MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_ID + i;
    this.zoomOutObj.src                 = MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_FILE;
    this.zoomOutObj.title               = MASH_ArchivalGroup.CONTROLS_ZOOM_OUT_IMG_TITLE;
    this.zoomOutObj.align               = "top";
    this.zoomOutObj.width               = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.zoomOutObj.height              = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.zoomOutObj.style.borderWidth    = 0;

    addEventListener(this.zoomOutObj, "click",  MASH_ArchivalGroup.zoomOutCollectionEvent, false);


    //zoom in control
    this.zoomInObj                      = document.createElement("img");
    this.zoomInObj.id                   = MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_ID + i;
    this.zoomInObj.src                  = MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_FILE;
    this.zoomInObj.title                = MASH_ArchivalGroup.CONTROLS_ZOOM_IN_IMG_TITLE;
    this.zoomInObj.align                = "top";
    this.zoomInObj.width                = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH;
    this.zoomInObj.height               = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.zoomInObj.style.borderWidth    = 0;

    addEventListener(this.zoomInObj, "click",  MASH_ArchivalGroup.zoomInCollectionEvent, false);


    //maximize control
    this.maximizeObj                     = document.createElement("img");
    this.maximizeObj.id                  = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_ID + i;
    this.maximizeObj.src                 = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_FILE;
    this.maximizeObj.title               = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_TITLE;
    this.maximizeObj.align               = "top";
    this.maximizeObj.width               = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.maximizeObj.height              = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.maximizeObj.style.borderWidth   = 0;

    addEventListener(this.maximizeObj, "click",  MASH_ArchivalGroup.maximizeCollectionEvent, false);


    //minimize control
    this.minimizeObj                     = document.createElement("img");
    this.minimizeObj.id                  = MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_ID + i;
    this.minimizeObj.src                 = MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_FILE;
    this.minimizeObj.title               = MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_TITLE;
    this.minimizeObj.align               = "top";
    this.minimizeObj.width               = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.minimizeObj.height              = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.minimizeObj.style.borderWidth   = 0;

    addEventListener(this.minimizeObj, "click",  MASH_ArchivalGroup.minimizeCollectionEvent, false);


    //append controls to control div
    if(isNetscape) {
        this.minimizeObj = this.controlObj.appendChild(this.minimizeObj);
        this.maximizeObj = this.controlObj.appendChild(this.maximizeObj);
    }
    if(isIE) {
        this.zoomOutObj  = this.controlObj.appendChild(this.zoomOutObj);
        this.zoomInObj   = this.controlObj.appendChild(this.zoomInObj);
        this.minimizeObj = this.controlObj.appendChild(this.minimizeObj);
        this.maximizeObj = this.controlObj.appendChild(this.maximizeObj);
    }

    //title bar
    this.spanObj                         = document.createElement("span");

    this.spanObj.style.position          = "absolute";
    this.spanObj.style.left              = 0;
    this.spanObj.style.top               = 0;
    this.spanObj.style.width             = "100%";
//    this.spanObj.style.width             = adjustedInnerWidth - MASH_ArchivalGroup.getControlsWidth();
    this.spanObj.style.height            = MASH_ArchivalGroup.TITLE_HEIGHT;
    this.spanObj.style.zIndex            = 1;

    this.spanObj.style.color             = this.color;
    this.spanObj.style.fontFamily        = this.fontFamily;
    this.spanObj.style.fontSize          = this.fontSize;
    this.spanObj.style.fontWeight        = this.fontWeight;

    this.spanObj.style.backgroundColor   = this.borderColor;

    this.spanObj.style.verticalAlign     = "top";

    this.spanObj.innerHTML               = this.text;


    //inner object
    this.innerObj                        = document.createElement("div");

    this.innerObj.objectIndex            = i;
    this.innerObj.id                     = tmpObjInnerID;
    this.innerObj.wrapperObject          = this.wrapperObj;

    this.innerObj.width                  = adjustedInnerWidth;
    this.innerObj.height                 = adjustedInnerHeight;

    this.innerObj.style.position         = "absolute";
    this.innerObj.style.left             = "0px";
    this.innerObj.style.top              = MASH_ArchivalGroup.TITLE_HEIGHT;
    this.innerObj.style.width            = adjustedInnerWidth;
    this.innerObj.style.height           = adjustedInnerHeight;
    this.innerObj.style.zIndex           = 0;

    this.innerObj.style.backgroundColor    = this.backgroundColor;
    this.innerObj.style.backgroundImage    = this.backgroundImage;
    this.innerObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.innerObj.style.backgroundPosition = this.backgroundPosition;

    // Mozilla 1.4+, Netscape 7.1 and Firebird 0.6 have serious issues (BUGS) when executing the following line!!!!!!
    // - In Gecko 1.4 style.overflow is a read-only property! (so much for following the standards!!!)
    // Mozilla 1.3.1 an below work fine
    // now in Firefox 1.5 and higher works better (though not perfect)
    this.innerObj.style.overflow = "auto";

    //inner object contents
    this.collectionCounter = i;
    var componentObj;
    for(var k=0; k<this.components.length; k++) {

        if(this.components[k].MASHobjectType == MASH_Object.COLLECTION) {
            componentObj           = MASH_Object.createObject(this.components[k], (++this.collectionCounter) );
            this.collectionCounter = componentObj.collectionCounter;
        }
        else {  componentObj = MASH_Object.createObject(this.components[k], null ); }

        this.components[k].collection = this.innerObj;
        this.innerObj.appendChild(componentObj);
    }

    //append objects
    this.spanObj    = this.wrapperObj.appendChild(this.spanObj);
    this.controlObj = this.wrapperObj.appendChild(this.controlObj);
    this.innerObj   = this.wrapperObj.appendChild(this.innerObj);


    //cross reference the parameters with the screen object
    this.innerObj.MASHparameters   = this;
    this.wrapperObj.MASHparameters = this;
    this.reference                 = this.wrapperObj;

    //add event listeners
//    addEventListener(this.wrapperObj, "dblclick",  MASH_ArchivalGroup.maximizeCollectionEvent, false);
    addEventListener(this.spanObj,  "dblclick",  MASH_ArchivalGroup.maximizeCollectionEvent, false);
    addEventListener(this.innerObj, "scroll",    divScroll, false);//this event listener is needed in order to avoid "sticky" scrollbars

    return this.wrapperObj;

}//MASH_ArchivalGroup.prototype.createScreenObject



// MASH_ArchivalGroup.zoomInCollectionEvent                                     MASH_ArchivalGroup.zoomInCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * it is a wrapper over the function zoomObj in order to be able to call it as an event handler
MASH_ArchivalGroup.zoomInCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent    = validateEventObject(tmpEvent);
    var wrapperObj  = getCurrentTarget(tmpEvent);

    var obj         = wrapperObj.MASHparameters;
    var objIndex    = wrapperObj.objectIndex;

    //zoom in
    MASH_ArchivalGroup.zoomObject(objIndex, (4/3));
    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

    //zoom contents
    obj.zoomContents();

}//MASH_ArchivalGroup.zoomInCollectionEvent



// MASH_ArchivalGroup.zoomOutCollectionEvent                                   MASH_ArchivalGroup.zoomOutCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * zooms the contentest of a COLLECTION object
// * it is a wrapper over the function zoomObj in order to be able to call it as an event handler
MASH_ArchivalGroup.zoomOutCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent    = validateEventObject(tmpEvent);
    var wrapperObj  = getCurrentTarget(tmpEvent);

    var obj         = wrapperObj.MASHparameters;
    var objIndex    = wrapperObj.objectIndex;

    //zoom in
    MASH_ArchivalGroup.zoomObject(objIndex, (3/4));
    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

    //zoom contents
    obj.zoomContents();

}//MASH_ArchivalGroup.zoomOutCollectionEvent



// MASH_ArchivalGroup.prototype.zoomContents                                         MASH_ArchivalGroup.prototype.zoomContents
// ---------------------------------------------------------------------------------------------------------------------
// * zooms the contents of a COLLECTION object
MASH_ArchivalGroup.prototype.zoomContents = function(){

    //adjuste maximized children
    var adjustedWidth       = this.getInnerObjWidth(parseInt(this.wrapperObj.style.width));
    var adjustedHeight      = this.getInnerObjHeight(parseInt(this.wrapperObj.style.height));

    var adjustedInnerWidth  = parseInt(this.innerObj.style.width);
    var adjustedInnerHeight = parseInt(this.innerObj.style.height);

    for(var i=0; i<this.components.length; i++){

        if(this.components[i].maximized) {

            //compute new dimensions for children
            var childWidth       = adjustedInnerWidth;
            var childHeight      = adjustedInnerHeight;

            var childInnerWidth  = (childWidth  - (2*this.components[i].borderWidth) - 1) / this.components[i].scale;
            var childInnerHeight = (childHeight - (2*this.components[i].borderWidth) - 1 -MASH_ArchivalGroup.TITLE_HEIGHT) / this.components[i].scale;

            //resize child

            //resize the context layer and wrpper object
            this.components[i].resizeContextLayer(childWidth, childHeight);

            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = childWidth - (2*this.components[i].borderWidth) - MASH_ArchivalGroup.getControlsWidth();

            //zoom contents
            this.components[i].zoomContents();
        }

    }//for i

}//MASH_ArchivalGroup.prototype.zoomContents



// MASH_ArchivalGroup.minimizeCollectionEvent                                       MASH_ArchivalGroup.minimizeCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to minimizea COLLECTION object
// * it is a wrapper over the function minimizeCollection in order to be able to call it as an event handler
MASH_ArchivalGroup.minimizeCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent      = validateEventObject(tmpEvent);
    var wrapperObj    = getCurrentTarget(tmpEvent);
    var collectionObj = wrapperObj.MASHparameters;

    if(collectionObj.minimized) { collectionObj.normalize(); }//RESTORE object
    else                        { collectionObj.minimize();  }//MINIMIZE object

    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

}//MASH_ArchivalGroup.minimizeCollectionEvent



// MASH_ArchivalGroup.maximizeCollectionEvent                                       MASH_ArchivalGroup.maximizeCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to maximize 'into' a COLLECTION object
// * it is a wrapper over the function maximizeCollection in order to be able to call it as an event handler
MASH_ArchivalGroup.maximizeCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent      = validateEventObject(tmpEvent);
    var wrapperObj    = getCurrentTarget(tmpEvent);
    var collectionObj = wrapperObj.MASHparameters;


    if(collectionObj.maximized) { collectionObj.normalize(); }//RESTORE object
    else                        { collectionObj.maximize();  }//MAXIMIZE object

    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

}//MASH_ArchivalGroup.maximizeCollectionEvent



// MASH_ArchivalGroup.prototype.minimize                                                 MASH_ArchivalGroup.prototype.minimize
// ---------------------------------------------------------------------------------------------------------------------
// * minimizes this COLLECTION object
MASH_ArchivalGroup.prototype.minimize = function(){

    //validate conditions
    if(wasDragged) { return }

    //save (x,y)
    var tmpScrollLeft = parseInt(this.reference.style.left);
    var tmpScrollTop  = parseInt(this.reference.style.top);

    //allow the user to scroll
    enableScrollbarsControl();
    if(this.collection != null) { this.collection.style.overflow = "auto"; }
    else                        { showScrollbars(true);                    }

    //reposition this collection
    if(this.maximized) {
        //restore the coordinates for the normal-sized collection
        //  all this is because Netscape deos not support the .scrollIntoView() method
        tmpScrollLeft = this.normalLeft || parseInt(this.reference.style.left);
        tmpScrollTop  = this.normalTop  || parseInt(this.reference.style.top);
    }

    //set images
    this.minimizeObj.src = MASH_ArchivalGroup.CONTROLS_NORMALIZE_IMG_FILE;
    this.maximizeObj.src = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_FILE;

    //set the flags
    this.minimized       = true;
    this.maximized       = false;

    //relocate the collection controls
    this.wrapperObj.style.zIndex = ++topZ;
    this.controlObj.style.left   = this.width - (2*this.borderWidth) - MASH_ArchivalGroup.getControlsWidth();

    //compute the width and height
    var adjustedWidth    = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight   = this.getObjHeight(MASH_ArchivalGroup.TITLE_HEIGHT);

    //compute inner div dimensions
    var adjustedInnerWidth  = this.getInnerObjWidth(adjustedWidth);
    var adjustedInnerHeight = this.getInnerObjHeight(adjustedHeight);


    //compute the current dimensions and the required steps
    var currWidth  = parseInt(this.wrapperObj.style.width);
    var currHeight = parseInt(this.wrapperObj.style.height);

    var steps      = 10;
    var stepWidth  = parseInt((adjustedWidth  - currWidth)  / steps);
    var stepHeight = parseInt((adjustedHeight - currHeight) / steps);

    var currLeft   = parseInt(this.wrapperObj.style.left);
    var currTop    = parseInt(this.wrapperObj.style.top);

    var stepLeft   = parseInt((tmpScrollLeft - currLeft) / steps);
    var stepTop    = parseInt((tmpScrollTop  - currTop)  / steps);

    //adjust filters
    this.normal();

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

    //resize
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.resizeAnimation(" + currWidth           + "," +
                                                                                                             currHeight          + "," +
                                                                                                             stepWidth           + "," +
                                                                                                             stepHeight          + "," +
                                                                                                             adjustedWidth       + "," +
                                                                                                             adjustedHeight      + "," +
                                                                                                             adjustedInnerWidth  + "," +
                                                                                                             adjustedInnerHeight + "," +
                                                                                                             tmpScrollLeft       + "," +
                                                                                                             tmpScrollTop        + "," +
                                                                                                             stepLeft            + "," +
                                                                                                             stepTop             + ")", 100);

}//MASH_ArchivalGroup.prototype.minimize



// MASH_ArchivalGroup.prototype.normalize                                               MASH_ArchivalGroup.prototype.normalize
// ---------------------------------------------------------------------------------------------------------------------
// * resotores this colelction object to normal size
MASH_ArchivalGroup.prototype.normalize = function(){

    //validate conditions
    if(wasDragged) { return }

    //save (x,y)
    var tmpScrollLeft = this.normalLeft || parseInt(this.reference.style.left);
    var tmpScrollTop  = this.normalTop  || parseInt(this.reference.style.top);

    //reset normalLeft and normalTop
    this.normalLeft = undefined;
    this.normalTop  = undefined;

    //allow the user to scroll
    enableScrollbarsControl();
    if(this.collection != null) { this.collection.style.overflow = "auto"; }
    else                        { showScrollbars(true);                    }

    //set images
    this.minimizeObj.src = MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_FILE;
    this.maximizeObj.src = MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_FILE;

    //compute the width and height
    var adjustedWidth    = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight   = adjustSize(this.height, this.borderWidth);

    //compute the inner div dimensions
    var adjustedInnerWidth  = this.getInnerObjWidth(adjustedWidth);
    var adjustedInnerHeight = this.getInnerObjHeight(adjustedHeight);

    //if it's restoring a minimized collection, then adjust the innerObj first in order to have a better display of the information inside
    if(this.minimized) {
        this.innerObj.style.width  = adjustedInnerWidth;
        this.innerObj.style.height = adjustedInnerHeight;
     }//if(!this.minimized)

    //adjust maximized children
    this.normalizeMaximizedChildren(adjustedInnerWidth, adjustedInnerHeight);

    //set the flags
    this.minimized       = false;
    this.maximized       = false;


    //relocate controls and adjust Zindex
    this.wrapperObj.style.zIndex = ++topZ;
    this.controlObj.style.left   = this.width - (2*this.borderWidth) - MASH_ArchivalGroup.getControlsWidth();

    //compute the current dimensions and the required steps
    var currWidth  = parseInt(this.wrapperObj.style.width);
    var currHeight = parseInt(this.wrapperObj.style.height);

    //compute required steps
    var steps      = 10;
    var stepWidth  = parseInt((adjustedWidth  - currWidth)  / steps);
    var stepHeight = parseInt((adjustedHeight - currHeight) / steps);

    var currLeft   = parseInt(this.wrapperObj.style.left);
    var currTop    = parseInt(this.wrapperObj.style.top);

    var stepLeft   = parseInt((tmpScrollLeft - currLeft) / steps);
    var stepTop    = parseInt((tmpScrollTop  -currTop)   / steps);

    //adjust filters
    this.normal();

    //resize
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.resizeAnimation(" + currWidth           + "," +
                                                                                                             currHeight          + "," +
                                                                                                             stepWidth           + "," +
                                                                                                             stepHeight          + "," +
                                                                                                             adjustedWidth       + "," +
                                                                                                             adjustedHeight      + "," +
                                                                                                             adjustedInnerWidth  + "," +
                                                                                                             adjustedInnerHeight + "," +
                                                                                                             tmpScrollLeft       + "," +
                                                                                                             tmpScrollTop        + "," +
                                                                                                             stepLeft            + "," +
                                                                                                             stepTop             + ")", 100);

}//MASH_ArchivalGroup.prototype.normalize



// MASH_ArchivalGroup.prototype.maximize                                                 MASH_ArchivalGroup.prototype.maximize
// ---------------------------------------------------------------------------------------------------------------------
// * maximizes 'into' this COLLECTION object
MASH_ArchivalGroup.prototype.maximize = function(){

    //validate conditions
    if(wasDragged) { return }


    var tmpScrollLeft = 0;
    var tmpScrollTop  = 0;

    enableScrollbarsControl();

    //check if this collection has a parent collection
    if(this.collection != null) {

        //prevent parent collection from showing scrollbars
        this.collection.style.overflow = "hidden";

        //dimensions are defined by the parent collection
        var totalWidth  = parseInt(this.collection.style.width);
        var totalHeight = parseInt(this.collection.style.height);

        tmpScrollLeft = 0;
        tmpScrollTop  = 0;
    }
    else {
        //prevent browser window from showing scrollbars
        showScrollbars(false);

        //dimensions are defined by the browser window
        // - be carefyk wuith the scrollbars, since the getWindow will substract the scrollbars dimensions
        //   Hence hiding the scrollbars must be done before getting the available window space
        totalWidth  = getWindowWidth();
        totalHeight = getWindowHeight();

    }

    //set the button images
    this.minimizeObj.src = MASH_ArchivalGroup.CONTROLS_MINIMIZE_IMG_FILE;
    this.maximizeObj.src = MASH_ArchivalGroup.CONTROLS_NORMALIZE_IMG_FILE;

    //save and set the coordinates for the maximized collection
    //  all this is because Netscape deos not support the .scrollIntoView() method
    if(!this.normalLeft) { this.normalLeft = parseInt(this.reference.style.left); }
    if(!this.normalTop)  { this.normalTop  = parseInt(this.reference.style.top);  }

    //comptue the new dimensions
    var adjustedWidth       = adjustSize(totalWidth,  this.borderWidth);
    var adjustedHeight      = adjustSize(totalHeight, this.borderWidth);

    var adjustedInnerWidth  = this.getInnerObjWidth(totalWidth);
    var adjustedInnerHeight = this.getInnerObjHeight(totalHeight);

    //reposition controls and adjust Zindex
    this.wrapperObj.style.zIndex = ++topZ;
    this.controlObj.style.left   = totalWidth - (2*this.borderWidth) - MASH_ArchivalGroup.getControlsWidth();

    //if it's maximizing, then adjust the innerObj first in order to have a better display of the information inside
    if(!this.maximized) {
        this.innerObj.style.width    = adjustedInnerWidth;
        this.innerObj.style.height   = adjustedInnerHeight;
    }

    //adjust maximized children
    this.maximizeMaximizedChildren(adjustedInnerWidth, adjustedInnerHeight);

    //set the flags
    this.minimized       = false;
    this.maximized       = true;


    //compute current dimensions
    var currWidth  = parseInt(this.wrapperObj.style.width);
    var currHeight = parseInt(this.wrapperObj.style.height);

    //compute required steps
    var steps      = 10;
    var stepWidth  = parseInt((adjustedWidth  - currWidth)  / steps);
    var stepHeight = parseInt((adjustedHeight - currHeight) / steps);

    //check to see if the destination area is smaller
    //  if so, resize in one step
    //    (stepWidth = 0 and stepHeight = 0 will trigger the termination of the animation and will set the proper size)
    //  this is  because the naimation makes no sense, as it will be invisible
    if((adjustedWidth <= currWidth) &&
       (adjustedWidth <= currWidth) ){

        stepWidth  = 0;
        stepHeight = 0;
    }


    var currLeft   = parseInt(this.wrapperObj.style.left);
    var currTop    = parseInt(this.wrapperObj.style.top);

    var stepLeft   = parseInt((tmpScrollLeft - currLeft) / steps);
    var stepTop    = parseInt((tmpScrollTop  -currTop)   / steps);

    //adjust filters
    this.normal();

    //resize
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.resizeAnimation(" + currWidth           + "," +
                                                                                                             currHeight          + "," +
                                                                                                             stepWidth           + "," +
                                                                                                             stepHeight          + "," +
                                                                                                             adjustedWidth       + "," +
                                                                                                             adjustedHeight      + "," +
                                                                                                             adjustedInnerWidth  + "," +
                                                                                                             adjustedInnerHeight + "," +
                                                                                                             tmpScrollLeft       + "," +
                                                                                                             tmpScrollTop        + "," +
                                                                                                             stepLeft            + "," +
                                                                                                             stepTop             + ")", 100);

}//MASH_ArchivalGroup.prototype.maximize


// MASH_ArchivalGroup.prototype.normalizeMaximizedChildren             MASH_ArchivalGroup.prototype.normalizeMaximizedChildren
// ---------------------------------------------------------------------------------------------------------------------
// * newWidth and newHeight are optional parameters
MASH_ArchivalGroup.prototype.normalizeMaximizedChildren = function(newWidth, newHeight){

    //compute the inner div dimensions
    var adjustedInnerWidth  = newWidth  || this.width;
    var adjustedInnerHeight = newHeight || this.height;

    for(var i=0; i<this.components.length; i++){

        if(this.components[i].maximized) {

            //compute new dimensions for children
            var childWidth       = adjustedInnerWidth;
            var childHeight      = adjustedInnerHeight;

            var childInnerWidth  = (adjustedInnerWidth  - (2*this.components[i].borderWidth));
            var childInnerHeight = (adjustedInnerHeight - (2*this.components[i].borderWidth) - MASH_ArchivalGroup.TITLE_HEIGHT);

            if(childInnerWidth  <= 0) { childInnerWidth  = 1; }
            if(childInnerHeight <= 0) { childInnerHeight = 1; }

            //resize child
            this.components[i].wrapperObj.style.width  = adjustedInnerWidth;
            this.components[i].wrapperObj.style.height = adjustedInnerHeight;

            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = adjustedInnerWidth - (2*this.components[i].borderWidth) - MASH_ArchivalGroup.getControlsWidth();

            //recursively adjust maximized inner children
            this.components[i].normalizeMaximizedChildren(childInnerWidth, childInnerHeight);
        }

    }//for i


}//MASH_ArchivalGroup.prototype.normalizeMaximizedChildren



// MASH_ArchivalGroup.prototype.maximizeMaximizedChildren               MASH_ArchivalGroup.prototype.maximizeMaximizedChildren
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.prototype.maximizeMaximizedChildren = function(newWidth, newHeight){

/*
    //check if this collection has a parent collection
    if(this.collection != null) {

        //dimensions are defined by the parent collection
        var availableWidth  = parseInt(this.collection.style.width);
        var availableHeight = parseInt(this.collection.style.height);
    }
    else {
        //dimensions are defined by the browser window
        availableWidth  = getWindowWidth();
        availableHeight = getWindowHeight();
    }
*/

    //compute the inner div dimensions
    var totalWidth  = newWidth  || parseInt(this.collection.style.width);
    var totalHeight = newHeight || parseInt(this.collection.style.height);

    //compute the area available for the collection
    var adjustedInnerWidth   = totalWidth;
    var adjustedInnerHeight  = totalHeight;

    //adjust maximized children
    for(var i=0; i<this.components.length; i++){

        if(this.components[i].maximized) {

            //compute new dimensions for children
            var childWidth       = adjustedInnerWidth;
            var childHeight      = adjustedInnerHeight;

            var childInnerWidth  = (childWidth  - (2*this.components[i].borderWidth));
            var childInnerHeight = (childHeight - (2*this.components[i].borderWidth) - MASH_ArchivalGroup.TITLE_HEIGHT);

            if(childInnerWidth  <= 0) { childInnerWidth  = 1; }
            if(childInnerHeight <= 0) { childInnerHeight = 1; }

            //resize child

            //resize the context layer and wrpper object
            this.components[i].resizeContextLayer(childWidth, childHeight);
            this.components[i].wrapperObj.style.width  = adjustedInnerWidth;
            this.components[i].wrapperObj.style.height = adjustedInnerHeight;

            //resize inner object
            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = adjustedInnerWidth - (2*this.components[i].borderWidth) - MASH_ArchivalGroup.getControlsWidth();

            //recursively adjust maximized inner children
            this.components[i].maximizeMaximizedChildren(childInnerWidth, childInnerHeight);
        }

    }//for i


}//MASH_ArchivalGroup.prototype.maximizeMaximizedChildren



// MASH_ArchivalGroup.prototype.resizeAnimation                                   MASH_ArchivalGroup.prototype.resizeAnimation
// ---------------------------------------------------------------------------------------------------------------------
// * animates the navigation 'into' or 'out of' this COLLECTION object
MASH_ArchivalGroup.prototype.resizeAnimation = function(currWidth,          currHeight,
                                                     stepWidth,          stepHeight,
                                                     adjustedWidth,      adjustedHeight,
                                                     adjustedInnerWidth, adjustedInnerHeight,
                                                     tmpScrollLeft,      tmpScrollTop,
                                                     stepLeft,           stepTop){

    var newWidth  = currWidth  + stepWidth;
    var newHeight = currHeight + stepHeight;

    var currLeft  = parseInt(this.wrapperObj.style.left);
    var currTop   = parseInt(this.wrapperObj.style.top);
    var newLeft   = currLeft + stepLeft;
    var newTop    = currTop  + stepTop;

    //scroll to the object
    if(this.collection != null) {
        //reposition the object so it used the whole space available inside the container div
        //  all this is because Netscape deos not support the .scrollIntoView() method
        //  Therefore instead of scrolling, it is necessary to reposition the object!!
//        this.wrapperObj.style.left = tmpScrollLeft;
//        this.wrapperObj.style.top  = tmpScrollTop;

        if(( (stepLeft > 0) && (newLeft < tmpScrollLeft) ) ||
           ( (stepLeft < 0) && (newLeft > tmpScrollLeft) ) ){
            this.wrapperObj.style.left = newLeft;
        }
        if(( (stepTop > 0) && (newTop < tmpScrollTop) ) ||
           ( (stepTop < 0) && (newTop > tmpScrollTop) ) ){
            this.wrapperObj.style.top  = newTop;
        }

    }
    else {
        var windowLeft = parseInt(this.wrapperObj.style.left);
        var windowTop  = parseInt(this.wrapperObj.style.top);
        window.scrollTo(windowLeft, windowTop);
    }


    //reset termination flags
    var reachedDesiredWidth  = false;
    var reachedDesiredHeight = false;

    //if the width is already adjusted then keep it
    if(( (stepWidth >= 0) && (newWidth >= adjustedWidth) ) ||
       ( (stepWidth <= 0) && (newWidth <= adjustedWidth) ) ){

        newWidth                     = adjustedWidth;
        this.wrapperObj.style.width  = adjustedWidth;
        this.innerObj.style.width    = adjustedInnerWidth;
        reachedDesiredWidth          = true;
    }

    //if the height is already adjusted then keep it
    if(( (stepHeight >= 0) && (newHeight >= adjustedHeight) ) ||
       ( (stepHeight <= 0) && (newHeight <= adjustedHeight) ) ){

        newHeight                    = adjustedHeight;
        this.wrapperObj.style.height = adjustedHeight;
        this.innerObj.style.height   = adjustedInnerHeight;
        reachedDesiredHeight         = true;
    }

    //if both width and height are adjusted then return
    if((reachedDesiredWidth == true)  && (reachedDesiredHeight == true) ){

        //resize the context layer
        this.resizeContextLayer(adjustedWidth, adjustedHeight);

        this.innerObj.style.width    = adjustedInnerWidth;
        this.innerObj.style.height   = adjustedInnerHeight;

        if(this.collection != null) {
            this.wrapperObj.style.left   = tmpScrollLeft;
            this.wrapperObj.style.top    = tmpScrollTop;
        }

        //fire a MASH event that is used in case of relationships
        if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

        //call zoomContents() in order to ensure that all components display properly
        this.zoomContents();

        if(!this.collection) {
            //scroll to the object
            var windowLeft  = parseInt(this.wrapperObj.style.left);
            var windowTop   = parseInt(this.wrapperObj.style.top);
            window.scrollTo(windowLeft, windowTop);
        }

        //fire a MASH event that is used in case of relationships
        if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

        return;
    }

    if(newWidth  <=0) { newWidth  = 1; }
    if(newHeight <=0) { newHeight = 1; }

    //resize
    this.wrapperObj.style.width  = newWidth;
    this.wrapperObj.style.height = newHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

    //reset timeout
    window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.resizeAnimation(" + newWidth            + "," +
                                                                                                             newHeight           + "," +
                                                                                                             stepWidth           + "," +
                                                                                                             stepHeight          + "," +
                                                                                                             adjustedWidth       + "," +
                                                                                                             adjustedHeight      + "," +
                                                                                                             adjustedInnerWidth  + "," +
                                                                                                             adjustedInnerHeight + "," +
                                                                                                             tmpScrollLeft       + "," +
                                                                                                             tmpScrollTop        + "," +
                                                                                                             stepLeft            + "," +
                                                                                                             stepTop             + ")", 100);

}//MASH_ArchivalGroup.prototype.resizeAnimation



// MASH_ArchivalGroup.prototype.getInternalMouseCoords                     MASH_ArchivalGroup.prototype.getInternalMouseCoords
// ---------------------------------------------------------------------------------------------------------------------
// objDrag                = object being dragged
// tmpSourceX, tmpSourceY = position of the click
// tmpOffX, tmpOffY       = position of this collection relative to the parent coordinate system
MASH_ArchivalGroup.prototype.getInternalMouseCoords = function(objDrag, tmpSourceX, tmpSourceY, tmpOffX, tmpOffY, tmpScale) {

    var i;

    //init the results array
    var results = new Array(3);
    results[0]  = null; // reference to destination collection
    results[1]  = 0;    // left
    results[2]  = 0;    // top

    //avoid trying to transfer a collection into itself!!
    if(this.reference == objDrag) { return results; }

    var innerScrollX    = this.innerObj.scrollLeft;
    var innerScrollY    = this.innerObj.scrollTop;

    //determine the coordinates of the rectangular area of the collection
    var tmpWinLeft      = (tmpScale * parseInt(this.reference.style.left)) + tmpOffX;
    var tmpWinTop       = (tmpScale * parseInt(this.reference.style.top))  + tmpOffY;
    var tmpWinWidth     = (tmpScale * parseInt(this.reference.style.width));
    var tmpWinHeight    = (tmpScale * parseInt(this.reference.style.height));


    //if it's over this collection
    if( (tmpSourceX >= tmpWinLeft) && (tmpSourceX <= (tmpWinLeft + tmpWinWidth)  ) &&
        (tmpSourceY >= tmpWinTop ) && (tmpSourceY <= (tmpWinTop  + tmpWinHeight) ) ){

        //compute the new offset required to update the position of objDrag relative to the collection inner coordinate system
        var newX = parseInt(this.reference.style.left) + parseInt(this.innerObj.style.left) + parseInt(this.reference.style.borderWidth) - innerScrollX;
        var newY = parseInt(this.reference.style.top)  + parseInt(this.innerObj.style.top)  + parseInt(this.reference.style.borderWidth) - innerScrollY;

        newX *= tmpScale;
        newY *= tmpScale;

        //set results
        results[0] = this;                        // reference to destination collection
        results[1] = newX;                        // left
        results[2] = newY;                        // top

        //check for nested collections
        var nestedResults;
        for(i=0; i<this.components.length; i++) {
            var tmpCollection = this.components[i];

            //ignore everything except collections
            if(tmpCollection.MASHobjectType != MASH_Object.COLLECTION) { continue; }

            //ajust the offset to pass it to other nested collection
            tmpOffX   = tmpWinLeft + tmpScale * (parseInt(this.innerObj.style.left) + parseInt(this.reference.style.borderWidth) - innerScrollX);
            tmpOffY   = tmpWinTop  + tmpScale * (parseInt(this.innerObj.style.top)  + parseInt(this.reference.style.borderWidth) - innerScrollY);

            //check if it's over a nested collection
            nestedResults = tmpCollection.getInternalMouseCoords(objDrag, tmpSourceX, tmpSourceY, tmpOffX, tmpOffY, tmpScale*this.scale);

            //if it was over a nested collection, update results
            if(nestedResults[0]!=null) {
                results[0]  = nestedResults[0];
                results[1] += nestedResults[1];
                results[2] += nestedResults[2];
                break;
            }
        }//check for nested collections

    }//if it's over this collection

    return results;


}// MASH_ArchivalGroup.prototype.getInternalMouseCoords



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_ArchivalGroup.prototype.editText                                                 MASH_ArchivalGroup.prototype.editText
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.prototype.editText = function() {

    this.text              = prompt("Please enter the annotation text", this.text);
    this.spanObj.innerHTML = this.text;

}//MASH_ArchivalGroup.prototype.editText






// MASH_ArchivalGroup.prototype.toString                                                 MASH_ArchivalGroup.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.prototype.toString = function() {

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

    returnString += "components\n";
    for(var i=0; i<this.components.length; i++) {
        returnString += "\t" + this.components[i].id + "\t" +  this.components[i].MASHobjectType + "\n";
    }
    returnString += "\n";

    returnString += "behaviors\n";
    for(var i=0; i<this.behaviors.length; i++) {
        returnString += "\t" + this.behaviors[i].type + "\n";
    }

/*
    for(var prop in this) {
        if( (typeof this[prop] == "string")  ) {
            returnString += prop + " = " + this[prop] + "\n";
        }
    }
*/
    returnString += "\n---------------------------------------------------------------------------\n";

    return returnString;

}//MASH_ArchivalGroup.prototype.toString


// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================





// MASH_ArchivalGroup.zoomObject                                                                 MASH_ArchivalGroup.zoomObject
// ---------------------------------------------------------------------------------------------------------------------
// *** THIS ONLY WORKS IN IE ***
MASH_ArchivalGroup.zoomObject = function(objID, factor){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        return;
    }

    //IE                                                                                                          IE
    else if(isIE)  {
        //update zoom factor for the specific frame
        collectionObjects[objID].scale = collectionObjects[objID].scale * factor;

        //the reload event must rezoom for the iframe
        var wrapperObjWidth             = parseInt(collectionObjects[objID].wrapperObj.style.width);
        var wrapperObjHeight            = parseInt(collectionObjects[objID].wrapperObj.style.height);
        var wrapperObjBorder            = parseInt(collectionObjects[objID].wrapperObj.style.borderWidth);
        var adjustedInnerWidth          = (wrapperObjWidth  - (wrapperObjBorder*2)) / collectionObjects[objID].scale;
        var adjustedInnerHeight         = (wrapperObjHeight - (wrapperObjBorder*2) - MASH_ArchivalGroup.TITLE_HEIGHT) / collectionObjects[objID].scale;

        //validate values
        if(adjustedInnerWidth  < 1) { adjustedInnerWidth  = 1; }
        if(adjustedInnerHeight < 1) { adjustedInnerHeight = 1; }

        collectionObjects[objID].innerObj.width        = adjustedInnerWidth;
        collectionObjects[objID].innerObj.height       = adjustedInnerHeight;
        collectionObjects[objID].innerObj.style.width  = adjustedInnerWidth;
        collectionObjects[objID].innerObj.style.height = adjustedInnerHeight;
        collectionObjects[objID].innerObj.style.zoom   = collectionObjects[objID].scale;
    }

}//MASH_ArchivalGroup.zoomObject



// MASH_ArchivalGroup.getControlsWidth                                               MASH_ArchivalGroup.getControlsWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.getControlsWidth = function(){

    if(isNetscape) { return ((MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH)*2); }
    else if(isIE)  { return ((MASH_ArchivalGroup.CONTROLS_MAXIMIZE_IMG_WIDTH)*4); }

}//MASH_Frame.getControlsWidth





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_ArchivalGroup.XML_TAG_OBJECT      = MASH_Object.COLLECTION;
MASH_ArchivalGroup.XML_TAG_TEXT        = "text";
MASH_ArchivalGroup.XML_TAG_COMPONENTS  = "components";


//Default values for User Readings open in collections
MASH_ArchivalGroup.USER_READING_LEFT   = 10;
MASH_ArchivalGroup.USER_READING_TOP    = 100;
MASH_ArchivalGroup.USER_READING_WIDTH  = 600;
MASH_ArchivalGroup.USER_READING_HEIGHT = 400;
MASH_ArchivalGroup.USER_READING_STYLE = "align:left; vertical-align:top; background-color:#ffffff; border-width:2; border-color:#222222; border-style:solid; background-image:none; color:#ffffff; font-family:Arial; font-size:13pt; font-weight:bold; ";



// MASH_ArchivalGroup.xmlCreateCollectionWithMASHDocument         MASH_ArchivalGroup.xmlCreateCollectionWithMASHDocument
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.xmlCreateCollectionWithMASHDocument = function(xmlString){

//    alert("MASH_FileManager.xmlCreateMASHDocumentInCollection()");

    //validate parameters
    if( (!xmlString) && (xmlString.length<=0) ) { return null; }

    //get document element and parse it
    var documentNode   = MASH_Object.xmlGetDocumentElement(xmlString);
    var parsedDocument = MASH_Object.xmlParseDocumentNode(documentNode);


    //write all document properties
//    documentName = parsedDocument.properties.documentName;
    topZ         = parsedDocument.properties.topZ;

    //update every object's id in order to avoid duplication of id's
    for(var i=0; i<parsedDocument.objects.length; i++){
        parsedDocument.objects[i].id += MASH_Object.getUniqueID();
    }

    //create a new collection that includes the objects in the parsed document
    var collectionTitle  = parsedDocument.properties.documentName;
    var collectionName   = MASH_Object.COLLECTION + "[" + collectionObjects.length + "]" + MASH_Object.USER_READING;
    var collectionLeft   = MASH_ArchivalGroup.USER_READING_LEFT;
    var collectionTop    = MASH_ArchivalGroup.USER_READING_TOP;
    var collectionWidth  = MASH_ArchivalGroup.USER_READING_WIDTH;
    var collectionHeight = MASH_ArchivalGroup.USER_READING_HEIGHT;
    var collectionStyle  = MASH_ArchivalGroup.USER_READING_STYLE;
    var newCollection    = new MASH_ArchivalGroup(collectionName, collectionLeft, collectionTop, collectionWidth, collectionHeight, topZ,
                                               collectionStyle,
                                               collectionTitle,
                                               parsedDocument.objects
                                              );

    //write new collection
    var tmpObj = MASH_Object.createObject(newCollection, null);
    //push object in the general object array
    allMASHObjects.push(newCollection);

    //write all relationships
    // ***** TO BE IMPLEMENTED *****



}//MASH_ArchivalGroup.xmlCreateCollectionWithMASHDocument



// MASH_ArchivalGroup.prototype.getTypeSpecificXML                       MASH_ArchivalGroup.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_ArchivalGroup.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }


    //get the tags for the objects inside this collection
    var componentsXML = "";
    for(var i=0; i<this.components.length; i++) {
        componentsXML += this.components[i].toXML();
    }

    //make XML tags
    var objectXML = MASH_Object.xmlMakeTagSingleLine(MASH_ArchivalGroup.XML_TAG_TEXT,       this.text,     false,  indent);
    objectXML    += MASH_Object.xmlMakeTagMultiLine( MASH_ArchivalGroup.XML_TAG_COMPONENTS, componentsXML, false, indent);

    return objectXML;

}//MASH_ArchivalGroup.prototype.getTypeSpecificXML



// MASH_ArchivalGroup.xmlParseObjectNode                                           MASH_ArchivalGroup.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_ArchivalGroup.xmlParseObjectNode = function(node){

//    alert("MASH_ArchivalGroup.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.COLLECTION;

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
    var objComponents         = new Array();

    //analyze the XML node
    for(var i=0; i<node.childNodes.length; i++) {

        var child      = node.childNodes[i];
        var childName  = child.nodeName;
        var childValue = child.nodeValue;

        //ignore #text nodes
        var xmlTextField = new RegExp(/\s*#text/);
        if( (!childName) || (childName.match(xmlTextField)) ) { continue; }

        //parse generic object parameters
        else if(childName == MASH_Object.XML_TAG_TYPE)    { objType   = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_ID)      { objID     = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_LEFT)    { objLeft   = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_TOP)     { objTop    = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_WIDTH)   { objWidth  = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_HEIGHT)  { objHeight = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_Z_INDEX) { objZIndex = MASH_Object.xmlParseNodeText(child);       }
        else if(childName == MASH_Object.XML_TAG_STYLE)   { objStyle  = MASH_Object.xmlParseStyleNode(child); }

        //parse paremers specific to this kind of object
        else if(childName == MASH_ArchivalGroup.XML_TAG_TEXT)       { objText       = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_ArchivalGroup.XML_TAG_COMPONENTS) { objComponents = MASH_Object.xmlParseMASH_Objects(child); }
    }

    //declare object
    var obj = new MASH_ArchivalGroup(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                                  objText, objComponents);

    return obj;

}//MASH_ArchivalGroup.xmlParseObjectNode




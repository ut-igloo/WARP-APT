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
// MASH_Collection                                                                                       MASH_Collection
// =====================================================================================================================
function MASH_Collection(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                         tmpText, tmpComponents) {

    this.base = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle);

    this.text                       = tmpText;
    this.components                 = tmpComponents;
    this.maximized                  = false;
    this.minimized                  = false;
    this.scale                      = 1.0;

    this.MASHobjectType             = MASH_Object.COLLECTION;

    this.collectionCounter          = -1;

    this.controlObj                 = null;
    this.spanObj                    = null;
    this.innerObj                   = null;

    //context menu
    this.defaultContextMenuString   = "<hr>\n" +
                                      "<span onclick=\"otherObjects[0].targetObj.explode(); otherObjects[0].close();\" style=\"color:550000; text-decoration:none;\">Explode</span><br>\n";
    this.contextMenuString          = this.defaultContextMenuString;

    //This is used in order to iherit the controls for MASH_Video objects when inserted in the collection
    this.componentsContainVideos    = false;
    this.componentsVideoControls    = "<span onclick=\"findObjectByID('"+this.id+"').playAllVideos();\"  style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_PLAY_IMG_FILENAME           +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Play All Videos</span><br>\n" +
                                      "<span onclick=\"findObjectByID('"+this.id+"').pauseAllVideos();\" style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_PAUSE_IMG_FILENAME          +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Pause All Videos</span><br>\n"+
                                      "<span onclick=\"findObjectByID('"+this.id+"').indexAllVideos();\" style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_INDEX_POSITION_IMG_FILENAME +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Index All Videos</span><br>\n"+
                                      "<span onclick=\"findObjectByID('"+this.id+"').indexAllVideos();\" style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_INDEX_TIME_IMG_FILENAME     + "\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Index Time</span><br>\n"  ;

    //XML
    this.xmlObjectTag = MASH_Collection.XML_TAG_OBJECT;

}
//set inheritance
MASH_Collection.prototype                     = new MASH_Object("MASH_Collection",0,0,1,1,0,"");
MASH_Collection.prototype.constructor         = MASH_Collection;
//MASH_Collection

//Constants
MASH_Collection.COOKIE_NAME                   = "mash_collections";
MASH_Collection.INNER_ID_PREFIX               = "collectionObj";
MASH_Collection.ID_PREFIX                     = MASH_Object.ID_PREFIX + MASH_Collection.INNER_ID_PREFIX;
MASH_Collection.CONTROLS_ID_PREFIX            = MASH_Collection.INNER_ID_PREFIX + "Controls";

MASH_Collection.TITLE_HEIGHT                  = 20; //pixel height of the title bar of a frame object
MASH_Collection.CONTROLS_MAXIMIZE_IMG_ID      = "imgMaximizeCollection"
MASH_Collection.CONTROLS_MINIMIZE_IMG_ID      = "imgMinimizeCollection"
MASH_Collection.CONTROLS_ZOOM_IN_IMG_ID       = "imgZoomInCollection";
MASH_Collection.CONTROLS_ZOOM_OUT_IMG_ID      = "imgZoomOutCollection";

MASH_Collection.CONTROLS_MAXIMIZE_IMG_TITLE   = "Maximize"
MASH_Collection.CONTROLS_MINIMIZE_IMG_TITLE   = "Minimize"
MASH_Collection.CONTROLS_ZOOM_IN_IMG_TITLE    = "Zoom In";
MASH_Collection.CONTROLS_ZOOM_OUT_IMG_TITLE   = "Zoom Out";

//MASH_Collection.CONTROLS_IMG_DIR              = "mash_images/";
MASH_Collection.CONTROLS_IMG_DIR              = "http://denali.ischool.utexas.edu/~revilla/WARP/mash_images/";


MASH_Collection.CONTROLS_MAXIMIZE_IMG_FILE    = MASH_Collection.CONTROLS_IMG_DIR + "maximize.png";
MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH   = 16;
MASH_Collection.CONTROLS_MAXIMIZE_IMG_HEIGHT  = 16;
MASH_Collection.CONTROLS_NORMALIZE_IMG_FILE   = MASH_Collection.CONTROLS_IMG_DIR + "normalize.png";
MASH_Collection.CONTROLS_MINIMIZE_IMG_FILE    = MASH_Collection.CONTROLS_IMG_DIR + "minimize.png";
MASH_Collection.CONTROLS_ZOOM_OUT_IMG_FILE    = MASH_Collection.CONTROLS_IMG_DIR + "zoomOutPage.png";
MASH_Collection.CONTROLS_ZOOM_IN_IMG_FILE     = MASH_Collection.CONTROLS_IMG_DIR + "zoomInPage.png";


// MASH_Collection.clone                                                                           MASH_Collection.clone
// ---------------------------------------------------------------------------------------------------------------------
// * This needs to clone the compnents as well
//   - by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Collection.clone = function(originalObj) {

    //clone all components
    var clonedComponents = new Array();
    for(var i=0; i<originalObj.components.length; i++) {
        clonedComponents[i] = MASH_Object.clone(originalObj.components[i]);
    }

    //clone container
    var cloneObj = new MASH_Collection(originalObj.id, originalObj.left, originalObj.top, originalObj.width, originalObj.height, originalObj.zIndex,
                                       originalObj.style,
                                       originalObj.text, clonedComponents);
    return cloneObj;
}//MASH_Collection.clone



// MASH_Collection.prototype.clone                                                       MASH_Collection.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
// this needs to clone the compnents as well
MASH_Collection.prototype.clone = function() {
    return MASH_Collection.clone(this);
}//MASH_Collection.prototype.clone



// MASH_Collection.prototype.findObjectByID                                     MASH_Collection.prototype.findObjectByID
// ---------------------------------------------------------------------------------------------------------------------
// * searchs for a MASH object with the specified ID
// * return the MASH objecti if it's found
// * return null if it's nmot found
//   (this is a depth-first search)
MASH_Collection.prototype.findObjectByID = function(tmpID) {

    for(var i=0; i<this.components.length; i++){

        //search in components
        if(this.components[i].id == tmpID) { return this.components[i]; }

        //search inside components
        if(this.components[i].components) {
            var objFound = this.components[i].findObjectByID(tmpID);
            if(objFound != null) {
                return objFound;
            }
        }
    }//for i

    //if it didn't find it, return null
    return null;

}//MASH_Collection.prototype.findObjectByID



// MASH_Collection.prototype.removeComponent                                   MASH_Collection.prototype.removeComponent
// ---------------------------------------------------------------------------------------------------------------------
// * searchs and removes a tmpObj from the components array of this Collection
MASH_Collection.prototype.removeComponent = function(tmpObj) {

    for(var i=0; i<this.components.length; i++) {
        if(this.components[i] == tmpObj) {
            this.components.splice(i,1);
            return true;
        }
    }

    //update the context menu if need be
    this.updateControlInheritance();

    return false;

}//MASH_Collection.prototype.removeComponent



// MASH_Collection.prototype.addComponent                                         MASH_Collection.prototype.addComponent
// ---------------------------------------------------------------------------------------------------------------------
// * adds tmpObj to the components array of this Collection
MASH_Collection.prototype.addComponent = function(tmpObj) {

    this.components.push(tmpObj);

    //inherit the components controls if need be
    this.inheritControls(tmpObj);

}//MASH_Collection.prototype.addComponent



// MASH_Collection.prototype.inheritControls                                   MASH_Collection.prototype.inheritControls
// ---------------------------------------------------------------------------------------------------------------------
// * adds tmpObj to the components array of this Collection
MASH_Collection.prototype.inheritControls = function(tmpObj) {

    //check for videos in order to inherit their controls
    if(tmpObj.MASHobjectType == MASH_Object.VIDEO) {

        //update context menu
        if(this.componentsContainVideos == false) { this.contextMenuString += this.componentsVideoControls; }
        this.componentsContainVideos = true;
    }

}//MASH_Collection.prototype.inheritControls



// MASH_Collection.prototype.updateControlInheritance                 MASH_Collection.prototype.updateControlInheritance
// ---------------------------------------------------------------------------------------------------------------------
// * adds tmpObj to the components array of this Collection
MASH_Collection.prototype.updateControlInheritance = function() {

    //reset contextMenu to the default
    this.contextMenuString = this.defaultContextMenuString;

    //check if this collection still needs to have global controls for its components
    var needsVideoControls = false;
    for(var i=0; i < this.components.length; i++) {
        var tmpObj = this.components[i];
        if(tmpObj.MASHobjectType == MASH_Object.VIDEO) {
            needsVideoControls = true;
        }
    }

    //update contextMenu with appropriate global controls
    if(needsVideoControls == true) {
        this.contextMenuString += this.componentsVideoControls;
    }

}//MASH_Collection.prototype.updateControlInheritance



// MASH_Collection.prototype.playAllVideos                                       MASH_Collection.prototype.playAllVideos
// ---------------------------------------------------------------------------------------------------------------------
// * this function is added to the collection's context menu when a MASH_Video object is included inside the collection
// * sends a play message to all the MASH_Video objects inside this Collection
MASH_Collection.prototype.playAllVideos = function(tmpObj) {

    for(var i=0; i<this.components.length; i++) {
        var tmpObj = this.components[i];
        if(tmpObj.MASHobjectType == MASH_Object.VIDEO) {
            tmpObj.play();
        }
    }

}//MASH_Collection.prototype.playAllVideos



// MASH_Collection.prototype.pauseAllVideos                                     MASH_Collection.prototype.pauseAllVideos
// ---------------------------------------------------------------------------------------------------------------------
// * this function is added to the collection's context menu when a MASH_Video object is included inside the collection
// * sends a pause message to all the MASH_Video objects inside this Collection
MASH_Collection.prototype.pauseAllVideos = function(tmpObj) {

    for(var i=0; i<this.components.length; i++) {
        var tmpObj = this.components[i];
        if(tmpObj.MASHobjectType == MASH_Object.VIDEO) {
            tmpObj.pause();
        }
    }

}//MASH_Collection.prototype.pauseAllVideos



// MASH_Collection.prototype.indexAllVideos                                     MASH_Collection.prototype.indexAllVideos
// ---------------------------------------------------------------------------------------------------------------------
// * this function is added to the collection's context menu when a MASH_Video object is included inside the collection
// * it creates a MASH_VideoIndex to all the MASH_Video objects inside this collection
MASH_Collection.prototype.indexAllVideos = function(tmpObj) {

    if(this.componentsContainVideos == false)  {
        alert("no video components");
        return;
    }

    //find all video components
    var videoComponents = new Array();
    for(var i=0; i<this.components.length; i++) {
        var tmpObj = this.components[i];
        if(tmpObj.MASHobjectType == MASH_Object.VIDEO) {
            videoComponents.push(tmpObj);
        }
    }

    //create a videoIndex to all the MASH)Video objects in this collection
    if(videoComponents.length>0) { MASH_Video.multipleIndexVideoPosition(videoComponents); }

}//MASH_Collection.prototype.indexAllVideos



// MASH_Collection.prototype.createScreenObject                             MASH_Collection.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID                = MASH_Collection.ID_PREFIX          + i;
    var tmpObjInnerID           = MASH_Collection.INNER_ID_PREFIX    + i;
    var controlsObjID           = MASH_Collection.CONTROLS_ID_PREFIX + i;


    //wrapper object
    this.wrapperObj              = this.createWrapperObject(tmpObjID, i);
    this.wrapperObj.align        = this.align;

    //compute dimensions
    var adjustedWidth            = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight           = adjustSize(this.height, this.borderWidth);

    var adjustedInnerWidth       = this.width  - (this.borderWidth*2) - 0;
    var adjustedInnerHeight      = this.height - (this.borderWidth*2) - MASH_Collection.TITLE_HEIGHT;

    //validate adjusted dimensions
    // - if dimensions are 0 or negative, IE stops the scripts, and Netscape ignores the assignments
    if(adjustedInnerWidth  <= 0) { adjustedInnerWidth  = 1; }
    if(adjustedInnerHeight <= 0) { adjustedInnerHeight = 1; }


    //controls
    this.controlObj                      = document.createElement("div");

    this.controlObj.id                   = controlsObjID;

    this.controlObj.style.position       = "absolute";
    this.controlObj.style.left           = adjustedInnerWidth - MASH_Collection.getControlsWidth();
    this.controlObj.style.top            = 0;
    this.controlObj.style.width          = 0 + MASH_Collection.getControlsWidth();
    this.controlObj.style.height         = MASH_Collection.TITLE_HEIGHT;
    this.controlObj.style.zIndex         = 1;

    this.controlObj.style.backgroundColor= this.borderColor;

    this.controlObj.style.overflow       = "hidden";

    //zoom out control
    this.zoomOutObj                     = document.createElement("img");
    this.zoomOutObj.id                  = MASH_Collection.CONTROLS_ZOOM_OUT_IMG_ID + i;
    this.zoomOutObj.src                 = MASH_Collection.CONTROLS_ZOOM_OUT_IMG_FILE;
    this.zoomOutObj.title               = MASH_Collection.CONTROLS_ZOOM_OUT_IMG_TITLE;
    this.zoomOutObj.align               = "top";
    this.zoomOutObj.width               = MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.zoomOutObj.height              = MASH_Collection.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.zoomOutObj.style.borderWidth    = 0;

    addEventListener(this.zoomOutObj, "click",  MASH_Collection.zoomOutCollectionEvent, false);


    //zoom in control
    this.zoomInObj                      = document.createElement("img");
    this.zoomInObj.id                   = MASH_Collection.CONTROLS_ZOOM_IN_IMG_ID + i;
    this.zoomInObj.src                  = MASH_Collection.CONTROLS_ZOOM_IN_IMG_FILE;
    this.zoomInObj.title                = MASH_Collection.CONTROLS_ZOOM_IN_IMG_TITLE;
    this.zoomInObj.align                = "top";
    this.zoomInObj.width                = MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH;
    this.zoomInObj.height               = MASH_Collection.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.zoomInObj.style.borderWidth    = 0;

    addEventListener(this.zoomInObj, "click",  MASH_Collection.zoomInCollectionEvent, false);


    //maximize control
    this.maximizeObj                     = document.createElement("img");
    this.maximizeObj.id                  = MASH_Collection.CONTROLS_MAXIMIZE_IMG_ID + i;
    this.maximizeObj.src                 = MASH_Collection.CONTROLS_MAXIMIZE_IMG_FILE;
    this.maximizeObj.title               = MASH_Collection.CONTROLS_MAXIMIZE_IMG_TITLE;
    this.maximizeObj.align               = "top";
    this.maximizeObj.width               = MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.maximizeObj.height              = MASH_Collection.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.maximizeObj.style.borderWidth   = 0;

    addEventListener(this.maximizeObj, "click",  MASH_Collection.maximizeCollectionEvent, false);


    //minimize control
    this.minimizeObj                     = document.createElement("img");
    this.minimizeObj.id                  = MASH_Collection.CONTROLS_MINIMIZE_IMG_ID + i;
    this.minimizeObj.src                 = MASH_Collection.CONTROLS_MINIMIZE_IMG_FILE;
    this.minimizeObj.title               = MASH_Collection.CONTROLS_MINIMIZE_IMG_TITLE;
    this.minimizeObj.align               = "top";
    this.minimizeObj.width               = MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH;;
    this.minimizeObj.height              = MASH_Collection.CONTROLS_MAXIMIZE_IMG_HEIGHT;

    this.minimizeObj.style.borderWidth   = 0;

    addEventListener(this.minimizeObj, "click",  MASH_Collection.minimizeCollectionEvent, false);


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
//    this.spanObj.style.width             = adjustedInnerWidth - MASH_Collection.getControlsWidth();
    this.spanObj.style.height            = MASH_Collection.TITLE_HEIGHT;
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
    this.innerObj.style.top              = MASH_Collection.TITLE_HEIGHT;
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
//    addEventListener(this.wrapperObj, "dblclick",  MASH_Collection.maximizeCollectionEvent, false);
    addEventListener(this.spanObj,  "dblclick",  MASH_Collection.maximizeCollectionEvent, false);
    addEventListener(this.innerObj, "scroll",    divScroll, false);//this event listener is needed in order to avoid "sticky" scrollbars

    return this.wrapperObj;

}//MASH_Collection.prototype.createScreenObject



// MASH_Collection.zoomInCollectionEvent                                           MASH_Collection.zoomInCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * it is a wrapper over the function zoomObj in order to be able to call it as an event handler
MASH_Collection.zoomInCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent    = validateEventObject(tmpEvent);
    var wrapperObj  = getCurrentTarget(tmpEvent);

    var obj         = wrapperObj.MASHparameters;
    var objIndex    = wrapperObj.objectIndex;

    //zoom in
    MASH_Collection.zoomObject(objIndex, (4/3));
    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

    //zoom contents
    obj.zoomContents();

}//MASH_Collection.zoomInCollectionEvent



// MASH_Collection.zoomOutCollectionEvent                                         MASH_Collection.zoomOutCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * zooms the contentest of a COLLECTION object
// * it is a wrapper over the function zoomObj in order to be able to call it as an event handler
MASH_Collection.zoomOutCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent    = validateEventObject(tmpEvent);
    var wrapperObj  = getCurrentTarget(tmpEvent);

    var obj         = wrapperObj.MASHparameters;
    var objIndex    = wrapperObj.objectIndex;

    //zoom in
    MASH_Collection.zoomObject(objIndex, (3/4));
    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

    //zoom contents
    obj.zoomContents();

}//MASH_Collection.zoomOutCollectionEvent



// MASH_Collection.prototype.zoomContents                                         MASH_Collection.prototype.zoomContents
// ---------------------------------------------------------------------------------------------------------------------
// * zooms the contents of a COLLECTION object
MASH_Collection.prototype.zoomContents = function(){

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
            var childInnerHeight = (childHeight - (2*this.components[i].borderWidth) - 1 -MASH_Collection.TITLE_HEIGHT) / this.components[i].scale;

            //resize child

            //resize the context layer and wrpper object
            this.components[i].resizeContextLayer(childWidth, childHeight);

            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = childWidth - (2*this.components[i].borderWidth) - MASH_Collection.getControlsWidth();

            //zoom contents
            this.components[i].zoomContents();
        }

    }//for i

}//MASH_Collection.prototype.zoomContents



// MASH_Collection.minimizeCollectionEvent                                       MASH_Collection.minimizeCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to minimizea COLLECTION object
// * it is a wrapper over the function minimizeCollection in order to be able to call it as an event handler
MASH_Collection.minimizeCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent      = validateEventObject(tmpEvent);
    var wrapperObj    = getCurrentTarget(tmpEvent);
    var collectionObj = wrapperObj.MASHparameters;

    if(collectionObj.minimized) { collectionObj.normalize(); }//RESTORE object
    else                        { collectionObj.minimize();  }//MINIMIZE object

    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

}//MASH_Collection.minimizeCollectionEvent



// MASH_Collection.maximizeCollectionEvent                                       MASH_Collection.maximizeCollectionEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function allows to maximize 'into' a COLLECTION object
// * it is a wrapper over the function maximizeCollection in order to be able to call it as an event handler
MASH_Collection.maximizeCollectionEvent = function(tmpEvent){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    var tmpEvent      = validateEventObject(tmpEvent);
    var wrapperObj    = getCurrentTarget(tmpEvent);
    var collectionObj = wrapperObj.MASHparameters;


    if(collectionObj.maximized) { collectionObj.normalize(); }//RESTORE object
    else                        { collectionObj.maximize();  }//MAXIMIZE object

    stopPropagation(tmpEvent);
    preventDefault(tmpEvent);

}//MASH_Collection.maximizeCollectionEvent



// MASH_Collection.prototype.minimize                                                 MASH_Collection.prototype.minimize
// ---------------------------------------------------------------------------------------------------------------------
// * minimizes this COLLECTION object
MASH_Collection.prototype.minimize = function(){

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
    this.minimizeObj.src = MASH_Collection.CONTROLS_NORMALIZE_IMG_FILE;
    this.maximizeObj.src = MASH_Collection.CONTROLS_MAXIMIZE_IMG_FILE;

    //set the flags
    this.minimized       = true;
    this.maximized       = false;

    //relocate the collection controls
    this.wrapperObj.style.zIndex = ++topZ;
    this.controlObj.style.left   = this.width - (2*this.borderWidth) - MASH_Collection.getControlsWidth();

    //compute the width and height
    var adjustedWidth    = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight   = this.getObjHeight(MASH_Collection.TITLE_HEIGHT);

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

}//MASH_Collection.prototype.minimize



// MASH_Collection.prototype.normalize                                               MASH_Collection.prototype.normalize
// ---------------------------------------------------------------------------------------------------------------------
// * resotores this colelction object to normal size
MASH_Collection.prototype.normalize = function(){

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
    this.minimizeObj.src = MASH_Collection.CONTROLS_MINIMIZE_IMG_FILE;
    this.maximizeObj.src = MASH_Collection.CONTROLS_MAXIMIZE_IMG_FILE;

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
    this.controlObj.style.left   = this.width - (2*this.borderWidth) - MASH_Collection.getControlsWidth();

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

}//MASH_Collection.prototype.normalize



// MASH_Collection.prototype.maximize                                                 MASH_Collection.prototype.maximize
// ---------------------------------------------------------------------------------------------------------------------
// * maximizes 'into' this COLLECTION object
MASH_Collection.prototype.maximize = function(){

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
    this.minimizeObj.src = MASH_Collection.CONTROLS_MINIMIZE_IMG_FILE;
    this.maximizeObj.src = MASH_Collection.CONTROLS_NORMALIZE_IMG_FILE;

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
    this.controlObj.style.left   = totalWidth - (2*this.borderWidth) - MASH_Collection.getControlsWidth();

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

}//MASH_Collection.prototype.maximize


// MASH_Collection.prototype.normalizeMaximizedChildren             MASH_Collection.prototype.normalizeMaximizedChildren
// ---------------------------------------------------------------------------------------------------------------------
// * newWidth and newHeight are optional parameters
MASH_Collection.prototype.normalizeMaximizedChildren = function(newWidth, newHeight){

    //compute the inner div dimensions
    var adjustedInnerWidth  = newWidth  || this.width;
    var adjustedInnerHeight = newHeight || this.height;

    for(var i=0; i<this.components.length; i++){

        if(this.components[i].maximized) {

            //compute new dimensions for children
            var childWidth       = adjustedInnerWidth;
            var childHeight      = adjustedInnerHeight;

            var childInnerWidth  = (adjustedInnerWidth  - (2*this.components[i].borderWidth));
            var childInnerHeight = (adjustedInnerHeight - (2*this.components[i].borderWidth) - MASH_Collection.TITLE_HEIGHT);

            if(childInnerWidth  <= 0) { childInnerWidth  = 1; }
            if(childInnerHeight <= 0) { childInnerHeight = 1; }

            //resize child
            this.components[i].wrapperObj.style.width  = adjustedInnerWidth;
            this.components[i].wrapperObj.style.height = adjustedInnerHeight;

            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = adjustedInnerWidth - (2*this.components[i].borderWidth) - MASH_Collection.getControlsWidth();

            //recursively adjust maximized inner children
            this.components[i].normalizeMaximizedChildren(childInnerWidth, childInnerHeight);
        }

    }//for i


}//MASH_Collection.prototype.normalizeMaximizedChildren



// MASH_Collection.prototype.maximizeMaximizedChildren               MASH_Collection.prototype.maximizeMaximizedChildren
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.maximizeMaximizedChildren = function(newWidth, newHeight){

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
            var childInnerHeight = (childHeight - (2*this.components[i].borderWidth) - MASH_Collection.TITLE_HEIGHT);

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
            this.components[i].controlObj.style.left = adjustedInnerWidth - (2*this.components[i].borderWidth) - MASH_Collection.getControlsWidth();

            //recursively adjust maximized inner children
            this.components[i].maximizeMaximizedChildren(childInnerWidth, childInnerHeight);
        }

    }//for i


}//MASH_Collection.prototype.maximizeMaximizedChildren



// MASH_Collection.prototype.resizeAnimation                                   MASH_Collection.prototype.resizeAnimation
// ---------------------------------------------------------------------------------------------------------------------
// * animates the navigation 'into' or 'out of' this COLLECTION object
MASH_Collection.prototype.resizeAnimation = function(currWidth,          currHeight,
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

}//MASH_Collection.prototype.resizeAnimation



// MASH_Collection.prototype.getInternalMouseCoords                     MASH_Collection.prototype.getInternalMouseCoords
// ---------------------------------------------------------------------------------------------------------------------
// objDrag                = object being dragged
// tmpSourceX, tmpSourceY = position of the click
// tmpOffX, tmpOffY       = position of this collection relative to the parent coordinate system
MASH_Collection.prototype.getInternalMouseCoords = function(objDrag, tmpSourceX, tmpSourceY, tmpOffX, tmpOffY, tmpScale) {

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


}// MASH_Collection.prototype.getInternalMouseCoords



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_Collection.prototype.explode                                                   MASH_Collection.prototype.explode
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.explode  = function(){

    if(this.maximized) { this.maximize(); }

    //determine the parent of this collection
    var parentCollection  = this.collection;
    if(!parentCollection) {
        parentCollection = null;
        var tmpScrollLeft = getWindowScrollX();
        var tmpScrollTop  = getWindowScrollY();
    }
    else {
        tmpScrollLeft = getScrollOffsetX(parentCollection);
        tmpScrollTop  = getScrollOffsetY(parentCollection);
//        alert("tmpScrollLeft = " + tmpScrollLeft + "\ntmpScrollTop = " + tmpScrollTop);
    }
/*
    if(!parentCollection) { alert("parent = " + parentCollection); }
    else                  { alert("parent = " + parentCollection.id); }
*/
    //determine the offset for the position of the components
//    var tmpOffsetX = parseInt(this.reference.style.left) + parseInt(this.reference.style.borderWidth) - tmpScrollLeft;
//    var tmpOffsetY = parseInt(this.reference.style.top)  + parseInt(this.reference.style.borderWidth) - tmpScrollTop   + MASH_Collection.TITLE_HEIGHT;
    var tmpOffsetX = parseInt(this.reference.style.left) + parseInt(this.reference.style.borderWidth);
    var tmpOffsetY = parseInt(this.reference.style.top)  + parseInt(this.reference.style.borderWidth) + MASH_Collection.TITLE_HEIGHT;

//    alert("tmpOffsetX = " + tmpOffsetX + "\ntmpOffsetY = " + tmpOffsetY);

//    alert("this.components.length = " + this.components.length);

    //move this collection's componentsobject contents
    for(var i=0; i<this.components.length; i++) {

        var componentObject = this.components[i];
        var componentScreen = componentObject.reference;

//        alert("componentObject = " + componentObject + "\ncomponentScreen = " + componentScreen);

        //adjust the position of the object
        componentScreen.style.left = parseInt(componentScreen.style.left) + tmpOffsetX;
        componentScreen.style.top  = parseInt(componentScreen.style.top)  + tmpOffsetY;

        //reset the collection container of the object
        componentObject.collection = parentCollection;

        //relocate the object in the parent of this collection (both on the screen and in the proper array -components or allMASHObjects- )
        if(!parentCollection) {
            document.body.appendChild(componentScreen);
            allMASHObjects.push(componentObject);
        }
        else {
            parentCollection.appendChild(componentScreen);
            parentCollection.MASHparameters.addComponent(componentObject);
        }

    }//for i


    //remove the collection itself from the object array and from the screen
    removeObject(this);
    this.reference.parentNode.removeChild(this.reference);


}//MASH_Collection.prototype.explode



// MASH_Collection.prototype.emphasize                                               MASH_Collection.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.emphasize  = function(value){

    //validate emphasis value
    // if it is not a positive number
    // then set it to a default of 10
    if(!value)  { value = 10; }
    if(value<0) { value = 10; }

    //validate coefficient
    if(!this.emphasisCoefficient) { this.emphasisCoefficient = 0; }

    //update coefficient
    this.emphasisCoefficient = parseInt(this.emphasisCoefficient + value);
    if(this.emphasisCoefficient > 100) { this.emphasisCoefficient = 100; }

    this.translateEmphasisToVisualCues();

}//MASH_Collection.prototype.emphasize



// MASH_Collection.prototype.deemphasize                                           MASH_Collection.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.deemphasize  = function(value){

    //validate emphasis value
    // if it is not a positive number
    // then set it to a default of 10
    if(!value)  { value = 10; }
    if(value<0) { value = 10; }

    //validate coefficient
    if(!this.emphasisCoefficient) { this.emphasisCoefficient = 0; }

    //update coefficient
    this.emphasisCoefficient = parseInt(this.emphasisCoefficient - value);
    if(this.emphasisCoefficient < -100) { this.emphasisCoefficient = -100; }

    this.translateEmphasisToVisualCues();

}//MASH_Collection.prototype.deemphasize



// MASH_Collection.prototype.translateEmphasisToVisualCues       MASH_Collection.prototype.translateEmphasisToVisualCues
// ---------------------------------------------------------------------------------------------------------------------
// * modifies the visual prominence of the object in order to reflect the degree of emphasis
// * the specific adaptations depend on the magnitude of the emphasis coefficient
//   from alpha-blurring and reducing the size and minimizing the collection
//   to glowing, increasing the size, font and border
MASH_Collection.prototype.translateEmphasisToVisualCues  = function(){

    //if the emphasis coefficient is very close to zero, then just kill the filters and return
    if((this.emphasisCoefficient > -1) && (this.emphasisCoefficient <  1) ){
        this.resetVisualCues();
        return;
    }

    //object is de-emphasized
    if(this.emphasisCoefficient < 1) {

        //font adaptations
        var fontIncrease = parseInt(this.emphasisCoefficient/20);
        var newFontSize  = parseInt(this.fontSize) + fontIncrease;
        if(newFontSize < 4) { newFontSize  = 4; }
        this.spanObj.style.fontSize = newFontSize + "pt";
/*

        //border adaptations
        var borderIncrease = parseInt(this.emphasisCoefficient/20);
        var newBorderWidth = parseInt(this.reference.style.borderWidth) + borderIncrease;
        if(newBorderWidth < 0) { newBorderWidth = 0; }
        this.wrapperObj.style.borderWidth = newBorderWidth;
*/
        //size adaptations
        var sizeIncrease           = 1 + (this.emphasisCoefficient/100);
        if(sizeIncrease < 0.25) { sizeIncrease = 0.25; }
        var newWidth               = parseInt(adjustSize(this.width,  this.borderWidth) * sizeIncrease);
        var newHeight              = parseInt(adjustSize(this.height, this.borderWidth) * sizeIncrease);
        //move object to make it appear as it is resizing from it's center
        this.wrapperObj.style.left = parseInt(this.wrapperObj.style.left) - parseInt((newWidth  - parseInt(this.wrapperObj.style.width))  / 2);
        this.wrapperObj.style.top  = parseInt(this.wrapperObj.style.top)  - parseInt((newHeight - parseInt(this.wrapperObj.style.height)) / 2);
        //resize object
        this.resize(newWidth, newHeight);


        //zoom adaptation
        var zoomFactor = 1 + parseInt(2 * this.emphasisCoefficient/100);
        var objIndex   = this.wrapperObj.objectIndex;
        if(zoomFactor < 0.25)  { zoomFactor = 0.25;  }
        MASH_Collection.zoomObject(objIndex, zoomFactor);

        //adjust filters
        var alphaValue     = 100 + 0.7*this.emphasisCoefficient;
        if(alphaValue>100) { alphaValue = 100; }
        if(alphaValue<10)  { alphaValue = 10;  }

        this.normal();
        this.alpha(alphaValue);

        //minimize  irrelevanet collections
//        if(this.emphasisCoefficient < -0.5) { this.minimize(); }
    }

    //object is emphasized
    if(this.emphasisCoefficient >= 1) {

        //font adaptation
        var fontIncrease = parseInt(this.emphasisCoefficient/20);
        var newFontSize  = parseInt(this.fontSize) + fontIncrease;
        if(newFontSize > 12) { newFontSize  = 12; }
        this.spanObj.style.fontSize = newFontSize+"pt";

/*
        //border adaptation
        var borderIncrease                = parseInt(this.emphasisCoefficient/20);
        this.wrapperObj.style.borderWidth = parseInt(this.borderWidth) + borderIncrease;
*/
/*
        //size adaptation
        var sizeIncrease            = 1 + (this.emphasisCoefficient/100);
        var newWidth                = parseInt(adjustSize(this.width,  this.borderWidth) * sizeIncrease);
        var newHeight               = parseInt(adjustSize(this.height, this.borderWidth) * sizeIncrease);
        //move object to make it appear as it is resizing from it's center
        this.wrapperObj.style.left  = parseInt(this.wrapperObj.style.left) - parseInt((newWidth  + 10 - parseInt(this.wrapperObj.style.width))  / 2);
        this.wrapperObj.style.top   = parseInt(this.wrapperObj.style.top)  - parseInt((newHeight + 10 - parseInt(this.wrapperObj.style.height)) / 2);
        //resize object
        this.resize( (newWidth+10), (newHeight+10) );
*/
        //bring the objet to the front
        this.sendToFront();

        //zoom adaptation
        var zoomFactor = 1 + parseInt(this.emphasisCoefficient/100);
        var objIndex   = this.wrapperObj.objectIndex;
        MASH_Collection.zoomObject(objIndex, zoomFactor);

        //adjust filters
        this.normal();
        var glowStrength = parseInt(this.emphasisCoefficient/10);
        this.glow(glowStrength);

        //normalize relevanet collections
//        if((this.emphasisCoefficient >= -0.5) &&(this.minimized == true)) { this.normalize(); }

        //start aniimation
//        window.setTimeout("document.getElementById('"+ this.wrapperObj.id+"').MASHparameters.emphasizeAnimation("+newWidth+", "+newHeight+", "+glowStrength+")", 300);

    }//if ephasized

}//MASH_Collection.prototype.translateEmphasisToVisualCues



// MASH_Collection.prototype.resetVisualCues                                   MASH_Collection.prototype.resetVisualCues
// ---------------------------------------------------------------------------------------------------------------------
// * resets the visual cues to the authored-specified values
MASH_Collection.prototype.resetVisualCues  = function(){

    //reset the size
    var newWidth     = adjustSize(this.width,  this.borderWidth);
    var newHeight    = adjustSize(this.height, this.borderWidth);
    //move object to make it appear as it is resizing from it's center
    var leftOffset = parseInt((newWidth  - parseInt(this.wrapperObj.style.width))  / 2);
    var topOffset  = parseInt((newHeight - parseInt(this.wrapperObj.style.height)) / 2);
    this.wrapperObj.style.left  = parseInt(this.wrapperObj.style.left) - leftOffset;
    this.wrapperObj.style.top   = parseInt(this.wrapperObj.style.top)  - topOffset;
    //resize object
    this.resize(newWidth, newHeight);

    //set the style
    this.wrapperObj.style.backgroundColor    = this.backgroundColor;
    this.wrapperObj.style.backgroundImage    = this.backgroundImage;
    this.wrapperObj.style.backgroundRepeat   = this.backgroundRepeat;
    this.wrapperObj.style.backgroundPosition = this.backgroundPosition;

    this.wrapperObj.style.borderStyle        = this.borderStyle;
    this.wrapperObj.style.borderWidth        = this.borderWidth;
    this.wrapperObj.style.borderColor        = this.borderColor;

    this.wrapperObj.align                    = this.align;

    this.spanObj.style.color                 = this.color;
    this.spanObj.style.fontFamily            = this.fontFamily;
    this.spanObj.style.fontSize              = this.fontSize;
    this.spanObj.style.fontWeight            = this.fontWeight;

    var adjustedInnerWidth                   = this.width  - (this.borderWidth*2) - 0;
    this.controlObj.style.left               = adjustedInnerWidth - MASH_Collection.getControlsWidth();

    //adjust filters
    this.normal();

}//MASH_Collection.prototype.resetVisualCues



// MASH_Collection.prototype.emphasizeAnimation                             MASH_Collection.prototype.emphasizeAnimation
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.emphasizeAnimation  = function(newWidth, newHeight, glowStrength){

    //move object to make it appear as it is resizing from it's center
    var leftOffset = parseInt((newWidth  - parseInt(this.wrapperObj.style.width))  / 2);
    var topOffset  = parseInt((newHeight - parseInt(this.wrapperObj.style.height)) / 2);

    this.wrapperObj.style.left  = parseInt(this.wrapperObj.style.left) - leftOffset;
    this.wrapperObj.style.top   = parseInt(this.wrapperObj.style.top)  - topOffset;

    //adjust the size
    this.resize(newWidth, newHeight);

    //adjust filters
    this.normal();
    this.glow(glowStrength);

    this.sendToFront();

}//emphasizeAnimation



// MASH_Collection.prototype.resize                                                     MASH_Collection.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.resize = function(newWidth, newHeight) {

    this.resizeContextLayer(newWidth, newHeight);

    var adjustedInnerWidth      = this.getInnerObjWidth(newWidth);
    var adjustedInnerHeight     = this.getInnerObjHeight(newHeight);

    this.controlObj.style.left  = (adjustedInnerWidth * this.scale) - MASH_Collection.getControlsWidth();

    //validate new values
    if(adjustedInnerWidth<0)  { adjustedInnerWidth  = 0; }
    if(adjustedInnerHeight<0) { adjustedInnerHeight = 0; }

    //resize
    this.innerObj.width         = adjustedInnerWidth;
    this.innerObj.height        = adjustedInnerHeight;

    this.innerObj.style.width   = adjustedInnerWidth;
    this.innerObj.style.height  = adjustedInnerHeight;

    //adjuste maximized children
    for(var i=0; i<this.components.length; i++){

        if(this.components[i].maximized) {

            //compute new dimensions for children
            var childWidth       = (adjustedInnerWidth  - (2*this.components[i].borderWidth)) / 1;
            var childHeight      = (adjustedInnerHeight - (2*this.components[i].borderWidth)) / 1;

            var childInnerWidth  = (adjustedInnerWidth  - (2*this.components[i].borderWidth)) / this.scale;
            var childInnerHeight = (adjustedInnerHeight - (2*this.components[i].borderWidth) - MASH_Collection.TITLE_HEIGHT) / this.scale;

            if(childInnerWidth  <= 0) { childInnerWidth  = 1; }
            if(childInnerHeight <= 0) { childInnerHeight = 1; }

            //resize child
            this.components[i].wrapperObj.style.width  = adjustedInnerWidth;
            this.components[i].wrapperObj.style.height = adjustedInnerHeight;

            this.components[i].innerObj.style.width    = childInnerWidth;
            this.components[i].innerObj.style.height   = childInnerHeight;

            //relocate the controls
            this.components[i].controlObj.style.left = adjustedInnerWidth - (2*this.components[i].borderWidth) - MASH_Collection.getControlsWidth();
        }

    }//for i


    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_Collection.prototype.resize



// MASH_Collection.prototype.toString                                                 MASH_Collection.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.toString = function() {

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

}//MASH_Collection.prototype.toString


// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_Collection.prototype.getInnerObjWidth                                 MASH_Collection.prototype.getInnerObjWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.getInnerObjWidth = function(newWidth) {

    var adjustedInnerWidth;

    if(isIE)       { adjustedInnerWidth = (newWidth  - 1 - (this.borderWidth*2)) / this.scale; }
    if(isNetscape) { adjustedInnerWidth = (newWidth  - 1) / this.scale;                        }

    //avoid negative widths
    if(adjustedInnerWidth<0) { adjustedInnerWidth = 0; }

    return adjustedInnerWidth;

}//getInnerObjWidth



// MASH_Collection.prototype.getInnerObjHeight                               MASH_Collection.prototype.getInnerObjHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.getInnerObjHeight = function(newHeight) {

    var adjustedInnerHeight;

    if(isIE)       { adjustedInnerHeight = (newHeight - MASH_Collection.TITLE_HEIGHT - (this.borderWidth*2)) / this.scale; }
    if(isNetscape) { adjustedInnerHeight = (newHeight - MASH_Collection.TITLE_HEIGHT) / this.scale;                        }

    //avoid negative heights
    if(adjustedInnerHeight<0) { adjustedInnerHeight = 0; }

    return adjustedInnerHeight;

}//getInnerObjHeight



// MASH_Collection.prototype.getObjHeight                                         MASH_Collection.prototype.getObjHeight
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.getObjHeight = function(newHeight) {

    var adjustedHeight;

//    if(isIE)       { adjustedHeight = (newHeight + (this.borderWidth*2)) / this.scale;  }
//    if(isNetscape) { adjustedHeight = (newHeight ) / this.scale;                        }

    if(isIE)       { adjustedHeight = (newHeight + (this.borderWidth*2));  }
    if(isNetscape) { adjustedHeight = (newHeight );                        }

    return adjustedHeight;

}//getObjHeight



// MASH_Collection.zoomObject                                                                 MASH_Collection.zoomObject
// ---------------------------------------------------------------------------------------------------------------------
// *** THIS ONLY WORKS IN IE ***
MASH_Collection.zoomObject = function(objID, factor){

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
        var adjustedInnerHeight         = (wrapperObjHeight - (wrapperObjBorder*2) - MASH_Collection.TITLE_HEIGHT) / collectionObjects[objID].scale;

        //validate values
        if(adjustedInnerWidth  < 1) { adjustedInnerWidth  = 1; }
        if(adjustedInnerHeight < 1) { adjustedInnerHeight = 1; }

        collectionObjects[objID].innerObj.width        = adjustedInnerWidth;
        collectionObjects[objID].innerObj.height       = adjustedInnerHeight;
        collectionObjects[objID].innerObj.style.width  = adjustedInnerWidth;
        collectionObjects[objID].innerObj.style.height = adjustedInnerHeight;
        collectionObjects[objID].innerObj.style.zoom   = collectionObjects[objID].scale;
    }

}//MASH_Collection.zoomObject



// MASH_Collection.getControlsWidth                                                     MASH_Collection.getControlsWidth
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.getControlsWidth = function(){

    if(isNetscape) { return ((MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH)*2); }
    else if(isIE)  { return ((MASH_Collection.CONTROLS_MAXIMIZE_IMG_WIDTH)*4); }

}//MASH_Frame.getControlsWidth


// MASH_Collection.prototype.getAccumulatedScale                           MASH_Collection.prototype.getAccumulatedScale
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.getAccumulatedScale = function(){

    var parentCollectionScreenObj = this.collection;                                        //this an HTML div object (the inner object of the parent collection)
    if(!parentCollectionScreenObj) {
       if(!this.scale) { return 1.0; }
       return this.scale;
    }
    var parentCollectionMASHObj   = parentCollectionScreenObj.wrapperObject.MASHparameters; //this an MASH_Collection object (the parent MASH_Collection)

    return parentCollectionMASHObj.getAccumulatedScale() * this.scale;

}//MASH_Collection.prototype.getAccumulatedScale





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_Collection.XML_TAG_OBJECT      = MASH_Object.COLLECTION;
MASH_Collection.XML_TAG_TEXT        = "text";
MASH_Collection.XML_TAG_COMPONENTS  = "components";


//Default values for User Readings open in collections
MASH_Collection.USER_READING_LEFT   = 10;
MASH_Collection.USER_READING_TOP    = 100;
MASH_Collection.USER_READING_WIDTH  = 600;
MASH_Collection.USER_READING_HEIGHT = 400;
MASH_Collection.USER_READING_STYLE = "align:left; vertical-align:top; background-color:#ffffff; border-width:2; border-color:#222222; border-style:solid; background-image:none; color:#ffffff; font-family:Arial; font-size:13pt; font-weight:bold; ";



// MASH_Collection.xmlCreateCollectionWithMASHDocument               MASH_Collection.xmlCreateCollectionWithMASHDocument
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.xmlCreateCollectionWithMASHDocument = function(xmlString){

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
    var collectionLeft   = MASH_Collection.USER_READING_LEFT;
    var collectionTop    = MASH_Collection.USER_READING_TOP;
    var collectionWidth  = MASH_Collection.USER_READING_WIDTH;
    var collectionHeight = MASH_Collection.USER_READING_HEIGHT;
    var collectionStyle  = MASH_Collection.USER_READING_STYLE;
    var newCollection    = new MASH_Collection(collectionName, collectionLeft, collectionTop, collectionWidth, collectionHeight, topZ,
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



}//MASH_Collection.xmlCreateCollectionWithMASHDocument



// MASH_Collection.prototype.getTypeSpecificXML                             MASH_Collection.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Collection.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }


    //get the tags for the objects inside this collection
    var componentsXML = "";
    for(var i=0; i<this.components.length; i++) {
        componentsXML += this.components[i].toXML();
    }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Collection.XML_TAG_TEXT,       this.text,     true,  indent);
    objectXML += MASH_Object.xmlMakeTagMultiLine( MASH_Collection.XML_TAG_COMPONENTS, componentsXML, false, indent);

    return objectXML;

}//MASH_Collection.prototype.getTypeSpecificXML



// MASH_Collection.xmlParseObjectNode                                                 MASH_Collection.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Collection.xmlParseObjectNode = function(node){

//    alert("MASH_Collection.xmlParseObjectNode\n======================\n" +
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
        else if(childName == MASH_Collection.XML_TAG_TEXT)       { objText       = MASH_Object.xmlParseNodeText(child);     }
        else if(childName == MASH_Collection.XML_TAG_COMPONENTS) { objComponents = MASH_Object.xmlParseMASH_Objects(child); }
    }

    //declare object
    var obj = new MASH_Collection(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                                  objText, objComponents);

    return obj;

}//MASH_Collection.xmlParseObjectNode




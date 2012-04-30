// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Aug 10, 2002                                                                                             //
// Modified: Jul 04, 2007: Modified MASH_APPLET_CODEBASE to point to the WARP Server instead of a local directory     //
// Modified: Sep 28, 2007: Modified CONTROLS_IMG_DIR to point to WARP Server                                          //
// Modified: Nov 23, 2009: Multi-touch support: * added "finger markers" to divMouseDown, divMouseMove, divMouseUp    //
//                                              * changed CTRL-KEY policy for inserting/removing objects              //
//                                                to/from Collections                                                 //
//                                              * MASH_APPLET_CODEBASE and CONTROLS_IMG_DIR point to WARP-MT Server   //
//                                                                                                                    //
// =====================================================================================================================


// =====================================================================================================================
// GLOBAL CONSTANTS                                                                                     GLOBAL CONSTANTS
// =====================================================================================================================

var MASH_DOCUMENT_NAME     = "MASH_CENTRE_";
var NON_MASH_DOCUMENT      = "NON_MASH_DOC";

var MASH_APPLET_NAME       = "mashApplet";
var MASH_APPLET_CODEBASE   = "http://everest.ischool.utexas.edu/WARP-APT/";
var MASH_APPLET_CODE       = "MASH/MASHApplet.class";


// resize controls
var RESIZE_TOP_LEFT        = "topLeft";
var RESIZE_TOP_CENTER      = "topCenter";
var RESIZE_TOP_RIGHT       = "topRight";

var RESIZE_MIDDLE_LEFT     = "middleLeft";
var RESIZE_MIDDLE_RIGHT    = "middleRight";

var RESIZE_BOTTOM_LEFT     = "bottomLeft";
var RESIZE_BOTTOM_CENTER   = "bottomCenter";
var RESIZE_BOTTOM_RIGHT    = "bottomRight";


// Global Arrays of MASH objects
var collectionObjects      = new Array();
var formObjects            = new Array();
var inputObjects           = new Array();
var frameObjects           = new Array();
var textObjects            = new Array();
var imageObjects           = new Array();
var importedObjects        = new Array();
var exportedObjects        = new Array();

var videoObjects           = new Array();
var videoIndiexObjects     = new Array();

// Spatial Parser
var implicitComposites     = new Array();

//other objects
var otherObjects           = new Array();

//user's annotation objects
var annotationObjects      = new Array();

//video index objects
var videoIndexObjects      = new Array();

//APT objects
var digitizedRecordObjects = new Array();


//Copyright
var MASH_COPYRIGHT = "MASH \n\n"                                       +
                     "  Copyright (c) 2002 Luis Francisco-Revilla.\n"  +
                     "  All rights reserved.\n\n"                      ;

//Global Multi-Touch variables
var MT_fingerMarker       = null;
var MT_fingerMarkerTop    = null;
var MT_fingerMarkerLeft   = null;
var MT_fingerMarkerBottom = null;
var MT_fingerMarkerRight  = null;

// =====================================================================================================================
// GLOBAL FUNCTIONS                                                                                     GLOBAL FUNCTIONS
// =====================================================================================================================



// =====================================================================================================================
// Initialization Functions                                                                     Initialization Functions
// =====================================================================================================================
// * these functions initialize the user interface


// ---------------------------------------------------------------------------------------------------------------------
// * writes the controls for the questionnaires
// * THIS IS ONLY FOR THE EVALUATION FOR THE DISSERTATION
function writeQuestionnaires(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Questionnaires:</span>");
    document.writeln("<a href=\"javascript:showQuestionnaire('experiment/questionnaire-background.html');\">Q1</a>");
//    document.writeln("<a href=\"javascript:showQuestionnaire('experiment/questionnaire-html.html');\">Q2</a>");
    document.writeln("<a href=\"javascript:showQuestionnaireDocument('experiment/questionnaire-html.html');\">Q2</a>");
    document.writeln("<a href=\"javascript:showQuestionnaire('experiment/questionnaire-comments.html');\">Q3</a>&nbsp;||&nbsp;");

}//writeQuestionnaires


// writeControls                                                                                           writeControls
// ---------------------------------------------------------------------------------------------------------------------
// * writes the control bar in the web page
function writeControls(){

    document.writeln("<a href=\"javascript:arrangeObjects(allMASHObjects);\"><img id=\"" + CTRL_REARRANGE_IMG_ID              + "\" src=\"" + CTRL_REARRANGE_IMG_FILE               + "\" title=\"Re-arrange\"                     alt=\"re-arrange objects to their original state\"        border=\"0\"></a>&nbsp;");
    document.writeln("<a href=\"javascript:freezeAllObjects();\"            ><img id=\"" + CTRL_FREEZE_IMG_ID                 + "\" src=\"" + CTRL_UNFREEZE_IMG_FILE                + "\" title=\"Freeze Space\"                   alt=\"freezes the space. Objects cannot be moved\"        border=\"0\"></a>&nbsp;||&nbsp;");
//    document.writeln("<a href=\"javascript:saveAllObjects();\"              ><img id=\"" + CTRL_SAVE_IMG_ID                   + "\" src=\"" + CTRL_SAVE_IMG_FILE                    + "\" title=\"Save Space\"                     alt=\"save the objects' current state\"                   border=\"0\"></a>&nbsp;");
//    document.writeln("<a href=\"javascript:restoreAllObjects();\"           ><img id=\"" + CTRL_RESTORE_IMG_ID                + "\" src=\"" + CTRL_RESTORE_IMG_FILE                 + "\" title=\"Restore Space\"                  alt=\"restore the objects to the previously saved state\" border=\"0\"></a>&nbsp;||&nbsp;");

//    if(MASH_FileManagerDefined) {
//        MASH_FileManager.writeControls();
//    }

//    document.writeln("<a href=\"javascript:zoom(2/1);\"                     ><img id=\"" + CTRL_ZOOM_IN_PAGE_IMG_ID           + "\" src=\"" + CTRL_ZOOM_IN_PAGE_IMG_FILE            + "\" title=\"Zoom In Space\"                  alt=\"zooms in the whole space\"                          border=\"0\"></a>&nbsp;");
//    document.writeln("<a href=\"javascript:zoom(1/2);\"                     ><img id=\"" + CTRL_ZOOM_OUT_PAGE_IMG_ID          + "\" src=\"" + CTRL_ZOOM_OUT_PAGE_IMG_FILE           + "\" title=\"Zoom Out Space\"                 alt=\"zooms out the whole space\"                         border=\"0\"></a>&nbsp;||&nbsp;");

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Annotations:</span>");
//    document.writeln("<a href=\"javascript:showAnnotations(MASH_UserAnnotation.ALL_ANNOTATIONS);\"><img id=\"" + CTRL_ANNOTATE_SHOW_IMG_ID          + "\" src=\"" + CTRL_ANNOTATE_SHOW_IMG_FILE          + "\" title=\"Show Annotation\"               alt=\"Show Annotation\"                border=\"0\"></a>");
//    document.writeln("<a href=\"javascript:hideAnnotations(MASH_UserAnnotation.ALL_ANNOTATIONS);\"><img id=\"" + CTRL_ANNOTATE_HIDE_IMG_ID          + "\" src=\"" + CTRL_ANNOTATE_HIDE_IMG_FILE          + "\" title=\"Hide Annotation\"               alt=\"Hide Annotation\"                border=\"0\"></a>&nbsp;||&nbsp;");
    document.writeln("<a href=\"javascript:toggleAnnotations(MASH_UserAnnotation.ALL_ANNOTATIONS);\"><img id=\"" + CTRL_ANNOTATE_SHOW_IMG_ID              + "\" src=\"" + CTRL_ANNOTATE_SHOW_IMG_FILE              + "\" title=\"Show/Hide Annotations\"         alt=\"Show/Hide Annotations\"          border=\"0\"></a>&nbsp;||&nbsp;");


    document.writeln("<a href=\"javascript:createArchivalSubGroup();\"                              ><img id=\"" + CTRL_ANNOTATE_COLLECTION_BLUE_IMG_ID   + "\" src=\"" + CTRL_ANNOTATE_COLLECTION_BLUE_IMG_FILE   + "\" title=\"Create Sub-Group\"  alt=\"Sub-Group\"  border=\"0\"></a>");
//    document.writeln("<a href=\"javascript:annotateCollection('#eef8ff', '#000088');\"              ><img id=\"" + CTRL_ANNOTATE_COLLECTION_BLUE_IMG_ID   + "\" src=\"" + CTRL_ANNOTATE_COLLECTION_BLUE_IMG_FILE   + "\" title=\"Create Sub-Group\"  alt=\"Sub-Group\"  border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateCollection('#eefff8', '#008800');\"              ><img id=\"" + CTRL_ANNOTATE_COLLECTION_GREEN_IMG_ID  + "\" src=\"" + CTRL_ANNOTATE_COLLECTION_GREEN_IMG_FILE  + "\" title=\"Create Series\"     alt=\"Series\"     border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateCollection('#fff8ee', '#880000');\"              ><img id=\"" + CTRL_ANNOTATE_COLLECTION_RED_IMG_ID    + "\" src=\"" + CTRL_ANNOTATE_COLLECTION_RED_IMG_FILE    + "\" title=\"Create Sub-Series\" alt=\"Sub-Series\" border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateCollection('#ffffee', '#aaaa00');\"              ><img id=\"" + CTRL_ANNOTATE_COLLECTION_YELLOW_IMG_ID + "\" src=\"" + CTRL_ANNOTATE_COLLECTION_YELLOW_IMG_FILE + "\" title=\"Create File\"       alt=\"File\"       border=\"0\"></a>&nbsp;||&nbsp;");

//    document.writeln("<a href=\"javascript:annotateBlueCircle();\"                                  ><img id=\"" + CTRL_ANNOTATE_CIRCLE_BLUE_IMG_ID       + "\" src=\"" + CTRL_ANNOTATE_CIRCLE_BLUE_IMG_FILE       + "\" title=\"Make Blue Circle Annotation\"       alt=\"Make Blue Circle Annotation\"    border=\"0\"></a>");
//    document.writeln("<a href=\"javascript:annotateGreenCircle();\"                                 ><img id=\"" + CTRL_ANNOTATE_CIRCLE_GREEN_IMG_ID      + "\" src=\"" + CTRL_ANNOTATE_CIRCLE_GREEN_IMG_FILE      + "\" title=\"Make Green Circle Annotation\"      alt=\"Make Green Circle Annotation\"   border=\"0\"></a>");
//    document.writeln("<a href=\"javascript:annotateRedCircle();\"                                   ><img id=\"" + CTRL_ANNOTATE_CIRCLE_RED_IMG_ID        + "\" src=\"" + CTRL_ANNOTATE_CIRCLE_RED_IMG_FILE        + "\" title=\"Make Red Circle Annotation\"        alt=\"Make Red Circle Annotation\"     border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateYellowCircle();\"                                ><img id=\"" + CTRL_ANNOTATE_CIRCLE_YELLOW_IMG_ID     + "\" src=\"" + CTRL_ANNOTATE_CIRCLE_YELLOW_IMG_FILE     + "\" title=\"Make Yellow Circle Annotation\"     alt=\"Make Yellow Circle Annotation\"  border=\"0\"></a>&nbsp;||&nbsp;");

    document.writeln("<a href=\"javascript:annotateBlueText();\"                                    ><img id=\"" + CTRL_ANNOTATE_TEXT_BLUE_IMG_ID         + "\" src=\"" + CTRL_ANNOTATE_TEXT_BLUE_IMG_FILE         + "\" title=\"Make Blue Text Annotation\"         alt=\"Make Blue Text Annotation\"      border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateGreenText();\"                                   ><img id=\"" + CTRL_ANNOTATE_TEXT_GREEN_IMG_ID        + "\" src=\"" + CTRL_ANNOTATE_TEXT_GREEN_IMG_FILE        + "\" title=\"Make Green Text Annotation\"        alt=\"Make Green Text Annotation\"     border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateRedText();\"                                     ><img id=\"" + CTRL_ANNOTATE_TEXT_RED_IMG_ID          + "\" src=\"" + CTRL_ANNOTATE_TEXT_RED_IMG_FILE          + "\" title=\"Make Red Text Annotation\"          alt=\"Make Red Text Annotation\"       border=\"0\"></a>");
    document.writeln("<a href=\"javascript:annotateYellowText();\"                                  ><img id=\"" + CTRL_ANNOTATE_TEXT_YELLOW_IMG_ID       + "\" src=\"" + CTRL_ANNOTATE_TEXT_YELLOW_IMG_FILE       + "\" title=\"Make Yellow Text Annotation\"       alt=\"Make Yellow Text Annotation\"    border=\"0\"></a>&nbsp;||&nbsp;");

}//writeControls


// writeBehaviors                                                                                         writeBehaviors
// ---------------------------------------------------------------------------------------------------------------------
// * writes the behavior bar in the web page
function writeBehaviors(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Wandering:</span>");
    document.writeln("<a href=\"javascript:makeAllWandering();\"><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">All</span></a>");
    document.writeln("<a href=\"javascript:startWandering(0);\" ><span style=\"color:#0000bb; font-family:arial; font-size:8pt; font-weight:bold;\">One</span></a>");
    document.writeln("<a href=\"javascript:stopWandering(0);\"  ><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Stop</span></a>&nbsp;||&nbsp;");

}//writeBehaviors


// writeMASHApplet                                                                                       writeMASHApplet
// ---------------------------------------------------------------------------------------------------------------------
// * writes the control bar in the web page
function writeMASHApplet(activeAutoParse, parameters, warpFilesLocation){


    //set auto parse flag
    if(!activeAutoParse) { spatialParserActive = false; }
    else                 { spatialParserActive = true;  }

    //validate location of WARP files
    if(!warpFilesLocation){
        warpFilesLocation = MASH_APPLET_CODEBASE;
    }

    //creat the applet and its controls
    document.writeln("<applet id=\""+MASH_APPLET_NAME+"\" name=\""+MASH_APPLET_NAME+"\" width=\"120\" height=\"20\" code=\""+MASH_APPLET_CODE+"\" codebase=\""+warpFilesLocation+"\" style=\"border-width:2; border-color:#888888;\" mayscript>");
    if( (parameters) && (parameters!="") ) {
        document.writeln("<param name=\"PARAMETERS\" value=\""+parameters+"\">");
    }
    document.writeln("</applet>");

    document.writeln("&nbsp;||&nbsp;<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Controls:</span>");
    document.writeln("<a href=\"javascript:showSpatialParserControls();\"><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Show</span></a>&nbsp;");

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Parse:</span>");
    document.writeln("<a href=\"javascript:parseLocalNow();\"          ><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">Local</span></a>");
    document.writeln("<a href=\"javascript:parseSpaceNow();\"          ><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Global</span></a>");
    document.writeln("<a href=\"javascript:deleteSpatialObjects();\"   ><span style=\"color:#ff0000; font-family:arial; font-size:8pt; font-weight:bold;\">Clear</span></a>&nbsp;||&nbsp;");

//    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Auto-parse:</span>");
//    document.writeln("<a href=\"javascript:activateSpatialParser();\"  ><span style=\"color:#00ff00; font-family:arial; font-size:8pt; font-weight:bold;\">ON</span></a>");
//    document.writeln("<a href=\"javascript:deactivateSpatialParser();\"><span style=\"color:#ff0000; font-family:arial; font-size:8pt; font-weight:bold;\">OFF</span></a>&nbsp;&nbsp;");

//    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Mode:</span>");
//    document.writeln("<a href=\"javascript:setVerboseMode(false);\"    ><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">Concise</span></a>");
//    document.writeln("<a href=\"javascript:setVerboseMode(true);\"     ><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Verbose</span></a>&nbsp;&nbsp;");

//    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Complexity:</span>");
//    document.writeln("<a href=\"javascript:setComplexity();\"        ><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Set</span></a>&nbsp;||&nbsp;");

    document.writeln("<a href=\"javascript:adaptNow();\"             ><span style=\"color:#0000cc; font-family:arial; font-size:8pt; font-weight:bold;\">Adapt</span></a>");
    document.writeln("<a href=\"javascript:unadapt(allMASHObjects);\"><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Unadapt</span></a>&nbsp;||&nbsp;");

//    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Explanations:</span>");
//    document.writeln("<a href=\"javascript:showExplanations('Explanations', 'allMASHObjects', true);\"><span style=\"color:#0000cc; font-family:arial; font-size:8pt; font-weight:bold;\">Show</span></a>");
//    document.writeln("<a href=\"javascript:hideExplanations('Explanations', 'allMASHObjects', true);\"><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">Hide</span></a>&nbsp;||&nbsp;");

//    document.writeln("<a href=\"javascript:testParameters();\"><span style=\"color:#000088; font-family:arial; font-size:8pt; font-weight:bold;\">test XML parameters</span></a>&nbsp;||&nbsp;");

}//writeMASHApplet






// testParameters                                                                                         testParameters
// ---------------------------------------------------------------------------------------------------------------------
function testParameters() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var mashXML = "";
        for(var i=0; i<allMASHObjects.length; i++) {
            var obj = allMASHObjects[i];
            mashXML += obj.toXML();
        }
        mashApplet.updateMashXML(mashXML);
    }

}//testParameters



// =====================================================================================================================
// Adaptation Methods                                                                                 Adaptation Methods
// =====================================================================================================================
// * these functions support the calling the adaptation methods

var annotationsFlag = true;

// setDefault_ObjectConflictResolutionMethhod                                 setDefault_ObjectConflictResolutionMethhod
// ---------------------------------------------------------------------------------------------------------------------
// * this function must be CALLED BEFORE the objects are declared!!!
function setDefault_ObjectConflictResolutionMethhod(methodName) {

    MASH_Object.DEFAULT_OBJECT_CONFLICT_RESOLUTION = methodName;

}//setDefault_ObjectConflictResolutionMethhod



// toggleAnnotations                                                                                   toggleAnnotations
// ---------------------------------------------------------------------------------------------------------------------
function toggleAnnotations(annotationType) {

    var imgObj = document.getElementById(CTRL_ANNOTATE_SHOW_IMG_ID);
    if(annotationsFlag == true) {
        hideAnnotations(annotationType);
        annotationsFlag = false;
        imgObj.src      = CTRL_ANNOTATE_HIDE_IMG_FILE;
    }
    else {
        showAnnotations(annotationType);
        annotationsFlag = true;
        imgObj.src      = CTRL_ANNOTATE_SHOW_IMG_FILE;
    }

}//toggleAnnotations


// showAnnotations                                                                                       showAnnotations
// ---------------------------------------------------------------------------------------------------------------------
function showAnnotations(annotationType) {

//    alert("showAnnotations("+annotationType+", " +objID+");");

    for(var i=0; i<annotationObjects.length; i++) {
        var obj = annotationObjects[i];
        if((annotationType == MASH_UserAnnotation.ALL_ANNOTATIONS) ||
           (annotationType == obj.type)                            ){

           obj.wrapperObj.style.visibility = "visible";
        }
    }//for i

}//showAnnotations


// hideAnnotations                                                                                       hideAnnotations
// ---------------------------------------------------------------------------------------------------------------------
function hideAnnotations(annotationType) {

//    alert("hideAnnotations("+annotationType+");");

    for(var i=0; i<annotationObjects.length; i++) {
        var obj = annotationObjects[i];
        if((annotationType == MASH_UserAnnotation.ALL_ANNOTATIONS) ||
           (annotationType == obj.type)                            ){

           obj.wrapperObj.style.visibility = "hidden";
        }
    }//for i

}//hideAnnotations



// showExplanations                                                                                     showExplanations
// ---------------------------------------------------------------------------------------------------------------------
function showExplanations(annotationType, objID, showComponentsExplanations) {

//    alert("showExplanations("+annotationType+", " +objID+");");

    var obj        = null;
    var components = null;
    if(objID == "allMASHObjects") { var components = allMASHObjects; }
    else                          { var components = findObjectByID(objID).components; }

    if(components) {
        for(var i=0; i<components.length; i++) {
            comp = components[i];
            if(comp.id.indexOf("Explanation") == 0) { comp.wrapperObj.style.visibility = "visible"; }
            //check if should traverse down the object hierarchy
            if((showComponentsExplanations) && (showComponentsExplanations == true) ) { showExplanations(annotationType, comp.id, showComponentsExplanations); }
        }
    }
}//showExplanations


// hideExplanations                                                                                     hideExplanations
// ---------------------------------------------------------------------------------------------------------------------
function hideExplanations(annotationType, objID, hideComponentsExplanations) {

//    alert("hideExplanations("+annotationType+", " +objID+");");

    var obj        = null;
    var components = null;
    if(objID == "allMASHObjects") { var components = allMASHObjects; }
    else                          { var components = findObjectByID(objID).components; }

    if(components) {
        for(var i=0; i<components.length; i++) {
            comp = components[i];
            if(comp.id.indexOf("Explanation") == 0) { comp.wrapperObj.style.visibility = "hidden"; }
            //check if should traverse down the object hierarchy
            if((hideComponentsExplanations) && (hideComponentsExplanations == true) ) { hideExplanations(annotationType, comp.id, hideComponentsExplanations); }
        }
    }
}//hideExplanations



// =====================================================================================================================
// Spatial Parser                                                                                         Spatial Parser
// =====================================================================================================================
// * these functions support the output of the spatial parser

var spatialParserActive = true;


// showSpatialParserControls                                                                   showSpatialParserControls
// ---------------------------------------------------------------------------------------------------------------------
function showSpatialParserControls() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var spatialParserControls = new MASH_ControlMenu(1,1, mashApplet);
        var tmpObj                = MASH_Object.createObject(spatialParserControls, null);
    }

}//showSpatialParserControls


// activateSpatialParser                                                                           activateSpatialParser
// ---------------------------------------------------------------------------------------------------------------------
function activateSpatialParser() {
    spatialParserActive = true;
}//activateSpatialParser


// deactivateSpatialParser                                                                       deactivateSpatialParser
// ---------------------------------------------------------------------------------------------------------------------
function deactivateSpatialParser() {
    spatialParserActive = false;
}//deactivateSpatialParser


// setComplexity                                                                                           setComplexity
// ---------------------------------------------------------------------------------------------------------------------
function setComplexity() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var oldValue = mashApplet.getMaximumComplexity();
        var newValue = prompt("Please enter the new complexity level:\n"     +
                              "MUST be an integer ("                         +
                              "Negative = "                                  +
                              "find all implicit parents || "                +
                              "Positive = "                                  +
                              "maximum level of implicit parents)", oldValue);

        mashApplet.setMaximumComplixity(parseInt(newValue));
    }

}//setComplexity


// setVerboseMode                                                                                         setVerboseMode
// ---------------------------------------------------------------------------------------------------------------------
function setVerboseMode(newValue) {
     MASH_ImplicitComposite.setVerboseMode(newValue);
}//setVerboseMode


// adaptNow                                                                                                     adaptNow
// ---------------------------------------------------------------------------------------------------------------------
function adaptNow() {
    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) { mashApplet.adapt(); }
}//adaptNow


// unadapt                                                                                                       unadapt
// ---------------------------------------------------------------------------------------------------------------------
function unadapt(objects) {
    for(var i=0; i<objects.length; i++) {
        objects[i].normal();
        if(objects[i].components) { unadapt(objects[i].components); }
    }
}//unadapt


// parseLocalNow                                                                                           parseLocalNow
// ---------------------------------------------------------------------------------------------------------------------
function parseLocalNow() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        deleteSpatialObjects();
        try {
            mashApplet.parse();
        }
        catch(e) {
        }
    }

}//parseLocalNow


// parseSpaceNow                                                                                           parseSpaceNow
// ---------------------------------------------------------------------------------------------------------------------
function parseSpaceNow() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        deleteSpatialObjects();
        try {
            mashApplet.parse();
        }
        catch(e) {
        }
    }

}//parseSpaceNow


// parseSpace                                                                                                 parseSpace
// ---------------------------------------------------------------------------------------------------------------------
function parseSpace() {

    if(spatialParserActive == false) { return; }

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        deleteSpatialObjects();
        try {
            mashApplet.parse();
        }
        catch(e) {
        }
    }

}//parseSpace


// deleteSpatialObjects                                                                             deleteSpatialObjects
// ---------------------------------------------------------------------------------------------------------------------
function deleteSpatialObjects(){

    //remove objects from screen
    for(var i=0; i<implicitComposites.length; i++) {
        var tmpObj = implicitComposites[i].reference;
        tmpObj.parentNode.removeChild(tmpObj);
    }

    //delete objects
    implicitComposites = new Array();

}//deleteSpatialObjects


// addCompositeToDocument                                                                         addCompositeToDocument
// ---------------------------------------------------------------------------------------------------------------------
// * appends a new composite object to this document
function addCompositeToDocument(objID, left, top, width, height, z, style, text){

    var tmpObj;
    var objWrapper;

    tmpObj     = new MASH_ImplicitComposite(objID, left,  top,  width,  height, z, style, text);
    objWrapper = tmpObj.createScreenObject(0);
    objWrapper = document.body.appendChild(objWrapper);

    objWrapper.MASHparameters = tmpObj;
    tmpObj.reference          = objWrapper;

    implicitComposites.push(tmpObj);

}//addCompositeToDocument


// addCompositeToObject                                                                             addCompositeToObject
// ---------------------------------------------------------------------------------------------------------------------
// * appends a new composite object to the object specified by objID
function addCompositeToObject(objID, left, top, width, height, z, style, text){

//    alert("found obj "+objID );

    var tmpObj = null
    var objWrapper;

    tmpObj = findObjectByID(objID);
    if(tmpObj == null) {
        alert("not found obj "+objID + "\n"+tmpObj);
        return;
    }

//    alert("found obj "+objID + "\n"+tmpObj.text);

    tmpComposite = new MASH_ImplicitComposite(objID, left,  top,  width,  height, z, style, text);
    objWrapper   = tmpComposite.createScreenObject(0);
    objWrapper   = tmpObj.innerObj.appendChild(objWrapper);

    objWrapper.MASHparameters = tmpComposite;
    tmpComposite.reference    = objWrapper;

//    alert("Adding "+tmpComposite.text + " to Collection "+tmpObj.text);

    implicitComposites.push(tmpComposite);

}//addCompositeToObject


// makeCompositesTranslucent                                                                   makeCompositesTranslucent
// ---------------------------------------------------------------------------------------------------------------------
// * makes all composite translucent
// * this function is called from the applet due to some race conditions on some browsers
function makeCompositesTranslucent(alphaValue){
    if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
        return;
    }
    for(var i=0; i<implicitComposites.length; i++) {
        implicitComposites[i].alpha(alphaValue);
    }

}//makeCompositesTranslucent


// findImplicitCompositeByID                                                                   findImplicitCompositeByID
// ---------------------------------------------------------------------------------------------------------------------
// * searchs for an implicit composite object with the specified ID
// * return the implicitComposite objecti if it's found
// * return null if it's mot found
//   (this is a depth-first search)
function findImplicitCompositeByID(tmpID){

    for(var i=0; i<implicitComposites.length; i++){

        //search top level objects
        if(implicitComposites[i].id == tmpID) {
            return implicitComposites[i];
        }
    }

    //if it didn't find it, return false
    return null;

}//findImplicitCompositeByID



// findObjectByID                                                                                         findObjectByID
// ---------------------------------------------------------------------------------------------------------------------
// * searchs for a MASH object with the specified ID
// * return the MASH objecti if it's found
// * return null if it's nmot found
//   (this is a depth-first search)
function findObjectByID(tmpID){

    for(var i=0; i<allMASHObjects.length; i++){

        //search top level objects
        if(allMASHObjects[i].id == tmpID) {
            return allMASHObjects[i];
        }
        else {
            //search inside composite objects
            if(allMASHObjects[i].components) {
                var objFound = allMASHObjects[i].findObjectByID(tmpID);
                if(objFound != null) {
                    return objFound;
                }
            }
        }
    }


    //if it didn't find it, look inside implicitComposites (returns null if not found)
    return findImplicitCompositeByID(tmpID);

}//findObjectByID



// =====================================================================================================================
// Import/Export                                                                                            ImportExport
// =====================================================================================================================
// * these functions are the key for supporting the transference of MASH_Objects between MASH_Documents
// * these functions are part of the global scope


// addObject                                                                                                   addObject
// ---------------------------------------------------------------------------------------------------------------------
// * adds tmpObj at the end of allMASHObjects
function addObject(tmpObj){
    allMASHObjects.push(tmpObj);
}//addObject



// removeObject                                                                                             removeObject
// ---------------------------------------------------------------------------------------------------------------------
// * searchs for tmpObj insde allMASHObjects
// * if it finds it, then it removes it and returns true
// * if it doesn't find it, then returns false
function removeObject(tmpObj){

//    alert("removeObject\n---------\n"+tmpObj);

    //serach for tmpObj (this is a depth-first search)
    var i=0;
    for(i=0; i<allMASHObjects.length; i++){
        //search top level objects
        if(allMASHObjects[i] == tmpObj) {
            //remove tmpObj
            allMASHObjects.splice(i,1);
            return true;
        }

        //search inside composite objects
        if(allMASHObjects[i].components) {
            if(allMASHObjects[i].removeComponent(tmpObj)) { return true; }
        }
    }

    //if it didn't find it, return false
    return false;

}//removeObject



// transferObject                                                                                         transferObject
// ---------------------------------------------------------------------------------------------------------------------
// * if(keepDragging == true) then the object should be be dragged in the new document
function transferObject(tmpWindowSource, tmpWindowTarget, tmpEventObj, tmpClickX, tmpClickY, tmpOffsetX, tmpOffsetY, keepDragging){

    var tmpIndex        = -1;
    var tmpObjectIndex  = -1;
    var tmpObjectArray  = null;

    //frames
    if((tmpIndex = tmpEventObj.id.indexOf(MASH_Frame.ID_PREFIX)) == 0) {
        tmpObjectArray  = frameObjects;
        tmpObjectIndex  = tmpEventObj.objectIndex;
    }

    //texts
    else if((tmpIndex = tmpEventObj.id.indexOf(MASH_Text.ID_PREFIX)) == 0) {
        tmpObjectArray  = textObjects;
        tmpObjectIndex  = tmpEventObj.objectIndex;

    }

    //images
    else if((tmpIndex = tmpEventObj.id.indexOf(MASH_Image.ID_PREFIX)) == 0) {
        tmpObjectArray  = imageObjects;
        tmpObjectIndex  = tmpEventObj.objectIndex;
    }

    //collection objects
    else if((tmpIndex = tmpEventObj.id.indexOf(MASH_Collection.ID_PREFIX)) == 0) {
        tmpObjectArray  = collectionObjects;
        tmpObjectIndex  = tmpEventObj.objectIndex;
    }

    //external objects
    else if((tmpIndex = tmpEventObj.id.indexOf(MASH_Object.IMPORTED_ID_PREFIX)) == 0) {
        tmpObjectArray  = importedObjects;
        tmpObjectIndex  = tmpEventObj.importedIndex;
    }

    //other stuff
    else {
        alert("Current Import/Export support is available only for" + "\n"  +
              "TEXT, IMAGE and FRAME objects"                       + "\n"  +
              ""                                                            );
        return;
    }
    var tmpObjSpecs = tmpObjectArray[tmpObjectIndex];
/*
    alert("transferObject 1\ntmpEventObj = " + tmpEventObj + "\n----\ntmpObjSpecs\n"+tmpObjSpecs);
    if(tmpObjSpecs.components) {
        var tmpstr = "transferObject\n--------\n";
        for(var j=0; j<tmpObjSpecs.components.length; j++) {
            tmpstr += tmpObjSpecs.components[j].reference.id + "\n";
        }
        alert(tmpstr);
    }
*/
    //export / import functions MUST be called in this order
    tmpWindowSource.exportObject(tmpEventObj, tmpObjSpecs);
    tmpWindowTarget.importObject(MASH_DOCUMENT_NAME, tmpEventObj, tmpObjSpecs, tmpClickX, tmpClickY, tmpOffsetX, tmpOffsetY, keepDragging);


}//transferObject


// importObject                                                                                             importObject
// ---------------------------------------------------------------------------------------------------------------------
// IMPORTANT: * Notice that the clone is being created by calling the Class Method clone
//              this is in order to use the proper global context (document to which is being imported)
//            * The instance method clone would work in the instance context (original document of the instance)
//              this in turn will cause an error when trying to append it to the new document (to which is being imported)
// * if(keepDragging == true) then the object should be be dragged in the new document
function importObject(tmpOriginDocName, tmpObj, tmpObjSpecs, tmpClickX, tmpClickY, tmpOffsetX, tmpOffsetY, keepDragging){

//    alert("tmpObjSpecs\n--------------\n"+tmpObjSpecs);

    var objWrapper;
    var cloneObj    = MASH_Object.clone(tmpObjSpecs);

    var tmpZoom     = getDocumentZoomFactor();
    //Adjust object's coordinates to this document coordinate system
    cloneObj.left   = (tmpClickX - tmpOffsetX) / tmpZoom;
    cloneObj.top    = (tmpClickY - tmpOffsetY) / tmpZoom;


    //create and append object
    objWrapper  = cloneObj.createScreenObject(tmpObj.objectIndex);
    objWrapper  = document.body.appendChild(objWrapper);

    //set the import variables (these are not copied by the clone function)

    //if the object has been exported before
    if(!tmpObjSpecs.imported) {
        //backup the original MASH parameters
        cloneObj.originalDocName    = tmpOriginDocName;
        cloneObj.originalIndex      = tmpObj.objectIndex;
        cloneObj.originalID         = tmpObj.id;
        cloneObj.imported           = true;
    }
    else {
        //copy the import MASH parameters
        cloneObj.originalDocName    = tmpObjSpecs.originalDocName;
        cloneObj.originalIndex      = tmpObjSpecs.originalIndex;
        cloneObj.originalID         = tmpObjSpecs.originalID;
        cloneObj.imported           = tmpObjSpecs.imported;
    }

/*
  THIS SECTION WAS COMMENTED IN ORDER TO AVOID SOME POSIBLE ISSUES OF IMPORT EXPORT
  - once an object has been exported, it could have been modified in the other MASH page
    when the object return it can have different components, behaviors, etc.
  - thus it is better to consider it as foregin no matter what!

    //check if the object is returning to it's original document
    if(tmpObjSpecs.originalDocName == MASH_DOCUMENT_NAME) {

        //restore original MASH parameters
        cloneObj = MASH_Object.getArray(cloneObj)[tmpObjSpecs.originalIndex];

        //adjust object's attributes
        objWrapper.id               = tmpObjSpecs.originalID;
        objWrapper.importedIndex    = null;
    }
    //if this document was NOT originally from this document then ADD it to imported objects
    else {
*/
        //store object in the Imported Objects Array
        var totalImportedObjects = importedObjects.length;
        importedObjects.push(cloneObj);

        //adjust object's attributes
        objWrapper.id               = MASH_Object.IMPORTED_ID_PREFIX + tmpObj.id;
        objWrapper.importedIndex    = totalImportedObjects;
//    }

    //cross reference the parameters with the screen object
    objWrapper.MASHparameters   = cloneObj;
    cloneObj.reference          = objWrapper;

    //put object on top
    objWrapper.style.zIndex = ++topZ;

    //add to allMASHObjects
    addObject(cloneObj);

    //check if the object should be dragged in this document
    if(keepDragging == true) { keepDraggingObject(objWrapper, (tmpClickX/tmpZoom), (tmpClickY/tmpZoom)); }

}//importObject




// exportObject                                                                                             exportObject
// ---------------------------------------------------------------------------------------------------------------------
function exportObject(tmpObj, tmpObjSpecs) {

//    alert("exportObject\ntmpObj = " + tmpObj + "\n----\ntmpObjSpecs\n"+tmpObjSpecs);

    var tmpObjID = tmpObj.id;

    //remove screen object from this document
    var tmpExportObj = document.getElementById(tmpObjID);
    tmpExportObj.parentNode.removeChild(tmpExportObj);

    //remove from allMASHObjects
    removeObject(tmpObjSpecs);

}//exportObject




// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================


//Determine the browser type
var browserType     = navigator.appName;
var dotPos          = navigator.appVersion.indexOf(".");
var browserVersion  = navigator.appVersion.substring(0,dotPos);

var isNetscape, isIE;
if(browserType == "Netscape")                    { isNetscape = true; } else { isNetscape = false; }
if(browserType == "Microsoft Internet Explorer") { isIE       = true; } else { isIE       = false; }

//    alert("Determine the browser type"                  +
//          "\n isIE = "              + isIE              +
//          "\n isNetscape = "        + isNetscape        +
//          "\n browserType = "       + browserType       +
//          "\n navigator.appName = " + navigator.appName +
//          "\n "          );



// =====================================================================================================================
// BROWSER SPECIFIC: DOM Objects                                                           BROWSER SPECIFIC: DOM Objects
// =====================================================================================================================



// getDocumentZoomFactor                                                                           getDocumentZoomFactor
// ---------------------------------------------------------------------------------------------------------------------
// * This applies only to IE
// * IE is the only browser that supports the zoom method
function getDocumentZoomFactor(){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        return 1.0;
    }

    //IE                                                                                                          IE
    else if(isIE)  {
        if( (document.body.style.zoom === undefined)        ||
            (document.body.style.zoom == null)              ||
            (isNaN(parseFloat(document.body.style.zoom)))   ){
            return 1.0;
        }
        return document.body.style.zoom;
    }

}//getDocumentZoomFactor



// enableScrollbarsControl                                                                       enableScrollbarsControl
// ---------------------------------------------------------------------------------------------------------------------
// * enables showing and hiding the scrollbars in the window in Netscape
// * used by maximizeCollection
function enableScrollbarsControl(){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserWrite');
            window.scrollbars.visible.set = true;
        }
        catch (e) {
        }
    }

    //IE                                                                                                          IE
    else if(isIE)  {
    }

}//enableScrollbarsControl



// showScrollbars                                                                                         showScrollbars
// ---------------------------------------------------------------------------------------------------------------------
// * shows or hides the scrollbars in the window
// * used by maximizeCollection
function showScrollbars(tmpShow){

    //Netscape                                                                                              Netscape
    if(isNetscape) { window.scrollbars.visible = tmpShow; }

    //IE                                                                                                          IE
    else if(isIE)  {
        if(tmpShow) { document.body.scroll = "auto"; }
        else        { document.body.scroll = "no";   }
    }

}//showScrollbars



// adjustSize                                                                                                 adjustSize
// ---------------------------------------------------------------------------------------------------------------------
function adjustSize(objSize, objBorderWidth){

    if(isNetscape)  { return (objSize - (objBorderWidth * 2) ); }
    else if(isIE)   { return objSize;                           }

}//adjustSize



// getObjectCurrentWidth                                                                           getObjectCurrentWidth
// ---------------------------------------------------------------------------------------------------------------------
function getObjectCurrentWidth(obj){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        //get the border dimensions
        var objBorderLeft       = parseFloat(obj.style.borderLeftWidth);
        var objBorderRight      = parseFloat(obj.style.borderRightWidth);

        var objBorderHorizontal = objBorderLeft + objBorderRight;

        var tmpCurrentWidth     = parseFloat(obj.style.width);
        if(isNaN(tmpCurrentWidth)) {
            tmpCurrentWidth     = obj.offsetWidth;
            obj.style.width     = obj.offsetWidth;
        }

        if(objBorderHorizontal > 0) { return tmpCurrentWidth - objBorderHorizontal; }
        else                        { return tmpCurrentWidth; }
    }

    //IE                                                                                                          IE
    else if(isIE)  {

        tmpCurrentWidth = parseFloat(obj.style.width);
        if(isNaN(tmpCurrentWidth)) {
            tmpCurrentWidth = obj.offsetWidth;
            obj.style.width = obj.offsetWidth;
        }
        return tmpCurrentWidth;
    }

}//getObjectCurrentWidth



// getObjectCurrentHeight                                                                         getObjectCurrentHeight
// ---------------------------------------------------------------------------------------------------------------------
function getObjectCurrentHeight(obj){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        //get the border dimensions
        var objBorderTop        = parseFloat(obj.style.borderTopWidth);
        var objBorderBottom     = parseFloat(obj.style.borderBottomWidth);

        var objBorderVertical   = objBorderTop + objBorderBottom;

        var tmpCurrentHeight    = parseFloat(obj.style.height);
        if(isNaN(tmpCurrentHeight)) {
            tmpCurrentHeight    = obj.offsetHeight;
            obj.style.height    = obj.offsetHeight;
        }

        if(objBorderVertical > 0) { return tmpCurrentHeight - objBorderVertical; }
        else                      { return tmpCurrentHeight;                     }
    }

    //IE                                                                                                          IE
    else if(isIE)  {

        tmpCurrentHeight = parseFloat(obj.style.height);
        if(isNaN(tmpCurrentHeight)) {
            tmpCurrentHeight = obj.offsetHeight;
            obj.style.height = obj.offsetHeight;
        }
        return tmpCurrentHeight;
    }

}//getObjectCurrentHeight



// getWindowWidth                                                                                         getWindowWidth
// ---------------------------------------------------------------------------------------------------------------------
function getWindowWidth(){
    if(isNetscape) { return window.innerWidth;          }
    else if(isIE)  { return document.body.clientWidth;  }
}//getWindowWidth



// getWindowHeight                                                                                       getWindowHeight
// ---------------------------------------------------------------------------------------------------------------------
function getWindowHeight(){
    if(isNetscape) { return window.innerHeight;          }
    else if(isIE)  { return document.body.clientHeight;  }
}//getWindowHeight



// getScrollOffsetX                                                                                     getScrollOffsetX
// ---------------------------------------------------------------------------------------------------------------------
function getScrollOffsetX(tmpObj){
    if(isNetscape) { return tmpObj.pageXOffset;             }
    else if(isIE)  { return tmpObj.document.body.scrollLeft;}
}//getScrollOffsetX



// getScrollOffsetY                                                                                     getScrollOffsetY
// ---------------------------------------------------------------------------------------------------------------------
function getScrollOffsetY(tmpObj){

    if(isNetscape) { return tmpObj.pageYOffset;             }
    else if(isIE)  { return tmpObj.document.body.scrollTop; }

}//getScrollOffsetY



// getTargetOffsetX                                                                                     getTargetOffsetX
// ---------------------------------------------------------------------------------------------------------------------
// * Returns the distance between the MOUSE EVENT and the LEFT BORDER of the srcElement that generetaed the event
// * However, Netscape does not support this property of the events, thus returns 0
function getTargetOffsetX(e){
    if(isNetscape) { return 0;          }
    else if(isIE)  { return e.offsetX;  }
}//getTargetOffsetX



// getTargetOffsetY                                                                                     getTargetOffsetY
// ---------------------------------------------------------------------------------------------------------------------
// * Returns the distance between the MOUSE EVENT and the TOP BORDER of the srcElement that generetaed the event
// * However, Netscape does not support this property of the events, thus returns 0
function getTargetOffsetY(e){
    if(isNetscape) { return 0;          }
    else if(isIE)  { return e.offsetY;  }
}//getTargetOffsetY



// getWindowScrollX                                                                                     getWindowScrollX
// ---------------------------------------------------------------------------------------------------------------------
// * returns the number of pixels that the window has scrolled to the right
function getWindowScrollX(){
    if(isNetscape) { return window.pageXOffset;         }
    else if(isIE)  { return document.body.scrollLeft;   }

}//getWindowScrollX



// getWindowScrollY                                                                                     getWindowScrollY
// ---------------------------------------------------------------------------------------------------------------------
// * returns the number of pixels that the window has scrolled down
function getWindowScrollY(){
    if(isNetscape) { return window.pageYOffset;         }
    else if(isIE)  { return document.body.scrollTop;    }

}//getWindowScrollY




// =====================================================================================================================
// BROWSER SPECIFIC: Events                                                                     BROWSER SPECIFIC: Events
// =====================================================================================================================

// Constant values for the mouse buttons
// - according to DOM 2 model
// - getMouseButton compensates the discrepancies amongst browsers
var MOUSE_LEFT_BUTTON   = 0;
var MOUSE_MIDDLE_BUTTON = 1;
var MOUSE_RIGHT_BUTTON  = 2;


// disable context menu
// - this allows me to take provide my own context menu
document.oncontextmenu = new Function("return false");


// validateEventObject                                                                               validateEventObject
// ---------------------------------------------------------------------------------------------------------------------
// * validate that we have the event object
//      (this compensates for using DOM 2 and IE event models
function validateEventObject(e){
    if(isNetscape) { return e;              }
    else if(isIE)  { return window.event;   }
}//validateEventObject


// getMouseButton                                                                                         getMouseButton
// ---------------------------------------------------------------------------------------------------------------------
// normalize the return values such that both IE and Netscape return the same value
//
// * this function assumes that the event object has been validated with
//       e = validateEventObject(e);
function getMouseButton(e){
    if(isNetscape) {
        return e.button;
    }
    else if(isIE)  {
         //one button pressed
         if(e.button == 1) { return MOUSE_LEFT_BUTTON;   }
         if(e.button == 2) { return MOUSE_RIGHT_BUTTON;  }
         if(e.button == 4) { return MOUSE_MIDDLE_BUTTON; }
         //multiple buttons pressed
         if(e.button == 3) { return MOUSE_LEFT_BUTTON;   }
         if(e.button == 5) { return MOUSE_LEFT_BUTTON;   }
         if(e.button == 6) { return MOUSE_RIGHT_BUTTON;  }
         if(e.button == 7) { return MOUSE_LEFT_BUTTON;   }

         return MOUSE_LEFT_BUTTON;
    }
}//getMouseButton


// getCurrentTarget                                                                                     getCurrentTarget
// ---------------------------------------------------------------------------------------------------------------------
// the case of IE has been designed specifically for this page
// the case of Netscape will work for all pages
//
// * this function assumes that the event object has been validated with
//       e = validateEventObject(e);
function getCurrentTarget(e){
    if(isNetscape) {
//        return e.currentTarget;
        var objTemp   = e.currentTarget;

        //make sure that we get the <DIV> and not the element inside of it
        window.status = "object = " +objTemp.id + "  z = "+objTemp.style.zIndex;

        //fakes the event propagation (bubbling up) to the wrapper div
        while((objTemp.parentNode) && (objTemp.id.indexOf(MASH_Object.ID_PREFIX)!=0)) {
            objTemp = objTemp.parentNode;
        }
        return objTemp;
    }
    else if(isIE)  {
        var objTemp   = e.srcElement;

        //make sure that we get the <DIV> and not the element inside of it
        window.status = "object = " +objTemp.id + "  z = "+objTemp.style.zIndex;

        //fakes the event propagation (bubbling up) to the wrapper div
        while((objTemp.parentElement) && (objTemp.id.indexOf(MASH_Object.ID_PREFIX)!=0)) {
            objTemp = objTemp.parentElement;
        }
        return objTemp;
    }
}//getCurrentTarget


// getTarget                                                                                                   getTarget
// ---------------------------------------------------------------------------------------------------------------------
// * this function assumes that the event object has been validated with
//       e = validateEventObject(e);
function getTarget(e){
    if(isNetscape) { return e.target;       }
    else if(isIE)  { return e.srcElement;   }
}//getTarget


// addEventListener                                                                                     addEventListener
// ---------------------------------------------------------------------------------------------------------------------
// * add events listener to tmpObj
// * tmpEventString is the name of the event
// * tmpListener is the function that will handle the event
// * tmpCapture is used only in Netscape
// * this function assumes that the event object has been validated with:
//       e = validateEventObject(e);
function addEventListener(tmpObj, tmpEventString, tmpListener, tmpCapture){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        tmpObj.addEventListener(tmpEventString, tmpListener, tmpCapture);
    }

    //IE                                                                                                          IE
    else if(isIE) {
        //  needs to modify the event string to fit the IE specification
        var tmpEventString = "on" + tmpEventString;
        tmpObj.attachEvent(tmpEventString, tmpListener);
    }

} //addEventListener


// removeEventListener                                                                               removeEventListener
// ---------------------------------------------------------------------------------------------------------------------
function removeEventListener(tmpObj, tmpEventString, tmpListener, tmpCapture){

    //Netscape                                                                                              Netscape
    if(isNetscape) {
        tmpObj.removeEventListener(tmpEventString, tmpListener, tmpCapture);
    }

    //IE                                                                                                          IE
    else if(isIE) {
        //  needs to modify the event string to fit the IE specification
        var tmpEventString = "on" + tmpEventString;
        tmpObj.detachEvent(tmpEventString, tmpListener);
    }

} //removeEventListener


// stopPropagation                                                                                       stopPropagation
// ---------------------------------------------------------------------------------------------------------------------
// * this function assumes that the event object has been validated with
//       e = validateEventObject(e);
function stopPropagation(e){
    if(isNetscape) { e.stopPropagation();   }
    else if(isIE)  { e.cancelBubble = true; }
}//stopPropagation


// preventDefault                                                                                         preventDefault
// ---------------------------------------------------------------------------------------------------------------------
// * this function assumes that the event object has been validated with
//       e = validateEventObject(e);
function preventDefault(e){

    if(!e) { return;}

    if(isNetscape) { e.preventDefault();    }
    else if(isIE)  { e.returnValue = false; }
}//preventDefault


// cancelDrag                                                                                                 cancelDrag
// ---------------------------------------------------------------------------------------------------------------------
// * IE:        setting wasDragged to false is necessary in IE of its bubble up event model
// * Netscape:  does nothing
function cancelDrag(objTmp) {
    if (isIE) { wasDragged = false; }
}//cancelDrag





// =====================================================================================================================
// MOUSE EVENTS                                                                                             MOUSE EVENTS
// =====================================================================================================================



//Global Variables
var objDrag      = null;     //object that is being dragged
var objX         = -1;       // left position of objDrag
var objY         = -1;       // top  postion of  objDrag
var wasDragged   = false;    //this is used by the onClick function to distinguish the a 'click' from a 'drag'
var topZ         = 1000;

var freezeSpace = false;


var scrollFlag  = false;

// keepDraggingObject                                                                                 keepDraggingObject
// ---------------------------------------------------------------------------------------------------------------------
// * this functions is used by the import/export features:
//   - it allows to keep draggin an object after it has been imported from another MASH_Document
function keepDraggingObject(tmpObj, tmpClickX, tmpClickY){

    //reset variables
    objDrag = tmpObj;
    objX    = tmpClickX;
    objY    = tmpClickY;

    //register events
    addEventListener(document, "mousemove", divMouseMove, true);
    addEventListener(document, "mouseup",   divMouseUp,   true);

}//keepDraggingObject



// divPropagateNoDefault                                                                           divPropagateNoDefault
// ---------------------------------------------------------------------------------------------------------------------
// * alows event propagation but
// * prevents the default action from happening
function divPropagateNoDefault(e){

    //validate that we have the event object (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);
    preventDefault(e);

}//divPropagateNoDefault



// divDrag                                                                                                       divDrag
// ---------------------------------------------------------------------------------------------------------------------
// * this function is used only for IE
// * stops event propagation and
// * prevents the default action from happening
function divDrag(e){

    //validate that we have the event object (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    stopPropagation(e);
    preventDefault(e);
    return false;

}//divDrag



// eventToString                                                                                           eventToString
// ---------------------------------------------------------------------------------------------------------------------
function eventToString(e){
    return  "e.type = "          + e.type           + "\n" +
            "e.target = "        + e.target         + "\n" +
            "e.currentTarget = " + e.currentTarget  + "\n" +
            "e.eventPhase = "    + e.eventPhase     + "\n" +
            "e.timeStamp = "     + e.timeStamp      + "\n" +
            "e.bubbles = "       + e.bubbles        + "\n" +
            "e.cancelable = "    + e.cancelable     + "\n" +
            "-------------------------------------" + "\n" +
            "e.view = "          + e.view           + "\n" +
            "e.detail = "        + e.detail         + "\n" +
            "-------------------------------------" + "\n" +
            "e.button = "        + e.button         + "\n" +
            "e.altKey = "        + e.altKey         + "\n" +
            "e.ctrlKey = "       + e.ctrlKey        + "\n" +
            "e.metaKey = "       + e.metaKey        + "\n" +
            "e.shiftKey = "      + e.shiftKey       + "\n" +
            "e.clientX = "       + e.clientX        + "\n" +
            "e.clientY = "       + e.clientY        + "\n" +
            "e.screenX = "       + e.screenX        + "\n" +
            "e.screenY = "       + e.screenY        + "\n" +
            "e.relatedTarget = " + e.relatedTarget  + "\n" +
            "" ;
}//eventToString



// getSrcElementOffset                                                                               getSrcElementOffset
// ---------------------------------------------------------------------------------------------------------------------
function getSrcElementOffset(tmpObj) {

    var tmpContainer;

    var retObj  = new Object();
    retObj.x    = parseInt(tmpObj.style.left);
    retObj.y    = parseInt(tmpObj.style.top);

    //check fto see if this object is nested inside collections and update the coordinates
    if(tmpObj.MASHparameters) {
        tmpContainer = tmpObj.MASHparameters.collection;
    }
    while((tmpContainer) && (tmpContainer != null) ){

        var accumulatedScale  = tmpContainer.MASHparameters.scale;
        retObj.x  *= accumulatedScale;
        retObj.y  *= accumulatedScale;

        //add the left and top values of the parent collection
        retObj.x  += parseInt(tmpContainer.wrapperObject.style.left) + parseInt(tmpContainer.wrapperObject.style.borderWidth) + parseInt(tmpContainer.style.left) - tmpContainer.scrollLeft;
        retObj.y  += parseInt(tmpContainer.wrapperObject.style.top)  + parseInt(tmpContainer.wrapperObject.style.borderWidth) + parseInt(tmpContainer.style.top)  - tmpContainer.scrollTop;
//        retObj.x  += parseInt(tmpContainer.wrapperObject.style.left) + parseInt(tmpContainer.wrapperObject.style.borderWidth) + parseInt(tmpContainer.style.left) - tmpContainer.scrollLeft;
//        retObj.y  += parseInt(tmpContainer.wrapperObject.style.top)  + parseInt(tmpContainer.wrapperObject.style.borderWidth) + parseInt(tmpContainer.style.top)  - tmpContainer.scrollTop;

        //check if this collection is also nested
        if(tmpContainer.wrapperObject.MASHparameters){ tmpContainer = tmpContainer.wrapperObject.MASHparameters.collection;  }
        else                                         { tmpContainer = null;                                                  }
    }

   return retObj;

}//getSrcElementOffset



// resizeTopLeftMouseDown                                                                         resizeTopLeftMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeTopLeftMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_TOP_LEFT;
    return false;
}//resizeTopLeftMouseDown



// resizeTopCenterMouseDown                                                                     resizeTopCenterMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeTopCenterMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_TOP_CENTER;
    return false;
}//resizeTopCenterMouseDown



// resizeTopRightMouseDown                                                                       resizeTopRightMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeTopRightMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_TOP_RIGHT;
    return false;
}//resizeTopRightMouseDown



// resizeMiddleLeftMouseDown                                                                   resizeMiddleLeftMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeMiddleLeftMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_MIDDLE_LEFT;
    return false;
}//resizeMiddleLeftMouseDown



// resizeMiddleRightMouseDown                                                                 resizeMiddleRightMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeMiddleRightMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_MIDDLE_RIGHT;
    return false;
}//resizeMiddleRightMouseDown



// resizeBottomLeftMouseDown                                                                   resizeBottomLeftMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeBottomLeftMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_BOTTOM_LEFT;
    return false;
}//resizeBottomLeftMouseDown



// resizeBottomCenterMouseDown                                                               resizeBottomCenterMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeBottomCenterMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_BOTTOM_CENTER;
    return false;
}//resizeBottomCenterMouseDown



// resizeBottomRightMouseDown                                                                 resizeBottomRightMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeBottomRightMouseDown(e){
    resizeMouseDown(e);
    objDrag.resizeControlClicked = RESIZE_BOTTOM_RIGHT;
    return false;
}//resizeBottomRightMouseDown



// resizeMouseDown                                                                                       resizeMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function resizeMouseDown(e){

    //delete objects created by the spatial parser
    deleteSpatialObjects();

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //initialize values
    objDrag     = getCurrentTarget(e).wrapperObj;
    objX        = e.clientX;
    objY        = e.clientY;
    wasDragged  = false;

    //Inform the user which object is being resized
//    window.status = "RESIZING object = " + objDrag.MASHparameters.id;
    objDrag.MASHparameters.emphasizeResizeButton();

    //This disables the default action for this event
    //  In particular it overrides the browser's default drag-and-drop behavior on images
    preventDefault(e);
    stopPropagation(e);

    addEventListener(document, "mousemove", resizeMouseMove, true);
    addEventListener(document, "mouseup",   resizeMouseUp,   true);

    //block mouseDown from forcing Maccintosh to show the contextual menu
    return false;

}//resizeMouseDown



// resizeMouseMove                                                                                       resizeMouseMove
// ---------------------------------------------------------------------------------------------------------------------
function resizeMouseMove(e){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //valiate that there is a selected object to be dragged
    if(objDrag != null) {

        //get the current position of the mouse and the zoom factor
        var dragX   = e.clientX;
        var dragY   = e.clientY;

        var tmpZoom = getDocumentZoomFactor();

        //compute new width and height
//        var tmpObjOffsetX = parseInt(objDrag.style.width)  - ( 2*parseInt(objDrag.style.borderWidth) );
//        var tmpObjOffsetY = parseInt(objDrag.style.height) - ( 2*parseInt(objDrag.style.borderWidth) );
        var tmpObjOffsetX = parseInt(objDrag.style.width);
        var tmpObjOffsetY = parseInt(objDrag.style.height);

        //check what resize control was clicked and
        // - compute new width and height
        // - change the left and top when appropriate
        // top left
        if(objDrag.resizeControlClicked == RESIZE_TOP_LEFT) {

            tmpObjOffsetX = parseInt(objDrag.style.width)  - parseInt( (dragX - objX) / tmpZoom );
            tmpObjOffsetY = parseInt(objDrag.style.height) - parseInt( (dragY - objY) / tmpZoom );

            objDrag.style.left = objDrag.offsetLeft + ( (dragX - objX) / tmpZoom);
            objDrag.style.top  = objDrag.offsetTop  + ( (dragY - objY) / tmpZoom);
        }
        // top center
        if(objDrag.resizeControlClicked == RESIZE_TOP_CENTER) {
            tmpObjOffsetY      = parseInt(objDrag.style.height) - parseInt( (dragY - objY) / tmpZoom );
            objDrag.style.top  = objDrag.offsetTop  + ( (dragY - objY) / tmpZoom);
        }
        // top right
        if(objDrag.resizeControlClicked == RESIZE_TOP_RIGHT) {
            tmpObjOffsetX      = parseInt(objDrag.style.width)  + parseInt( (dragX - objX) / tmpZoom );
            tmpObjOffsetY      = parseInt(objDrag.style.height) - parseInt( (dragY - objY) / tmpZoom );
            objDrag.style.top  = objDrag.offsetTop  + ( (dragY - objY) / tmpZoom);
        }
        // middle left
        if(objDrag.resizeControlClicked == RESIZE_MIDDLE_LEFT) {
            tmpObjOffsetX      = parseInt(objDrag.style.width)  - parseInt( (dragX - objX) / tmpZoom );
            objDrag.style.left = objDrag.offsetLeft + ( (dragX - objX) / tmpZoom);
        }
        // middle right
        if(objDrag.resizeControlClicked == RESIZE_MIDDLE_RIGHT) {
            tmpObjOffsetX      = parseInt(objDrag.style.width)  + parseInt( (dragX - objX) / tmpZoom );
        }
        // bottom left
        if(objDrag.resizeControlClicked == RESIZE_BOTTOM_LEFT) {
            tmpObjOffsetX      = parseInt(objDrag.style.width)  - parseInt( (dragX - objX) / tmpZoom );
            tmpObjOffsetY      = parseInt(objDrag.style.height) + parseInt( (dragY - objY) / tmpZoom );
            objDrag.style.left = objDrag.offsetLeft + ( (dragX - objX) / tmpZoom);
        }
        // bottom center
        if(objDrag.resizeControlClicked == RESIZE_BOTTOM_CENTER) {
            tmpObjOffsetY      = parseInt(objDrag.style.height) + parseInt( (dragY - objY) / tmpZoom );
        }
        // bottom right
        if(objDrag.resizeControlClicked == RESIZE_BOTTOM_RIGHT) {
            if(objDrag.MASHparameters.FIXED_DIMENSIONAL_RATIO == 0) {
                tmpObjOffsetX      = parseInt(objDrag.style.width)  + parseInt( (dragX - objX) / tmpZoom );
                tmpObjOffsetY      = parseInt(objDrag.style.height) + parseInt( (dragY - objY) / tmpZoom );
            }
            else {
                if( (dragX - objX) > (dragY - objY) ) {
                    tmpObjOffsetX  = parseInt(objDrag.style.width)  + parseInt( (dragX - objX) / tmpZoom );
                    tmpObjOffsetY  = parseInt(tmpObjOffsetX / objDrag.MASHparameters.FIXED_DIMENSIONAL_RATIO);
                }
                else {
                    tmpObjOffsetY  = parseInt(objDrag.style.height) + parseInt( (dragY - objY) / tmpZoom );
                    tmpObjOffsetX  = tmpObjOffsetY * objDrag.MASHparameters.FIXED_DIMENSIONAL_RATIO;
                }
            }
        }

        //resize object
        if( (tmpObjOffsetX>1) && (tmpObjOffsetY>1) ) {
            objDrag.MASHparameters.resize(tmpObjOffsetX, tmpObjOffsetY);
        }

        //update postion of objDrag
        objX = dragX;
        objY = dragY;

    }//if(objDrag)

    return false;

}//resizeMouseMove



// resizeMouseUp                                                                                           resizeMouseUp
// ---------------------------------------------------------------------------------------------------------------------
function resizeMouseUp(e){

    var i;

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //This disables the default action for this event
    preventDefault(e);
    stopPropagation(e);

    //Inform the user which object is being resized
//    window.status = "RESIZING object = " + objDrag.MASHparameters.id;
    objDrag.MASHparameters.demphasizeResizeButton();

    //remove the events for mousemouve and mouseup
    removeEventListener(document, "mousemove", resizeMouseMove, true);
    removeEventListener(document, "mouseup",   resizeMouseUp,   true);

    //reset statusbar
    window.status = " ";

    //reset values
    objDrag = null;
    objX    = -1;
    objY    = -1;

    //IE: setting wasDragged to false is necessary in IE of its bubble up event model
    cancelDrag();

    return false;

}//resizeMouseUp




// divScroll                                                                                                   divScroll
// ---------------------------------------------------------------------------------------------------------------------
function divScroll(e){

    scrollFlag = true;
//    alert("on scroll");
        stopPropagation(e);
        preventDefault(e);
        return false;

}//divScroll



// divMouseDown                                                                                             divMouseDown
// ---------------------------------------------------------------------------------------------------------------------
function divMouseDown(e){

    //check that is not being scrolling (avoid 'sticky' scrollbars
    if(scrollFlag) {
        stopPropagation(e);
        preventDefault(e);
        scrollFlag = false;
        return false;
    }

    //delete objects created by the spatial parser
    deleteSpatialObjects();

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //check for right button
    if(getMouseButton(e) == MOUSE_RIGHT_BUTTON) {

        //This disables the default action for this event
        preventDefault(e);
        stopPropagation(e);

        //initialize values
        objDrag     = getCurrentTarget(e);
        objX        = e.clientX;
        objY        = e.clientY;

        //close all other contextual menus
        while(otherObjects.length>0) {
            otherObjects[0].close();
        }

        //open contextual menu for this object
//        objDrag.MASHparameters.contextMenu = new MASH_ContextualMenu(objX-10, objY-10,  objDrag.MASHparameters);
        objDrag.MASHparameters.contextMenu = new MASH_MetadataMenu(objX-10, objY-10,  objDrag.MASHparameters);
        var tmpObj                         = MASH_Object.createObject(objDrag.MASHparameters.contextMenu, null);

        objDrag.MASHparameters.select(true);

        return false;
    }


    //if the space is frozen then disable the mouse
    if(freezeSpace) {
        stopPropagation(e);
        preventDefault(e);
        return false;
    }

    //to use the default mouse behavior for an object it is possible to use the ALT KEY
    if(e.altKey) {
        return true;
    }

    //check if the mouse down is inside another FRAME Object or is inside this MASH document
    if(window != window.top) {

        //this is a sub-frame

        //to get objects out of a frame, it is necessary to press the CONTROL KEY
        if(e.ctrlKey) {

            //this case is when the click happened inside a FRAME Objct
            var tmpSource   = window;
            var tmpTarget   = window.parent.parent;
            var tmpObj      = getCurrentTarget(e);

            //pre-validate scale factor
            if(!tmpSource.MASHparentWrapper.MASHparameters.scale) {
                tmpSource.MASHparentWrapper.MASHparameters.scale = 1.0;
            }
            var tmpScale    = tmpSource.MASHparentWrapper.MASHparameters.scale;

            var tmpObjOffset  = getSrcElementOffset(tmpObj);  //this translates the coordinates relative to the window area
            var tmpObjOffsetX = parseInt( e.clientX + getWindowScrollX() ) - tmpObjOffset.x*tmpScale;
            var tmpObjOffsetY = parseInt( e.clientY + getWindowScrollY() ) - tmpObjOffset.y*tmpScale;

            var tmpSourceX  = e.clientX*tmpScale + MASH_Frame.getParentX(tmpSource.MASHparentWrapper);
            var tmpSourceY  = e.clientY*tmpScale + MASH_Frame.getParentY(tmpSource.MASHparentWrapper);


            transferObject(tmpSource, tmpTarget, tmpObj, tmpSourceX, tmpSourceY, tmpObjOffsetX, tmpObjOffsetY, true);

            objDrag     = null;

            return false;
        }
    }

    //initialize values
    objDrag     = getCurrentTarget(e);
    objX        = e.clientX;
    objY        = e.clientY;
    wasDragged  = false;

    //check if the object is inside a collection
    if((objDrag.MASHparameters)                      &&
       (objDrag.MASHparameters.collection != null)   ){

        var tmpCollection     = objDrag.MASHparameters.collection;           //this an HTML div object (the inner object of the parent collection)
        var tmpMASHCollection = tmpCollection.wrapperObject.MASHparameters;  //this an MASH_Collection object (the parent MASH_Collection)

        tmpObjOffset  = getSrcElementOffset(objDrag); //gets the left,top coordinates of the objDrag (assumes the scale of the parent collections' is 1.0)

        tmpObjOffsetX = parseInt( objX + getWindowScrollX() ) - tmpObjOffset.x;
        tmpObjOffsetY = parseInt( objY + getWindowScrollY() ) - tmpObjOffset.y;


        //to get objects out of a collection it is necessary to press the CONTROL KEY
//        if(e.ctrlKey) {

            //remove objDrag from the collection's components array
            tmpMASHCollection.removeComponent(objDrag.MASHparameters);

            //take object out (from the screen object) and place it at the top of the document
            tmpCollection.removeChild(objDrag);

            //re-arrange allMASHObjects array
            objDrag.MASHparameters.collection.MASHparameters.removeComponent(objDrag.MASHparameters);
            addObject(objDrag.MASHparameters);


            objDrag.style.left = objX + getWindowScrollX() - tmpObjOffsetX;
            objDrag.style.top  = objY + getWindowScrollY() - tmpObjOffsetY;

            document.body.appendChild(objDrag);

            //reset the collection property
            objDrag.MASHparameters.collection = null;

            //animate
//            objDrag.MASHparameters.startImportAnimation(500);
            tmpMASHCollection.startImportAnimation(200);

//        }//CTRL KEY pressed
    }

    //let objects with zIndex = 0 in the same level
    if(objDrag.style.zIndex > 0) {
//        alert(" id = " + objDrag.id + "\n zIndex = " + objDrag.style.zIndex);

        //bring the object forward
        objDrag.style.zIndex = ++topZ;
    }

    // it is necessary to move the whole form in the stacking order,
    //    because the z-index of its sub components is relative to the form, even if the form has an absolute position
    if(objDrag.id.indexOf(MASH_Input.ID_PREFIX)==0) {
        objDrag.parentNode.style.zIndex = topZ;
    }



    //draw finger mark (useful in Multi-Touch applications
//    var fingerOffset = getSrcElementOffset(objDrag);
    var fingerX      = parseInt( objX + getWindowScrollX() );
    var fingerY      = parseInt( objY + getWindowScrollY() );

//    MT_fingerMarker = createUserAnnotation("", objX-20, objY-20, 40, 40, (topZ+2), "+", MASH_UserAnnotation.FINGER_MARKER);
    MT_fingerMarkerTop    = createUserAnnotation(""+fingerX, fingerX-8,  fingerY-30, 4, 20, (topZ+2), "", MASH_UserAnnotation.FINGER_MARKER);
    MT_fingerMarkerLeft   = createUserAnnotation(""+fingerX, fingerX-30, fingerY-8, 20,  4, (topZ+2), "", MASH_UserAnnotation.FINGER_MARKER);
    MT_fingerMarkerBottom = createUserAnnotation(""+fingerX, fingerX-8,  fingerY+10, 4, 20, (topZ+2), "", MASH_UserAnnotation.FINGER_MARKER);
    MT_fingerMarkerRight  = createUserAnnotation(""+fingerX, fingerX+10, fingerY-8, 20,  4, (topZ+2), "", MASH_UserAnnotation.FINGER_MARKER);


    //update the status bar
    window.status = "Object  ["+objDrag.id+"]  target = " +getTarget(e).id +"  z=" + objDrag.style.zIndex;

    if(!objDrag.MASHparameters.maximized) { //this line restricts the user from moving maximized collections
        addEventListener(document, "mousemove", divMouseMove, true);
        addEventListener(document, "mouseup",   divMouseUp,   true);
    }

    //This disables the default action for this event
    //  In particular it overrides the browser's default drag-and-drop behavior on images
    preventDefault(e);
    stopPropagation(e);

    //block mouseDown from forcing Maccintosh to show the contextual menu
    return false;

}//divMouseDown



// divMouseMove                                                                                             divMouseMove
// ---------------------------------------------------------------------------------------------------------------------
function divMouseMove(e){

    //check that is not being scrolling (avoid 'sticky' scrollbars)
    if(scrollFlag) {
        stopPropagation(e);
        preventDefault(e);

        //reset scroll flag and cancel event models
        scrollFlag = false;
        removeEventListener(document, "mousemove", divMouseMove, true);
        removeEventListener(document, "mouseup",   divMouseUp,   true);

        return false;
    }

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //check for right button
    if(getMouseButton(e) == MOUSE_RIGHT_BUTTON) {
        //This disables the default action for this event
        preventDefault(e);
        stopPropagation(e);
        return false;
    }

    try {

        //valiate that there is a selected object to be dragged
        if(objDrag != null) {

            wasDragged = true;

            //get the current position of the mouse and the zoom factor
            var dragX   = e.clientX;
            var dragY   = e.clientY;

            var tmpZoom = getDocumentZoomFactor();

            //check if the object is inside a collection and update the zoom factor
            if((objDrag.MASHparameters)                      &&
               (objDrag.MASHparameters.collection != null)   ){

                var tmpCollection     = objDrag.MASHparameters.collection;           //this an HTML div object (the inner object of the parent collection)
                var tmpMASHCollection = tmpCollection.wrapperObject.MASHparameters;  //this an MASH_Collection object (the parent MASH_Collection)
                var accumulatedScale  = tmpMASHCollection.getAccumulatedScale();
                tmpZoom *= accumulatedScale;
            }


            //change the objX and objY to draged position
//            objDrag.style.left = objDrag.offsetLeft + ( (dragX - objX) / tmpZoom);
//            objDrag.style.top  = objDrag.offsetTop  + ( (dragY - objY) / tmpZoom);
            var newX   = objDrag.offsetLeft + ( (dragX - objX) / tmpZoom);
            var newY   = objDrag.offsetTop  + ( (dragY - objY) / tmpZoom);
            var deltaX = newX - parseInt(objDrag.style.left);
            var deltaY = newY - parseInt(objDrag.style.top);

            objDrag.style.left = newX;
            objDrag.style.top  = newY;

            //delete finger marker (used in Multi-Touch applications)
//            MT_fingerMarker.moveBy(deltaX, deltaY);
            MT_fingerMarkerTop.moveBy(deltaX, deltaY);
            MT_fingerMarkerLeft.moveBy(deltaX, deltaY);
            MT_fingerMarkerBottom.moveBy(deltaX, deltaY);
            MT_fingerMarkerRight.moveBy(deltaX, deltaY);


            //update postion of objDrag
            objX       = dragX;
            objY       = dragY;

            //update display of position
            window.status = "["+objDrag.id+"]  x="  + dragX               +
                                            "  y="  + dragY               +
                                            "  z="  + objDrag.style.zIndex;

            //fire a MASH event that is used in case of relationships
            if(relationshipList) { relationshipList.manageEvent(objDrag, MASH_EVENT.OBJECT_MOVE); }

            //block mouseDown from forcing Macs to show the contextual menu
            return false;

        }//if(objDrag)

    }
    catch(ex) {

    }

}//divMouseMove



// divMouseUp                                                                                                 divMouseUp
// ---------------------------------------------------------------------------------------------------------------------
function divMouseUp(e){

    scrollFlag = false;


    //delete finger marker (used in Multi-Touch applications)
//    MT_fingerMarker.destroy();
//    MT_fingerMarker = null;

    MASH_UserAnnotation.destroyFingerMarkers();

    MT_fingerMarkerTop    = null;
    MT_fingerMarkerLeft   = null;
    MT_fingerMarkerBottom = null;
    MT_fingerMarkerRight  = null;


    var i;

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);

    //check for right button
    if(getMouseButton(e) == MOUSE_RIGHT_BUTTON) {

        //This disables the default action for this event
        preventDefault(e);
        stopPropagation(e);

        //remove the events for mousemouve and mouseup
        removeEventListener(document, "mousemove", divMouseMove, true);
        removeEventListener(document, "mouseup",   divMouseUp,   true);

        //restt statusbar
        window.status = " ";

        //reset values
        objDrag = null;
        objX    = -1;
        objY    = -1;

        //IE: setting wasDragged to false is necessary in IE of its bubble up event model
        cancelDrag();

        return false;
    }

    if(objDrag == null) { return; }

    var tmpMoved = false;
    //to get objects into a collection or frame, it is necessary to press the CONTROL KEY
//    if(e.ctrlKey) {

        //this case is when the click happened inside a COLLECTION (OR FRAME) Objct
        var tmpSource   = window;

        // getthe mouse coords and compensate the possible scrolling of the window
        var tmpSourceX  = e.clientX + getWindowScrollX();
        var tmpSourceY  = e.clientY + getWindowScrollY();

        //check if the click was on top of a Collection or a Frame
        //it's important to consider that the click might be on top of SEVERAL OVERLAPPING Objects
        //   thus it is necessary to check all collections in each nested level starting at top level of the document
        var topCollection = new Array(5);
        topCollection[0]  = null; // reference to destination collection
        topCollection[1]  = 0;    // left
        topCollection[2]  = 0;    // top
        topCollection[3]  = 0;    // hidden horizontal area
        topCollection[4]  = 0;    // hidden vertical area
        var topCollectionZIndex = -1;

        //search all collections
        for(i=0; i<allMASHObjects.length; i++) {

            //get a collection
            var tmpCollection = allMASHObjects[i];

            //ignore all objects that are not collections or frames
            if( !( (tmpCollection.MASHobjectType == MASH_Object.COLLECTION) ||  (tmpCollection.MASHobjectType == MASH_Object.FRAME) ) ) {
                continue;
            }

            //get the destination collection
            var tmpResults = tmpCollection.getInternalMouseCoords(objDrag, tmpSourceX, tmpSourceY, 0, 0, 1.0);

            //if there is a collection underneath
            if(tmpResults[0]!=null) {

                //compare to see which collection is on top
                if(tmpCollection.reference.style.zIndex >= topCollectionZIndex) {
                    topCollectionZIndex = tmpCollection.reference.style.zIndex;
                    topCollection[0] = tmpResults[0];
                    topCollection[1] = tmpResults[1];
                    topCollection[2] = tmpResults[2];
                    topCollection[3] = tmpResults[3];
                    topCollection[4] = tmpResults[4];
                }
            }
        }//for

        //if the click was on top of a collection or a frame
        if(topCollection[0]!=null) {

            //move into collection
            if(topCollection[0].MASHobjectType == MASH_Object.COLLECTION) {

                //compute the position of objDrag relative to the collection inner coordinate system

                //get the coordinates relative to the window area
                var tmpObjOffset  = getSrcElementOffset(objDrag);

                //computes the click position WITHIN objDrag
                var tmpObjOffsetX = tmpSourceX - tmpObjOffset.x;
                var tmpObjOffsetY = tmpSourceY - tmpObjOffset.y;


                //take object out and place it on the document
                var topCollectionScale  = topCollection[0].wrapperObj.MASHparameters.getAccumulatedScale();
                objDrag.style.left      = ((tmpObjOffset.x - topCollection[1]) / topCollectionScale);
                objDrag.style.top       = ((tmpObjOffset.y - topCollection[2]) / topCollectionScale);

                //move HTML node
                topCollection[0].innerObj.appendChild(objDrag);
                objDrag.MASHparameters.collection = topCollection[0].innerObj;

                //add objDrag to the collection's components array
                removeObject(objDrag.MASHparameters);
                topCollection[0].addComponent(objDrag.MASHparameters);

                //set flag to avoid checkimg the frames
                tmpMoved = true;

                //animate
//                objDrag.MASHparameters.startImportAnimation(200);
                topCollection[0].startImportAnimation(300);

            }//collection

            //transfer to page in the other frame
            else if(topCollection[0].MASHobjectType == MASH_Object.FRAME) {

                //get the window inside the frame
                var tmpTarget   = topCollection[0].reference.MASHframeContentWindow;

                //get the coordinates relative to the window area
                tmpObjOffset    = getSrcElementOffset(objDrag);

                //computes the click position WITHIN objDrag
                tmpObjOffsetX   = tmpSourceX - tmpObjOffset.x;
                tmpObjOffsetY   = tmpSourceY - tmpObjOffset.y;

                //the 2 pixels offset is to visualy note a small movement that signals the transfer of the object
                tmpSourceX      = tmpSourceX - topCollection[1] + getScrollOffsetX(tmpTarget) - 2;
                tmpSourceY      = tmpSourceY - topCollection[2] + getScrollOffsetY(tmpTarget) - 2;

                //take object out and place it on the document
                transferObject(tmpSource, tmpTarget, objDrag, tmpSourceX, tmpSourceY, tmpObjOffsetX, tmpObjOffsetY, false);

            }//frame

        }//click on top of collection or frame

//    }//CTRL KEY pressed


    //remove the events for mousemouve and mouseup
    removeEventListener(document, "mousemove", divMouseMove, true);
    removeEventListener(document, "mouseup",   divMouseUp,   true);

    stopPropagation(e);
    preventDefault(e);

    //restt statusbar
    window.status = " ";

    //reset values
    objDrag     = null;
    objX        = -1;
    objY        = -1;

    //IE: setting wasDragged to false is necessary in IE of its bubble up event model
    cancelDrag();

    //run spatial parser
    parseSpace();

    return false;

}//divMouseUp




// =====================================================================================================================
// utility functions for cookies                                                           utility functions for cookies
// =====================================================================================================================



// setCookie                                                                                                   setCookie
// ---------------------------------------------------------------------------------------------------------------------
// name      - name of the cookie
// value     - value of the cookie
// [expires] - expiration date of the cookie (defaults to end of current session)
// [path]    - path for which the cookie is valid (defaults to path of calling document)
// [domain]  - domain for which the cookie is valid (defaults to domain of calling document)
// [secure]  - Boolean value indicating if the cookie transmission requires a secure transmission
//
// * an argument defaults when it is assigned null as a placeholder
// * a null placeholder is not required for trailing omitted arguments
function setCookie(name, value, expires, path, domain, secure) {

    var curCookie = name + "=" + escape(value)                             +
                   ((expires) ? "; expires=" + expires.toGMTString() : "") +
                   ((path)    ? "; path="    + path                  : "") +
                   ((domain)  ? "; domain="  + domain                : "") +
                   ((secure)  ? "; secure"                           : "") ;
    document.cookie = curCookie;
}//setCookie



// getCookie                                                                                                   getCookie
// ---------------------------------------------------------------------------------------------------------------------
// name - name of the desired cookie
//
// * return string containing value of specified cookie or null if cookie does not exist
function getCookie(name) {
    var dc     = document.cookie;
    var prefix = name + "=";
    var begin  = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) { return null; }
    }
    else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) { end = dc.length; }
    return unescape(dc.substring(begin + prefix.length, end));
}//getCookie



// deleteCookie                                                                                             deleteCookie
// ---------------------------------------------------------------------------------------------------------------------
// name     - name of the cookie
// [path]   - path of the cookie (must be same as path used to create cookie)
// [domain] - domain of the cookie (must be same as domain used to create cookie)
//
// * path and domain default if assigned null or omitted if no explicit argument proceeds
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "="                            +
                         ((path)   ? "; path="   + path   : "") +
                         ((domain) ? "; domain=" + domain : "") +
                          "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}//deleteCookie



// fixDate                                                                                                       fixDate
// ---------------------------------------------------------------------------------------------------------------------
// date - any instance of the Date object
//
// * hand all instances of the Date object to this function for "repairs"
function fixDate(date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0) {
        date.setTime(date.getTime() - skew);
    }
}//fixDate





// =====================================================================================================================
// MASH CONTROLS                                                                                           MASH CONTROLS
// =====================================================================================================================

var globalSpaceZoomFactor   = 1;
var globalSpaceOffsetX      = 10;
var globalSpaceOffsetY      = 200;


// controls' image files
//var CONTROLS_IMG_DIR                         = "mash_images/";
//var CONTROLS_IMG_DIR                         = "http://denali.ischool.utexas.edu/~revilla/Breadcrumbs/mash-images/";
var CONTROLS_IMG_DIR                         = MASH_APPLET_CODEBASE + "mash_images/";

var CTRL_REARRANGE_IMG_FILE                  = CONTROLS_IMG_DIR + "reArrange.png";
var CTRL_FREEZE_IMG_FILE                     = CONTROLS_IMG_DIR + "freeze.png";
var CTRL_UNFREEZE_IMG_FILE                   = CONTROLS_IMG_DIR + "unfreeze.png";
var CTRL_SAVE_IMG_FILE                       = CONTROLS_IMG_DIR + "save.png";
var CTRL_RESTORE_IMG_FILE                    = CONTROLS_IMG_DIR + "restore.png";
var CTRL_ZOOM_IN_PAGE_IMG_FILE               = CONTROLS_IMG_DIR + "zoomInPage.png";
var CTRL_ZOOM_OUT_PAGE_IMG_FILE              = CONTROLS_IMG_DIR + "zoomOutPage.png";

var CTRL_ANNOTATE_SHOW_IMG_FILE              = CONTROLS_IMG_DIR + "show.png";
var CTRL_ANNOTATE_HIDE_IMG_FILE              = CONTROLS_IMG_DIR + "hide.png";

var CTRL_ANNOTATE_COLLECTION_BLUE_IMG_FILE   = CONTROLS_IMG_DIR + "annotationCollection1.png";
var CTRL_ANNOTATE_COLLECTION_GREEN_IMG_FILE  = CONTROLS_IMG_DIR + "annotationCollection2.png";
var CTRL_ANNOTATE_COLLECTION_RED_IMG_FILE    = CONTROLS_IMG_DIR + "annotationCollection3.png";
var CTRL_ANNOTATE_COLLECTION_YELLOW_IMG_FILE = CONTROLS_IMG_DIR + "annotationCollection4.png";

var CTRL_ANNOTATE_CIRCLE_BLUE_IMG_FILE       = CONTROLS_IMG_DIR + "annotation2.png";
var CTRL_ANNOTATE_CIRCLE_GREEN_IMG_FILE      = CONTROLS_IMG_DIR + "annotation3.png";
var CTRL_ANNOTATE_CIRCLE_RED_IMG_FILE        = CONTROLS_IMG_DIR + "annotation1.png";
var CTRL_ANNOTATE_CIRCLE_YELLOW_IMG_FILE     = CONTROLS_IMG_DIR + "annotation4.png";

var CTRL_ANNOTATE_TEXT_BLUE_IMG_FILE         = CONTROLS_IMG_DIR + "annotation-blue-text-small.png";
var CTRL_ANNOTATE_TEXT_GREEN_IMG_FILE        = CONTROLS_IMG_DIR + "annotation-green-text-small.png";
var CTRL_ANNOTATE_TEXT_RED_IMG_FILE          = CONTROLS_IMG_DIR + "annotation-red-text-small.png";
var CTRL_ANNOTATE_TEXT_YELLOW_IMG_FILE       = CONTROLS_IMG_DIR + "annotation-yellow-text-small.png";


// control id's
var CTRL_REARRANGE_IMG_ID                    = "mashControlArrange";
var CTRL_FREEZE_IMG_ID                       = "mashControlFreeze";
var CTRL_SAVE_IMG_ID                         = "mashControlSave";
var CTRL_RESTORE_IMG_ID                      = "mashControlRestore";
var CTRL_ZOOM_IN_PAGE_IMG_ID                 = "mashControlZoomInPage";
var CTRL_ZOOM_OUT_PAGE_IMG_ID                = "mashControlZoomOutPage";

var CTRL_ANNOTATE_SHOW_IMG_ID                = "mashControlAnnotateShow";
var CTRL_ANNOTATE_HIDE_IMG_ID                = "mashControlAnnotateHide";

var CTRL_ANNOTATE_COLLECTION_BLUE_IMG_ID     = "mashControlAnnotateCollectionBlue";
var CTRL_ANNOTATE_COLLECTION_GREEN_IMG_ID    = "mashControlAnnotateCollectionGreen";
var CTRL_ANNOTATE_COLLECTION_RED_IMG_ID      = "mashControlAnnotateCollectionRed";
var CTRL_ANNOTATE_COLLECTION_YELLOW_IMG_ID   = "mashControlAnnotateCollectionYellow";

var CTRL_ANNOTATE_CIRCLE_BLUE_IMG_ID         = "mashControlAnnotateCircleBlue";
var CTRL_ANNOTATE_CIRCLE_GREEN_IMG_ID        = "mashControlAnnotateCircleGreen";
var CTRL_ANNOTATE_CIRCLE_RED_IMG_ID          = "mashControlAnnotateCircleRed";
var CTRL_ANNOTATE_CIRCLE_YELLOW_IMG_ID       = "mashControlAnnotateCircleYellow";

var CTRL_ANNOTATE_TEXT_BLUE_IMG_ID           = "mashControlAnnotateTextBlue";
var CTRL_ANNOTATE_TEXT_GREEN_IMG_ID          = "mashControlAnnotateTextGreen";
var CTRL_ANNOTATE_TEXT_RED_IMG_ID            = "mashControlAnnotateTextRed";
var CTRL_ANNOTATE_TEXT_YELLOW_IMG_ID         = "mashControlAnnotateTextYellow";


// arrangeObjects                                                                                         arrangeObjects
// ---------------------------------------------------------------------------------------------------------------------
// * Resets values for X, Y, Z
function arrangeObjects(tmpObjArray){

    if(!tmpObjArray) { return; }

    zoom(1/globalSpaceZoomFactor);

//    alert("tmpObjArray.length = "+tmpObjArray.length);
    for(var i=0; i<tmpObjArray.length; i++) {

        var tmpObj = tmpObjArray[i].reference;

        if(tmpObjArray[i].MASHobjectType == MASH_Object.FORM) { arrangeObjects(tmpObjArray[i].inputs); }
        else{
            tmpObj.style.left   = tmpObjArray[i].left;
            tmpObj.style.top    = tmpObjArray[i].top;
            tmpObj.style.zIndex = tmpObjArray[i].zIndex;
            tmpObjArray[i].resize(tmpObjArray[i].width, tmpObjArray[i].height);
           if(tmpObjArray[i].MASHobjectType == MASH_Object.COLLECTION) { arrangeObjects(tmpObjArray[i].components); }
        }
    }

}//arrangeObjects



// randomizeAllObjects                                                                               randomizeAllObjects
// ---------------------------------------------------------------------------------------------------------------------
function randomizeAllObjects(){

    randomizeObjects(imageObjects, MASH_Image.ID_PREFIX);
    randomizeObjects(textObjects,  MASH_Text.ID_PREFIX);
    randomizeObjects(frameObjects, MASH_Frame.ID_PREFIX);
    for(var j=0; j<formObjects.length; j++) {
        randomizeObjects(formObjects[j].inputs, MASH_Input.ID_PREFIX);
    }

}//randomizeAllObjects



// freezeAllObjects                                                                                     freezeAllObjects
// ---------------------------------------------------------------------------------------------------------------------
function freezeAllObjects(){

    if(freezeSpace) { freezeSpace = false; document.getElementById(CTRL_FREEZE_IMG_ID).src=CTRL_UNFREEZE_IMG_FILE; }
    else            { freezeSpace = true;  document.getElementById(CTRL_FREEZE_IMG_ID).src=CTRL_FREEZE_IMG_FILE;   }

}//freezeAllObjects



// randomizeObjects                                                                                     randomizeObjects
// ---------------------------------------------------------------------------------------------------------------------
function randomizeObjects(tmpObjArray, tmpIdPrefix){

    var coordX, coordY, objTmp;

    for(var i=0; i<tmpObjArray.length; i++) {

        //randomize coordinates
        if(i%2 == 0)      { coordX=300+(Math.random()*200);  }
        else              { coordX=300-(Math.random()*300);  }
        coordY = 200 + (Math.random()*400);

        //reposition object
        objTmp              = document.getElementById(tmpIdPrefix+i);
        objTmp.style.left   = coordX;
        objTmp.style.top    = coordY;
    }

}//randomizeObjects



// saveAllObjects                                                                                         saveAllObjects
// ---------------------------------------------------------------------------------------------------------------------
function saveAllObjects(){

    var tmpDocName = escape(MASH_DOCUMENT_NAME);

    saveObjects(tmpDocName+MASH_Image.COOKIE_NAME,      imageObjects,      MASH_Image.ID_PREFIX);
    saveObjects(tmpDocName+MASH_Text.COOKIE_NAME,       textObjects,       MASH_Text.ID_PREFIX);
    saveObjects(tmpDocName+MASH_Collection.COOKIE_NAME, collectionObjects, MASH_Collection.ID_PREFIX);
    saveObjects(tmpDocName+MASH_Frame.COOKIE_NAME,      frameObjects,      MASH_Frame.ID_PREFIX);
    for(var j=0; j<formObjects.length; j++) {
        saveObjects(tmpDocName+MASH_Form.COOKIE_NAME+j, formObjects[j].inputs, MASH_Input.ID_PREFIX);
    }
    saveUserAnnotations(tmpDocName+MASH_UserAnnotation.COOKIE_NAME);

}//saveAllObjects



// saveObjects                                                                                               saveObjects
// ---------------------------------------------------------------------------------------------------------------------
// * ADD VISIBILITY
function saveObjects(tmpCookieName, tmpObjArray, tmpIdPrefix){

    //set cookie value
    var tmpCookieValue = "[[";

    for(var i=0; i<tmpObjArray.length; i++) {

        var objTmp      = tmpObjArray[i].reference;
        var objParent   = tmpObjArray[i].collection;
        if(objParent) { objParent = objParent.MASHparameters.id; }

        tmpCookieValue += "("                                       +
                                parseInt(objTmp.offsetLeft)   + "," +
                                parseInt(objTmp.offsetTop)    + "," +
                                parseInt(objTmp.style.width)  + "," +
                                parseInt(objTmp.style.height) + "," +
                                parseInt(objTmp.style.zIndex) + "," +
                                objParent                           +
                          ")"                                       ;
    }

    tmpCookieValue += "]]";

    //set expiration date
    var expirationDate = new Date(3000, 11, 31);

    //set cookie
    setCookie(tmpCookieName, tmpCookieValue, expirationDate);

}//saveObjects



// saveUserAnnotations                                                                               saveUserAnnotations
// ---------------------------------------------------------------------------------------------------------------------
function saveUserAnnotations(cookieName){

    //set cookie value
    var tmpCookieValue = "[[";

    for(var i=0; i<annotationObjects.length; i++) {

        var objTmp      = annotationObjects[i].reference;
        var objText     = annotationObjects[i].text;
        var objType     = annotationObjects[i].type;
        var objParent   = annotationObjects[i].collection;
        if(objParent) { objParent = objParent.MASHparameters.id; }

        tmpCookieValue += "("                                    +
                            parseInt(objTmp.offsetLeft)   + ","  +
                            parseInt(objTmp.offsetTop)    + ","  +
                            parseInt(objTmp.style.width)  + ","  +
                            parseInt(objTmp.style.height) + ","  +
                            parseInt(objTmp.style.zIndex) + ","  +
                            objParent                     + ","  +
                            objText                       + ","  +
                            objType                              +
                          ")"                                    ;
    }

    tmpCookieValue += "]]";

    //set expiration date
    var expirationDate = new Date(3000, 11, 31);

    //set cookie
    setCookie(cookieName, tmpCookieValue, expirationDate);

}//saveUserAnnotations



// restoreAllObjects                                                                                   restoreAllObjects
// ---------------------------------------------------------------------------------------------------------------------
function restoreAllObjects(){

    var tmpDocName = escape(MASH_DOCUMENT_NAME);

    restoreObjects(tmpDocName+MASH_Image.COOKIE_NAME,      imageObjects,       MASH_Image.ID_PREFIX);
    restoreObjects(tmpDocName+MASH_Text.COOKIE_NAME,       textObjects,        MASH_Text.ID_PREFIX);
    restoreObjects(tmpDocName+MASH_Collection.COOKIE_NAME, collectionObjects,  MASH_Collection.ID_PREFIX);
    restoreObjects(tmpDocName+MASH_Frame.COOKIE_NAME,      frameObjects,       MASH_Frame.ID_PREFIX);
    for(var j=0; j<formObjects.length; j++) {
        restoreObjects(tmpDocName+MASH_Form.COOKIE_NAME+j, formObjects[j].inputs, MASH_Input.ID_PREFIX);
    }
    restoreUserAnnotations(tmpDocName+MASH_UserAnnotation.COOKIE_NAME);

}//restoreAllObjects



// restoreObjects                                                                                         restoreObjects
// ---------------------------------------------------------------------------------------------------------------------
// * ADD VISIBILITY
function restoreObjects(tmpCookieName, tmpObjArray, tmpIdPrefix){


    var cookieValue = getCookie(tmpCookieName);
    if(!cookieValue) { return; }
    cookieValue     = cookieValue.substring(cookieValue.indexOf('[['), cookieValue.lastIndexOf(']]'));


    //parse cookie for text object positions
    for(var i=0; i<tmpObjArray.length; i++) {

        //parse cookie
        var startPos    = cookieValue.indexOf('(');
        var comaPos_1   = cookieValue.indexOf(',');
        var comaPos_2   = cookieValue.indexOf(',', comaPos_1+1);
        var comaPos_3   = cookieValue.indexOf(',', comaPos_2+1);
        var comaPos_4   = cookieValue.indexOf(',', comaPos_3+1);
        var comaPos_5   = cookieValue.indexOf(',', comaPos_4+1);
        var endPos      = cookieValue.indexOf(')');

        var coordX      = cookieValue.substring(startPos+1,   comaPos_1);
        var coordY      = cookieValue.substring(comaPos_1+1,  comaPos_2);
        var newWidth    = cookieValue.substring(comaPos_2+1,  comaPos_3);
        var newHeight   = cookieValue.substring(comaPos_3+1,  comaPos_4);
        var newZIndex   = cookieValue.substring(comaPos_4+1,  comaPos_5);
        var newParent   = cookieValue.substring(comaPos_5+1,  endPos);

        cookieValue     = cookieValue.substring(endPos+1);

        //update values
        var objTmp          = tmpObjArray[i].reference;
        objTmp.style.left   = coordX;
        objTmp.style.top    = coordY;
        objTmp.style.zIndex = newZIndex;
        objTmp.MASHparameters.resize(parseInt(newWidth), parseInt(newHeight));

        //check if the object needs to be moved inside the document tree
        var parentObj = null;
        if(newParent != "null") { parentObj = findObjectByID(newParent); }

        //check if the object was originally in document.body
        if(!objTmp.MASHparameters.collection) {
            if(parentObj) {
                parentObj.innerObj.appendChild(objTmp);
                objTmp.MASHparameters.collection = parentObj.innerObj;
            }
        }
        else if(objTmp.MASHparameters.collection.MASHparameters != parentObj) {
            if(parentObj) {
                parentObj.innerObj.appendChild(objTmp);
                objTmp.MASHparameters.collection = parentObj.innerObj;
            }
            else {
                document.body.appendChild(objTmp);
                objTmp.MASHparameters.collection = null;
            }
        }

    }//for

}//restoreObjects



// restoreUserAnnotations                                                                         restoreUserAnnotations
// ---------------------------------------------------------------------------------------------------------------------
function restoreUserAnnotations(cookieName){


    var cookieValue = getCookie(cookieName);
    if(!cookieValue) { return; }
    cookieValue     = cookieValue.substring(cookieValue.indexOf('[['), cookieValue.lastIndexOf(']]'));

    //remove user's annotation objects from screen
    for(var i=0; i<annotationObjects.length; i++) {
        var tmpObj = annotationObjects[i].reference;
        tmpObj.parentNode.removeChild(tmpObj);
    }
    //delete objects
    annotationObjects = new Array();


    //parse cookie for text object positions
    while(cookieValue.length > 0) {

        //parse cookie
        var startPos    = cookieValue.indexOf('(');
        var comaPos_1   = cookieValue.indexOf(',');
        var comaPos_2   = cookieValue.indexOf(',', comaPos_1+1);
        var comaPos_3   = cookieValue.indexOf(',', comaPos_2+1);
        var comaPos_4   = cookieValue.indexOf(',', comaPos_3+1);
        var comaPos_5   = cookieValue.indexOf(',', comaPos_4+1);
        var comaPos_6   = cookieValue.indexOf(',', comaPos_5+1);
        var comaPos_7   = cookieValue.indexOf(',', comaPos_6+1);
        var endPos      = cookieValue.indexOf(')');

        var coordX      = parseInt(cookieValue.substring(startPos+1,   comaPos_1));
        var coordY      = parseInt(cookieValue.substring(comaPos_1+1,  comaPos_2));
        var newWidth    = parseInt(cookieValue.substring(comaPos_2+1,  comaPos_3));
        var newHeight   = parseInt(cookieValue.substring(comaPos_3+1,  comaPos_4));
        var newZIndex   = parseInt(cookieValue.substring(comaPos_4+1,  comaPos_5));
        var newParent   =          cookieValue.substring(comaPos_5+1,  comaPos_6);
        var newText     =          cookieValue.substring(comaPos_6+1,  comaPos_7);
        var newType     = parseInt(cookieValue.substring(comaPos_7+1,  endPos));
        cookieValue     =          cookieValue.substring(endPos+1);

        //check that there are more values to read
        if(startPos<0) { break; }

        //update values
        var objTmp = new MASH_UserAnnotation("", coordX, coordY, newWidth, newHeight, newZIndex, newText, newType);

        //create screen object
        var objTmpScreen            = objTmp.createScreenObject(0);
        objTmpScreen.MASHparameters = objTmp;
        objTmp.reference            = objTmpScreen;

        annotationObjects.push(objTmp);

        //place annotation object in its proper location in the document tree
        var parentObj = null;
        if(newParent != "null") { parentObj = findObjectByID(newParent); }

        //check if the object was originally in document.body
        if(parentObj) {
            parentObj.innerObj.appendChild(objTmpScreen);
            objTmpScreen.MASHparameters.collection = parentObj.innerObj;
        }
        else {
            document.body.appendChild(objTmpScreen);
            objTmpScreen.MASHparameters.collection = null;
        }

        //alpha
       objTmp.alpha(70);

    }//for

}//restoreUserAnnotations



// zoom                                                                                                             zoom
// ---------------------------------------------------------------------------------------------------------------------
// * This Zoomming method actually modifies sizes and locations of objects.
// * It does not zooms like IE's style.zoom
// * However it works for both, Netscape and IE
function zoom(factor){

    var offsetX = globalSpaceOffsetX;
    var offsetY = globalSpaceOffsetY;

    globalSpaceZoomFactor = globalSpaceZoomFactor * factor;


    //image objects
    for(var i=0; i<imageObjects.length; i++) {

        //wrapper object
        var objTmp          = document.getElementById(MASH_Image.ID_PREFIX+i);
        //resize
        objTmp.style.width  = getObjectCurrentWidth(objTmp)  * factor;
        objTmp.style.height = getObjectCurrentHeight(objTmp) * factor;

        //reposistion
        objTmp.style.left   = ((objTmp.offsetLeft - offsetX) * factor) + offsetX;
        objTmp.style.top    = ((objTmp.offsetTop  - offsetY) * factor) + offsetY;

        //inner object
        objTmp              = document.getElementById(MASH_Image.INNER_ID_PREFIX+i);
        //resize
        objTmp.style.width  = getObjectCurrentWidth(objTmp)  * factor;
        objTmp.style.height = getObjectCurrentHeight(objTmp) * factor;

    }

    //text objects
    for(i=0; i<textObjects.length; i++) {

        //wrapper object
        objTmp              = document.getElementById(MASH_Text.ID_PREFIX+i);
        //resize
        objTmp.style.width  = getObjectCurrentWidth(objTmp)  * factor;
        objTmp.style.height = getObjectCurrentHeight(objTmp) * factor;

        //reposistion
        objTmp.style.left   = ((objTmp.offsetLeft - offsetX) * factor) + offsetX;
        objTmp.style.top    = ((objTmp.offsetTop  - offsetY) * factor) + offsetY;


        //inner object
        objTmp              = document.getElementById(MASH_Text.INNER_ID_PREFIX+i);

        //adjust font size
        prevFontSize        = parseFloat(objTmp.style.fontSize);
        objTmp.style.fontSize = "" +(prevFontSize * factor) + "pt";

        //resize
        objTmp.style.width  = getObjectCurrentWidth(objTmp)  * factor;
        objTmp.style.height = getObjectCurrentHeight(objTmp) * factor;
    }

}//zoom


// createArchivalSubGroup                                                                         createArchivalSubGroup
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an archival group type "sub-group" (APT)
function createArchivalSubGroup(){


    //validate paramenters
    var backgroundColor = "#eef8ff";
    var borderColor     = "#000088";

    var style = "align:left; "                                +
                "vertical-align:top; "                        +
                "background-color:"  + backgroundColor + "; " +
                "border-color:"      + borderColor     + "; " +
                "border-width:2; "                            +
                "border-style:dashed; "                       +
                "background-image:none; "                     +
                "color:#ffffff; "                             +
                "font-size:9pt; "                             ;

    //get title of acollection
    var annotationText = prompt("Please enter the title of the Sub-Group", "");
    if(!annotationText) { return; }

    var newID           = "ArchivalGroup" + MASH_Object.getUniqueID();
    var title           = MASH_ArchivalGroup.TYPE_SUBGROUP + ": " + annotationText;
    var groupType       = MASH_ArchivalGroup.TYPE_SUBGROUP;
    var description     = "";

    //create collection
    createArchivalGroup(newID, 190, 40, 200, 100, ++topZ, style, title, groupType, description);

}//createArchivalSubGroup



// createArchivalGroup                                                                               createArchivalGroup
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an annotation collection object
// * annotation collections MUST be added to the allMASHObjects array in order to be able to push objects in/out of them
function createArchivalGroup(id, left, top, width, height, zIndex, style, text, groupType, description){

    //create annotation object
    var annotationObj                   = new MASH_ArchivalGroup(id, left, top, width, height, zIndex, style, text, new Array(), groupType, description);

    //append object to document
    var annotationObjWrapper            = annotationObj.createScreenObject(collectionObjects.length);
    annotationObjWrapper                = document.body.appendChild(annotationObjWrapper);
    annotationObjWrapper.MASHparameters = annotationObj;
    annotationObj.reference             = annotationObjWrapper;

    collectionObjects.push(annotationObj);

    //add object to allMASHObjects
    addObject(annotationObj);

    return annotationObj;

}//createArchivalGroup



// annotateCollection                                                                                 annotateCollection
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a blue annotation object
function annotateCollection(backgroundColor, borderColor){

    //validate paramenters
    if(!backgroundColor) { backgroundColor = "#ffffff"; }
    if(!borderColor)     { borderColor     = "#000000"; }

    var style = "align:left; "                                +
                "vertical-align:top; "                        +
                "background-color:"  + backgroundColor + "; " +
                "border-color:"      + borderColor     + "; " +
                "border-width:2; "                            +
                "border-style:dashed; "                       +
                "background-image:none; "                     +
                "color:#ffffff; "                             +
                "font-size:9pt; "                             ;

    //get title of acollection
    var annotationText = prompt("Please enter the title of the group", "");
    if(!annotationText) { return; }

    //create collection
    createAnnotationCollection("CollectionAnnotation", 190, 40, 200, 100, ++topZ, style, annotationText);

}//annotateCollection



// createAnnotationCollection                                                                 createAnnotationCollection
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an annotation collection object
// * annotation collections MUST be added to the allMASHObjects array in order to be able to push objects in/out of them
function createAnnotationCollection(id, left, top, width, height, zIndex, style, text){

    //create annotation object
    var annotationObj = new MASH_Collection(id, left, top, width, height, zIndex, style, text, new Array());

    //append object to document
    var annotationObjWrapper  = annotationObj.createScreenObject(collectionObjects.length);
    annotationObjWrapper      = document.body.appendChild(annotationObjWrapper);

    annotationObjWrapper.MASHparameters = annotationObj;
    annotationObj.reference             = annotationObjWrapper;

    collectionObjects.push(annotationObj);

    //add object to allMASHObjects
    addObject(annotationObj);

    return annotationObj;

}//createAnnotationCollection



// annotateBlueCircle                                                                                 annotateBlueCircle
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a blue annotation object
function annotateBlueCircle(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 190, 40, 200, 100, (topZ+2), annotationText, MASH_UserAnnotation.BLUE_CIRCLE);
}//annotateBlueCircle



// annotateGreenCircle                                                                               annotateGreenCircle
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a green annotation object
function annotateGreenCircle(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 222, 40, 200, 100, (topZ+2), annotationText, MASH_UserAnnotation.GREEN_CIRCLE);
}//annotateGreenCircle



// annotateRedCircle                                                                                   annotateRedCircle
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a red annotation object
function annotateRedCircle(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 222, 40, 200, 100, (topZ+2), annotationText, MASH_UserAnnotation.RED_CIRCLE);
}//annotateRedCircle



// annotateYellowCircle                                                                             annotateYellowCircle
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a yellow annotation object
function annotateYellowCircle(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 286, 40, 200, 100, (topZ+2), annotationText, MASH_UserAnnotation.YELLOW_CIRCLE);
}//annotateYellowCircle


// annotateBlueText                                                                                     annotateBlueText
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a blue annotation object
function annotateBlueText(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 350, 40, 200, 40, (topZ+2), annotationText, MASH_UserAnnotation.BLUE_RECTANGLE);
}//annotateBlueText



// annotateGreenText                                                                                   annotateGreenText
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a green annotation object
function annotateGreenText(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 382, 40, 200, 40, (topZ+2), annotationText, MASH_UserAnnotation.GREEN_RECTANGLE);
}//annotateGreenText



// annotateRedText                                                                                       annotateRedText
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a red annotation object
function annotateRedText(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 414, 40, 200, 40, (topZ+2), annotationText, MASH_UserAnnotation.RED_RECTANGLE);
}//annotateRedText



// annotateYellowText                                                                                 annotateYellowText
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a yellow annotation object
function annotateYellowText(){
    var annotationText = prompt("Please enter the annotation text", "");
    if(!annotationText) { return; }
    createUserAnnotation("", 446, 40, 200, 40, (topZ+2), annotationText, MASH_UserAnnotation.YELLOW_RECTANGLE);
}//annotateYellowText


// createUserAnnotation                                                                             createUserAnnotation
// ---------------------------------------------------------------------------------------------------------------------
// * Creates a yellow annotation object
function createUserAnnotation(id, left, top, width, height, zIndex, text, type){

    //create annotation object
    var annotationObj                   = new MASH_UserAnnotation(id, left, top, width, height, zIndex, text, type);

    //append object to document
    var annotationObjWrapper            = annotationObj.createScreenObject(0);
    annotationObjWrapper                = document.body.appendChild(annotationObjWrapper);
    annotationObjWrapper.MASHparameters = annotationObj;
    annotationObj.reference             = annotationObjWrapper;

    annotationObjects.push(annotationObj);

    //add object to allMASHObjects
    addObject(annotationObj);


    //alpha
//    annotationObj.alpha(60);

    return annotationObj;

}//createUserAnnotation



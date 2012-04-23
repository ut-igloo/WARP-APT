// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Jan 11, 2005                                                                                              //
// Modified: Sep 28, 2007: Modified CONTROLS_IMG_DIR to point to WARP Server                                          //
//                                                                                                                    //
// =====================================================================================================================



// =====================================================================================================================
// MASH_ControlMenu                                                                                     MASH_ControlMenu
// =====================================================================================================================
function MASH_ControlMenu(tmpLeft, tmpTop, spatialParserApplet) {

    var tmpStyle = "align:left; vertical-align:top; background-color:#e4e4e4; border-color:#555555; border-width:4; border-style:outset; color:#000000; font-family:arial; font-size:9pt; font-weight:normal;";

    this.base = MASH_Object;
    this.base("Spatial Parser Control Menu", tmpLeft, tmpTop, MASH_ControlMenu.MENU_WIDTH, MASH_ControlMenu.MENU_HEIGHT, (topZ+1), tmpStyle );


    this.parserApplet   = spatialParserApplet;

    this.innerStyle     = tmpStyle;

    this.MASHobjectType = MASH_Object.CONTROL_MENU;

    //context menu
    this.contextMenuString  = "";

    this.complexitySpan = null;
    this.maxComplexity  = null;
}
//set inheritance
MASH_ControlMenu.prototype                = new MASH_Object("MASH_ControlMenu",0,0,1,1,0,"");
MASH_ControlMenu.prototype.constructor    = MASH_ControlMenu;
//MASH_ControlMenu


//Copyright
MASH_ControlMenu.COPYRIGHT = "MASH \n\n"                                       +
                             "  Copyright (c) 2005 Luis Francisco-Revilla.\n"  +
                             "  All rights reserved.\n\n"                      ;

//Constants
MASH_ControlMenu.COOKIE_NAME      = "mash_controlMenus";
MASH_ControlMenu.INNER_ID_PREFIX  = "controlMenuObj";
MASH_ControlMenu.ID_PREFIX        = MASH_Object.ID_PREFIX + MASH_ControlMenu.INNER_ID_PREFIX;

MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_AUTOPARSE_CHECKBOX_ID        = "AutoParse_Checkbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_VERBOSITY_CHECKBOX_ID        = "VerbosityCheckbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_DISPLAY_MODE_CHECKBOX_ID     = "DisplayModeCheckbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_COMPLEXITY_CHECKBOX_ID       = "ComplexityCheckbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_CHECKBOX_ID       = "RecognizerCheckbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_TYPE_CHECKBOX_ID  = "RecognizerTypeCheckbox";
MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_STYLE_CHECKBOX_ID = "RecognizerStyleCheckbox";

MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_MAX_COMPLEXITY_SPAN_ID       = "maxComplexitySpan";

//images
MASH_ControlMenu.CLOSE_BUTTON_IMG_ID     = "mashControlMenuCloseButton";
MASH_ControlMenu.CLOSE_BUTTON_IMG_FILE   = CONTROLS_IMG_DIR + "close-button.png";
MASH_ControlMenu.CLOSE_BUTTON_IMG_WIDTH  = 16;
MASH_ControlMenu.CLOSE_BUTTON_IMG_HEIGHT = 16;

MASH_ControlMenu.MENU_WIDTH              = 300;
MASH_ControlMenu.MENU_HEIGHT             = 445;

MASH_ControlMenu.RECOGNIZERS_DIV_WIDTH   = MASH_ControlMenu.MENU_WIDTH - 20;
MASH_ControlMenu.RECOGNIZERS_DIV_HEIGHT  = 200;

MASH_ControlMenu.ADVANCED_BUTTON_WIDTH          = 80;
MASH_ControlMenu.ADVANCED_BUTTON_HEIGHT         = 23;
MASH_ControlMenu.ADVANCED_BUTTON_BORDER_WIDTH   = 2;



// MASH_ControlMenu.prototype.createScreenObject                           MASH_ControlMenu.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_ControlMenu.ID_PREFIX       + i;
    var tmpObjInnerID   = MASH_ControlMenu.INNER_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj     = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    //close button for the Control Menu
    this.closeButton                = document.createElement("a");
    this.closeButton.href           = "javascript:otherObjects[0].close();"
    this.closeButton.style.position = "absolute";
    this.closeButton.style.top      = "1px";
    this.closeButton.style.left     = "" + (this.width - (this.borderWidth*2) - MASH_ControlMenu.CLOSE_BUTTON_IMG_WIDTH - 2) +"px";
    var closeButtonHTML             = "<img id=\"" + MASH_ControlMenu.CLOSE_BUTTON_IMG_ID     +"\" " +
                                      "src=\""     + MASH_ControlMenu.CLOSE_BUTTON_IMG_FILE   +"\" " +
                                      "width=\""   + MASH_ControlMenu.CLOSE_BUTTON_IMG_WIDTH  +"\" " +
                                      "height=\""  + MASH_ControlMenu.CLOSE_BUTTON_IMG_HEIGHT +"\" " +
                                      "style=\"border:0;\">";
    this.closeButton.innerHTML      = closeButtonHTML;

    //inner object
    this.innerTableObj  = document.createElement("table");
    this.innerTBodyObj  = document.createElement("tbody");
    this.innerTRObj     = document.createElement("tr");
    this.innerObj       = document.createElement("td");

    this.innerObj.id                  = tmpObjInnerID;
    this.innerObj.style.width         = adjustedWidth;
    this.innerObj.style.height        = adjustedHeight;

    //set the style
    this.innerObj.style.fontFamily    = this.fontFamily;
    this.innerObj.style.fontSize      = this.fontSize;
    this.innerObj.style.fontWeight    = this.fontWeight;

    this.innerObj.style.color         = this.color;
    this.innerObj.align               = this.align;
    this.innerObj.style.verticalAlign = this.verticalAlign;

    //top part of the control panel
    this.topDiv               = document.createElement("div");

    var topDivInnerHTMLString = "<span style=\"color:#000000; font-size:12pt; font-weight:bold;\"  >Spatial Parser Controls</span><br>\n" +
                                "<hr>\n"                                                                                                  +
                                "<span style=\"color:#000000; font-size:12pt; font-weight:normal;\">Operation Modes</span><br>\n";

    topDivInnerHTMLString    += MASH_ControlMenu.getAutoParseControls();
    topDivInnerHTMLString    += MASH_ControlMenu.getVerbosityControls();
    topDivInnerHTMLString    += MASH_ControlMenu.getComplexityControls();
    topDivInnerHTMLString    += MASH_ControlMenu.getDisplayControls();

    topDivInnerHTMLString    += "<hr>\n<span style=\"color:#000000; font-size:12pt; font-weight:normal;\">Structure Recognizers</span><br>\n";

    this.topDiv.innerHTML     = topDivInnerHTMLString;


    this.advancedDiv                        = document.createElement("div");
    this.advancedDiv.style.position         = "absolute";
    this.advancedDiv.style.left             = "" + (MASH_ControlMenu.MENU_WIDTH - MASH_ControlMenu.ADVANCED_BUTTON_WIDTH - 20) +"px";
    this.advancedDiv.style.top              = "50px";
    this.advancedDiv.style.width            = "" + adjustSize(MASH_ControlMenu.ADVANCED_BUTTON_WIDTH, MASH_ControlMenu.ADVANCED_BUTTON_BORDER_WIDTH) + "px";
    this.advancedDiv.style.height           = "" + adjustSize(MASH_ControlMenu.ADVANCED_BUTTON_HEIGHT,MASH_ControlMenu.ADVANCED_BUTTON_BORDER_WIDTH) + "px";
    this.advancedDiv.style.backgroundColor  = "#c0c0c0";
    this.advancedDiv.style.borderStyle      = "outset";
    this.advancedDiv.style.borderWidth      = "" + MASH_ControlMenu.ADVANCED_BUTTON_BORDER_WIDTH + "px";
    this.advancedDiv.style.textAlign        = "center";
    this.advancedDiv.style.overflow         = "hidden";

    this.advancedDiv.innerHTML             += MASH_ControlMenu.getAdvancedControls();

    //recognziers div
    this.recognizersDiv                       = document.createElement("div");
    this.recognizersDiv.style.width           = adjustSize(MASH_ControlMenu.RECOGNIZERS_DIV_WIDTH, 3);
    this.recognizersDiv.style.height          = adjustSize(MASH_ControlMenu.RECOGNIZERS_DIV_HEIGHT,3);
    this.recognizersDiv.style.backgroundColor = "#e4e4e4";
    this.recognizersDiv.style.borderStyle     = "inset";
    this.recognizersDiv.style.borderWidth     = "3px";
    this.recognizersDiv.style.overflow        = "auto";
    this.recognizersDiv.style.paddingTop      = "4px";

    this.recognizersDiv.innerHTML             = MASH_ControlMenu.getRecognizersControls();

    //bottom part of the control panel
    this.bottomDiv                  = document.createElement("div");
    this.bottomDiv.style.width      = "100%";
    this.bottomDiv.style.height     = "30px";
    this.bottomDiv.style.paddingTop = "12px";
//    this.bottomDiv.innerHTML        = "<center><a href=\"javascript:otherObjects[0].close();\" style=\"align:center; border-style:outset; border-width:2; background-color:#c0c0c0; color:#000000; text-decoration:none; font-weight:normal; font-family:Arial; font-size:9pt;\">&nbsp;Close&nbsp;</a></center><br>\n";
    this.bottomDiv.innerHTML        = "<center><span onclick=\"otherObjects[0].close();\" style=\"align:center; border-style:outset; border-width:2; background-color:#c0c0c0; color:#000000; text-decoration:none; font-weight:normal; font-family:Arial; font-size:9pt;\">&nbsp;Close&nbsp;</span></center><br>\n";



    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
    addEventListener(this.innerObj, "dragstart", divDrag, false);
    addEventListener(this.innerObj, "drag",      divDrag, false);
    addEventListener(this.innerObj, "dragstop",  divDrag, false);

    //this is to allow dragin inside collections
    addEventListener(this.innerObj, "mousedown", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mousemove", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mouseup",   divPropagateNoDefault, false);

    //prevent sticky scrollbars
    addEventListener(this.recognizersDiv, "scroll", divScroll, false);//this event listener is needed in order to avoid "sticky" scrollbars

    //append inner object
    this.advancedDiv    = this.innerObj.appendChild(this.advancedDiv);
    this.closeButton    = this.innerObj.appendChild(this.closeButton);
    this.topDiv         = this.innerObj.appendChild(this.topDiv);
    this.recognizersDiv = this.innerObj.appendChild(this.recognizersDiv);
    this.bottomDiv      = this.innerObj.appendChild(this.bottomDiv);
    this.innerObj       = this.innerTRObj.appendChild(this.innerObj);
    this.innerTRObj     = this.innerTBodyObj.appendChild(this.innerTRObj);
    this.innerTBodyObj  = this.innerTableObj.appendChild(this.innerTBodyObj);
    this.innerTableObj  = this.wrapperObj.appendChild(this.innerTableObj);


    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.reference                   = this.wrapperObj;

    return this.wrapperObj;

}//MASH_ControlMenu.prototype.createScreenObject



// MASH_ControlMenu.setAutoParseMode                                                   MASH_ControlMenu.setAutoParseMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setAutoParseMode = function() {

    var tmpCheck = document.getElementById(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_AUTOPARSE_CHECKBOX_ID);
    if(tmpCheck) {
        if(tmpCheck.checked) { spatialParserActive = true;  }
        else                 { spatialParserActive = false; }
    }

}//MASH_ControlMenu.setAutoParseMode



// MASH_ControlMenu.prototype.setVerboseMode                                   MASH_ControlMenu.prototype.setVerboseMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.prototype.setVerboseMode = function(newValue) {
     MASH_ImplicitComposite.setVerboseMode(newValue);
}//MASH_ControlMenu.prototype.setVerboseMode



// MASH_ControlMenu.setVerbosityMode                                                   MASH_ControlMenu.setVerbosityMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setVerbosityMode = function() {

    var tmpCheck = document.getElementById(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_VERBOSITY_CHECKBOX_ID);
    if(tmpCheck) {
        if(tmpCheck.checked) { MASH_ImplicitComposite.setVerboseMode(true);  }
        else                 { MASH_ImplicitComposite.setVerboseMode(false); }
    }

}//MASH_ControlMenu.setVerbosityMode


// MASH_ControlMenu.getVerbosityControls                                           MASH_ControlMenu.getVerbosityControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getVerbosityControls = function() {

    if(MASH_ImplicitComposite.getVerboseMode()) {
        return "<input type=\"checkbox\" id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_VERBOSITY_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setVerbosityMode();\" checked>Verbose<br>";
    }
    else{
        return "<input type=\"checkbox\" id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_VERBOSITY_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setVerbosityMode();\">Verbose<br>";
    }

}//MASH_ControlMenu.getVerbosityControls



// MASH_ControlMenu.getAutoParseControls                                           MASH_ControlMenu.getAutoParseControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getAutoParseControls = function() {

    if(spatialParserActive == true) {
        return "<input type=\"checkbox\" id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_AUTOPARSE_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setAutoParseMode();\" checked>Auto-Parse<br>";
    }
    else{
        return "<input type=\"checkbox\" id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_AUTOPARSE_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setAutoParseMode();\">Auto-Parse<br>";
    }

}//MASH_ControlMenu.getAutoParseControls



// MASH_ControlMenu.setComplexityMode                                                 MASH_ControlMenu.setComplexityMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setComplexityMode = function() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        var tmpCheck = document.getElementById(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_COMPLEXITY_CHECKBOX_ID);
        if(tmpCheck) {
            if(tmpCheck.checked) {
                mashApplet.setLimitComplexity(true);
            }
            else                 {
                mashApplet.setLimitComplexity(false);
            }
        }
    }

}//MASH_ControlMenu.setComplexityMode


// MASH_ControlMenu.getComplexityMode                                                 MASH_ControlMenu.getComplexityMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getComplexityMode = function() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        return mashApplet.getLimitComplexity();
    }

}//MASH_ControlMenu.getComplexityMode


// MASH_ControlMenu.getComplexityControls                                         MASH_ControlMenu.getComplexityControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getComplexityControls = function() {

    var message    = "";
    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        this.maxComplexity = mashApplet.getMaximumComplexity();

        var isComplexityOn = MASH_ControlMenu.getComplexityMode();
        var color          = "#000000";

        message = "<input type=\"checkbox\" id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_COMPLEXITY_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setComplexityMode();\" ";
        if(isComplexityOn) {
            message += "checked>Complexity<br>";
        }
        else               {
            message += ">Complexity limit:&nbsp;";
        }

        message += "<span onclick=\"MASH_ControlMenu.decreaseComplexityLevel();\" style=\"text-decoration:none; background-color:#c0c0c0; border-width:2; border-style:outset; border-color:#dddddd; font-weight:bold; color:#000000;\">&lt;&nbsp;</span>";
        message += "<span style=\"border-width:1; border-style:solid; border-color:#000000;\">&nbsp;<span id=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_MAX_COMPLEXITY_SPAN_ID+"\">" + this.maxComplexity +"</span>&nbsp;</span>";
        message += "<span onclick=\"MASH_ControlMenu.increaseComplexityLevel();\" style=\"text-decoration:none; background-color:#c0c0c0; border-width:2; border-style:outset; border-color:#dddddd; font-weight:bold; color:#000000;\">&nbsp;&gt;</span>";
        message += "<br>";
    }

    return message;

}//MASH_ControlMenu.getComplexityControls


// MASH_ControlMenu.increaseComplexityLevel                                     MASH_ControlMenu.increaseComplexityLevel
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.increaseComplexityLevel = function() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        this.maxComplexity++;
        mashApplet.setMaximumComplixity(this.maxComplexity);

        if(!this.complexitySpan) {
            this.complexitySpan = document.getElementById(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_MAX_COMPLEXITY_SPAN_ID);
        }
        this.complexitySpan.innerHTML = (this.maxComplexity);

    }

}//MASH_ControlMenu.increaseComplexityLevel


// MASH_ControlMenu.decreaseComplexityLevel                                     MASH_ControlMenu.decreaseComplexityLevel
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.decreaseComplexityLevel = function() {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        this.maxComplexity--;
        if(this.maxComplexity < 1) { this.maxComplexity = 1; }

        mashApplet.setMaximumComplixity(this.maxComplexity);

        if(!this.complexitySpan) {
            this.complexitySpan = document.getElementById(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_MAX_COMPLEXITY_SPAN_ID);
        }
        this.complexitySpan.innerHTML = (this.maxComplexity);

    }

}//MASH_ControlMenu.decreaseComplexityLevel



// MASH_ControlMenu.getDisplayControls                                               MASH_ControlMenu.getDisplayControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getDisplayControls = function() {

    var message = "&nbsp;<span style=\"background-color:#555555; border-width:1; bordercolor:dddddd; border-style:inset; font-size:6pt;\">&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;Show as:&nbsp;";

    var shadowModeChecked = "checked";
    var lineModeChecked   = "";
    if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.SHADOW_MODE) {
        shadowModeChecked = "checked";
        lineModeChecked   = "";
    }
    else if(MASH_ImplicitComposite.DISPLAY_MODE == MASH_ImplicitComposite.LINE_MODE) {
        shadowModeChecked = "";
        lineModeChecked   = "checked";
    }

    message += "<input type=\"radio\" name=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_DISPLAY_MODE_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setDisplayMode(MASH_ImplicitComposite.SHADOW_MODE);\" "+ shadowModeChecked +">Shadows";
    message += "<input type=\"radio\" name=\""+MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_DISPLAY_MODE_CHECKBOX_ID+"\" onclick=\"MASH_ControlMenu.setDisplayMode(MASH_ImplicitComposite.LINE_MODE);\" "  + lineModeChecked   +">Lines<br>";

    return message;

}//MASH_ControlMenu.getDisplayControls


// MASH_ControlMenu.getAdvancedControls                                             MASH_ControlMenu.getAdvancedControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getAdvancedControls = function() {

    var message    = "";
    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        message += "<span onclick=\"mashApplet.showSpatialParserControls();\" style=\"font-family:Arial; font-size:9pt; text-decoration:none; color:#000000;\">Advanced</span>";
    }

    return message;

}//MASH_ControlMenu.getAdvancedControls


// MASH_ControlMenu.setDisplayMode                                                       MASH_ControlMenu.setDisplayMode
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setDisplayMode = function(newValue) {

    MASH_ImplicitComposite.DISPLAY_MODE = newValue;

}//MASH_ControlMenu.setDisplayMode



// MASH_ControlMenu.getRecognizersControls                                       MASH_ControlMenu.getRecognizersControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.getRecognizersControls = function() {

    var message          = "";

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        //The type conversion in Firefox 1.0.2 and Mozilla 1.7 is different than in IE
        //  when the applet returns a String, Firefox and Mozilla have it as a JavaObject
        //  it is necessary to append it to a empty String in Javascript to force the string conversion.
        //  This way it works in both IE and Firefox/Mozilla
        var namesString      = "" + mashApplet.getRecognizersNames();
        var recognizersNames = namesString.split("|");

        for(var i=0; i<recognizersNames.length; i++) {

            var recognizerParms = recognizersNames[i].split(":");

            //the checkbox should be checked if the recognizers is ON
            var activeState1 = "";
            var activeState2 = "";
            var activeState3 = "";

            if( (recognizerParms[1]) && (recognizerParms[1] == "ON") ) { activeState1 = " checked";  }
            if( (recognizerParms[2]) && (recognizerParms[2] == "ON") ) { activeState2 = " checked";  }
            if( (recognizerParms[3]) && (recognizerParms[3] == "ON") ) { activeState3 = " checked";  }

//            message += "<div style=\"position:relative; width:" + (MASH_ControlMenu.RECOGNIZERS_DIV_WIDTH-30) +"px; border-style:outset; border-width:2px; background-color:#e4e4e4; margin:0px 2px 2px 2px;\">\n";
            message += "<div style=\"position:relative; width:96%; border-style:outset; border-width:2px; background-color:#e4e4e4; margin:0px 2px 2px 2px;\">\n";
            message += "<input type=\"checkbox\"" + activeState1 + " "                                            +
                        "id=\""+(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_CHECKBOX_ID+i) + "\" "       +
                       "onclick=\"MASH_ControlMenu.setRecognizerActiveState('" + recognizerParms[0]  + "', "      +
                       "'"+(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_CHECKBOX_ID+i) +"');\" >"         +
                       "<span style=\"text-weight:bold;\"><b>" + recognizerParms[0] + "</b></span><br>\n";
            message += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;Check:\n";
            message += "&nbsp;&nbsp;<input type=\"checkbox\"" + activeState2 + " "                                +
                        "id=\""+(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_TYPE_CHECKBOX_ID+i) + "\" "  +
                       "onclick=\"MASH_ControlMenu.setRecognizerCheckType('" + recognizerParms[0]  + "', "        +
                       "'" + (MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_TYPE_CHECKBOX_ID+i) +"');\" >Type\n";
            message += "&nbsp;&nbsp;<input type=\"checkbox\"" + activeState3 + " "                                +
                        "id=\""+(MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_STYLE_CHECKBOX_ID+i) + "\" " +
                       "onclick=\"MASH_ControlMenu.setRecognizerCheckStyle('" + recognizerParms[0]  + "', "       +
                       "'" + (MASH_ControlMenu.SPATIAL_PARSER_CONTROLS_RECOGNIZER_STYLE_CHECKBOX_ID+i) +"');\" >Style<br>\n";
            message += "</div>";
        }

    }


    return message;

}//MASH_ControlMenu.getRecognizersControls



// MASH_ControlMenu.setRecognizerActiveState                                   MASH_ControlMenu.setRecognizerActiveState
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setRecognizerActiveState = function(recognizerName, checkboxID) {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var tmpCheck = document.getElementById(checkboxID);
        if(tmpCheck) {
            mashApplet.setRecognizerActiveState(recognizerName, tmpCheck.checked);
        }
    }

}//MASH_ControlMenu.setRecognizerActiveState


// MASH_ControlMenu.setRecognizerCheckType                                       MASH_ControlMenu.setRecognizerCheckType
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setRecognizerCheckType = function(recognizerName, checkboxID) {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var tmpCheck = document.getElementById(checkboxID);
        if(tmpCheck) {
            mashApplet.setRecognizerCheckType(recognizerName, tmpCheck.checked);
        }
    }

}//MASH_ControlMenu.setRecognizerCheckType



// MASH_ControlMenu.setRecognizerCheckStyle                                     MASH_ControlMenu.setRecognizerCheckStyle
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.setRecognizerCheckStyle = function(recognizerName, checkboxID) {

    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {
        var tmpCheck = document.getElementById(checkboxID);
        if(tmpCheck) {
            mashApplet.setRecognizerCheckStyle(recognizerName, tmpCheck.checked);
        }
    }

}//MASH_ControlMenu.setRecognizerCheckStyle



// MASH_ControlMenu.prototype.close                                                     MASH_ControlMenu.prototype.close
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.prototype.close = function() {

    //remove object from array and from the document
    otherObjects.shift();
    document.body.removeChild(this.reference);

}//MASH_ControlMenu.prototype.close



// MASH_ControlMenu.prototype.toString                                               MASH_ControlMenu.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.prototype.toString = function() {

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

}//MASH_ControlMenu.prototype.toString



// =====================================================================================================================
// BROWSER SPECIFIC                                                                                     BROWSER SPECIFIC
// =====================================================================================================================



// MASH_ControlMenu.prototype.getControlsLeft                                 MASH_ControlMenu.prototype.getControlsLeft
// ---------------------------------------------------------------------------------------------------------------------
MASH_ControlMenu.prototype.getControlsLeft = function() {

    var left = (this.width - (this.borderWidth*2) - MASH_ControlMenu.CLOSE_BUTTON_IMG_WIDTH - 2);
    left     = "" + (this.width - (this.borderWidth*2) - MASH_ControlMenu.CLOSE_BUTTON_IMG_WIDTH - 2) +"px";

    return left;

}//MASH_ControlMenu.prototype.getControlsLeft


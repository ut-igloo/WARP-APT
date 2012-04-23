// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created:  Aug 17, 2004                                                                                             //
// Modified: Sep 28, 2007: Modified CONTROLS_IMG_DIR to point to WARP Server                                          //
//                                                                                                                    //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Video                                                                                                 MASH_Video
// =====================================================================================================================
function MASH_Video(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle,
                    tmpPlayer, tmpSrc, tmpText
                   ) {

    this.base   = MASH_Object;
    this.base(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle );

    this.player = tmpPlayer;
    this.src    = tmpSrc;
    this.text   = tmpText;

    if((tmpStyle) && (tmpStyle!=null)){ this.innerStyle = tmpStyle; }
    else                              { this.innerStyle = "";       }

    this.MASHobjectType                         = MASH_Object.VIDEO;

    //context menu
    this.contextMenuString                      = "<hr>\n" +
                                                  "<span onclick=\"otherObjects[0].targetObj.play();\"                   style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_PLAY_IMG_FILENAME           +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Play</span><br>\n"            +
                                                  "<span onclick=\"otherObjects[0].targetObj.pause();\"                  style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_PAUSE_IMG_FILENAME          +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Pause</span><br>\n"           +
                                                  "<span onclick=\"otherObjects[0].targetObj.indexVideoPosition();\"     style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_INDEX_POSITION_IMG_FILENAME +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Index Position</span><br>\n"  +
                                                  "<span onclick=\"otherObjects[0].targetObj.indexVideoTime();\"         style=\"color:550000; text-decoration:none;\"><img src=\""+CONTROLS_IMG_DIR+"/"+MASH_Video.CONTROL_INDEX_TIME_IMG_FILENAME     +"\" width=\"20px\" height=\"20px\" algin=\"absmiddle\">&nbsp;Index Time</span><br>\n"      ;
    //video indices
    this.videoIndices                           = new Array();
    this.videoIndexCounter                      = 0;

    //XML
    this.xmlObjectTag                           = MASH_Video.XML_TAG_OBJECT;

}
//set inheritance
MASH_Video.prototype                            = new MASH_Object("MASH_Video",0,0,1,1,0,"");
MASH_Video.prototype.constructor                = MASH_Video;
//MASH_Video

//Constants
MASH_Video.COOKIE_NAME                          = "mash_videos";
MASH_Video.INNER_ID_PREFIX                      = "videoObj";
MASH_Video.ID_PREFIX                            = MASH_Object.ID_PREFIX + MASH_Video.INNER_ID_PREFIX;
MASH_Video.TITLEBAR_ID_PREFIX                   = MASH_Frame.INNER_ID_PREFIX + "TitleBar";

MASH_Video.TITLE_HEIGHT                         = 20; //pixel height of the title bar of a frame object

MASH_Video.INNER_BORDER_WIDTH                   = 1;


MASH_Video.REALPLAYER_PARAM                     = "REALPLAYER";
MASH_Video.REALPLAYER_CLASSID                   = "clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA";
MASH_Video.REALPLAYER_CONTROLS_HEIGHT           = 36;


MASH_Video.MEDIAPLAYER_PARAM                    = "MEDIAPLAYER";
MASH_Video.MEDIAPLAYER_CLASSID                  = "clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95";    //version 6.4
//MASH_Video.MEDIAPLAYER_CLASSID                  = "clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6";    //version 10
//MASH_Video.MEDIAPLAYER_CODEBASE                 = "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701";       //version 5.1
MASH_Video.MEDIAPLAYER_CODEBASE                 = "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112"        //version 6.4


MASH_Video.QUICKTIME_PARAM                      = "QUICKTIME";
MASH_Video.QUICKTIME_CLASSID                    = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
MASH_Video.QUICKTIME_CODEBASE                   = "http://www.apple.com/qtactivex/qtplugin.cab";
MASH_Video.QUICKTIME_PLUGINSPAGE                = "http://www.apple.com/quicktime/download/";


MASH_Video.CONTROL_PLAY_IMG_FILENAME            = "mash_video_play.png";
MASH_Video.CONTROL_PAUSE_IMG_FILENAME           = "mash_video_pause.png";
MASH_Video.CONTROL_INDEX_POSITION_IMG_FILENAME  = "mash_video_index_position.png";
MASH_Video.CONTROL_INDEX_TIME_IMG_FILENAME      = "mash_video_index_time.png";


// MASH_Video.clone                                                                                     MASH_Video.clone
// ---------------------------------------------------------------------------------------------------------------------
// * by calling it as a Class Method (as opposed to an instance method) the objects are created in the context of the callee
//   - this allows for a document to clone MASH_Objects from another clone. This is basicfor the import/export functions
MASH_Video.clone = function(originalObj) {

    var cloneObj = new MASH_Video(originalObj.id,
                                 originalObj.left,
                                 originalObj.top,
                                 originalObj.width,
                                 originalObj.height,
                                 originalObj.zIndex,
                                 originalObj.style,
                                 originalObj.tmpPlayer,
                                 originalObj.tmpSrc,
                                 originalObj.text
                                );
    return cloneObj;

}//MASH_Video.clone



// MASH_Video.prototype.clone                                                                 MASH_Video.prototype.clone
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.clone = function() {
    return MASH_Video.clone(this);
}//MASH_Video.prototype.clone



// MASH_Video.prototype.createScreenObject                                       MASH_Video.prototype.createScreenObject
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.createScreenObject  = function(i){

    //make object and sub object's id
    var tmpObjID        = MASH_Video.ID_PREFIX          + i;
    var tmpObjInnerID   = MASH_Video.INNER_ID_PREFIX    + i;
    var tmpSpanObjID    = MASH_Video.TITLEBAR_ID_PREFIX + i;

    //wrapper object
    this.wrapperObj     = this.createWrapperObject(tmpObjID, i);

    //compute dimensions
    var adjustedWidth   = adjustSize(this.width,  this.borderWidth);
    var adjustedHeight  = adjustSize(this.height, this.borderWidth);

    var adjustedInnerWidth  = this.width  - (this.borderWidth*2) - (MASH_Video.INNER_BORDER_WIDTH * 2) - 1;
    var adjustedInnerHeight = this.height - (this.borderWidth*2) - (MASH_Video.INNER_BORDER_WIDTH * 2) - MASH_Video.TITLE_HEIGHT;

    //validate adjusted dimensions
    // - if dimensions are 0 or negative, IE stops the scripts, and Netscape ignores the assignments
    if(adjustedInnerWidth  <= 0) { adjustedInnerWidth  = 1; }
    if(adjustedInnerHeight <= 0) { adjustedInnerHeight = 1; }


    //title bar
    this.spanObj                     = document.createElement("span");
    this.spanObj.id                  = tmpSpanObjID;

    this.spanObj.style.position      = "absolute";
    this.spanObj.style.left          = 0;
    this.spanObj.style.top           = 0;
    this.spanObj.style.width         = adjustedInnerWidth;

    this.spanObj.style.height        = MASH_Video.TITLE_HEIGHT;

    this.spanObj.style.color         = this.color;

    this.spanObj.style.fontFamily    = this.fontFamily;
    this.spanObj.style.fontSize      = this.fontSize;
    this.spanObj.style.fontWeight    = this.fontWeight;

    this.spanObj.innerHTML           = this.text + "   " + this.src;

    //inner object
    this.innerObj                    = document.createElement("div");

    this.innerObj.id                 = tmpObjInnerID;
    this.innerObj.objectIndex        = i;
    this.innerObj.width              = adjustedInnerWidth;
    this.innerObj.height             = adjustedInnerHeight;
    this.innerObj.style.position     = "absolute";
    this.innerObj.style.left         = MASH_Video.INNER_BORDER_WIDTH;
    this.innerObj.style.top          = MASH_Video.TITLE_HEIGHT;
    this.innerObj.style.zIndex       = 2;

//STILL HAS PROBLEMS IN IE

    //Quicktime
    var innerObjQuicktime = "";
    innerObjQuicktime    += "<object ";
    innerObjQuicktime    += "id=\""         + tmpObjInnerID        + "Obj\" ";
    innerObjQuicktime    += "classid=\""    + MASH_Video.QUICKTIME_CLASSID       + "\" ";
    innerObjQuicktime    += "codebase=\""   + MASH_Video.QUICKTIME_CODEBASE      + "\" ";
    innerObjQuicktime    += "width=\""      + adjustedInnerWidth   + "\" ";
    innerObjQuicktime    += "height=\""     + adjustedInnerHeight  + "\" ";
//    innerObjQuicktime    += "standby=\"\" ";
//    innerObjQuicktime    += "type=\"application/x-oleobject\" ";
//    innerObjQuicktime    += "style=\"position:relative; background-color:#550000;\" ";
    innerObjQuicktime    += ">\n";

    innerObjQuicktime    += "<param name=\"src\"                value=\"" + this.src + "\">\n";
    innerObjQuicktime    += "<param name=\"transparentatStart\" value=\"true\">\n";
    innerObjQuicktime    += "<param name=\"autoplay\"           value=\"true\">\n";
    innerObjQuicktime    += "<param name=\"controller\"         value=\"true\">\n";

    innerObjQuicktime    += "<embed ";
    innerObjQuicktime    += "id=\""          + tmpObjInnerID            + "Embed\" ";
    innerObjQuicktime    += "pluginspage=\"" + MASH_Video.QUICKTIME_PLUGINSPAGE       + "\" ";
    innerObjQuicktime    += "width=\""       + adjustedInnerWidth       + "\" ";
    innerObjQuicktime    += "height=\""      + adjustedInnerHeight      + "\" ";
    innerObjQuicktime    += "src=\""         + this.src                 + "\" ";
    innerObjQuicktime    += "autoplay=\"true\" ";
    innerObjQuicktime    += "controller=\"true\" ";
    innerObjQuicktime    += "enablejavascript=\"true\" ";
    innerObjQuicktime    += "type=\"video/quicktime\">\n";
    innerObjQuicktime    += "style=\"background-color:#550000;\" ";
    innerObjQuicktime    += ">\n";
    innerObjQuicktime    += "</embed>\n";

    innerObjQuicktime    += "</object>\n";

//    alert(innerObjQuicktime);

    //MediaPlayer
    var innerObjMediaPlayer  = "<";

    innerObjMediaPlayer     += "object id='"  + tmpObjInnerID                      + "Obj' ";
    innerObjMediaPlayer     += "classid='"    + MASH_Video.MEDIAPLAYER_CLASSID     + "' ";
    innerObjMediaPlayer     += "codebase='"   + MASH_Video.MEDIAPLAYER_CODEBASE    + "' ";
    innerObjMediaPlayer     += "width='"      + adjustedInnerWidth                 + "' ";
    innerObjMediaPlayer     += "height='"     + adjustedInnerHeight                + "' ";
    innerObjMediaPlayer     += "standby='loading' ";
    innerObjMediaPlayer     += "onload='alert(this.height);' ";
    innerObjMediaPlayer     += "type='application/x-oleobject'>\n";

    innerObjMediaPlayer     += "<param name='URL'                 value='" + this.src + "'>\n";
//    innerObjMediaPlayer     += "<param name='FileName'            value='" + this.src + "'>\n";
    innerObjMediaPlayer     += "<param name='autoStart'           value='true'>\n";
    innerObjMediaPlayer     += "<param name='stretchToFit'        value='true'>\n";
//    innerObjMediaPlayer     += "<param name='ShowControls'        value='true'>\n";
    innerObjMediaPlayer     += "<param name='Loop'                value='true'>\n";
    innerObjMediaPlayer     += "<param name='AnimationatStart'    value='false'>\n";
    innerObjMediaPlayer     += "<param name='TransparentAtStart'  value='false'>\n";
    innerObjMediaPlayer     += "<param name='autoSize'            value='true'>\n";
    innerObjMediaPlayer     += "<param name='displaySize'         value='4'>\n";

    innerObjMediaPlayer     += "<param name='autoStart'           value='true'>\n";
//    innerObjMediaPlayer     += "<param name='uiMode'              value='invisible'>\n";
//    innerObjMediaPlayer     += "<param name='uiMode'              value='none'>\n";
//    innerObjMediaPlayer     += "<param name='uiMode'              value='mini'>\n";
    innerObjMediaPlayer     += "<param name='uiMode'              value='full'>\n";
    innerObjMediaPlayer     += "<param name='stretchToFit'        value='true'>\n";
    innerObjMediaPlayer     += "<param name='windowlessVideo'     value='true'>\n";

    innerObjMediaPlayer     += "<embed ";
    innerObjMediaPlayer     += "id='"      + tmpObjInnerID         + "Embed' ";
    innerObjMediaPlayer     += "width='"   + adjustedInnerWidth    + "' ";
    innerObjMediaPlayer     += "height='"  + adjustedInnerHeight   + "' ";
    innerObjMediaPlayer     += "src='"     + this.src              + "' ";
    innerObjMediaPlayer     += "URL='"     + this.src              + "' ";
    innerObjMediaPlayer     += "stretchToFit='true' ";
    innerObjMediaPlayer     += "type='application/x-mplayer2' ";
    innerObjMediaPlayer     += "showControls='1' ";
    innerObjMediaPlayer     += "autoStart='1' ";
    innerObjMediaPlayer     += "transparentAtStart='1' ";
    innerObjMediaPlayer     += "animationAtStart='1' ";
    innerObjMediaPlayer     += "autoSize='0' ";           //adjusts the size of the video to the video's frame size
    innerObjMediaPlayer     += "displaySize='4' ";
    innerObjMediaPlayer     += "stretchToFit='true' ";
    innerObjMediaPlayer     += ">\n";
    innerObjMediaPlayer     += "</embed>\n";

    innerObjMediaPlayer     += "</object>\n";

//    alert(innerObjMediaPlayer);

    //RealPlayer
    var imageHeight        = adjustedInnerHeight - MASH_Video.REALPLAYER_CONTROLS_HEIGHT;

    var innerObjRealPlayer = "";
    //display
    innerObjRealPlayer    += "<object id=\"" + tmpObjInnerID                  + "Obj\" ";
    innerObjRealPlayer    += "classid=\""    + MASH_Video.REALPLAYER_CLASSID  + "\" ";
    innerObjRealPlayer    += "width=\""      + adjustedInnerWidth             + "\" ";
    innerObjRealPlayer    += "height=\""     + imageHeight                    + "\" ";
    innerObjRealPlayer    += ">\n";

    innerObjRealPlayer    += "<param name=\"src\"       value=\"" + this.src + "\">\n";
    innerObjRealPlayer    += "<param name=\"autostart\" value=\"true\">\n";
    innerObjRealPlayer    += "<param name=\"controls\"  value=\"ImageWindow\">\n";
    innerObjRealPlayer    += "<param name=\"console\"   value=\"one\">\n";

    innerObjRealPlayer    += "<embed ";
    innerObjRealPlayer    += "id=\""        + tmpObjInnerID         + "Embed\" ";
    innerObjRealPlayer    += "width=\""     + adjustedInnerWidth    + "\" ";
    innerObjRealPlayer    += "height=\""    + imageHeight           + "\" ";
    innerObjRealPlayer    += "src=\""       + this.src              + "\" ";
    innerObjRealPlayer    += "type=\"audio/x-pn-realaudio-plugin\" ";
    innerObjRealPlayer    += "autostart=\"true\" ";
    innerObjRealPlayer    += "nojava=\"true\" ";
    innerObjRealPlayer    += "controls=\"ImageWindow\" ";
    innerObjRealPlayer    += "console=\"one\" ";
    innerObjRealPlayer    += "maintainaspect=\"true\" ";
    innerObjRealPlayer    += "center=\"false\" ";
    innerObjRealPlayer    += ">\n";
    innerObjRealPlayer    += "</embed>\n";

    //controls
    innerObjRealPlayer    += "</object>\n";
    innerObjRealPlayer    += "<object id=\"" + tmpObjInnerID                         + "ObjControls\" ";
    innerObjRealPlayer    += "classid=\""    + MASH_Video.REALPLAYER_CLASSID         + "\" ";
    innerObjRealPlayer    += "width=\""      + adjustedInnerWidth                    + "\" ";
    innerObjRealPlayer    += "height=\""     + MASH_Video.REALPLAYER_CONTROLS_HEIGHT + "\" ";
    innerObjRealPlayer    += ">\n";

    innerObjRealPlayer    += "<param name=\"src\"       value=\"" + this.src + "\">\n";
    innerObjRealPlayer    += "<param name=\"autostart\" value=\"true\">\n";
    innerObjRealPlayer    += "<param name=\"controls\"  value=\"ControlPanel\">\n";
    innerObjRealPlayer    += "<param name=\"console\"   value=\"one\">\n";

    innerObjRealPlayer    += "<embed ";
    innerObjRealPlayer    += "id=\""        + tmpObjInnerID                         + "EmbedControls\" ";
    innerObjRealPlayer    += "width=\""     + adjustedInnerWidth                    + "\" ";
    innerObjRealPlayer    += "height=\""    + MASH_Video.REALPLAYER_CONTROLS_HEIGHT + "\" ";
    innerObjRealPlayer    += "src=\""       + this.src                              + "\" ";
    innerObjRealPlayer    += "type=\"audio/x-pn-realaudio-plugin\" ";
    innerObjRealPlayer    += "autostart=\"true\" ";
    innerObjRealPlayer    += "nojava=\"true\" ";
    innerObjRealPlayer    += "controls=\"ControlPanel\" ";
    innerObjRealPlayer    += "console=\"one\" ";
    innerObjRealPlayer    += ">\n";
    innerObjRealPlayer    += "</embed>\n";

    innerObjRealPlayer    += "</object>\n";

//    alert(innerObjRealPlayer);

    //select the appropriate player
    var innerObjectParams   = innerObjRealPlayer;
    if(this.player == MASH_Video.QUICKTIME_PARAM)   { innerObjectParams   = innerObjQuicktime;   }
    if(this.player == MASH_Video.REALPLAYER_PARAM)  { innerObjectParams   = innerObjRealPlayer;  }
    if(this.player == MASH_Video.MEDIAPLAYER_PARAM) { innerObjectParams   = innerObjMediaPlayer; }

    this.innerObj.innerHTML = innerObjectParams;


    //append objects
    this.innerObj       = this.wrapperObj.appendChild(this.innerObj);
    this.spanObj        = this.wrapperObj.appendChild(this.spanObj);


    //the drag events are only relevant for IE, however they do not affect operation on Netscape
    //   so we can add them without concerns
    addEventListener(this.innerObj, "dragstart", divDrag, false);
    addEventListener(this.innerObj, "drag",      divDrag, false);
    addEventListener(this.innerObj, "dragstop",  divDrag, false);

    //this is to allow dragin inside collections
    addEventListener(this.innerObj, "mousedown", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mousemove", divPropagateNoDefault, false);
    addEventListener(this.innerObj, "mouseup",   divPropagateNoDefault, false);



    //cross reference the parameters with the screen object
    this.wrapperObj.MASHparameters   = this;
    this.innerObj.MASHparameters     = this;
    this.reference                   = this.wrapperObj;


    return this.wrapperObj;

}//MASH_Video.prototype.createScreenObject



// =====================================================================================================================
// Transformations                                                                                       Transformations
// =====================================================================================================================



// MASH_Video.prototype.emphasize                                                         MASH_Video.prototype.emphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.emphasize  = function(){

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

}//MASH_Video.prototype.emphasize



// MASH_Video.prototype.deemphasize                                                     MASH_Video.prototype.deemphasize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.deemphasize  = function(){

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

}//MASH_Video.prototype.deemphasize



// MASH_Video.prototype.play                                                                   MASH_Video.prototype.play
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.play = function() {

    var videoObject   = document.getElementById(this.innerObj.id + "Obj");
    var videoEmbed    = document.getElementById(this.innerObj.id + "Embed");
    var controlObject = document.getElementById(this.innerObj.id + "ObjControls");
    var controlEmbed  = document.getElementById(this.innerObj.id + "EmbedControls");

    //IE
//    if(videoObject) { videoObject.play(); }
    if(videoObject) {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoObject.controls.play();
        }
    }
    //Netscape
    if(videoEmbed)  {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoEmbed.play();
        }
    }

}//MASH_Video.prototype.play



// MASH_Video.prototype.pause                                                                 MASH_Video.prototype.pause
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.pause = function() {

    var videoObject   = document.getElementById(this.innerObj.id + "Obj");
    var videoEmbed    = document.getElementById(this.innerObj.id + "Embed");
    var controlObject = document.getElementById(this.innerObj.id + "ObjControls");
    var controlEmbed  = document.getElementById(this.innerObj.id + "EmbedControls");

    //IE
    if(videoObject) {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoObject.controls.pause();
        }
    }
    //Netscape
    if(videoEmbed)  {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoEmbed.pause();
        }
    }

}//MASH_Video.prototype.pause



// MASH_Video.prototype.currentPosition                                             MASH_Video.prototype.currentPosition
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.currentPosition = function(value) {

    var videoObject   = document.getElementById(this.innerObj.id + "Obj");
    var videoEmbed    = document.getElementById(this.innerObj.id + "Embed");
    var controlObject = document.getElementById(this.innerObj.id + "ObjControls");
    var controlEmbed  = document.getElementById(this.innerObj.id + "EmbedControls");

    //IE
    if(videoObject) {
//        alert("videoPosition = " + videoObject.controls.currentPosition );
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoObject.controls.currentPosition = value;
        }
    }
    //Netscape
    // check that this works
    if(videoEmbed)  {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoEmbed.currentPosition = value;
        }
    }

}//MASH_Video.prototype.currentPosition



// MASH_Video.prototype.getCurrentPosition                                       MASH_Video.prototype.getCurrentPosition
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.getCurrentPosition = function() {

    var videoObject   = document.getElementById(this.innerObj.id + "Obj");
    var videoEmbed    = document.getElementById(this.innerObj.id + "Embed");
    var controlObject = document.getElementById(this.innerObj.id + "ObjControls");
    var controlEmbed  = document.getElementById(this.innerObj.id + "EmbedControls");

    var videoPosition = -1;
    //IE
    if(videoObject) {
//        alert("videoPosition = " + videoObject.controls.currentPosition );
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoPosition = videoObject.controls.currentPosition;
        }
    }
    //Netscape
    // check that this works
    if(videoEmbed)  {
        if(videoObject.classid == MASH_Video.MEDIAPLAYER_CLASSID) {
            videoPosition = videoEmbed.controls. currentPosition;
        }
    }

    return videoPosition;

}//MASH_Video.prototype.getCurrentPosition



// MASH_Video.prototype.indexVideoPosition                                       MASH_Video.prototype.indexVideoPosition
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an index to this video at its current position
MASH_Video.prototype.indexVideoPosition = function(){

    var videoIndexText = prompt("Please enter the text for the video index", "");

    //validate index message
    if(!videoIndexText) {
        videoIndexText = "";
    }

    var tmpID          = this.id + "_videoIndex_" + this.videoIndexCounter++;

    var tmpLeft        = parseInt(this.reference.style.left) + parseInt(this.reference.style.width) + 10;
    var tmpTop         = parseInt(this.reference.style.top) + 10;
    var tmpWidth       = 200;
    var tmpHeight      = 100;
    var tmpZIndex      = parseInt(this.reference.style.zIndex) + 1;
    var tmpStyle       = this.style;

    var tmpPosition    = this.getCurrentPosition();

    //create videoIndex object
    var videoIndexObj  = new MASH_VideoIndex(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, videoIndexText, tmpPosition, this);


    //append object to document
    var videoIndexObjWrapper  = videoIndexObj.createScreenObject(0);

    var parentCollection      = this.collection;
    //if this object is not inside a collection
    if(!parentCollection) {
        videoIndexObjWrapper  = document.body.appendChild(videoIndexObjWrapper);
    }
    //if this object is inside a collection
    else {
        videoIndexObjWrapper  = parentCollection.appendChild(videoIndexObjWrapper);

        videoIndexObjWrapper.collection = topCollection[0].innerObj;

    }

    videoIndexObjWrapper.MASHparameters = videoIndexObj;
    videoIndexObj.reference             = videoIndexObjWrapper;

    this.videoIndices.push(videoIndexObj);
    videoIndexObjects.push(videoIndexObj);
    allMASHObjects.push(videoIndexObj);

}//indexVideoPosition



// MASH_Video.prototype.indexVideoTime                                               MASH_Video.prototype.indexVideoTime
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an index to this video at a user-specified time position
MASH_Video.prototype.indexVideoTime = function(){
    var videoIndexText = prompt("Please enter the text for the video index", "");

    //validate index message
    if(!videoIndexText) {
        videoIndexText = "";
    }

    var tmpID          = this.id + "_videoIndex_" + this.videoIndexCounter++;

    var tmpLeft        = parseInt(this.reference.style.left) + parseInt(this.reference.style.width) + 10;
    var tmpTop         = parseInt(this.reference.style.top) + 10;
    var tmpWidth       = 200;
    var tmpHeight      = 100;
    var tmpZIndex      = parseInt(this.reference.style.zIndex) + 1;
    var tmpStyle       = this.style;

    var tmpPosition    = this.getCurrentPosition();

    //create videoIndex object
    var videoIndexObj  = new MASH_VideoIndex(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, videoIndexText, tmpPosition, this);


    //append object to document
    var videoIndexObjWrapper  = videoIndexObj.createScreenObject(0);

    var parentCollection      = this.collection;
    if(!parentCollection) {
        videoIndexObjWrapper  = document.body.appendChild(videoIndexObjWrapper);
    }
    else {
        videoIndexObjWrapper  = parentCollection.appendChild(videoIndexObjWrapper);
    }

    videoIndexObjWrapper.MASHparameters = videoIndexObj;
    videoIndexObj.reference             = videoIndexObjWrapper;

    this.videoIndices.push(videoIndexObj);
    videoIndexObjects.push(videoIndexObj);
    allMASHObjects.push(videoIndexObj);

}//MASH_Video.prototype.indexVideoTime



// MASH_Video.prototype.removeVideoIndex                                           MASH_Video.prototype.removeVideoIndex
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.removeVideoIndex = function(tmpObj) {

    //remove it from the local array of videoIndices
    for(var i=0; i<this.videoIndices.length; i++) {
        if(this.videoIndices[i] == tmpObj) {
            this.videoIndices.splice(i,1);
            i--;
        }
    }

    //remove it from the global array of videoIndices
    for(var i=0; i<videoIndexObjects.length; i++) {
        if(videoIndexObjects[i] == tmpObj) {
            videoIndexObjects.splice(i,1);
            i--;
        }
    }

    //remove it from the allMASHObjects array
    removeObject(tmpObj);

}//MASH_Video.prototype.removeVideoIndex



// MASH_Video.multipleIndexVideoPosition                                           MASH_Video.multipleIndexVideoPosition
// ---------------------------------------------------------------------------------------------------------------------
// * Creates an index to multiple MASH_Video objects at their current position
// * this function is used by the collections when they inherit the controls for the videos
MASH_Video.multipleIndexVideoPosition = function(tmpVideoObjects){

    //validate index message
    var videoIndexText = prompt("Please enter the text for the video index", "");
    if(!videoIndexText) { videoIndexText = ""; }


    var tmpLeft        = 10;
    var tmpTop         = 10;
    var tmpWidth       = 200;
    var tmpHeight      = 100;
    var tmpZIndex      = 2;

    var tmpCollection  = null;

    var tmpID          = "";
    var tmpPositions   = new Array();
    var tmpCounter     = 0;
    if(tmpVideoObjects instanceof Array) {

        for(var i=0; i<tmpVideoObjects.length; i++) {
            tmpID     += tmpVideoObjects[i].id + "_";
            tmpVideoObjects[i].videoIndexCounter++;
            if(tmpCounter < tmpVideoObjects[i].videoIndexCounter) {
                tmpCounter = tmpVideoObjects[i].videoIndexCounter;
            }

            tmpPositions.push(tmpVideoObjects[i].getCurrentPosition());
        }

        tmpLeft        = parseInt(tmpVideoObjects[0].reference.style.left)   + parseInt(tmpVideoObjects[0].reference.style.width) + 10;
        tmpTop         = parseInt(tmpVideoObjects[0].reference.style.top)    + 10;
        tmpZIndex      = parseInt(tmpVideoObjects[0].reference.style.zIndex) +  1;
        tmpStyle       = tmpVideoObjects[0].style;

        tmpCollection  = tmpVideoObjects[0].collection;
    }
    else if(tmpVideoObjects instanceof MASH_Video){

        tmpID          = tmpVideoObjects.id + "_";
        tmpVideoObjects.videoIndexCounter++;
        if(tmpCounter < tmpVideoObjects.videoIndexCounter) {
            tmpCounter = tmpVideoObjects.videoIndexCounter;
        }

        tmpPositions   = tmpVideoObjects.getCurrentPosition();

        tmpLeft        = parseInt(tmpVideoObjects.reference.style.left)   + parseInt(this.reference.style.width) + 10;
        tmpTop         = parseInt(tmpVideoObjects.reference.style.top)    + 10;
        tmpZIndex      = parseInt(tmpVideoObjects.reference.style.zIndex) +  1;
        tmpStyle       = tmpVideoObjects.style;

        tmpCollection  = tmpVideoObjects.collection;
    }
    else {
        return;
    }
    tmpID              = "videoIndex_" + tmpCounter;


    //create videoIndex object
    var videoIndexObj  = new MASH_VideoIndex(tmpID, tmpLeft, tmpTop, tmpWidth, tmpHeight, tmpZIndex, tmpStyle, videoIndexText, tmpPositions, tmpVideoObjects);


    //append object to document
    var videoIndexObjWrapper = videoIndexObj.createScreenObject(0);

    if(!tmpCollection) { videoIndexObjWrapper = document.body.appendChild(videoIndexObjWrapper); }
    else               { videoIndexObjWrapper = tmpCollection.appendChild(videoIndexObjWrapper); }

    videoIndexObjWrapper.MASHparameters = videoIndexObj;
    videoIndexObj.reference             = videoIndexObjWrapper;


    for(var i=0; i<tmpVideoObjects.length; i++) { tmpVideoObjects[i].videoIndices.push(videoIndexObj); }
//    this.videoIndices.push(videoIndexObj);
    videoIndexObjects.push(videoIndexObj);
    allMASHObjects.push(videoIndexObj);

}//MASH_Video.multipleIndexVideoPosition



// MASH_Video.prototype.resize                                                               MASH_Video.prototype.resize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.resize = function(newWidth, newHeight) {

    var videoObject   = document.getElementById(this.innerObj.id + "Obj");
    var videoEmbed    = document.getElementById(this.innerObj.id + "Embed");
    var controlObject = document.getElementById(this.innerObj.id + "ObjControls");
    var controlEmbed  = document.getElementById(this.innerObj.id + "EmbedControls");

    this.resizeContextLayer(newWidth, newHeight);

    //compute dimensions

    var extraPixels = 1;
    if(isIE) { extraPixels = 4; }

    var adjustedWidth  = this.width  - (2 * this.borderWidth);
    var adjustedHeight = this.height - (2 * this.borderWidth) - extraPixels; // this 4 is necessary because IE adds some extra pixels before and after the TD
                                                                             //    without it it always shows a vertical scrollbar

    if(adjustedWidth  <= 0) { adjustedWidth  = 1; }
    if(adjustedHeight <= 0) { adjustedHeight = 1; }


    var controlsHeight = 0;
    if(this.player == MASH_Video.QUICKTIME_PARAM)   { controlsHeight   = 0;   }
    if(this.player == MASH_Video.REALPLAYER_PARAM)  { controlsHeight   = MASH_Video.REALPLAYER_CONTROLS_HEIGHT;  }
    if(this.player == MASH_Video.MEDIAPLAYER_PARAM) { controlsHeight   = 0; }

    var imageWidth  = newWidth  - (2 * this.borderWidth);
    var imageHeight = newHeight - (2 * this.borderWidth) - extraPixels - MASH_Video.TITLE_HEIGHT - controlsHeight;

    if(imageWidth  < 10)                      { alert(imageWidth);  imageWidth = 10; }
    if(imageHeight < MASH_Video.TITLE_HEIGHT) { imageHeight = MASH_Video.TITLE_HEIGHT; }

    //reset the elements dimmensions
    if(videoObject) {
        videoObject.width        = imageWidth;
        videoObject.height       = imageHeight;
        videoObject.style.width  = imageWidth;
        videoObject.style.height = imageHeight;
    }
    if(videoEmbed) {
        videoEmbed.width         = imageWidth;
        videoEmbed.height        = imageHeight;
        videoEmbed.style.width   = imageWidth;
        videoEmbed.style.height  = imageHeight;
    }
    if(controlObject) {
        controlObject.width        = imageWidth;
        controlObject.style.width  = imageWidth;
    }
    if(controlEmbed) {
        controlEmbed.width         = imageWidth;
        controlEmbed.style.width   = imageWidth;
    }

    this.innerObj.style.width    = adjustedWidth;
    this.innerObj.style.height   = adjustedHeight;

    //fire a MASH event that is used in case of relationships
    if(relationshipList) { relationshipList.manageEvent(this.wrapperObj, MASH_EVENT.OBJECT_RESIZE); }

}//MASH_Video.prototype.resize



// MASH_Video.prototype.toString                                                           MASH_Video.prototype.toString
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.toString = function() {

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

}//MASH_Video.prototype.toString





// =====================================================================================================================
// XML Functions                                                                                           XML Functions
// =====================================================================================================================



//XML tags
MASH_Video.XML_TAG_OBJECT = MASH_Object.VIDEO;
MASH_Video.XML_TAG_PLAYER = "player";
MASH_Video.XML_TAG_SRC    = "src";
MASH_Video.XML_TAG_TEXT   = "text";


// MASH_Video.prototype.getTypeSpecificXML                                       MASH_Video.prototype.getTypeSpecificXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_Video.prototype.getTypeSpecificXML = function(indent) {

    //validate parameters
    if(!indent) { indent = MASH_Object.XML_TAG_INDENT;         }
    else        { indent = MASH_Object.XML_TAG_INDENT + indent }

    //make XML tags
    var objectXML = "";
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Video.XML_TAG_PLAYER, this.player, true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Video.XML_TAG_SRC,    this.src,    true,  indent);
    objectXML += MASH_Object.xmlMakeTagSingleLine(MASH_Video.XML_TAG_TEXT,   this.text,   true,  indent);

    return objectXML;

}//MASH_Video.prototype.getTypeSpecificXML



// MASH_Video.xmlParseObjectNode                                                           MASH_Video.xmlParseObjectNode
// ---------------------------------------------------------------------------------------------------------------------
// * this is a Netscape only function
//   it uses the Netscape XML parser
MASH_Video.xmlParseObjectNode = function(node){

//    alert("MASH_Video.xmlParseObjectNode\n======================\n" +
//          "nodeName = ["    + node.nodeName  + "]\n" );

    //initialize temporary variables

    //type
    var objType               = MASH_Object.VIDEO;

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
    var objPlayer             = "";
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
        else if(childName == MASH_Video.XML_TAG_PLAYER) { objPlayer = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Video.XML_TAG_SRC)    { objSrc    = MASH_Object.xmlParseNodeText(child); }
        else if(childName == MASH_Video.XML_TAG_TEXT)   { objText   = MASH_Object.xmlParseNodeText(child); }
    }

    //declare object
    var obj = new MASH_Video(objID, objLeft, objTop, objWidth, objHeight, objZIndex, objStyle,
                             objPlayer, objSrc, objText);

    return obj;

}//MASH_Video.xmlParseObjectNode




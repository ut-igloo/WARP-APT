// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Behaviors Package                                                                                                  //
// Slide Show behavior                                                                                                //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Jul 27, 2003                                                                                             //
// Modified:                                                                                                          //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Behavior_SlideShow                                                                       MASH_Behavior_SlideShow
// =====================================================================================================================
function MASH_Behavior_SlideShow() {
                    
    this.base = MASH_Behavior;
    this.base("SlideShow");
              
    this.interval  = 10;
    this.x         = 2;
    this.y         = 3;

    this.stepCount = 0;
    this.stepMax   = 10;
}
//set inheritance
MASH_Behavior_SlideShow.prototype                = new MASH_Behavior("SlideShow");
MASH_Behavior_SlideShow.prototype.constructor    = MASH_Behavior_SlideShow;
//MASH_Behavior_SlideShow


// ---------------------------------------------------------------------------------------------------------------------
// Class Properties                                                                                     Class Properties
// ---------------------------------------------------------------------------------------------------------------------

MASH_Behavior_SlideShow.objectArray = new Array();


// ---------------------------------------------------------------------------------------------------------------------
// Class Methods                                                                                           Class Methods
// ---------------------------------------------------------------------------------------------------------------------


// writeControls                                                                                           writeControls
// ---------------------------------------------------------------------------------------------------------------------
// * writes the behavior controls in the web page
MASH_Behavior_SlideShow.writeControls = function(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Slide Show:</span>");
    document.writeln("<a href=\"javascript:MASH_Behavior_SlideShow.moveForward();\" ><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">Previous</span></a>");
    document.writeln("<a href=\"javascript:MASH_Behavior_SlideShow.moveBackward();\"><span style=\"color:#0000bb; font-family:arial; font-size:8pt; font-weight:bold;\">Next</span></a>");

}//writeBehaviors


// initialize                                                                                                 initialize
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_SlideShow.initialize = function(objectArray){
    MASH_Behavior_SlideShow.objectArray = objectArray;
    for(var i=0; i<objectArray.length; i++) {
        addBehaviorObject(objectArray[i], new MASH_Behavior("SlideShow"));
    }

}//initialize


// moveForward                                                                                               moveForward
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_SlideShow.moveForward = function(){

    var objIndex = 0;
    var tmpObj   = MASH_Behavior_SlideShow.objectArray.pop();    
    MASH_Behavior_SlideShow.objectArray.unshift(tmpObj);

    //difine behavior for this object
    var tmpBehaviorObject       =  new MASH_Behavior_SlideShow();
    tmpBehaviorObject.stepCount =  0;
    tmpBehaviorObject.x         =  2;
    tmpBehaviorObject.y         = -2;
    tmpBehaviorObject.zIndex    =  topZ;
    tmpBehaviorObject.increment =  1;

    //add behavior to object

    addBehaviorObject(tmpObj, tmpBehaviorObject);

    //start behavior
    MASH_Behavior_SlideShow.animate(objIndex);

}//moveForward


// moveBackward                                                                                             moveBackward
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_SlideShow.moveBackward = function(){

    var objIndex = MASH_Behavior_SlideShow.objectArray.length - 1;
    var tmpObj   = MASH_Behavior_SlideShow.objectArray.shift();    
    MASH_Behavior_SlideShow.objectArray.push(tmpObj);

    //difine behavior for this object
    var tmpBehaviorObject       =  new MASH_Behavior_SlideShow();
    tmpBehaviorObject.stepCount =  0;
    tmpBehaviorObject.x         =  2;
    tmpBehaviorObject.y         = -2;
    tmpBehaviorObject.zIndex    =  1;
    tmpBehaviorObject.increment =  1;

    //add behavior to object
    addBehaviorObject(tmpObj, tmpBehaviorObject);

    //start behavior
    MASH_Behavior_SlideShow.animate(objIndex);

}//moveBackward


// animate                                                                                                       animate
// ---------------------------------------------------------------------------------------------------------------------
MASH_Behavior_SlideShow.animate = function(objIndex){
    
    var tmpBehaviorObject = getBehaviorObject(MASH_Behavior_SlideShow.objectArray[objIndex], "SlideShow");

    if( tmpBehaviorObject.stepCount < -1) { 
        //re-arrange z order
        for(var i=0; i<MASH_Behavior_SlideShow.objectArray.length; i++) {
            MASH_Behavior_SlideShow.objectArray[i].reference.style.zIndex = (MASH_Behavior_SlideShow.objectArray.length - i);
        }
        return; 
    }
    
    
    //move object
    var obj            = MASH_Behavior_SlideShow.objectArray[objIndex].reference;
    
    obj.style.left     = obj.offsetLeft + tmpBehaviorObject.x; 
    obj.style.top      = obj.offsetTop  + tmpBehaviorObject.y;
    
    //make sure that the object remains inside the wandering area
    if(tmpBehaviorObject.stepCount == tmpBehaviorObject.stepMax) { 
        tmpBehaviorObject.x         *= -1; 
        tmpBehaviorObject.y         *= -1; 
        tmpBehaviorObject.increment  = -1;

        obj.style.zIndex             = tmpBehaviorObject.zIndex;

    }

    tmpBehaviorObject.stepCount += tmpBehaviorObject.increment;
//    alert("tmpBehaviorObject.stepCount = " + tmpBehaviorObject.stepCount);

    //reset timeout
    window.setTimeout("MASH_Behavior_SlideShow.animate("+objIndex+")", tmpBehaviorObject.interval); 

}//animate



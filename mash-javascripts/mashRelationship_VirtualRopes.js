// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Relationship Package                                                                                               //
// Virtual Ropes                                                                                                      //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Sep 16, 2003                                                                                              //
//                                                                                                                    //
// NOTES                                                                                                              //
// * requires of mashRelationships file                                                                               //
//                                                                                                                    //
// =====================================================================================================================



// =====================================================================================================================
// Virtual Rope Relationships                                                                 Virtual Rope Relationships
// =====================================================================================================================




// =====================================================================================================================
// MaximumDistance                                                                                       MaximumDistance
// =====================================================================================================================
// * this Relationship is the parent of:
//   - VirtualRope_NoAnchor
//   - VirtualRope_SingleAnchor
//   - VirtualRope_DoubleAnchor
function MaximumDistance(maxDistance, tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("MAXIMUM_DISTANCE",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE),
              new Array(MASH_EVENT.OBJECT_MOVE)
             );
    this.maxDistance = maxDistance;

    this.alerted1    = false;
    this.alerted2    = false;
}
//set inheritance
MaximumDistance.prototype                   = new Relationship;
MaximumDistance.prototype.constructor       = MaximumDistance;
//add member functions
MaximumDistance.prototype.normalReaction    = MaximumDistance_inverseReaction;
MaximumDistance.prototype.inverseReaction   = MaximumDistance_normalReaction;
MaximumDistance.prototype.moveObject        = MaximumDistance_moveObject
//MaximumDistance



// =====================================================================================================================
// InterObjectSpace                                                                                     InterObjectSpace
// =====================================================================================================================
// * The rope is thethered at the border of the objects
// * the distance cannot be less than 0 (this means that objects cannot overlap)
function InterObjectSpace(tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("INTER_OBJECT_SPACE_NO_ANCHOR",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE, MASH_EVENT.OBJECT_RESIZE),
              new Array(MASH_EVENT.OBJECT_MOVE, MASH_EVENT.OBJECT_RESIZE)
             );
    this.maxDistance        = 0;
    this.sourceObj          = tmpSource;
    this.targetObj          = tmpTarget;

    //determine the relative position of the objects
    this.relPosition        = InterObjectSpace.getRelativePosition(tmpTarget, tmpSource);
    this.horizontalDistance = InterObjectSpace.getHorizontalDistance(tmpTarget, tmpSource, this.relPosition);
    this.verticalDistance   = InterObjectSpace.getVerticalDistance(tmpTarget, tmpSource, this.relPosition);
}
//set inheritance
InterObjectSpace.prototype                 = new MaximumDistance;
InterObjectSpace.prototype.constructor     = InterObjectSpace;
//add member functions
InterObjectSpace.prototype.normalReaction  = InterObjectSpace_normalReaction;
InterObjectSpace.prototype.inverseReaction = InterObjectSpace_inverseReaction;
InterObjectSpace.prototype.moveObject      = InterObjectSpace_moveObject
//InterObjectSpace


// =====================================================================================================================
// VirtualRope_Fixed                                                                                   VirtualRope_Fixed
// =====================================================================================================================
// * The rope is thethered at the top-left corner of the objects
// * the distance cannot be less than 0
function VirtualRope_Fixed(tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("VIRTUAL_ROPE_FIXED",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE, MASH_EVENT.OBJECT_RESIZE),
              new Array(MASH_EVENT.OBJECT_MOVE, MASH_EVENT.OBJECT_RESIZE)
             );
    this.maxDistance        = 0;
    this.sourceObj          = tmpSource;
    this.targetObj          = tmpTarget;
    this.horizontalDistance = parseInt(tmpSource.style.left) - parseInt(tmpTarget.style.left);
    this.verticalDistance   = parseInt(tmpSource.style.top)  - parseInt(tmpTarget.style.top);
}
//set inheritance
VirtualRope_Fixed.prototype                      = new MaximumDistance;
VirtualRope_Fixed.prototype.constructor          = VirtualRope_Fixed;
//add member functions
VirtualRope_Fixed.prototype.normalReaction       = MaximumDistance_inverseReaction;
VirtualRope_Fixed.prototype.inverseReaction      = MaximumDistance_normalReaction;
VirtualRope_Fixed.prototype.moveObject           = VirtualRope_Fixed_moveObject
//VirtualRope_Fixed


// =====================================================================================================================
// VirtualRope_NoAnchor                                                                             VirtualRope_NoAnchor
// =====================================================================================================================
// * The rope is thethered at the center of the objects
function VirtualRope_NoAnchor(maxDistance, tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("VIRTUAL_ROPE_NO_ANCHOR",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE),
              new Array(MASH_EVENT.OBJECT_MOVE)
             );
    this.maxDistance = maxDistance;
}
//set inheritance
VirtualRope_NoAnchor.prototype                      = new MaximumDistance;
VirtualRope_NoAnchor.prototype.constructor          = VirtualRope_NoAnchor;
//add member functions
VirtualRope_NoAnchor.prototype.normalReaction       = MaximumDistance_inverseReaction;
VirtualRope_NoAnchor.prototype.inverseReaction      = MaximumDistance_normalReaction;
//VirtualRope_NoAnchor


// =====================================================================================================================
// VirtualRope_SingleAnchor                                                                     VirtualRope_SingleAnchor
// =====================================================================================================================
// * The rope is thethered at the center of the objects
function VirtualRope_SingleAnchor(maxDistance, tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("VIRTUAL_ROPE_SINGLE_ANCHOR",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE),
              new Array(MASH_EVENT.OBJECT_MOVE)
             );
    this.maxDistance = maxDistance;
}
//set inheritance
VirtualRope_SingleAnchor.prototype                  = new MaximumDistance;
VirtualRope_SingleAnchor.prototype.constructor      = VirtualRope_SingleAnchor;
//add member functions
VirtualRope_SingleAnchor.prototype.normalReaction   = MaximumDistance_normalReaction;
VirtualRope_SingleAnchor.prototype.inverseReaction  = MaximumDistance_normalReaction;
//VirtualRope_SingleAnchor


// =====================================================================================================================
// VirtualRope_DoubleAnchor                                                                     VirtualRope_DoubleAnchor
// =====================================================================================================================
// * The rope is thethered at the center of the objects
function VirtualRope_DoubleAnchor(maxDistance, tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("VIRTUAL_ROPE_DOUBLE_ANCHOR",
              tmpSource,
              tmpTarget,
              new Array(MASH_EVENT.OBJECT_MOVE),
              new Array(MASH_EVENT.OBJECT_MOVE)
             );
    this.maxDistance = maxDistance;
}
//set inheritance
VirtualRope_DoubleAnchor.prototype                  = new MaximumDistance;
VirtualRope_DoubleAnchor.prototype.constructor      = VirtualRope_DoubleAnchor;
//add member functions
VirtualRope_DoubleAnchor.prototype.normalReaction   = MaximumDistance_normalReaction;
VirtualRope_DoubleAnchor.prototype.inverseReaction  = MaximumDistance_inverseReaction;
//VirtualRope_DoubleAnchor



// =====================================================================================================================
// MaximumDistance Methods                                                                       MaximumDistance Methods
// =====================================================================================================================



// InterObjectSpace_normalReaction                                                       InterObjectSpace_normalReaction
// ---------------------------------------------------------------------------------------------------------------------
function InterObjectSpace_normalReaction() {

    objToMove    = this.targetObject;
    objReference = this.sourceObject;

    //update the position of the object
    this.moveObject(objToMove, objReference, this.relPosition);

    //determine the relative position of the objects
    this.relPosition = InterObjectSpace.getRelativePosition(this.targetObject, this.sourceObject);

}//InterObjectSpace_normalReaction


// InterObjectSpace_inverseReaction                                                     InterObjectSpace_inverseReaction
// ---------------------------------------------------------------------------------------------------------------------
function InterObjectSpace_inverseReaction() {

    objToMove    = this.sourceObject;
    objReference = this.targetObject;

    //invert relative positioning
    var inverseRelativePosition = InterObjectSpace.invertRelativePosition(this.relPosition);

    //update the position of the object
    this.moveObject(objToMove, objReference, inverseRelativePosition);

    //determine the relative position of the objects
    this.relPosition = InterObjectSpace.getRelativePosition(this.targetObject, this.sourceObject);

}//InterObjectSpace_inverseReaction


// InterObjectSpace.invertRelativePosition                                       InterObjectSpace.invertRelativePosition
// ---------------------------------------------------------------------------------------------------------------------
InterObjectSpace.invertRelativePosition = function(relPosition) {

    //invert relative positioning
    if     (relPosition == 1) { relPosition = 9; }
    else if(relPosition == 2) { relPosition = 8; }
    else if(relPosition == 3) { relPosition = 7; }

    else if(relPosition == 4) { relPosition = 6; }
    else if(relPosition == 5) { relPosition = 5; }
    else if(relPosition == 6) { relPosition = 4; }

    else if(relPosition == 7) { relPosition = 3; }
    else if(relPosition == 8) { relPosition = 2; }
    else if(relPosition == 9) { relPosition = 1; }

    return relPosition;

}//InterObjectSpace.invertRelativePosition


// InterObjectSpace.getRelativePosition                                             InterObjectSpace.getRelativePosition
// ---------------------------------------------------------------------------------------------------------------------
InterObjectSpace.getRelativePosition = function(objToMove, objReference) {

    //get the left, top, width and height of the objects
    var x1      = parseInt(objReference.style.left);
    var y1      = parseInt(objReference.style.top);
    var width1  = parseInt(objReference.style.width);
    var height1 = parseInt(objReference.style.height);

    var x2      = parseInt(objToMove.style.left);
    var y2      = parseInt(objToMove.style.top);
    var width2  = parseInt(objToMove.style.width);
    var height2 = parseInt(objToMove.style.height);

    var relPosition = 1;
    //determine the relative position of the objects
    if     ( ((x2+width2) <  x1)                        && ((y2+height2) <  y1)                         ) { relPosition = 1; }
    else if( ((x2+width2) >= x1) && ((x1+width1) >= x2) && ((y2+height2) <  y1)                         ) { relPosition = 2; }
    else if( ((x1+width1) <  x2)                        && ((y2+height2) <  y1)                         ) { relPosition = 3; }

    else if( ((x2+width2) <  x1)                        && ((y2+height2) >= y1) && ((y1+height1) >= y2) ) { relPosition = 4; }
    else if( ((x2+width2) >= x1) && ((x1+width1) >= x2) && ((y2+height2) >= y1) && ((y1+height1) >= y2) ) { relPosition = 5; }
    else if( ((x1+width1) <  x2)                        && ((y2+height2) >= y1) && ((y1+height1) >= y2) ) { relPosition = 6; }

    else if( ((x2+width2) <  x1)                        && ((y1+height1) <  y2)                         ) { relPosition = 7; }
    else if( ((x2+width2) >= x1) && ((x1+width1) >= x2) && ((y1+height1) <  y2)                         ) { relPosition = 8; }
    else if( ((x1+width1) <  x2)                        && ((y1+height1) <  y2)                         ) { relPosition = 9; }

    //position == 5 means that objects overlap
    return relPosition;

}//InterObjectSpace.getRelativePosition


// InterObjectSpace.getHorizontalDistance                                         InterObjectSpace.getHorizontalDistance
// ---------------------------------------------------------------------------------------------------------------------
InterObjectSpace.getHorizontalDistance = function(objToMove, objReference, relPosition) {

    //get the objects coordinates
    var x1      = parseInt(objReference.style.left);
    var width1  = parseInt(objReference.style.width);

    var x2      = parseInt(objToMove.style.left);
    var width2  = parseInt(objToMove.style.width);

    var horizontalDistance = 0;
    //determine the horizontal and vertical offset
    if     (relPosition == 1) { horizontalDistance = x1 - (x2+width2); }
    else if(relPosition == 2) { horizontalDistance = 0;                }
    else if(relPosition == 3) { horizontalDistance = x2 - (x1+width1); }

    else if(relPosition == 4) { horizontalDistance = x1 - (x2+width2); }
    else if(relPosition == 5) { horizontalDistance = 0;                }
    else if(relPosition == 6) { horizontalDistance = x2 - (x1+width1); }

    else if(relPosition == 7) { horizontalDistance = x1 - (x2+width2); }
    else if(relPosition == 8) { horizontalDistance = 0;                }
    else if(relPosition == 9) { horizontalDistance = x2 - (x1+width1); }

    return horizontalDistance;

}//InterObjectSpace.getHorizontalDistance


// InterObjectSpace.getVerticalDistance                                             InterObjectSpace.getVerticalDistance
// ---------------------------------------------------------------------------------------------------------------------
InterObjectSpace.getVerticalDistance = function(objToMove, objReference, relPosition) {

    //get the left, top, width and height of the objects
    var y1      = parseInt(objReference.style.top);
    var height1 = parseInt(objReference.style.height);

    var y2      = parseInt(objToMove.style.top);
    var height2 = parseInt(objToMove.style.height);

    var verticalDistance = 0;
    //determine the horizontal and vertical offset
    if     (relPosition == 1) { verticalDistance   = y1 - (y2+height2); }
    else if(relPosition == 2) { verticalDistance   = y1 - (y2+height2); }
    else if(relPosition == 3) { verticalDistance   = y1 - (y2+height2); }

    else if(relPosition == 4) { verticalDistance   = 0;                 }
    else if(relPosition == 5) { verticalDistance   = 0;                 }
    else if(relPosition == 6) { verticalDistance   = 0;                 }

    else if(relPosition == 7) { verticalDistance   = y2 - (y1+height1); }
    else if(relPosition == 8) { verticalDistance   = y2 - (y1+height1); }
    else if(relPosition == 9) { verticalDistance   = y2 - (y1+height1); }

    return verticalDistance;

}//InterObjectSpace.getVerticalDistance


// InterObjectSpace_moveObject                                                                MaximumDistance_moveObject
// ---------------------------------------------------------------------------------------------------------------------
function InterObjectSpace_moveObject(objToMove, objReference, relPosition) {

    //get the left, top, width and height of the objects
    var x1      = parseInt(objReference.style.left);
    var y1      = parseInt(objReference.style.top);
    var width1  = parseInt(objReference.style.width);
    var height1 = parseInt(objReference.style.height);

    var x2      = parseInt(objToMove.style.left);
    var y2      = parseInt(objToMove.style.top);
    var width2  = parseInt(objToMove.style.width);
    var height2 = parseInt(objToMove.style.height);

    //compute the new coordinates
    if     (relPosition == 1) { x2 = x1 - width2 - this.horizontalDistance;  y2 = y1 - height2 - this.verticalDistance; }
    else if(relPosition == 2) { x2 = x2;                                     y2 = y1 - height2 - this.verticalDistance; }
    else if(relPosition == 3) { x2 = x1 + width1 + this.horizontalDistance;  y2 = y1 - height2 - this.verticalDistance; }

    else if(relPosition == 4) { x2 = x1 - width2 - this.horizontalDistance;  y2 = y2;                                   }
    else if(relPosition == 5) { x2 = x2;                                     y2 = y2;                                   }
    else if(relPosition == 6) { x2 = x1 + width1 + this.horizontalDistance;  y2 = y2;                                   }

    else if(relPosition == 7) { x2 = x1 - width2 - this.horizontalDistance;  y2 = y1 + height1 + this.verticalDistance; }
    else if(relPosition == 8) { x2 = x2;                                     y2 = y1 + height1 + this.verticalDistance; }
    else if(relPosition == 9) { x2 = x1 + width1 + this.horizontalDistance;  y2 = y1 + height1 + this.verticalDistance; }

    //move object if necessary
    if( (x2 != parseInt(objToMove.style.left)) || (y2 != parseInt(objToMove.style.top)) ) {
        objToMove.MASHparameters.moveTo(x2, y2);
    }

}//InterObjectSpace_moveObject


// MaximumDistance_normalReaction                                                         MaximumDistance_normalReaction
// ---------------------------------------------------------------------------------------------------------------------
function MaximumDistance_normalReaction() {

    objToMove    = this.sourceObject;
    objReference = this.targetObject;

    this.moveObject(objToMove, objReference, this.maxDistance);

}//MaximumDistance_normalReaction


// MaximumDistance_inverseReaction                                                      MaximumDistance_inverseReactionn
// ---------------------------------------------------------------------------------------------------------------------
function MaximumDistance_inverseReaction() {

    objToMove    = this.targetObject;
    objReference = this.sourceObject;

    this.moveObject(objToMove, objReference, this.maxDistance);

}//MaximumDistance_inverseReaction


// VirtualRope_Fixed_moveObject                                                             VirtualRope_Fixed_moveObject
// ---------------------------------------------------------------------------------------------------------------------
function VirtualRope_Fixed_moveObject(objToMove, objReference) {

    var tmpSign = 1;
    if(objToMove == this.sourceObj) { tmpSign = -1; }


    var newLeft = parseInt(objReference.style.left) - (tmpSign * this.horizontalDistance);
    var newTop  = parseInt(objReference.style.top)  - (tmpSign * this.verticalDistance);

    //move object if necessary
    if( (newLeft != parseInt(objToMove.style.left)) || (newTop  != parseInt(objToMove.style.top)) ){
        objToMove.MASHparameters.moveTo(newLeft, newTop);
    }

}//VirtualRope_Fixed_moveObject


// MaximumDistance_moveObject                                                                 MaximumDistance_moveObject
// ---------------------------------------------------------------------------------------------------------------------
function MaximumDistance_moveObject(objToMove, objReference, tmpMaxDistance) {

    //get the left, top, width and height of the objects
    var x1      = parseInt(objReference.style.left);
    var y1      = parseInt(objReference.style.top);
    var width1  = parseInt(objReference.style.width);
    var height1 = parseInt(objReference.style.height);

    var x2      = parseInt(objToMove.style.left);
    var y2      = parseInt(objToMove.style.top);
    var width2  = parseInt(objToMove.style.width);
    var height2 = parseInt(objToMove.style.height);

    //compute the center of objects
    x1 = x1 + (width1/2);
    y1 = y1 + (height1/2);

    x2 = x2 + (width2/2);
    y2 = y2 + (height2/2);

    //initialize deltas
    var x3 = 0;
    var y3 = 0;

    //check distance between the center of each object: (x1,y1) --> (x2,y2)

    var M     = 0;
    var theta = 0;

    //convert to polar coordinates
    with (Math) {

        //vertical line
        if( (x2-x1) == 0 ) {

            M     = y2 - y1;
            theta = PI / 2;
            if(M < 0) {
                M     = M * (-1);
                theta = 3/2 * PI;
            }

        }
        //horizontal line
        else if( (y2-y1) == 0 ) {

            M     = x2 - x1;
            theta = 0;
            if( M < 0) {
                M     = M * (-1);
                theta = PI;
            }
        }
        //normal line
        else{
            V = (y2 - y1);
            H = (x2 - x1);
            M = sqrt( (V*V) + (H*H) );
            if     ( (V>0) && (H>0) ){ theta =        atan(abs(V/H));   }
            else if( (V>0) && (H<0) ){ theta =   PI - atan(abs(V/H));   }
            else if( (V<0) && (H<0) ){ theta =   PI + atan(abs(V/H));   }
            else                     { theta = 2*PI - atan(abs(V/H));   }
        }

    }//with (Math)

    //if the distance is greater than the maximum allowed then
    if( parseInt(M) > tmpMaxDistance ) {

        //adjust the magnitude and convert back to rectangular coords
        x3 = x1 + tmpMaxDistance * Math.cos(theta);
        y3 = y1 + tmpMaxDistance * Math.sin(theta);

        //get the top-left corner
        x3 = x3 - (width2/2);
        y3 = y3 - (height2/2);

        //move object
        objToMove.MASHparameters.moveTo(x3, y3);
    }

}//MaximumDistance_moveObject



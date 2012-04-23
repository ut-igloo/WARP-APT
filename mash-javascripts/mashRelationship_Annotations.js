// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Relationship Package                                                                                               //
// Annotations                                                                                                        //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Sep 17, 2003                                                                                              //
//                                                                                                                    //
// NOTES                                                                                                              //
// * requires of mashRelationships file                                                                               //
//                                                                                                                    //
// =====================================================================================================================




// =====================================================================================================================
// Annotation                                                                                                 Annotation
// =====================================================================================================================
function Annotation(annotationType, tmpSource, tmpTarget) {
    this.base = Relationship;
    this.base("Annotation", 
              tmpSource, 
              tmpTarget, 
              new Array(MASH_EVENT.OBJECT_MOVE), 
              new Array(MASH_EVENT.OBJECT_MOVE)
             );
    this.type = annotationType;
}
//set inheritance
Annotation.prototype                      = new MaximumDistance;
Annotation.prototype.constructor          = VirtualRope_NoAnchor;
//add member functions
Annotation.prototype.normalReaction       = Annotation_inverseReaction;
Annotation.prototype.inverseReaction      = Annotation_normalReaction;
Annotation.prototype.moveObject           = Annotation_moveObject

//Annotation



// =====================================================================================================================
// Annotation Methods                                                                                 Annotation Methods
// =====================================================================================================================



// Annotation_normalReaction                                                                   Annotation_normalReaction
// ---------------------------------------------------------------------------------------------------------------------
function Annotation_normalReaction() {

    objToMove    = this.sourceObject;
    objReference = this.targetObject;

    this.moveObject(objToMove, objReference, this.maxDistance);

}//Annotation_normalReaction


// Annotation_inverseReaction                                                                 Annotation_inverseReaction
// ---------------------------------------------------------------------------------------------------------------------
function Annotation_inverseReaction() {

    objToMove    = this.targetObject;
    objReference = this.sourceObject;

    this.moveObject(objToMove, objReference, this.maxDistance);

}//Annotation_inverseReaction


// Annotation_moveObject                                                                           Annotation_moveObject
// ---------------------------------------------------------------------------------------------------------------------
function Annotation_moveObject(objToMove, objReference, tmpMaxDistance) {

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
        objToMove.MASH_Parameters.moveTo(x3, y3);

/*
        //move object
        objToMove.style.left = x3 - (width2/2);
        objToMove.style.top  = y3 - (height2/2);
        
        //fire a MASH event that is used in case of relationships
        this.fireEvent(objToMove, MASH_EVENT.OBJECT_MOVE);
*/
    }
    
}//Annotation_moveObject



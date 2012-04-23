// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Relationship Package                                                                                               //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Sep 09, 2002                                                                                              //
// =====================================================================================================================



// =====================================================================================================================
// Relationships                                                                                           Relationships
// =====================================================================================================================
// NOTES                                                                                                           NOTES
// All relationships are directional                                                                                    
// When a relationship is TRIGGERED in a NORMAL way  (from source to target) it executes the NORMAL FUNCTION            
// When a relationship is TRIGGERED in a REVERSE way (from target to source) it executes the INVERSE FUNCTION           
//                                                                                                                      
//                                                                                                                      
// type                                                                                                                 
// - kind of relationship                                                                                               
//                                                                                                                      
// souceObject                                                                                                          
// targetObject                                                                                                         
// - this define which object is related to which one                                                                   
//                                                                                                                      
// sourceTriggers                                                                                                       
// targetTriggers                                                                                                       
// - specifies which ACTIONS trigger this RELATIONSHIP                                                                  
//                                                                                                                      
// normalReaction                                                                                                       
// - defines which function to execute when this RELATIONSHIP is triggered from SOURCE to TARGET                        
//                                                                                                                      
// inverseReaction                                                                                                      
// - defines which function to execute when this RELATIONSHIP is triggered from TARGET to SOURCE                        
//                                                                                                                      
// trigger(tmpObj, tmpTrigger)                                                                                          
// - checks if the RELATIONSHIPO should be treggered and if so, calls the appropriate function                          
//                                                                                                                      
// =====================================================================================================================



var relationshipList = new RelationshipList();
    
// =====================================================================================================================
// MASH_EVENT                                                                                                 MASH_EVENT
// =====================================================================================================================
function MASH_EVENT() {
}
MASH_EVENT.OBJECT_MOVE   = "MASH_OBJECT_MOVE";
MASH_EVENT.OBJECT_RESIZE = "MASH_OBJECT_RESIZE";
//MASH_EVENT


// =====================================================================================================================
// RelationshipList                                                                                     RelationshipList
// =====================================================================================================================
function RelationshipList() {
    this.registered = new Array();  //Array of Relationships
}//RelationshipList


// addRelationship                                                                                       addRelationship
// ---------------------------------------------------------------------------------------------------------------------
RelationshipList.prototype.addRelationship = function(tmpRelationship) {
    this.registered.push(tmpRelationship);
}//addRelationship


// removeRelationship                                                                                 removeRelationship
// ---------------------------------------------------------------------------------------------------------------------
RelationshipList.prototype.removeRelationship = function(tmpRelationship) {
    //search for the relationship
    for(var i=0; i<registered.length; i++) {
        if(registered[i] == tmpRelationship) {
            //remove relationship
            registered.splice(i,1);
            break;
        }
    }
}//removeRelationship


// manageEvent                                                                                               manageEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function is similar to handleEvent, however this uses recursion instead of events
RelationshipList.prototype.manageEvent = function(tmpObj, tmpTrigger){

    //search for the relationship
    for(var j=0; j<this.registered.length; j++) {
        this.registered[j].trigger(tmpObj, tmpTrigger);
    }

}//manageEvent



// handleEvent                                                                                               handleEvent
// ---------------------------------------------------------------------------------------------------------------------
// * this function is similar to manageEvent, however this uses events instead of recursion
RelationshipList.prototype.handleEvent = function(e){

    //validate that we have the event object
    //  (this compensates for using DOM 2 and IE event models
    e = validateEventObject(e);
    
    var tmpObj      = getTarget(e);
    var tmpTrigger  = e.type;

    //search for the relationship
    for(var i=0; i<this.registered.length; i++) {
        this.registered[i].trigger(tmpObj, tmpTrigger);
    }

}//handleEvent



// =====================================================================================================================
// Relationship                                                                                             Relationship
// =====================================================================================================================
function Relationship(tmpType, tmpSource, tmpTarget, tmpSourceTriggerList, tmpTargetTriggerList){

    //members
    this.type               = tmpType               || null;

    this.sourceObject       = tmpSource             || null;    
    this.targetObject       = tmpTarget             || null;

    this.sourceTriggers     = tmpSourceTriggerList  || new Array();
    this.targetTriggers     = tmpTargetTriggerList  || new Array();

}
//add class properties
Relationship.MASH_NORMAL_RELATIONSHIP   = "NORMAL";
Relationship.MASH_INVERSE_RELATIONSHIP  = "INVERSE";
//Relationship


// normalReaction                                                                                         normalReaction
// ---------------------------------------------------------------------------------------------------------------------
Relationship.prototype.normalReaction = function(){
}//normalReaction

    
// inverseReaction                                                                                       inverseReaction
// ---------------------------------------------------------------------------------------------------------------------
Relationship.prototype.inverseReaction = function(){
}//inverseReaction


// fireEvent                                                                                                   fireEvent
// ---------------------------------------------------------------------------------------------------------------------
Relationship.prototype.fireEvent = function(tmpObj, tmpType){
    relationshipList.manageEvent(tmpObj, tmpType);
}//fireEvent
    
    
// trigger                                                                                                       trigger
// ---------------------------------------------------------------------------------------------------------------------
Relationship.prototype.trigger = function(tmpObj, tmpTrigger){

    //normal relationship
    if(this.sourceObject == tmpObj) {
    
        //check if the trigger applies
        for(var i=0; i<this.sourceTriggers.length; i++){

            //if so, execute function
            if(this.sourceTriggers[i] == tmpTrigger) {
                if(this.normalReaction != null) { this.normalReaction(); }
                break;
            }
        }
    }
    
    //inverse relationship
    else if(this.targetObject == tmpObj) {

        //check if the trigger applies
        for(i=0; i<this.targetTriggers.length; i++){

            //if so, execute function
            if(this.targetTriggers[i] == tmpTrigger) {
                if(this.inverseReaction != null) { this.inverseReaction(); }
                break;
            }
        }
    }
    
    //unknown relationship
    else {
        // do NOTHING
    }
    
}//trigger




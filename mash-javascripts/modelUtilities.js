// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// model utilities                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Mar 16, 2004                                                                                              //
// =====================================================================================================================


// =====================================================================================================================
// CONSTANTS                                                                                                   CONSTANTS
// =====================================================================================================================



// =====================================================================================================================
// GLOBAL VARIABLES                                                                                     GLOBAL VARIABLES
// =====================================================================================================================

var MASH_Questionnaire = null;

// =====================================================================================================================
// FUNCTIONS                                                                                                   FUNCTIONS
// =====================================================================================================================



// showQuestionnaire                                                                                   showQuestionnaire
// ---------------------------------------------------------------------------------------------------------------------
function showQuestionnaire(src){

    var name  = "Questionnaire";
    var style = "width=900, height=800, status=no, resizable=yes, scrollbars=yes, left=10, top=10";

    if(isNetscape) { style = "width=1100, height=800, status=no, resizable=yes, scrollbars=yes"; }
    if(isIE)       { style = "width=1100, height=800, status=no, resizable=yes, scrollbars=yes"; }

    var questionnaireWindow = window.open(src, name, style, true);

}//showQuestionnaire


// showQuestionnaireDocument                                                                   showQuestionnaireDocument
// ---------------------------------------------------------------------------------------------------------------------
function showQuestionnaireDocument(src){

    var name  = "Questionnaire";
    var style = "align:left; vertical-align:top; background-color:#004444; border-width:4; border-color:#0000ff; border-style:ridge; background-image:none; color:#ffff88; font-family:Arial; font-size:11pt; font-weight:bold; ";
    var scale = 1.0;

    MASH_Questionnaire = new MASH_Frame("MASH_Questionnaire", 10, 10, 1000, 900, (topZ+10), style, src, name, scale);

    MASH_Object.createObject(MASH_Questionnaire);

}//showQuestionnaireDocument


// updateUserModel                                                                                       updateUserModel
// ---------------------------------------------------------------------------------------------------------------------
function updateUserModel(evaluator, questions){

    //update model inside applet
    var mashApplet = document.getElementById(MASH_APPLET_NAME);
    if(mashApplet) {

        //set the evaluator
        mashApplet.setEvaluator(evaluator);

        //answer questions
        mashApplet.resetQuestions(questions.length);
        for(var i=0; i<questions.length; i++) {
            var answer = questions[i];
            mashApplet.answerQuestion(i, answer);
        }
        mashApplet.updateUserModel(); 
    }

    //destroy questionnaire object
//    closeQuestionnaire();

}//updateUserModel

 
// closeQuestionnaire                                                                                 closeQuestionnaire
// ---------------------------------------------------------------------------------------------------------------------
function closeQuestionnaire(){

    if(MASH_Questionnaire) {
        MASH_Questionnaire.destroy();
        MASH_Questionnaire = null;
    }

}//closeQuestionnaire




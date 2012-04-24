// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Transformations Package                                                                                            //
// Show/Hide                                                                                                          //
//                                                                                                                    //
// Author:   Luis Francisco-Revilla                                                                                   //
// Created:  Aug 07, 2003                                                                                             //
// Modified:                                                                                                          //
// =====================================================================================================================



// =====================================================================================================================
// MASH_Transformations                                                                             MASH_Transformations
// =====================================================================================================================


// writeTransformationControls                                                               writeTransformationControls
// ---------------------------------------------------------------------------------------------------------------------
// * writes the behavior controls in the web page
function writeTransformationControls(){

    document.writeln("<span style=\"color:#000000; font-family:arial; font-size:8pt; font-weight:bold;\">Transformations:</span>");
    document.writeln("<a href=\"javascript:allMASHObjects[0].resize(300, 200);\"    ><span style=\"color:#0000ff; font-family:arial; font-size:8pt; font-weight:bold;\">Resize</span></a>");
    document.writeln("<a href=\"javascript:MASH_Object.setVisibility(allMASHObjects[0], true);\" ><span style=\"color:#0000bb; font-family:arial; font-size:8pt; font-weight:bold;\">Show</span></a>");
    document.writeln("<a href=\"javascript:MASH_Object.setVisibility(allMASHObjects[0], false);\"><span style=\"color:#0000bb; font-family:arial; font-size:8pt; font-weight:bold;\">Hide</span></a>");

}//writeTransformationControls



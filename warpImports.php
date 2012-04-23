<?php

// ================================================================================================================== //
// warpImports.php                                                                                                    //
// declares all the basic javascript files required in a WARP page                                                    //
// ================================================================================================================== //

//define the location of the WARP files
$WARP_LOCATION        = "http://denali.ischool.utexas.edu/~revilla/WARP/mash_javascripts/";
$MASH_APPLET_CODEBASE = "http://denali.ischool.utexas.edu/~revilla/WARP/";
$MASH_APPLET_CODE     = "MASH/MASHApplet.class";

printf("<!-- =============================================================================================================== -->\n");
printf("<!-- WARP javascripts                                                                               WARP javascripts -->\n");
printf("<!-- =============================================================================================================== -->\n\n");

printf("<!-- Spatial Hypertext -->\n");
printf("<script src=\"{$WARP_LOCATION}mash.js\"                         ></script>\n");

printf("<!-- WARP server API -->\n");
printf("<script src=\"mash_javascripts/mashFileManager.js\"             ></script>\n");

printf("<!-- object declarations -->\n");
printf("<script src=\"{$WARP_LOCATION}mashObject.js\"                   ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashCollection.js\"               ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashFrame.js\"                    ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashImage.js\"                    ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashText.js\"                     ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashForm.js\"                     ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashInput.js\"                    ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashVideo.js\"                    ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashVideoIndex.js\"               ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashUserAnnotation.js\"           ></script>\n");

printf("<!-- object support -->\n");
printf("<script src=\"{$WARP_LOCATION}mashContextualMenu.js\"           ></script>\n");

printf("<!-- spatial parser support -->\n");
printf("<script src=\"{$WARP_LOCATION}mashImplicitComposite.js\"        ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashControlMenu.js\"              ></script>\n");

printf("<!-- behavior support -->\n");
printf("<script src=\"{$WARP_LOCATION}mashBehaviors.js\"                ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashBehavior_ImageToggle.js\"     ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashBehavior_Presentation.js\"    ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashBehavior_Wandering.js\"       ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashBehavior_SlideShow.js\"       ></script>\n");

printf("<!-- relationship support -->\n");
printf("<script src=\"{$WARP_LOCATION}mashRelationships.js\"            ></script>\n");
printf("<script src=\"{$WARP_LOCATION}mashRelationship_VirtualRopes.js\"></script>\n");

printf("<!-- transformations support -->\n");
printf("<script src=\"{$WARP_LOCATION}mashTransformations.js\"          ></script>\n");

printf("<!-- adaptation methods -->\n");
printf("<script src=\"{$WARP_LOCATION}modelUtilities.js\"               ></script>\n");

?>

<?php

// ================================================================================================================== //
// warpImports.php                                                                                                    //
// writes all of WARP's controls                                                                                      //
// ================================================================================================================== //

printf("<script language=\"javascript\">\n");
printf("    MASH_Object.writeObjects();\n");
printf("    writeControls();\n");
printf("    writeMASHApplet(false, \"recognizer-piles:(true,false,false); \"          +\n");
printf("                           \"recognizer-lists-vertical:(true,true,true); \"   +\n");
printf("                           \"recognizer-lists-horizontal:(true,true,true); \" +\n");
printf("                           \"recognizer-relationships:(true,false,false); \"  ,\n");
printf("                           \"http://denali.ischool.utexas.edu/~revilla/WARP/\");\n");

printf("</script>\n");
printf("<hr>\n");

?>

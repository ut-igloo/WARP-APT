// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
// Objects Package                                                                                                    //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: Jun 22, 2005                                                                                              //
// =====================================================================================================================


//this is for other libraries to test if this library has been defined
MASH_FileManagerDefined = true;


// =====================================================================================================================
// MASH_FileManager                                                                                     MASH_FileManager
// =====================================================================================================================
function MASH_FileManager() {


}

MASH_FileManager.baseURL    = "http://denali.ischool.utexas.edu/~revilla/WARP/";

//MASH_FileManager.phpURL     = "./mash-php/mashFileManager.php";
//MASH_FileManager.phpURL             = "https://csdll.cs.tamu.edu/~l0f0954/research/mash-php/mashFileManager.php";
MASH_FileManager.phpURL     = MASH_FileManager.baseURL + "mash-php/mashFileManager.php";

MASH_FileManager.windowTarget       = "_blank";
MASH_FileManager.windowProperties   = "width=600,height=480,status=yes,resiable=yes,menubar=no,toolbar=no";

//Copyright
MASH_FileManager.COPYRIGHT = "MASH \n\n"                                     +
                           "  Copyright (c) 2005 Luis Francisco-Revilla.\n"  +
                           "  All rights reserved.\n\n"                      ;

//Control image files
//MASH_FileManager.CONTROLS_IMG_DIR = "mash_images/";
//MASH_FileManager.CONTROLS_IMG_DIR = "http://denali.ischool.utexas.edu/~revilla/WARP/mash_images/";
MASH_FileManager.CONTROLS_IMG_DIR = MASH_FileManager.baseURL + "mash_images/";

MASH_FileManager.CTRL_IMG_FILE    = MASH_FileManager.CONTROLS_IMG_DIR + "file-manager.png";
MASH_FileManager.CTRL_IMG_ID      = "mashFileManagerControlImage";
MASH_FileManager.CTRL_IMG_TITLE   = "File Manager";
MASH_FileManager.CTRL_IMG_ALT     = "Open/Save/Delete previous readings of MASH documents";
MASH_FileManager.CTRL_IMG_WIDTH   = "16";
MASH_FileManager.CTRL_IMG_HEIGHT  = "16";

//user files
MASH_FileManager.allowedUserFileExtension = /\.[xX][mM][lL]$/;
MASH_FileManager.validUserFileExtension   = ".xml";

//processing actions
MASH_FileManager.defaultUserAction      = "loadPage";
MASH_FileManager.openUserAction         = "openUserFile";
MASH_FileManager.collectionUserAction   = "openUserFileAsCollection";
MASH_FileManager.saveUserAction         = "saveUserFile";
MASH_FileManager.deleteUserAction       = "deleteUserFile";


// =====================================================================================================================
// Functions used in the document calling File Manager               Functions used in the document calling File Manager
// =====================================================================================================================



// MASH_FileManager.writeControls                                                         MASH_FileManager.writeControls
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.writeControls = function(){

//    document.writeln("<a href=\"javascript:MASH_FileManager.sendXML();\">File Manager</a>&nbsp;||&nbsp;");
    document.write("<a href=\"javascript:MASH_FileManager.sendXML();\">");
    document.write("<img id=\""     + MASH_FileManager.CTRL_IMG_ID     + "\" " +
                        "src=\""    + MASH_FileManager.CTRL_IMG_FILE   + "\" " +
                        "title=\""  + MASH_FileManager.CTRL_IMG_TITLE  + "\" " +
                        "alt=\""    + MASH_FileManager.CTRL_IMG_ALT    + "\" " +
                        "width=\""  + MASH_FileManager.CTRL_IMG_WIDTH  + "\" " +
                        "height=\"" + MASH_FileManager.CTRL_IMG_HEIGHT + "\" " +
                        "border=\"0\">");
    document.write("</a>&nbsp;||&nbsp;\n");

}//MASH_FileManager.writeControls



// MASH_FileManager.loadDocument                                                           MASH_FileManager.loadDocument
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.loadDocument = function(xmlSpecification){

    MASH_Object.xmlCreateMASHDocument(xmlSpecification);

}//MASH_FileManager.loadDocument



// MASH_FileManager.loadDocumentInCollection                                   MASH_FileManager.loadDocumentInCollection
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.loadDocumentInCollection = function(xmlSpecification){

    MASH_Collection.xmlCreateCollectionWithMASHDocument(xmlSpecification);

}//MASH_FileManager.loadDocumentInCollection



// MASH_FileManager.sendXML                                                                     MASH_FileManager.sendXML
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.sendXML = function() {

    var saveWindow = window.open(MASH_FileManager.phpURL, MASH_FileManager.windowTarget, MASH_FileManager.windowProperties, false);

}//MASH_FileManager.sendXML




// =====================================================================================================================
// Functions used on the File Manager Pup-up window                     Functions used on the File Manager Pup-up window
// =====================================================================================================================




// MASH_FileManager.selectFile                                                               MASH_FileManager.selectFile
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.selectFile = function() {

    var selectedFile      = document.getElementById('fileSelect').value;
    var fileNameTextbox   = document.getElementById('fileName')
    fileNameTextbox.value = selectedFile;

}//MASH_FileManager.selectFile



// MASH_FileManager.updateDocumentInOpenerWindow                           MASH_FileManager.updateDocumentInOpenerWindow
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.updateDocumentInOpenerWindow = function() {

    var fileContents = document.getElementById("fileContents");

    //pass the new xml document to the opener window
    window.opener.MASH_FileManager.loadDocument(fileContents.value);

    //close this window
//    MASH_FileManager.closeWindow();

}//MASH_FileManager.updateDocumentInOpenerWindow



// MASH_FileManager.updateCollectionInOpenerWindow                       MASH_FileManager.updateCollectionInOpenerWindow
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.updateCollectionInOpenerWindow = function() {

    var fileContents = document.getElementById("fileContents");

    //pass the new xml document to the opener window
    window.opener.MASH_FileManager.loadDocumentInCollection(fileContents.value);

    //close this window
//    MASH_FileManager.closeWindow();

}//MASH_FileManager.updateCollectionInOpenerWindow



// MASH_FileManager.getAndValidateFileName                                       MASH_FileManager.getAndValidateFileName
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.getAndValidateFileName = function() {

    //validate file name
    var fileName = document.getElementById("fileName");
    if(!fileName) {
        alert("Please specify a file name by either typing it or selecting a file from the list of existing files");
        return null;
    }
    fileName = fileName.value;
    if(!fileName) {
        alert("Please specify a file name by either typing it or selecting a file from the list of existing files");
        return null;
    }
    fileName = fileName.replace( /^\s+/g, "" ); //trim leading whitespace
    fileName.replace( /\s+$/g, "" );            //trim trailing whitespace
    if( (!fileName) || (fileName.length <=0) ){
        alert("Please specify a file name by either typing it or selecting a file from the list of existing files");
        return null;
    }

    return fileName;

}//MASH_FileManager.getAndValidateFileName



// MASH_FileManager.openUserFile                                                           MASH_FileManager.openUserFile
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.openUserFile = function() {

//    alert("MASH_FileManager.openUserFile()");

    //get and validate file name
    var fileName = MASH_FileManager.getAndValidateFileName();
    if(!fileName) { return false; }

    //set user action and process the form
    document.getElementById("userAction").value = MASH_FileManager.openUserAction;
    document.getElementById("saveForm").submit();

}//MASH_FileManager.openUserFile



// MASH_FileManager.openUserFileAsCollection                                   MASH_FileManager.openUserFileAsCollection
// ---------------------------------------------------------------------------------------------------------------------
// ********* NEEDS TO BE MODIFIED TO CREATE THE OBJECTS INSIDE A COLLECTION ***********
MASH_FileManager.openUserFileAsCollection = function() {

//    alert("MASH_FileManager.openUserFileAsCollection()");

    //get and validate file name
    var fileName = MASH_FileManager.getAndValidateFileName();
    if(!fileName) { return false; }

    //set user action and process the form
    document.getElementById("userAction").value = MASH_FileManager.collectionUserAction;
    document.getElementById("saveForm").submit();

}//MASH_FileManager.openUserFileAsCollection



// MASH_FileManager.deleteUserFile                                                       MASH_FileManager.deleteUserFile
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.deleteUserFile = function() {

    //get and validate file name
    var fileName = MASH_FileManager.getAndValidateFileName();
    if(!fileName) { return false; }

    //confirm deletion
    var confirmDelete = confirm("Delete file \"" + fileName +"\" ?");
    if(!confirmDelete) { return false; }

    //set user action and process the form
    document.getElementById("userAction").value = MASH_FileManager.deleteUserAction;
    document.getElementById("saveForm").submit();

}//deleteUserFile



// MASH_FileManager.saveUserFile                                                           MASH_FileManager.saveUserFile
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.saveUserFile = function() {

//    alert("MASH_FileManager.saveUserFile()");

    //get and validate file name
    var fileName = MASH_FileManager.getAndValidateFileName();
    if(!fileName) { return false; }

    //validate the file name extension
    var hasValidExtension = fileName.search( MASH_FileManager.allowedUserFileExtension );
    if(hasValidExtension == -1) {
        fileName += MASH_FileManager.validUserFileExtension;
        document.getElementById("fileName").value = fileName;
    }

    //URL location
    var openerLocation     = window.opener.location;
    alert("openerLocation\n" + openerLocation);


    //update file contents value
    var docName            = window.opener.MASH_DOCUMENT_NAME;
    var topZIndex          = window.opener.topZ;
    var objectsArray       = window.opener.allMASHObjects;
    var relationshipsArray = window.opener.allMASHRelationships;
    if(!docName)            { docName            = "";           }
    if(!topZIndex)          { topZIndex          = 1;            }
    if(!objectsArray)       { objectsArray       = new Array();  }
    if(!relationshipsArray) { relationshipsArray = new Array();  }

    //update file contents value
    var fileContents   = document.getElementById("fileContents");
    fileContents.value = MASH_Object.xmlMakeDocumentNode(docName, topZIndex, objectsArray, relationshipsArray);

    //set user action and process the form
    document.getElementById("userAction").value = MASH_FileManager.saveUserAction;
    document.getElementById("saveForm").submit();

}//MASH_FileManager.saveUserFile



// MASH_FileManager.closeWindow                                                             MASH_FileManager.closeWindow
// ---------------------------------------------------------------------------------------------------------------------
MASH_FileManager.closeWindow = function() {
    window.close();
}//MASH_FileManager.closeWindow




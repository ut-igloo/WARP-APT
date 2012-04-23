<html>
<head>
<title>MASH File Manager</title>
<style>
        body        { color:#000000; font-family:Arial; font-size:10pt; background-color:#cccccc;}
        .control    { color:#000000; font-family:Arial; font-size:10pt; background-color:#cccccc; border-width:2px; border-style:groove; border-color:#ffffff;}
        .heading    { color:#000000; font-family:Arial; font-size:13pt; font-weight:bold; }
        .label      { color:#000000; font-family:Arial; font-size:11pt; }
        .button     { color:#000000; font-family:Arial; font-size:10pt; font-weight:bold; }
</style>

<script src="../mash_javascripts/mashFileManager.js"></script>
<script src="../mash_javascripts/mashObject.js"     ></script>

<script language="javascript">



// selectFile                                                                                                 selectFile
// ---------------------------------------------------------------------------------------------------------------------
function selectFile() {

    var selectedFile      = document.getElementById('fileSelect').value;
    var fileNameTextbox   = document.getElementById('fileName')
    fileNameTextbox.value = selectedFile;
                                              
}//selectFile



// updateOpenerWindow                                                                                 updateOpenerWindow
// ---------------------------------------------------------------------------------------------------------------------
function updateOpenerWindow() {

    var fileContents = document.getElementById("fileContents");

    //pass the new xml document to the opener window 
    window.opener.MASH_FileManager.updateObjects(fileContents.value);

    //close this window
    closeWindow();

}//updateOpenerWindow



// getAndValidateFileName                                                                         getAndValidateFileName
// ---------------------------------------------------------------------------------------------------------------------
function getAndValidateFileName() {

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

}//getAndValidateFileName



// openUserFile                                                                                             openUserFile
// ---------------------------------------------------------------------------------------------------------------------
function openUserFile() {

    //get and validate file name
    var fileName = getAndValidateFileName();
    if(!fileName) { return false; }

    //set user action and process the form
    document.getElementById("userAction").value = "openPage";
    document.getElementById("saveForm").submit();

}//openUserFile



// deleteUserFile                                                                                         deleteUserFile
// ---------------------------------------------------------------------------------------------------------------------
function deleteUserFile() {

    //get and validate file name
    var fileName = getAndValidateFileName();
    if(!fileName) { return false; }

    //set user action and process the form
    document.getElementById("userAction").value = "deletePage";
    document.getElementById("saveForm").submit();

}//deleteUserFile



// saveUserFile                                                                                             saveUserFile
// ---------------------------------------------------------------------------------------------------------------------
function saveUserFile() {

    //get and validate file name
    var fileName = getAndValidateFileName();
    if(!fileName) { return false; }

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
    document.getElementById("userAction").value = "savePage";
    document.getElementById("saveForm").submit();

}//saveUserFile


// closeWindow                                                                                               closeWindow
// ---------------------------------------------------------------------------------------------------------------------
function closeWindow() {
    window.close(); 
}//closeWindow


</script>

</head>

<?php 
// =====================================================================================================================
// PHP                                                                                                               PHP
// =====================================================================================================================

    include "FileManager.php";

//    print("Server is".$_SERVER['PHP_SELF']."<br>\n");
//    print("Server is".$_SERVER['REMOTE_ADDR']."<br>\n");

    $fm = new MASH_FileManager();
//    $tm->fmFileName = $_SERVER['PHP_SELF'];
    $fm->updateMembers($_POST);
    $fm->processUserAction();

    exit(0);
?>

</html>

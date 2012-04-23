// =====================================================================================================================
// MASH_FileManager                                                                                     MASH_FileManager
// =====================================================================================================================
function WarpUploader() {


}

//Copyright
WarpUploader.COPYRIGHT = "MASH \n\n"                                     +
                           "  Copyright (c) 2008 Luis Francisco-Revilla.\n"  +
                           "  All rights reserved.\n\n"                      ;



// =====================================================================================================================
// Functions for FileUploader                                                                 Functions for FileUploader
// =====================================================================================================================



// WarpUploader.uploadFile                                                                       WarpUploader.uploadFile
// ---------------------------------------------------------------------------------------------------------------------
WarpUploader.uploadFile = function(){

    //verify File input
    var fileInput = document.getElementById("uploadFile");
    if( (!fileInput) || (!fileInput.value) || (fileInput.value == "") ) {
        alert("Please verify the *File* feld is filled properly");
        return;
    }

    //validate upload
    var fileName           = fileInput.value;
    var validateSubmission = confirm("Please confirm if you want to upload the file " + fileName );
    if(!validateSubmission) {
        return;
    }

    //initialize variables and submit
    var uploadForm       = document.getElementById("uploadForm");
    var hiddenFunction   = document.getElementById("function");

    hiddenFunction.value = "UPLOAD";

    uploadForm.submit();

}//WarpUploader.uploadFile



// WarpUploader.deleteFile                                                                       WarpUploader.deleteFile
// ---------------------------------------------------------------------------------------------------------------------
WarpUploader.deleteFile = function(fileName){

    //validate deletion
    var validateDelete = confirm("Please confirm if you want to delete the file " + fileName );
    if(!validateDelete) {
        return;
    }

    //initialize variables and submit
    var uploadForm       = document.getElementById("uploadForm");
    var hiddenFunction   = document.getElementById("function");
    var hiddenName       = document.getElementById("fileName");

    hiddenFunction.value = "DELETE";
    hiddenName.value     = fileName;

    uploadForm.submit();

}//WarpUploader.deleteFile



// WarpUploader.clearMessages                                                                 WarpUploader.clearMessages
// ---------------------------------------------------------------------------------------------------------------------
WarpUploader.clearMessages = function(){

    var messagesTD   = document.getElementById("messagesTD");
    messagesTD.innerHTML = "<br/>&nbsp;";

}//WarpUploader.clearMessages


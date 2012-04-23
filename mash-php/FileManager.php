<?php
// =====================================================================================================================
// M * A * S * H                                                                                                      //
// Multi-model Adaptive Spatial Hypertext                                                                             //
//                                                                                                                    //
// Author:  Luis Francisco-Revilla                                                                                    //
// Created: June 17, 2005                                                                                             //
// =====================================================================================================================



// =====================================================================================================================
// MASH_FileManager                                                                                     MASH_FileManager
// =====================================================================================================================
class MASH_FileManager {


//    public $title               = "File Manager";
//
//    public $fileNameLabel       = "File Name:";
//    public $userFilesDir        = "../mash-userfiles";
//    public $userFileName        = "";
//    public $userFileContents    = "<object>\nblah</object>";
//
//    public $selectFunction      = "selectFile";
//    public $saveFunction        = "save";
//    public $closeFunction       = "closeWindow";
//
//    public $formID              = "saveForm";
//    public $submitMethod        = "POST";
//    public $enctype             = "application/x-www-form-urlencoded";
//
//    public $fmFileName          = "mashFileManager.php";

    //processing actions
    var $defaultUserAction          = "loadPage";
    var $openUserAction             = "openUserFile";
    var $collectionUserAction       = "openUserFileAsCollection";
    var $saveUserAction             = "saveUserFile";
    var $deleteUserAction           = "deleteUserFile";

    var $userAction          = "loadPage";


    //form fields
    var $title               = "File Manager";
    var $fileNameLabel       = "File Name:";
    var $userFileName        = "";
    var $userFileContents    = "";
    var $userFilesDir        = "../mash-userfiles";

    var $selectedFileName    = "";

    var $formID              = "saveForm";
    var $submitMethod        = "POST";
    var $enctype             = "application/x-www-form-urlencoded";

    var $errorMesages        = "";

    var $fileContentsInputID = "fileContents";
    var $fileNameInputID     = "fileName";
    var $fileSelectInputID   = "fileSelect";
    var $userActionInputID   = "userAction";


    //javascript function names
    var $selectFunction         = "MASH_FileManager.selectFile";
    var $saveFunction           = "MASH_FileManager.saveUserFile";
    var $closeFunction          = "MASH_FileManager.closeWindow";
    var $openFunction           = "MASH_FileManager.openUserFile";
    var $collectionFunction     = "MASH_FileManager.openUserFileAsCollection";
    var $deleteFunction         = "MASH_FileManager.deleteUserFile";
    var $loadDocumentFunction   = "MASH_FileManager.updateDocumentInOpenerWindow";
    var $loadCollectionFunction = "MASH_FileManager.updateCollectionInOpenerWindow";

    var $onLoadFunction         = "";


    //files
    var $fmFileName             = "mashFileManager.php";
    var $validFileExtensions    = array( '[xX][mM][lL]$', '[tT][xX][tT]$');


    //Toolbar
    var $toolbarImageWidth           = "24px";
    var $toolbarImageHeight          = "24px";

    var $imageDir                    ="../mash_images";
    var $imgOpenUserFileInDocument   ="mashFileManagerOpenDocument.png";
    var $imgOpenUserFileInCollection ="mashFileManagerOpenInCollection.png";
    var $imgSaveUserFile             ="mashFileManagerSave.png";
    var $imgDeleteUserFile           ="mashFileManagerDelete.png";

    var $altOpenUserFileInDocument   ="Load User File";
    var $altOpenUserFileInCollection ="Load User File into a Collection";
    var $altSaveUserFile             ="Save User File";
    var $altDeleteUserFile           ="Delete User File";

    var $titleOpenUserFileInDocument   ="Load User File";
    var $titleOpenUserFileInCollection ="Load User File into a Collection";
    var $titleSaveUserFile             ="Save User File";
    var $titleDeleteUserFile           ="Delete User File";


    // updateMembers                                                                                       updateMembers
    // -----------------------------------------------------------------------------------------------------------------
    function updateMembers($submitedValues) {

        if(isset($submitedValues[$this->fileContentsInputID])) { $this->userFileContents   = $submitedValues[$this->fileContentsInputID]; }
        if(isset($submitedValues[$this->fileNameInputID]))     { $this->userFileName       = $submitedValues[$this->fileNameInputID];     }
        if(isset($submitedValues[$this->fileSelectInputID]))   { $this->selectedFileName   = $submitedValues[$this->fileSelectInputID];   }
        if(isset($submitedValues[$this->userActionInputID]))   { $this->userAction         = $submitedValues[$this->userActionInputID];   }

    }//updateMembers



    // processUserAction                                                                               processUserAction
    // -----------------------------------------------------------------------------------------------------------------
    function processUserAction() {

        $this->errorMesages = "";
//        $this->errorMesages .= "User Action = [".$this->userAction."]<br>\n";

        if    ($this->userAction == $this->openUserAction)       { $this->openUserFile();               }
        elseif($this->userAction == $this->collectionUserAction) { $this->openUserFileAsCollection();   }
        elseif($this->userAction == $this->saveUserAction)       { $this->saveUserFile();               }
        elseif($this->userAction == $this->deleteUserAction)     { $this->deleteUserFile();             }
        else                                                     { $this->printHTML();                  }

    }//processUserAction



    // saveUserFile                                                                                         saveUserFile
    // -----------------------------------------------------------------------------------------------------------------
    function saveUserFile() {

//        $this->errorMesages .= "saveUserFile()<br>\n";

        //open file
        $fileName = $this->userFilesDir."/".$this->userFileName;
        if(is_dir($fileName) ) {
            $this->errorMesages .= "The file name is a directory [".$this->userFileName."]<br>\n";
            return false;
        }
        $fp = fopen($fileName, "w+");
        if( !$fp ){
            $this->errorMesages .= "Cannot open file [".$this->userFileName."]<br>\n";
            return false;
        }

        //write contents to file
        $fileSaved = fwrite($fp, $this->userFileContents);


        //protect the file
        //  make it readable and writable, but not executable
        $fileProtected = chmod($fileName, 0644);
        if($fileProtected) {
//            $this->errorMesages .= "the file is protected from being executed<br>\n";
//            $this->onLoadFunction = $this->closeFunction;
        }
        else {
//            $this->errorMesages .= "Failed to protect the user file<br>\n";
//            $this->onLoadFunction = "";
        }


        fclose($fp);

        $this->printHTML();

        return $fileSaved;

    }//saveUserFile



    // openUserFile                                                                                         openUserFile
    // -----------------------------------------------------------------------------------------------------------------
    function openUserFile() {

//        $this->errorMesages .= "openUserFile()<br>\n";

        //open file
        $fileName = $this->userFilesDir."/".$this->userFileName;
        if(is_dir($fileName) ) {
            $this->errorMesages .= "Cannot read a directory as a file [".$this->userFileName."]<br>\n";
            return false;
        }
        $fp = fopen($fileName, "r");
        if( !$fp ){
            $this->errorMesages .= "Cannot open file [".$this->userFileName."]<br>\n";
            return false;
        }

//        $this->errorMesages .= "\nfileName = [$fileName]\n";
//        $this->errorMesages .= "\nfilesize = [".filesize($fileName)."]<br>\n";

        //read user file contents
        $this->userFileContents = "";
        $userFileSize           = filesize($fileName);
        if($userFileSize>0) {
            $this->userFileContents = fread($fp, $userFileSize);
        }
        $this->onLoadFunction = $this->loadDocumentFunction;

        fclose($fp);

        //print the page
        $this->printHTML();

        return $this->userFileContents;

    }//openUserFile



    // openUserFileAsCollection                                                                 openUserFileAsCollection
    // -----------------------------------------------------------------------------------------------------------------
    function openUserFileAsCollection() {

//        $this->errorMesages .= "openUserFileAsCollection()<br>\n";

        //open file
        $fileName = $this->userFilesDir."/".$this->userFileName;
        if(is_dir($fileName) ) {
            $this->errorMesages .= "Cannot read a directory as a file [".$this->userFileName."]<br>\n";
            return false;
        }
        $fp = fopen($fileName, "r");
        if( !$fp ){
            $this->errorMesages .= "Cannot open file [".$this->userFileName."]<br>\n";
            return false;
        }

//        $this->errorMesages .= "\nfileName = [$fileName]\n";
//        $this->errorMesages .= "\nfilesize = [".filesize($fileName)."]<br>\n";

        //read user file contents
        $this->userFileContents = "";
        $userFileSize           = filesize($fileName);
        if($userFileSize>0) {
            $this->userFileContents = fread($fp, $userFileSize);
        }
        $this->onLoadFunction = $this->loadCollectionFunction;


        fclose($fp);

        //print the page
        $this->printHTML();

        return $this->userFileContents;

    }//openUserFileAsCollection



    // deleteUserFile                                                                                     deleteUserFile
    // -----------------------------------------------------------------------------------------------------------------
    function deleteUserFile() {

        $fileName = $this->userFilesDir."/".$this->userFileName;
        if(is_dir($fileName) ) {
            $this->errorMesages .= "Cannot delete file. File [".$this->userFileName."] is a directory<br>\n";
            return false;
        }
        $fp = fopen($fileName, "r");
        if( !$fp ){
            $this->errorMesages .= "Cannot delete file [".$this->userFileName."]<br>\n";
            return false;
        }

//        $this->errorMesages .= "\nfileName = [$fileName]\n";

        //delete user file contents
        $fileDeleted = unlink($fileName);

        $this->onLoadFunction = "";


        fclose($fp);

        $this->printHTML();

        return $this->fileContents;

    }//deleteUserFile



    // printHTML                                                                                               printHTML
    // -----------------------------------------------------------------------------------------------------------------
    function printHTML() {

        printf("<html>");
        $this->writeHead();
        $this->writeBody();
        printf("</html>");

    }//printHTML



    // writeHead                                                                                               writeHead
    // -----------------------------------------------------------------------------------------------------------------
    function writeHead() {

        $pageHeadString = "";

        $pageHeadString .= "<head>\n";
        $pageHeadString .= "<title>MASH File Manager</title>\n";
        $pageHeadString .= "<style>\n";
        $pageHeadString .= "        body        { color:#000000; font-family:Arial; font-size:10pt; background-color:#cccccc;}\n";
        $pageHeadString .= "        .control    { color:#000000; font-family:Arial; font-size:10pt; background-color:#cccccc; border-width:2px; border-style:groove; border-color:#ffffff;}\n";
        $pageHeadString .= "        .heading    { color:#000000; font-family:Arial; font-size:13pt; font-weight:bold; }\n";
        $pageHeadString .= "        .label      { color:#000000; font-family:Arial; font-size:11pt; }\n";
        $pageHeadString .= "        .button     { color:#000000; font-family:Arial; font-size:10pt; font-weight:bold; }\n";
        $pageHeadString .= "</style>\n";

        $pageHeadString .= "<script src=\"../mash_javascripts/mashFileManager.js\"></script>\n";
        $pageHeadString .= "<script src=\"../mash_javascripts/mashObject.js\"     ></script>\n";

        $pageHeadString .= "</head>\n";


        printf($pageHeadString);

    }//writeHead



    // writeBody                                                                                               writeBody
    // -----------------------------------------------------------------------------------------------------------------
    function writeBody() {

//        $this->errorMesages .= "writeBody()<br>\n";

        //make sure it is a valid directory
        if(is_dir($this->userFilesDir)) {

            //open directory
            if($dh = opendir($this->userFilesDir)) {

                //read file names
                $this->filesInDir = array();
                while( ($this->fileName = readdir($dh)) ) {
                    $this->filesInDir[] = $this->fileName;
               }
                closedir($dh);
            }
        }

        //onLoad function
        if(strlen($this->onLoadFunction)>0) { printf("<body onload='".$this->onLoadFunction."()'>\n"); }
        else                                { printf("<body>\n");                                      }

        //error messages
        if(strlen($this->errorMesages)>0)   {
            printf("<span style=\"background-color:#ff0000; color:#ffffff; \">");
            printf($this->errorMesages);
            printf("</span>\n");
        }

        //print form
        printf("<form name=\"".$this->formID."\" id=\"".$this->formID."\" method=\"".$this->submitMethod."\" enctype=\"".$this->enctype."\" action=\"".$this->fmFileName."\">\n\n");

        printf("<input name=\"userAction\"    id=\"userAction\"    type=\"hidden\" value=\"".$this->defaultUserAction."\" style=\"position:relative; width:100%%; height:200px; overflow:auto;\">\n\n");

        printf("<div class=\"control\" style=\"position:relative; width:100%%;\">\n\n");

        printf("<table align=\"center\" valign=\"middle\" border=\"0\" width=100%%>\n");

        printf("<tr>\n");
        printf("<td class=\"heading\" align=\"left\" valign=\"bottom\">\n");
        printf("$this->title\n");
        printf("</td>\n");
        printf("</tr>\n\n");

        //Toolbar
        printf("<tr>\n");
        printf("<td align=\"left\" valign=\"middle\">\n");

        printf("<div style=\"border-style:groove; border-width:2; border-color:#ffffff; padding:2;\">\n");
        printf("    <img src=\"".$this->imageDir."/".$this->imgOpenUserFileInDocument."\"     onclick=\"".$this->openFunction."();\"            title=\"".$this->titleOpenUserFileInDocument."\"   alt=\"".$this->altOpenUserFileInDocument."\"    width=\"".$this->toolbarImageWidth."\" height=\"".$this->toolbarImageHeight."\" >\n");
        printf("    <img src=\"".$this->imageDir."/".$this->imgOpenUserFileInCollection."\" onclick=\"".$this->collectionFunction."();\" title=\"".$this->titleOpenUserFileInCollection."\" alt=\"".$this->altOpenUserFileInCollection."\"  width=\"".$this->toolbarImageWidth."\" height=\"".$this->toolbarImageHeight."\" >\n");
        printf("    <img src=\"".$this->imageDir."/".$this->imgSaveUserFile."\"             onclick=\"".$this->saveFunction."();\"            title=\"".$this->titleSaveUserFile."\"             alt=\"".$this->altSaveUserFile."\"              width=\"".$this->toolbarImageWidth."\" height=\"".$this->toolbarImageHeight."\" >\n"); 
        printf("    <img src=\"".$this->imageDir."/".$this->imgDeleteUserFile."\"           onclick=\"".$this->deleteFunction."();\"          title=\"".$this->titleDeleteUserFile."\"           alt=\"".$this->altDeleteUserFile."\"            width=\"".$this->toolbarImageWidth."\" height=\"".$this->toolbarImageHeight."\" >\n");
        printf("</div>\n");

        printf("</td>\n");
        printf("</tr>\n\n");

        //output directory
        printf("<tr>\n");
        printf("<td align=\"center\" valign=\"bottom\">\n");
        printf("    <select id=\"fileSelect\" name=\"fileSelect\" size=\"10\" onclick=\"".$this->selectFunction."();\" ondblclick=\"".$this->openFunction."();\" style=\"position:relative; width:100%%; height:300px;\">\n");
        for($i=0; $i<count($this->filesInDir); $i++) {
            $tmpFileName = $this->filesInDir[$i];
            if( ($tmpFileName != ".") && ($tmpFileName != "..") && ($this->hasValidFileExtension($tmpFileName)) ) {
                printf("        <option value=\"".$tmpFileName."\" >".$tmpFileName."\n");
            }
        }
        printf("    </select>\n");
        printf("</td>\n");
        printf("</tr>\n\n");


        //File Name
        printf("<tr>\n");
        printf("<td class=\"label\" align=\"left\" valign=\"bottom\">\n");
        printf("".$this->fileNameLabel."");
        printf("</td>\n");
        printf("</tr>\n\n");

        printf("<tr>\n");
        printf("<td>\n");
        printf("    <input name=\"fileName\" id=\"fileName\" type=\"text\" value=\"".$this->userFileName."\" style=\"position:relative; width:100%%; height:30px;\" onchange=\"return false;\">\n");
        printf("</td>\n");
        printf("</tr>\n\n");


        //Buttons
        printf("<tr>\n");
        printf("<td align=\"center\" valign=\"bottom\">\n");
//        printf("    <input class=\"button\" type=\"button\" value=\"Open\"   onclick=\"".$this->openFunction."();\">\n");
//        printf("    <input class=\"button\" type=\"button\" value=\"Save\"   onclick=\"".$this->saveFunction."();\">\n");
//        printf("    <input class=\"button\" type=\"button\" value=\"Delete\" onclick=\"".$this->deleteFunction."();\">\n");
        printf("    <input class=\"button\" type=\"button\" value=\"Close\" onclick=\"".$this->closeFunction."();\">\n");
        printf("</td>\n");
        printf("</tr>\n\n");

        printf("</table>\n");
        printf("</div>\n\n");

        printf("<textarea name=\"fileContents\"  id=\"fileContents\"  style=\"position:relative; width:100%%; height:200px; overflow:auto; visibility:hidden;\">");
        printf($this->userFileContents);
        printf("</textarea>\n\n");
        printf("</form>\n");

        printf("</body>\n");

        return 1;

    }//writeBody



    // hasValidFileExtension                                                                       hasValidFileExtension
    // -----------------------------------------------------------------------------------------------------------------
    function hasValidFileExtension($fileName) {

        foreach($this->validFileExtensions as $extension) {
            if(ereg($extension, $fileName)) {
                return true;
            }
        }

        return false;

    }//hasValidFileExtension



    // printBody2                                                                                             printBody2
    // -----------------------------------------------------------------------------------------------------------------
    function printBody2() {


        //make sure it is a valid directory
        if(is_dir($this->userFilesDir)) {

            //open directory
            if($dh = opendir($this->userFilesDir)) {

                //read file names
                $this->filesInDir = array();
                while( ($this->fileName = readdir($dh)) ) {
                    $this->filesInDir[] = $this->fileName;
               }
                closedir($dh);
            }
        }

        //print form

//        print <<<_FORM_1_
//<form name="{$this->formID}" id="{$this->formID}" method="{$this->submitMethod}" enctype="{$this->enctype}" action="{$this->fmFileName}">
//
//
//<textarea name=$this->fileContentsInputID  id=$this->fileContentsInputID  style="position:relative; width:100%; height:200px; overflow:auto;">$this->userFileContents</textarea>
//
//    <div class="control" style="position:relative; width:100%;">
//
//    <table align="center" valign="middle" border="0" width="100%">
//
//    <tr>
//        <td class="heading" align="left" valign="bottom">
//        $title
//        </td>
//    </tr>
//
//    <tr>
//        <td align="center" valign="bottom">
//            <select id=$this->fileSelectInputID name=$this->fileSelectInputID size="10" style="position:relative; width:100%; height:300px;">
//_FORM_1_;
//
//        for($i=0; $i<count($this->filesInDir); $i++) {
//            $tmpFileName = $this->filesInDir[$i];
//            print( '<option value="'.$tmpFileName.'" onclick="'.$this->selectFunction.'(\''.$tmpFileName.'\');" >'.$tmpFileName );
//        }
//
//        print <<<_FORM_2_
//              </select>
//        </td>
//    </tr>
//
//    <tr>
//        <td class="label" align="left" valign="bottom">
//            $this->fileNameLabel
//        </td>
//    </tr>
//
//    <tr>
//        <td>
//            <input name=$this->fileNameInputID id=$this->fileNameInputID type="text" value="{$this->userFileName}" style="position:relative; width:100%; height:30px;">
//        </td>
//    </tr>
//
//    <tr>
//        <td align="center" valign="bottom">
//            <input class="button" type="submit" value="Save">
//            <input class="button" type="button" value="test"   onclick="{$this->saveFunction}();">
//            <input class="button" type="button" value="Cancel" onclick="{$this->closeFunction}();">
//        </td>
//    </tr>
//
//    </table>
//    </div>
//
//</form>
//_FORM_2_;

        return 1;

    }//printBody2



}//MASH_FileManager

?>

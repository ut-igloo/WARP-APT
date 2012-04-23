<?php

// ------------------------------------------------------------------------------------------------------------------ //
// FileUploader.php                                                                                                   //
//                                                                                                                    //
// * Created on:                                                                                                      //
//   - May 27, 2008                                                                                                   //
//                                                                                                                    //
// ------------------------------------------------------------------------------------------------------------------ //
class FileUploader {

    protected $filesDir    = '../mash-userfiles/';

    protected $UPLOAD_FILE = 'UPLOAD';
    protected $DELETE_FILE = 'DELETE';

    protected $messages    = '';


    // -----------------------------------------------------------------------------------------------------------------
    // Constructor                                                                                           Constructor
    // -----------------------------------------------------------------------------------------------------------------
    public function __construct() {

        $this->UPLOAD_FILE = 'UPLOAD';
        $this->DELETE_FILE = 'DELETE';

        $this->filesDir    = '../mash-userfiles/';
        $this->messages    = '';

    }//__construct



    // -----------------------------------------------------------------------------------------------------------------
    // getters and setters                                                                           getters and setters
    // -----------------------------------------------------------------------------------------------------------------


    // getFilesDir                                                                                           getFilesDir
    // -----------------------------------------------------------------------------------------------------------------
    public function getFilesDir($filesDir) {
        return $this->filesDir;
    }//getFilesDir


    // setFilesDir                                                                                           setFilesDir
    // -----------------------------------------------------------------------------------------------------------------
    public function setFilesDir($filesDir) {

        //validate parameters
        if(!$fileDir) { return; }

        $this->filesDir = $filesDir;

    }//setFilesDir



    // -----------------------------------------------------------------------------------------------------------------
    // Upload Functions                                                                                 Upload Functions
    // -----------------------------------------------------------------------------------------------------------------


    // checkFunction                                                                                       checkFunction
    // -----------------------------------------------------------------------------------------------------------------
    public function checkFunction() {

        if(!isset($_REQUEST['function']) ) {
//            $this->addAlert("<strong>function</strong> IS NOT set" );
            return;
        }

//        $this->addAlert("<strong>function</strong>  = " . $_REQUEST['function'] );

        if     ($_REQUEST['function'] == $this->UPLOAD_FILE) { $this->upload(); }
        else if($_REQUEST['function'] == $this->DELETE_FILE) { $this->delete(); }
        else {
            $this->addAlert("Unknown function requested = <strong>{$_REQUEST['function']}</strong>" );
        }

    }//checkFunction



    // upload                                                                                                     upload
    // -----------------------------------------------------------------------------------------------------------------
    public function upload() {

        if(isset($_FILES['uploadFile']) != 1) {
            $this->addAlert("uploadFile IS NOT set" );
            return;
        }

        $filesName = $this->filesDir . basename( $_FILES['uploadFile']['name']);

        if(move_uploaded_file($_FILES['uploadFile']['tmp_name'], $filesName)) {
            $this->addSuccess("<strong>" . basename( $_FILES['uploadFile']['name'] ) . "</strong> was successfully uploaded" );
        }
        else{
            $this->addError("There was an error uploading the file, please try again!" );
        }

    }//upload



    // delete                                                                                                     delete
    // -----------------------------------------------------------------------------------------------------------------
    public function delete() {

//        $this->addAlert("<strong>fileName</strong>  = " .  basename( $_REQUEST['fileName'] ) );

        $fileName = $_REQUEST['fileName'];

        if(!is_file($fileName)) {
            $this->addError("There was an error deleting the file! <strong>" . basename($fileName) . "</strong> was not found on the server.");
            return;
        }

        if(unlink($fileName)) {
            $this->addSuccess("<strong>" . basename( $fileName ) . "</strong> was deleted");
        }
        else{
            $this->addError("There was an error deleting the file!");
        }


    }//delete



    // writeUploadedFilesTable                                                                   writeUploadedFilesTable
    // -----------------------------------------------------------------------------------------------------------------
    public function writeUploadedFilesTable() {

        $files = scandir($this->filesDir);
        if( count($files) <= 0) {
            print("<tr>\n");
            print("  <td class=\"tinyCell\"  >&nbsp;</td>\n");
            print("  <td class=\"verylargeCell\" >&nbsp;</td>\n");
            print("  <td class=\"smallCell\" >&nbsp;</td>\n");
            print("  <td class=\"mediumCell\">&nbsp;</td>\n");
            print("</tr>\n");
        }
        for($i=0; $i < count($files); $i++){

            if( ($files[$i] == '.') || ($files[$i] == '..') ) { continue; }
            $fileName = $this->filesDir.$files[$i];

            print("<tr>\n");
            print("  <td class=\"tinyCell\"  ></td>\n");
            print("  <td class=\"verylargeCell\" ><a href=\"$fileName\">$files[$i]</a></td>\n");
            print("  <td class=\"smallCell\" >" . filesize($fileName)                         . "</td>\n");
            print("  <td class=\"mediumCell\">" . date("d/M/Y_H:i:s", filemtime($fileName) ) . "</td>\n");
            print("  <td class=\"tinyCell\"  ><img src=\"./images/delete.png\" width=\"14pt\" height=\"14pt\" onclick=\"WarpUploader.deleteFile('$fileName');\"></td>\n");
            print("</tr>\n");
        }

    }//writeUploadedFilesTable



    // -----------------------------------------------------------------------------------------------------------------
    // Utility Functions                                                                               Utility Functions
    // -----------------------------------------------------------------------------------------------------------------



    // resetMessages                                                                                       resetMessages
    // -----------------------------------------------------------------------------------------------------------------
    public function resetMessages() {
        $this->messages = '';
    }//resetMessages


    // addMessage                                                                                             addMessage
    // -----------------------------------------------------------------------------------------------------------------
    public function addMessage($message) {

        //validate parameters
        if(!$message) { return; }

        $this->messages = $this->messages . "<img src=\"./images/grey-bullet.png\" width=\"10pt\" height=\"10pt\">&nbsp;<span>&nbsp; $message &nbsp;</span><br/>\n";
    }//addMessage


    // addSuccess                                                                                             addSuccess
    // -----------------------------------------------------------------------------------------------------------------
    public function addSuccess($message) {

        //validate parameters
        if(!$message) { return; }

        $this->messages = $this->messages . "<img src=\"./images/green-bullet.png\" width=\"10pt\" height=\"10pt\">&nbsp;<span class=\"success\">&nbsp; $message &nbsp;</span><br/>\n";
    }//addSuccess


    // addAlert                                                                                                 addAlert
    // -----------------------------------------------------------------------------------------------------------------
    public function addAlert($message) {

        //validate parameters
        if(!$message) { return; }

        $this->messages = $this->messages . "<img src=\"./images/yellow-bullet.png\" width=\"10pt\" height=\"10pt\">&nbsp;<span class=\"alert\">&nbsp; $message &nbsp;</span><br/>\n";
    }//addAlert


    // addError                                                                                                 addError
    // -----------------------------------------------------------------------------------------------------------------
    public function addError($message) {

        //validate parameters
        if(!$message) { return; }

        $this->messages = $this->messages . "<img src=\"./images/red-bullet.png\" width=\"10pt\" height=\"10pt\">&nbsp;<span class=\"error\">&nbsp; $message &nbsp;</span><br/>\n";

    }//addError


    // writeMessages                                                                                       writeMessages
    // -----------------------------------------------------------------------------------------------------------------
    public function writeMessages() {

        print($this->messages . "\n" );

    }//writeMessages



}//class FileUploader

?>

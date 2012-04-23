<html>
<head>
<title>WARP Page Upload</title>
<link rel="stylesheet" href="warpUpload.css">
<?php
    require_once "FileUploader.php";
    $uploader = new FileUploader();
?>

<script src="./warpUpload.js">              </script>
</head>

<body>

<h1>WARP Page Upload </h1>

<?php $uploader->checkFunction(); ?>

<form id="uploadForm" name="uploadForm" enctype="multipart/form-data" action="warpUpload.php" method="post" >

  <input type="hidden" id="function" name="function" value="UPLOAD" />
  <input type="hidden" id="fileName" name="fileName" value=""       />

  <!--Description                                                                                        Description -->
  <h2 class="required">File to Upload</h2>
  <table class="required2">

    <tr>
      <td>&nbsp;</td>
    </tr>

    <tr>
      <td class="tinyCell"     ></td>
      <th class="left"         >File</th>
    </tr>

    <tr>
      <td class="tinyCell"     ></td>
      <td class="veryLargeCell"><input class="inputFile" type="file" id="uploadFile" name="uploadFile" size="113" /></td>
      <td class="tinyCell"     ></td>
    </tr>

    <tr>
      <td></td>
    </tr>

    <tr>
      <td>&nbsp;</td>
      <td>
          <div class="center" >
            <input class="submitButton" type="button" id="update-button" name="update-button"  value="Upload" onclick="WarpUploader.uploadFile();" />
          </div>
      </td>
    </tr>

  </table>


  <!--Existing Files                                                                                  Existing Files -->
  <h2 class="required">Existing Files</h2>
  <table class="required2" border="0">

    <tr>
      <td>&nbsp;</td>
    </tr>

    <tr>
        <td></td>
        <th>Name</th>
        <th>Size</th>
        <th>Date</th>
        <td>&nbsp;</td>
    </tr>

    <?php $uploader->writeUploadedFilesTable(); ?>

    <tr>
      <td>&nbsp;</td>
    </tr>

  </table>

  <!--Existing Files                                                                                  Existing Files -->
  <h2 class="required">Messages</h2>
  <table class="required2" border="0">

    <tr>
      <td>&nbsp;</td>
      <td class="controlsTD"><input type="button" id="clearMessages" name="clearMessages"  value="Clear Messages" onclick="WarpUploader.clearMessages();" /></td>
    </tr>
    <tr>
      <td class="tinyCell"></td>
      <td class="messages" id="messagesTD">
        <?php $uploader->writeMessages(); ?>
        <br/>&nbsp;
      </td>
      <td class="tinyCell"></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
   </tr>
  </table>


</form>

</body>
</html>

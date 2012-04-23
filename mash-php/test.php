<html>
<head>
<title>PHP test</title>
</head>

<body>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!-- PHP                                                                                                         PHP -->
<!-- --------------------------------------------------------------------------------------------------------------- -->
<?php 
include "objects.php";

$title = "WARP Directory Service";
$date  = getdate();

printf("<h1>%s</h1><br>\n",$title);
printf("%s:%s:%s<br>\n",$date["hours"],$date["minutes"],$date["seconds"]);


$obj = new SpatialObject();
printf("\n<pre>\n%s </pre>\n <br>\n",$obj->toXML());


?>


<form method="POST" action="test.php">
<input type="submit" value="test">
</form>

</body>
</html>

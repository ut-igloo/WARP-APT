<?php 

// -------------------------------------------------------------------- //
// objects.php                                                          //
// this is only a test file                                             //
// -------------------------------------------------------------------- //

class SpatialObject {

    var $id = "OBJ 1";

    function toString() {
        return "ID = ".$this->id."\n";
    }


    function toXML() {

        $xmlString  = "<SpatialObject>\n";
        $xmlString .= "  <id>" . $this->id . "</id>\n";
        $xmlString .= "</SpatialObject>\n";

        return $xmlString;
    }


}
?>

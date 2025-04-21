<?php
require "Tables/Finance/POLineItemRepository.php";

$id = $_POST["id"];
// $id = "4";

if (isset($id)) {
    $db = new POLineItemRepository();
    $db->deleteLineItem($id);
}
?>
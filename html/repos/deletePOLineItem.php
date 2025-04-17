<?php
require "Tables/Finance/POLineItemRepository.php";

$id = $_POST["id"];

if (isset($id)) {
    $db = new POLineItemRepository();
    $db->deletePOLineItem($id);
}
?>
<?php
require "Tables/POS/InventoryRepository.php";
$id =$_POST["id"];

if (isset($id)) {
    $db = new InventoryRepository();
    $db->decreaseInventory($id);
}
?>
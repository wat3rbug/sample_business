<?php
require "Tables/POS/InventoryRepository.php";
$id =$_POST["id"];
// $id ="2";

if (isset($id)) {
    $db = new InventoryRepository();
    $db->increaseInventory($id);
}
?>
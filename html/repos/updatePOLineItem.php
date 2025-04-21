<?php
require "Tables/Finance/POLineItemRepository.php";

$partorder = $_POST["partorder"];
$id = $_POST["id"];
$name = $_POST["name"];
$quantity = $_POST["quantity"];
$cost = $_POST["cost"];

$lineitem = array(
    "id" => $id,
    "name" => $name,
    "cost" => $cost,
    "quantity" => $quantity,
    "partorder" => $partorder
);

 if (isset($id) && isset($name) && isset($quantity) && isset($cost) && isset($partorder)) {
    $db = new POLineItemRepository();
    $db->updateLineItem($lineitem);
 }
 ?>
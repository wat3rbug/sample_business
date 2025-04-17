<?php
require "Tables/Finance/POLineItemRepository.php";

$name = $_POST["name"];
$qty = $_POST["quantity"];
$cost = $_POST["cost"];
$id = $POST["id"];

// $name = "filament";
// $qty = "1";
// $cost = "19.99";
// $id = "14";

$lineitem = array(
    "name" => $name,
    "partorder" => $id,
    "cost" => $cost,
    "quantity" => $qty
);

if (isset($name) && isset($id) && isset($qty) && isset($cost)) {
    $db = new POLineItemRepository();
    $db->addPOLineItem($lineitem);
}
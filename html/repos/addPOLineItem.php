<?php
require "Tables/Finance/POLineItemRepository.php";

$partorder = $_POST["partorder"];
$name = $_POST["name"];
$quantity = $_POST["quantity"];
$cost = $_POST["cost"];

// $name = "filament";
// $quantity = "1";
// $cost = "19.99";
// $partorder = "1";

$lineitem = array(
    "partorder" => $partorder,
    "name" => $name,
    "quantity" => $quantity,
    "cost" => $cost
);

if (isset($partorder) && isset($name) && isset($quantity) && isset($cost)) {
    $db = new POLineItemRepository();
    $db->addPOLineItem($lineitem);
}
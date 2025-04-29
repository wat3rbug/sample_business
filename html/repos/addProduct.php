<?php
require "Tables/ProductRepository.php";
require "Tables/POS/InventoryRepository.php";
// $name = $_POST["name"];
// $url = $_POST["url"];
// $photo = $_POST["photo"];
// $material =  $_POST["material"];
// $time = $_POST["buildtime"];
// $mattype = $_POST["materialtype"];

$name = "clamp pad";
$url = "/users/douglas/Documents/3d models/clamp pad.3mf";
$photo = "";
$material =  "4.35";
$time = "1.22";
$mattype = "3";

$customer_dict = array(
    "name" => $name,
    "url" => $url,
    "photo" => $photo,
    "material" => $material,
    "buildtime" => $time,
    "materialtype" => $mattype,
);

if (isset($name) && isset($url) && isset($material) && isset($time) && isset($mattype)) {
    $db = new ProductRepository();
    $db->createProduct($customer_dict);
    $data = $db->getLastProduct();
    $db = new InventoryRepository();
    $customer_dict = array(
        "product" => $data[0]["id"],
        "amount" => "1"
    );
    $db->addInventory($customer_dict);
}
?>
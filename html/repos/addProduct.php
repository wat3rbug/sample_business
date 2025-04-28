<?php
require "Tables/ProductRepository.php";
// $name = $_POST["name"];
// $url = $_POST["url"];
// $photo = $_POST["photo"];
// $material =  $_POST["material"];
// $time = $_POST["time"];
// $mattype = $_POST["materialtype"];

$name = "clamp pad";
$url = "/users/douglas/Documents/3d models/clamp pad.3mf";
$photo = "";
$material =  "4.35";
$time = "1.22";
$mattype = "4";

$customer_dict = array(
    "name" => $name,
    "url" => $url,
    "photo" => $photo,
    "material" => $material,
    "time" => $time,
    "materialtype" => $mattype,
);

// $customer_dict = array(
//     "name" => "doohickey2",
//     "url" => "www.testme.org",
//     "photo" => null,
// );

if (isset($name) && isset($url) && isset($material) && isset($time) && isset($mattype)) {
    $db = new ProductRepository();
    $db->createProduct($customer_dict);
}
?>
<?php
require "Tables/ProductRepository.php";
$id= $_POST["id"];
$name = $_POST["name"];
$url = $_POST["url"];
$photo = $_POST["photo"];
$material =  $_POST["material"];
$time = $_POST["buildtime"];
$mattype = $_POST["materialtype"];

// $id = "2";
// $name = "clamp pad";
// $url = "/users/douglas/Documents/3d models/clamp pad.3mf";
// $photo = "";
// $material =  "4.35";
// $time = "1.22";
// $mattype = "3";

$customer_dict = array(
    "id" => $id,
    "name" => $name,
    "url" => $url,
    "photo" => $photo,
    "material" => $material,
    "buildtime" => $time,
    "materialtype" => $mattype,
);

if (isset($name) && isset($url) && isset($material) && isset($time) && isset($mattype)) {
    $db = new ProductRepository();
    $db->updateProduct($customer_dict);
}
?>
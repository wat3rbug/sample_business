<?php
require "Tables/Finance/VendorRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$url = $_POST["url"];
$address1 = $_POST["address1"];
$address2 = $_POST["address2"];
$city = $_POST["city"];
$state = $_POST["state"];
$zipcode = $_POST["zipcode"];

// $id = "1";
// $name = "amazon2";
// $url = "www.amazon.com";
// $address1 = "";
// $address2 = "";
// $city = "";
// $state = "TX";
// $zipcode = "";

$cust_dict = array(
    "id" => $id,
    "name" => $name,
    "url" => $url,
    "address1" => $address1,
    "address2" => $address2,
    "city" => $city,
    "state" => $state,
    "zipcode" => $zipcode,
);

if (isset($cust_dict)) {
    $db = new VendorRepository();
    $db->updateVendor($cust_dict);
}
<?php
require "Tables/Finance/VendorRepository.php";
$name = $_POST["name"];
$url = $_POST["url"];
$address1 = $_POST["address1"];
$address2 = $_POST["address2"];
$city = $_POST["city"];
$state = $_POST["state"];
$zipcode = $_POST["zipcode"];

$cust_dict = array(
    "name" => $name,
    "url" => $url,
    "address1" => $address1,
    "address2" => $address2,
    "city" => $city,
    "state" => $state,
    "zipcode" => $zipcode,
);

if (isset($name) && isset($url)) {
    $db = new VendorRepository();
    $db->createVendor($cust_dict);
}
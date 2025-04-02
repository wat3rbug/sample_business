<?php
require "Tables/ProductRepository.php";

$customer_dict = array(
    "name" => $_POST["name"],
    "url" => $_POST["url"],
    "photo" => $_POST["photo"],
);

// $customer_dict = array(
//     "name" => "doohickey2",
//     "url" => "www.testme.org",
//     "photo" => null,
// );

$db = new ProductRepository();
$db->createProduct($customer_dict);
?>
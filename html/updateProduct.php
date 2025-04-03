<?php
require "Tables/ProductRepository.php";

$customer_dict = array(
    "id" => $_POST["id"],
    "name" => $_POST["name"],
    "url" => $_POST["url"],
    "photo" => $_POST["photo"],
);

// $customer_dict = array(
//     "id" => "4",
//     "name" => "blah2",
//     "url" => "www.testme.org",
//     "photo" => null,
// );

$db = new ProductRepository();
$db->updateProduct($customer_dict);
?>
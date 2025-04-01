<?php
require "Tables/POS/CustomerRepository.php";

$customer_dict = array(
    "fname" => $_POST["fname"],
    "lname" => $_POST["lname"],
    "address1" => $_POST["address1"],
    "address2" => $_POST["address2"],
    "city" => $_POST["city"],
    "state" => $_POST["state"],
    "zipcode" => $_POST["zipcode"],
);

// $fname = "Douglas";
// $lname = "Gardiner";
// $add1 ="812 Camelot Ln";
// $add2 = NULL;
// $city = "Friendswood";
// $state = "TX";
// $zipcode = "77546";
// $customer_dict = array(
//     "fname" => $fname,
//     "lname" => $lname,
//     "address1" => $add1,
//     "address2" => $add2,
//     "city" => $city,
//     "state" => $state,
//     "zipcode" => $zipcode,
// );

$db = new CustomerRepository();
$db->createCustomer($customer_dict);

// get id from the created customer 

$data = $db->getLastCustomer();
header('Content-type: application/json');
echo json_encode($data);
?>
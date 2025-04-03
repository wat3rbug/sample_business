<?php
require "Tables/POS/CustomerRepository.php";

// $id = $_POST['id'];
$id =" 16";
$db = new CustomerRepository();
$db->deleteCustomer($id);
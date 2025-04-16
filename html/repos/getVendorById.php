<?php
require "Tables/Finance/VendorRepository.php";
$vendor = $_POST["vendor"];

// $vendor = "1";
if (isset($vendor)) {
    $db = new VendorRepository();
    $data = $db->getVendorById($vendor);
    header('Content-type: application/json');
    echo json_encode($data);
}
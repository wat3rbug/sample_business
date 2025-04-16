<?php
require "Tables/Finance/VendorRepository.php";

$db = new VendorRepository();
$data = $db->getVendorDropDown();
header('Content-type: application/json');
echo json_encode($data);
?>
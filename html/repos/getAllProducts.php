<?php
require "Tables/ProductRepository.php";

$db = new ProductRepository();
$data = $db->getAllProducts();
header('Content-type: application/json');
echo json_encode($data);
?>
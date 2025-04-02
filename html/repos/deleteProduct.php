<?php
require "Tables/ProductRepository.php";


$id = $_POST["id"];
$db = new ProductRepository();
$data = $db->deleteProduct($id);
?>
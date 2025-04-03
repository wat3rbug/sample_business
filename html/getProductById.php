<?php
require "Tables/ProductRepository.php";

$id= $_POST["id"];
// $id ="4";
if (isset($id)) {
    $db = new ProductRepository();
    $data = $db->getProductById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>
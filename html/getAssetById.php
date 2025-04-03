<?php
require "Tables/Finance/AssetRepository.php";

$id = $_POST["id"];
// $id = "5";
if (isset($id)) {
    $db = new AssetRepository();
    $data = $db->getAssetById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>
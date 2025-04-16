<?php
require "Tables/Finance/TagRepository.php";
$vendor = $_POST["vendor"];
$description = $_POST["description"];
// $vendor = "1";
// $description = "test2";

if (isset($vendor) && isset($description)) {
    $db = new TagRepository();
    $tag = array(
        "vendor"=> $vendor,
        "description"=> $description
    );
    $data = $db->createTag($tag);
    header('Content-type: application/json');
    echo json_encode($data);
}
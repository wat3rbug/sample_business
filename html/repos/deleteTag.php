<?php
require "Tables/Finance/TagRepository.php";
$tag = $_POST["tag"];
// $tag = "3";
if (isset($tag)) {
    $db = new TagRepository();
    $data = $db->deleteTag($tag);
}
<?php
class TagRepository {

    private $conn;

    function __construct() {
        include_once("FinanceConnection.php");
        $db = new FinanceConnection();
        $servername = $db->hostname;
        $username = $db->username;
        $password = $db->password;
        $charset = "utf8mb4";
        $database = $db->database;
        $dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => true,
        ];
        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    function createTag($tag) {
        $description = $tag["description"];
        $vendor = $tag["vendor"];
        if (isset($description) && isset($vendor)) {
            $sql = "INSERT INTO tags (description, vendor) VALUES (?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $description);
            $statement->bindParam(2, $vendor);
            $statement->execute();
        }
    }

    function getTagsByVendor($vendor) {
        if (isset($vendor)) {
            $sql = "SELECT * FROM tags WHERE vendor = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $vendor);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function deleteTag($tag) {
        if (isset($tag)) {
            $sql = "DELETE FROM tags WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $tag);
            $statement->execute();
        }
    }
}
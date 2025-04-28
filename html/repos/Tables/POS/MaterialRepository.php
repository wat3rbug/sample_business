<?php
class MaterialRepository {

    private $conn;

    function __construct() {
        include_once("OrderConnection.php");
        $db = new OrderConnection();
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

    function addMaterial($name) {
        if (isset($name)) {
            $sql = "INSERT INTO materials (`name`) VALUES (?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->execute();
        }
    }

    function getMaterials() {
        $sql = "SELECT * FROM materials";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function updateMaterial($id, $name) {
        if (isset($id) && isset($name)) {
            $sql = "UPDATE materials SET `name` = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $id);
            $statement->execute();
        }
    }

    function deleteMaterial($id) {
        if (isset($id)) {
            $sql = "DELETE FROM materials WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
<?php
class VendorRepository {

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

    function createVendor($cust_dict) {
        $name = $cust_dict["name"];
        $url = $cust_dict["url"];
        $address1 = $cust_dict["address1"];
        $address2 = $cust_dict["address2"];
        $city = $cust_dict["city"];
        $state = $cust_dict["state"];
        $zipcode = $cust_dict["zipcode"];
        if (isset($name) && isset($url)) {
            $sql = "INSERT INTO vendors (`name`, `url`, address1, address2, city, `state`, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $url);
            $statement->bindParam(3, $address1);
            $statement->bindParam(4, $address2);
            $statement->bindParam(5, $city);
            $statement->bindParam(6, $state);
            $statement->bindParam(7, $zipcode);
            $statement->execute();
        }
    }

    function getAllVendors() {
        $sql = "SELECT * FROM vendors";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $ouput = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getVendorById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM vendors WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $ouput = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function getVendorDropDown() {
        $sql = "SELECT id, `name` FROM vendors";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $ouput = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function updateVendor($cust_dict) {
        $id = $cust_dict["id"];
        $name = $cust_dict["name"];
        $url = $cust_dict["url"];
        $address1 = $cust_dict["address1"];
        $address2 = $cust_dict["address2"];
        $city = $cust_dict["city"];
        $state = $cust_dict["state"];
        $zipcode = $cust_dict["zipcode"];
        if (isset($id) && isset($name) && isset($url) && isset($state)) {
            $sql = "UPDATE vendors SET `name` = ?, `url` = ?, address1 = ?, address2 = ?, city = ?, `state` = ?, zipcode = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $url);
            $statement->bindParam(3, $address1);
            $statement->bindParam(4, $address2);
            $statement->bindParam(5, $city);
            $statement->bindParam(6, $state);
            $statement->bindParam(7, $zipcode);
            $statement->bindParam(8, $id);
            $statement->execute();
        }
    }

    function deleteVendor($id) {
        if (isset($id)) {
            $sql = "DELETE FROM tags WHERE vendor = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $sql = "DELETE FROM vendors WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
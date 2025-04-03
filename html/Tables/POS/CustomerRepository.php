<?php
class CustomerRepository {

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

    // This is too gnarly, I need one object to pass and then checks within

    function createCustomer($cust_dict) {
        $fname = $cust_dict["fname"];
        $lname = $cust_dict["lname"];
        $add1 = $cust_dict["address1"];
        $add2 =$cust_dict["address2"];
        $city = $cust_dict["city"];
        $state = $cust_dict["state"];
        $zip = $cust_dict["zipcode"];
        if (isset($fname) && isset($lname) && isset($add1) && isset($city)
                    && isset($state) && isset($zip)) {
            $sql = "INSERT INTO customers (fname, lname, address1, address2, city, `state`, zipcode) VALUES (?, ?, ?, ?, ?, ? , ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $fname);
            $statement->bindParam(2, $lname);
            $statement->bindParam(3, $add1);
            $statement->bindParam(4, $add2);
            $statement->bindParam(5, $city);
            $statement->bindParam(6, $state);
            $statement->bindParam(7, $zip);
            $statement->execute();
        }
    }
    function getLastCustomer() {
        $sql = "SELECT * FROM customers JOIN states ON customers.state = states.postal_code ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAllCustomers() {
        $sql = "SELECT * FROM customers JOIN states ON customers.state = states.postal_code";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function updateCustomer() {

    }

    function deleteCustomer($id) {
        if (isset($id)) {
            $sql = "DELETE FROM customers WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
?>